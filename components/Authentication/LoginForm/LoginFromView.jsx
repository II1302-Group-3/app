import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export const LoginFormView = ({
    email,
    password,
    setEmail,
    setPassword,
    login,
    navigation
}) => {
    return(
        <View style={{paddingHorizontal: 25}}>
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
            <Button mode="contained" style={{marginVertical: 25}} onPress={() => login(email, password)}>
                Log In
            </Button>
            <Button mode="text" onPress={() => navigation.navigate('Signup')}>
                Don't have an account? Sign up
            </Button>

        </View>
    )
}