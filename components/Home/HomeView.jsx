import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Header } from '../../Header';

export const HomeView = ({signOut}) => {
    return(
        <Button onPress={() => signOut()}>Sign out</Button>
    )
}