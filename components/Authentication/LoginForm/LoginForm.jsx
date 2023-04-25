import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginFormView } from './LoginFormView';

export const LoginForm = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return(
        <LoginFormView 
            username={ email }
            password={ password }
            setUsername={ setEmail }
            setPassword={ setPassword }
            navigation={ navigation }
        />
    )
}