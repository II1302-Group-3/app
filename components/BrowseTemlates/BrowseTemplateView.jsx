import React from 'react';
import { View } from 'react-native';
import { EnvironmentSettingsSliderView } from '../EnvironmentSettings/EnvironmentSettingsSliderView';
import { EnvironmentSettingsSwitch } from '../EnvironmentSettings/EnvironmentSettingsSwitchView';
import { useHeaderHeight } from '@react-navigation/elements';
import { Button, TextInput } from 'react-native-paper';
import { template } from '@babel/core';


const waterDropIcon = require('../../assets/WaterDropIcon.png'); // Link to waterDropIcon for the slider
const bulbIcon = require('../../assets/BulpIcon.png'); // Link to bulbIcon for the slider

export const BrowseTemplateView = ({
	setAdvancedInfo,
	advancedInfo,
    light,
	moisture,
    plantName

}) => {
	const moistureTitle = 'Moisture Level';
	const lightTitle = 'Light Level';
	const advancedInfoTitle = 'Advanced info';
	
	const headerHeight = useHeaderHeight();

    return(
        <View style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 30 + headerHeight, justifyContent: "center", flexDirection: "column", height: "100%" }}>
            <View>
                <Text variant="headlineMedium" style={{fontWeight: "bold", marginBottom: 30}} >Hello {plantName}</Text>
            </View>
           
            <View style={{marginBottom: 20}}>
				<EnvironmentSettingsSliderView 
					title={ moistureTitle } 
					sliderIcon={ waterDropIcon } 
                    nutrition={ moisture }
					advancedInfo={ advancedInfo }
				/>
			</View>
			<EnvironmentSettingsSliderView 
				title={ lightTitle } 
				sliderIcon={ bulbIcon } 
                nutrition={ light }
				advancedInfo={ advancedInfo }
			/>

			<View style={{ paddingVertical: 20 }}>
				<EnvironmentSettingsSwitch 
					title={ advancedInfoTitle }
					onToggle={ setAdvancedInfo }
					active={ advancedInfo } 
				/>
			</View>

		</View>

    )
}