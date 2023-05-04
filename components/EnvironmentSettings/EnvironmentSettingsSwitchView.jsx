import React from 'react';
import { View } from 'react-native';
import { Text, Switch } from 'react-native-paper';

export const EnvironmentSettingsSwitch = ({
    title,
    onToggle,
    active
}) => {
    return(
        <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1, alignSelf: "flex-start", fontSize: 20 }}>
                { title }
            </Text>
            <Switch 
                style={{ flex: 1, alignSelf: "flex-end" }}
                onValueChange={() => onToggle(!active)}
                value={active}
            />
        </View>
    )
}