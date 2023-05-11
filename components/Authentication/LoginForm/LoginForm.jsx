import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, resetError } from '../../../store/slices/firebaseAuth';
import { LoginFormView } from './LoginFormView';

export const LoginForm = ({ navigation }) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.firebaseAuth.signinError);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => isLoggingIn);
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if(error) validate()

        function validate() {
            switch(error) {
                case 'auth/internal-error':
                    alert('Password required.');
                    break;
                case 'auth/user-not-found':
                    alert('User does not exist.')
                    break;
                case 'auth/wrong-password':
                    alert('The provided password is incorrect.');
                    break;
                default: alert('Something went wrong. Error code: ' + error)
            }

            setIsLoggingIn(false);
            dispatch(resetError());
        }
    }, [error]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const allArgumentsSet =
        email.trim() != "" &&
        password.length >= 6;

    const login = () => {
        if(allArgumentsSet) {
            setIsLoggingIn(true);
            dispatch(signIn({userEmail: email, userPassword: password}));
        }
    };

    return(
        <LoginFormView
            email={ email }
            password={ password }
            canPressLogin={ allArgumentsSet & !isLoggingIn }
            canPressSignUp={ !isLoggingIn }
            setEmail={ setEmail }
            setPassword={ setPassword }
            login={ login }
            navigation={ navigation }
        />
    )
}