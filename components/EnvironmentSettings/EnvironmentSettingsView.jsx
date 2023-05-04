import React from 'react';
import { View } from 'react-native';
import { EnvironmentSettingsSliderView } from './EnvironmentSettingsSliderView';
import { EnvironmentSettingsSwitch } from './EnvironmentSettingsSwitchView';
import { useHeaderHeight } from '@react-navigation/elements';

const waterDropIcon = require('../../assets/WaterDropIcon.png'); // Link to waterDropIcon for the slider
const bulbIcon = require('../../assets/BulpIcon.png'); // Link to bulbIcon for the slider

export const EnvironmentSettingsView = ({
	setLight,
	setMoisture,
	setAdvancedInfo,
	advancedInfo,
	light,
	moisture
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
					nutrition={ moisture }
					onSlide={ setMoisture }
					advancedInfo={ advancedInfo }
				/>
			</View>
			<EnvironmentSettingsSliderView
				title={ lightTitle }
				sliderIcon={ bulbIcon }
				nutrition={ light }
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
		</View>
    )
}