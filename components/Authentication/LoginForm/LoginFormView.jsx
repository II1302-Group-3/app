import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Header } from '../../Header';
import { useHeaderHeight } from '@react-navigation/elements';

export const LoginFormView = ({
    email,
    password,
    setEmail,
    setPassword,
    login,
    navigation
}) => {
    const headerHeight = useHeaderHeight();

    return(
        <View style={{paddingHorizontal: 25, paddingTop: 30, paddingBottom: 30 + headerHeight, justifyContent: "center", flexDirection: "column", height: "100%"}}>
            <View>
                <Header />
                <TextInput
                    label="Email"
                    value={email}
                    mode={'outlined'}
                    onChangeText={text => setEmail(text)}
                    autoComplete="email"
                />
                <TextInput
                    label="Password"
                    value={password}
                    mode={'outlined'}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    autoComplete="current-password"
                />
                <Button mode="contained" style={{marginVertical: 25}} onPress={() => login(email, password)}>
                    Log In
                </Button>
                <Button mode="text" onPress={() => navigation.navigate('Signup')}>
                    Don't have an account? Sign up
                </Button>
            </View>
        </View>
    )
}