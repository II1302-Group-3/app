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
            <Text style={{ flexGrow: 1, alignSelf: "flex-start", verticalAlign: "middle", height: "100%" }}>
                { title }
            </Text>
            <Switch 
                style={{ alignSelf: "flex-end" }}
                onValueChange={() => onToggle(!active)}
                value={active}
            />
        </View>
    )
}