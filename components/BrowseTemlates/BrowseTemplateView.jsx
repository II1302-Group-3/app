import React from 'react';
import { View, Text} from 'react-native';
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
	console.log(setAdvancedInfo)
	const headerHeight = useHeaderHeight();

    return(
        <View style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 30 + headerHeight, justifyContent: "center", flexDirection: "column", height: "100%" }}>
            <View>
                <Text variant="headlineMedium" style={{fontWeight: "bold", marginBottom: 30}} >Hello "Banana"</Text>
            </View>
           
            <View style={{marginBottom: 20}}>
				<EnvironmentSettingsSliderView 
					title={ moistureTitle } 
					isDisabled ={true}
					sliderIcon={ waterDropIcon } 
                    nutrition={ 600 }
					advancedInfo={ advancedInfo }
				/>
			</View>
			<EnvironmentSettingsSliderView 
				title={ lightTitle } 
				isDisabled ={true}
				sliderIcon={ bulbIcon } 
                nutrition={ 1000 }
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