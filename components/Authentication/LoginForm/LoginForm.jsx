import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../store/slices/firebaseAuth';
import { LoginFormView } from './LoginFormView';

export const LoginForm = ({ navigation }) => {
    const dispatch = useDispatch();

    const login = (email, password) => dispatch(signIn({userEmail: email, userPassword: password}))
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return(
        <LoginFormView 
            username={ email }
            password={ password }
            setEmail={ setEmail }
            setPassword={ setPassword }
            login={ login }
            navigation={ navigation }
        />
    )
}