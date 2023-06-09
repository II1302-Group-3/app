import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Header } from '../../Header';
import { useHeaderHeight } from '@react-navigation/elements';

export const RegistrationFormView = ({
    displayName,
    email,
    password,
    confirmPassword,
    signUpEnabled,
    backEnabled,
    loading,
    setDisplayName,
    setEmail,
    setPassword,
    setConfirmPassword,
    signUp,
    navigation
}) => {
    const headerHeight = useHeaderHeight();

    return(
        <View style={{paddingHorizontal: 25, paddingTop: 30, paddingBottom: 30 + headerHeight, justifyContent: "center", flexDirection: "column", height: "100%"}}>
            <View>
                <Header />
                <TextInput
                    label="Display Name"
                    value={displayName}
                    mode={'outlined'}
                    onChangeText={text => setDisplayName(text)}
                    autoComplete="name"
                    error={displayName.trim() == ""}
                />
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
                    autoComplete="new-password"
                    error={password.length < 6}
                />
                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    mode={'outlined'}
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry={true}
                    autoComplete="new-password"
                    error={confirmPassword.length < 6}
                />
                <View style={{marginTop: 25}}>
                    <Button mode="contained" style={{marginBottom: 10}} disabled={!signUpEnabled} loading={loading} onPress={signUp}>
                        Sign Up
                    </Button>
                    <Button mode="contained-tonal" disabled={!backEnabled} onPress={() => navigation.goBack()}>
                        Go Back
                    </Button>
                </View>
            </View>
        </View>
    )
}