import React from 'react';
import { View, Text} from 'react-native';
import { EnvironmentSettingsSliderView } from '../EnvironmentSettings/EnvironmentSettingsSliderView';
import { EnvironmentSettingsSwitch } from '../EnvironmentSettings/EnvironmentSettingsSwitchView';
import { useHeaderHeight } from '@react-navigation/elements';
import { Button, TextInput } from 'react-native-paper';
import { template } from '@babel/core';


const waterDropIcon = require('../../assets/WaterDropIcon.png'); // Link to waterDropIcon for the slider
const bulbIcon = require('../../assets/BulpIcon.png'); // Link to bulbIcon for the slider

export const BrowseTemplateNameView = ({
    plantName
}) => {
	
	
	const headerHeight = useHeaderHeight();

    return(
            <View style={{display:"flex"}}>
                <Text style={{fontWeight: "bold", fontSize: 30}} >{plantName}</Text>
            </View>
    )
}