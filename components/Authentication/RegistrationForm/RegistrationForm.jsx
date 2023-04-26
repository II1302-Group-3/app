import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../../store/slices/firebaseAuth';
import { RegistrationFormView } from './RegistrationFormView';

export const RegistrationForm = ({ navigation }) => {
    const dispatch = useDispatch();

    const signUp = (displayName, email, password, confirmPassword) => {
        dispatch(createAccount({
            displayName,
            userEmail: email,
            userPassword: password,
            confirmPassword
        }))
    }
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return(
        <RegistrationFormView
            displayName={ displayName }
            email={ email }
            password={ password }
            confirmPassword={ confirmPassword }
            setDisplayName={ setDisplayName }
            setEmail={ setEmail }
            setPassword={ setPassword }
            setConfirmPassword={ setConfirmPassword }
            signUp={ signUp }
            navigation={ navigation }
        />
    )
}