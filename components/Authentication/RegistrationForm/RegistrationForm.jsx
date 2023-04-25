import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RegistrationFormView } from './RegistrationFormView';

export const RegistrationForm = ({ navigation }) => {
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
            navigation={ navigation }
        />
    )
}