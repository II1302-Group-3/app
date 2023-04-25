import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Header } from '../../Header';

export const RegistrationFormView = ({
    displayName,
    email,
    password,
    confirmPassword,
    setDisplayName,
    setEmail,
    setPassword,
    setConfirmPassword
}) => {
    return(
        <View style={{paddingHorizontal: 25}}>
            <Header />
            <TextInput
                label="Display Name"
                value={displayName}
                mode={'outlined'}
                onChangeText={text => setDisplayName(text)}
            />
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
            <TextInput
                label="Password"
                value={confirmPassword}
                mode={'outlined'}
                onChangeText={text => setConfirmPassword(text)}
            />
            <View style={{marginVertical: 25}}>
                <Button mode="contained">
                    Sign Up
                </Button>
                <Button mode="contained-tonal">
                    Go Back
                </Button>
            </View>
            

        </View>
    )
}