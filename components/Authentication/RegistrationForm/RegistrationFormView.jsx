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
    setDisplayName,
    setEmail,
    setPassword,
    setConfirmPassword,
    signUp,
    navigation
}) => {
    const headerHeight = useHeaderHeight();

    return(
        <View style={{paddingHorizontal: 25, paddingTop: 0, paddingBottom: 30 + headerHeight, justifyContent: "center", flexDirection: "column", height: "100%"}}>
            <View>
                <Header />
                <TextInput
                    label="Display Name"
                    value={displayName}
                    mode={'outlined'}
                    onChangeText={text => setDisplayName(text)}
                    autoComplete="name"
                />
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
                    autoComplete="new-password"
                />
                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    mode={'outlined'}
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry={true}
                    autoComplete="new-password"
                />
                <View style={{marginTop: 25}}>
                    <Button mode="contained" style={{marginBottom: 10}} onPress={() => signUp(displayName, email, password, confirmPassword)}>
                        Sign Up
                    </Button>
                    <Button mode="contained-tonal" onPress={() => navigation.goBack()}>
                        Go Back
                    </Button>
                </View>
            </View>
        </View>
    )
}