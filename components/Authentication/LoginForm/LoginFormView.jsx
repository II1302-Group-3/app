import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Header } from '../../Header';

export const LoginFormView = ({
    email,
    password,
    setEmail,
    setPassword
}) => {
    return(
        <View style={{paddingHorizontal: 25}}>
            <Header />
            <TextInput
                label="Email"
                value={email}
                mode={'outlined'}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Password"
                value={password}
                mode={'outlined'}
                onChangeText={text => setPassword(text)}
            />
            <Button mode="contained" style={{marginVertical: 25}}>
                Log In
            </Button>
            <Button mode="text">
                Don't have an account? Sign up
            </Button>

        </View>
    )
}