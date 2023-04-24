import React from 'react';
import { Text, View, Switch } from 'react-native';

export const EnvironmentSettingsSwitch = ({
    title,
    onToggle,
    active,
    textColor
}) => {
    return(
        <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1, alignSelf: "flex-start", fontSize: 20, color: textColor }}>
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