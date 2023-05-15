import React from 'react';
import { View } from 'react-native';
import { EnvironmentSettingsSliderView } from '../Garden/EnvironmentSettings/EnvironmentSettingsSliderView';
import { EnvironmentSettingsSwitch } from '../Garden/EnvironmentSettings/EnvironmentSettingsSwitchView';
import { useHeaderHeight } from '@react-navigation/elements';
import { Button, TextInput } from 'react-native-paper';
import { template } from '@babel/core';


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

    return(
        <View style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 30 + headerHeight, justifyContent: "center", flexDirection: "column", height: "100%" }}>
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
					sliderIcon={ waterDropIcon }
					onSlide={ setMoisture }
					advancedInfo={ advancedInfo }
					nutrition={moisture}
				/>
			</View>
			<EnvironmentSettingsSliderView
				title={ lightTitle }
				sliderIcon={ bulbIcon }
				onSlide={ setLight }
				advancedInfo={ advancedInfo }
				nutrition={light}
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

    )
}