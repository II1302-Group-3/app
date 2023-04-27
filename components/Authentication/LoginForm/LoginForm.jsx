import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, resetError } from '../../../store/slices/firebaseAuth';
import { LoginFormView } from './LoginFormView';

export const LoginForm = ({ navigation }) => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.firebaseAuth.signinError);

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
            dispatch(resetError());
        }
    }, [error]);

    const login = (email, password) => {
        if(email && password) dispatch(signIn({userEmail: email, userPassword: password}));
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    
    return(
        <LoginFormView 
            email={ email }
            password={ password }
            setEmail={ setEmail }
            setPassword={ setPassword }
            login={ login }
            navigation={ navigation }
        />
    )
}
