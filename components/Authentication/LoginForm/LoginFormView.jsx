import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Header } from '../../Header';
import { useHeaderHeight } from '@react-navigation/elements';

export const LoginFormView = ({
    email,
    password,
    canPressLogin,
    canPressSignUp,
    loading,
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
                    error={email.trim() == ""}
                />
                <TextInput
                    label="Password"
                    value={password}
                    mode={'outlined'}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    autoComplete="current-password"
                    error={password.length < 6}
                />
                <Button mode="contained" disabled={!canPressLogin} loading={loading} style={{marginVertical: 25}} onPress={login}>
                    Log In
                </Button>
                <Button mode="text" disabled={!canPressSignUp} onPress={() => navigation.navigate('Signup')}>
                    Don't have an account? Sign up
                </Button>
            </View>
        </View>
    )
}