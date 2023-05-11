import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { EnvironmentSettingsSliderView } from '../Garden/EnvironmentSettings/EnvironmentSettingsSliderView';
import { EnvironmentSettingsSwitch } from '../Garden/EnvironmentSettings/EnvironmentSettingsSwitchView';
import { useHeaderHeight } from '@react-navigation/elements';
import { Button, TextInput } from 'react-native-paper';
import { template } from '@babel/core';


const waterDropIcon = require('../../assets/WaterDropIcon.png'); // Link to waterDropIcon for the slider
const bulbIcon = require('../../assets/BulpIcon.png'); // Link to bulbIcon for the slider

export const BrowseTemplateView = ({
	setAdvancedInfo,
	advancedInfo,
	name,
    light,
	moisture,
    plantName,
	isFilled,
	onPress,

}) => {
	
	const moistureTitle = 'Moisture Level';
	const lightTitle = 'Light Level';
	const advancedInfoTitle = 'Advanced info';
	const headerHeight = useHeaderHeight();
	
	const filledHeart = require('../../assets/filled_heart.png')
	const unfilledHeart = require('../../assets/heart.png')

    return(
        <View style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 30 + headerHeight, justifyContent: "center", flexDirection: "column", height: "100%" }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text variant="headlineMedium" style={{fontWeight: "bold", marginBottom: 30}} >Hello "{name}"</Text>
				<TouchableOpacity onPress={() => onPress(!isFilled)}>
					<Image 
						source={isFilled ? filledHeart : unfilledHeart}
						style={{ width: 30, height: 30}}
					/>
				</TouchableOpacity>
				
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