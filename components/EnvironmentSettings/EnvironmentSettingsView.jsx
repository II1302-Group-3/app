import React from 'react';
import { useColorScheme, View, StatusBar } from 'react-native';
import { Header } from './Header';
import { MoistureSlider } from './EnvironmentSettingsSlider/MoistureSlider';
import { LightSlider } from './EnvironmentSettingsSlider/LightSlider';
import { AdvancedInfoSwitch } from './EnvironmentSettingsSwitch/AdvancedInfoSwitch';
import { LEDTestSwitch } from './EnvironmentSettingsSwitch/LEDTestSwitch';

export const EnvironmentSettingsView = ({
	setAdvancedInfo,
	advancedInfo
}) => {
    const isDarkMode = useColorScheme() === 'dark';
	const textColor = isDarkMode ? "#fafafa" : "#050505";

    return(
        <View>
			<StatusBar
				backgroundColor="transparent"
				barStyle={isDarkMode ? "light-content" : "dark-content"}
			/>
			<Header textColor={ textColor } />
			<MoistureSlider advancedInfo={ advancedInfo } textColor={ textColor } />
			<LightSlider advancedInfo={ advancedInfo } textColor={ textColor } />

			<View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
				<AdvancedInfoSwitch 
					advancedInfo={ advancedInfo } 
					setAdvancedInfo={ setAdvancedInfo } 
					textColor={ textColor} />

				<View style={{ marginTop: 10 }}>
					<LEDTestSwitch textColor={ textColor } />
				</View>
			</View>
		</View>
    )
}