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
        <View style={{paddingHorizontal: 25, paddingTop: 30, paddingBottom: 30 + headerHeight, justifyContent: "center", flexDirection: "column", height: "100%"}}>
            <View>
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
                    secureTextEntry={true}
                />
                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    mode={'outlined'}
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry={true}
                />
                <View style={{marginVertical: 25}}>
                    <Button mode="contained" onPress={() => signUp(displayName, email, password, confirmPassword)}>
                        Sign Up
                    </Button>
                    <Button style={{marginVertical: 10}} mode="contained-tonal" onPress={() => navigation.goBack()}>
                        Go Back
                    </Button>
                </View>
            </View>
        </View>
    )
}