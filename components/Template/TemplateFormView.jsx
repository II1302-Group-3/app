import React from 'react';
import { View } from 'react-native';
import { EnvironmentSettingsSliderView } from '../EnvironmentSettings/EnvironmentSettingsSliderView';
import { EnvironmentSettingsSwitch } from '../EnvironmentSettings/EnvironmentSettingsSwitchView';
import { useHeaderHeight } from '@react-navigation/elements';
import { Button, TextInput } from 'react-native-paper';
import { template } from '@babel/core';


const waterDropIcon = require('../../assets/WaterDropIcon.png'); // Link to waterDropIcon for the slider
const bulbIcon = require('../../assets/BulpIcon.png'); // Link to bulbIcon for the slider

export const TemplateFormView = ({
	setLight,
	setMoisture,
	setAdvancedInfo,
	advancedInfo,
    saveTemplateValue,
    setTemplateName,
    name,
}) => {
	const moistureTitle = 'Moisture Level';
	const lightTitle = 'Light Level';
	const advancedInfoTitle = 'Advanced info';
	
	const headerHeight = useHeaderHeight();

    return(
        <View style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 30 + headerHeight, justifyContent: "center", flexDirection: "column", height: "100%" }}>

            
            <View style={{marginBottom: 20}}>
				<EnvironmentSettingsSliderView 
					title={ moistureTitle } 
					sliderIcon={ waterDropIcon } 
					onSlide={ setMoisture } 
					advancedInfo={ advancedInfo }
				/>
			</View>
			<EnvironmentSettingsSliderView 
				title={ lightTitle } 
				sliderIcon={ bulbIcon } 
				onSlide={ setLight } 
				advancedInfo={ advancedInfo }
			/>

			<View style={{ paddingVertical: 20 }}>
				<EnvironmentSettingsSwitch 
					title={ advancedInfoTitle }
					onToggle={ setAdvancedInfo }
					active={ advancedInfo } 
				/>
			</View>

            <View style={{ paddingBottom:40}}>
				<TextInput 
					label="Name your Plant" 
					mode="outlined" 
					value={name}
					onChangeText={ value => setTemplateName(value)} 
				/>
            </View>

            <View>
                <Button mode="contained" style={{marginBottom: 10}} onPress={() => saveTemplateValue()}>SaveTemplate</Button>
            </View>

		</View>

    )
}