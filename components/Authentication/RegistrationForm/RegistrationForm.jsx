import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, resetError } from '../../../store/slices/firebaseAuth';
import { RegistrationFormView } from './RegistrationFormView';

export const RegistrationForm = ({ navigation }) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.firebaseAuth.signupError);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => isCreatingAccount);
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if(error) validate()

        function validate() {
            switch(error) {
                case 'auth/invalid-email':
                    alert('The provided email is incorrectly formatted.');
                    break;
                case 'auth/email-already-in-use':
                    alert('The provided email is already in use by an existing user.');
                    break;
                case 'auth/weak-password':
                    alert('Password must be longer than six characters.');
                    break;
                case 'Passwords do not match.':
                    alert(error);
                    break;
                default: alert('Something went wrong. Error: ' + error);
            }

            setIsCreatingAccount(false);
            dispatch(resetError())
        }
    }, [error])

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const allArgumentsSet =
        displayName.trim() != "" &&
        email.trim() != "" &&
        password.length >= 6 &&
        confirmPassword.length >= 6;

    const signUp = () => {
        if(allArgumentsSet) {
            setIsCreatingAccount(true);

            dispatch(createAccount({
                displayName,
                userEmail: email,
                userPassword: password,
                confirmPassword
            }))
        }
    }

    return(
        <RegistrationFormView
            displayName={ displayName }
            email={ email }
            password={ password }
            confirmPassword={ confirmPassword }
            signUpEnabled={ allArgumentsSet && !isCreatingAccount }
            backEnabled={ !isCreatingAccount }
            setDisplayName={ setDisplayName }
            setEmail={ setEmail }
            setPassword={ setPassword }
            setConfirmPassword={ setConfirmPassword }
            signUp={ signUp }
            navigation={ navigation }
        />
    )
}
