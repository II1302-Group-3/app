import React from 'react';
import { View } from 'react-native';
import { EnvironmentSettingsSliderView } from '../Garden/EnvironmentSettings/EnvironmentSettingsSliderView';
import { EnvironmentSettingsSwitch } from '../Garden/EnvironmentSettings/EnvironmentSettingsSwitchView';
import { useHeaderHeight } from '@react-navigation/elements';
import { Button, TextInput } from 'react-native-paper';
import { template } from '@babel/core';
import { ScrollView } from 'react-native-gesture-handler';


const waterDropIcon = require('../../assets/WaterDropIcon.png'); // Link to waterDropIcon for the slider
const bulbIcon = require('../../assets/BulpIcon.png'); // Link to bulbIcon for the slider

export const TemplateFormView = ({
	light,
	moisture,
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

	// https://stackoverflow.com/questions/32664397/react-native-vertical-centering-when-using-scrollview
    return(
		<View style={{height: "100%", marginBottom: headerHeight}}>
			<ScrollView style={{ paddingHorizontal: 20 }} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
				<View style={{paddingVertical: 30}}>
					<View style={{ marginBottom: 48}}>
						<TextInput
							label="Name your plant"
							mode="outlined"
							value={name}
							onChangeText={ value => setTemplateName(value)}
						/>
					</View>

					<View style={{marginBottom: 20}}>
						<EnvironmentSettingsSliderView
							title={ moistureTitle }
							unit={ "%" }
							sliderIcon={ waterDropIcon }
							onSlide={ setMoisture }
							advancedInfo={ advancedInfo }
							nutrition={moisture}
							highRange={false}
						/>
					</View>
					<EnvironmentSettingsSliderView
						title={ lightTitle }
						unit={ "lux" }
						sliderIcon={ bulbIcon }
						onSlide={ setLight }
						advancedInfo={ advancedInfo }
						nutrition={light}
						highRange={true}
					/>

					<View style={{ paddingVertical: 20 }}>
						<EnvironmentSettingsSwitch
							title={ advancedInfoTitle }
							onToggle={ setAdvancedInfo }
							active={ advancedInfo }
						/>
					</View>

					<View>
						<Button mode="contained" style={{marginTop: 30}} onPress={() => saveTemplateValue()} disabled={name.trim().length < 3}>Save template</Button>
					</View>
				</View>

			</ScrollView>
		</View>
    )
}