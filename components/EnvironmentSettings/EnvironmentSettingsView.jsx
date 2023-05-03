import React from 'react';
import { useColorScheme, View } from 'react-native';
import { EnvironmentSettingsSliderView } from './EnvironmentSettingsSliderView';
import { EnvironmentSettingsSwitch } from './EnvironmentSettingsSwitchView';
export const EnvironmentSettingsView = ({
	setLight,
	setMoisture,
	setLedTestOn,
	setAdvancedInfo,
	advancedInfo,
	light,
	moisture,
	ledTestOn
}) => {
    const isDarkMode = useColorScheme() === 'dark';
	const textColor = isDarkMode ? "#fafafa" : "#050505";

	const moistureTitle = 'Moisture Level';
	const lightTitle = 'Light Level';
	const advancedInfoTitle = 'Advanced info';
	const ledTestTitle = 'LED test';

	const waterDropIcon = require('../../assets/WaterDropIcon.png'); // Link to waterDropIcon for the slider
	const bulbIcon = require('../../assets/BulpIcon.png'); // Link to bulbIcon for the slider

    return(
        <View>
			<EnvironmentSettingsSliderView 
				title={ moistureTitle } 
				sliderIcon={ waterDropIcon } 
				nutrition={ moisture }
				onSlide={ setMoisture } 
				advancedInfo={ advancedInfo }
				textColor={ textColor }/>
			<EnvironmentSettingsSliderView 
				title={ lightTitle } 
				sliderIcon={ bulbIcon } 
				nutrition={ light }
				onSlide={ setLight } 
				advancedInfo={ advancedInfo }
				textColor={ textColor }/>

			<View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
				<EnvironmentSettingsSwitch 
					title={ advancedInfoTitle }
					onToggle={ setAdvancedInfo }
					active={ advancedInfo }
					textColor={ textColor } />

				<View style={{ marginTop: 10 }}>
					<EnvironmentSettingsSwitch 
						title={ ledTestTitle }
						onToggle={ setLedTestOn }
						active={ ledTestOn }
						textColor={ textColor } />
				</View>
			</View>
		</View>
    )
}