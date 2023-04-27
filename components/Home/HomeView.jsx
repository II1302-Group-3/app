import React from 'react';
import { Button } from 'react-native-paper';

export const HomeView = ({signOut}) => {
    return(
        <Button onPress={() => signOut()}>Sign out</Button>
    )
}