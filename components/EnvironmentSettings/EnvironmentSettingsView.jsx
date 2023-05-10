import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { EnvironmentSettingsSliderView } from './EnvironmentSettingsSliderView';
import { EnvironmentSettingsSwitch } from './EnvironmentSettingsSwitchView';

const waterDropIcon = require('../../assets/WaterDropIcon.png'); // Link to waterDropIcon for the slider
const bulbIcon = require('../../assets/BulpIcon.png'); // Link to bulbIcon for the slider

export const EnvironmentSettingsView = ({
	setLight,
	setMoisture,
	setAdvancedInfo,
	advancedInfo,
	light,
	moisture,
	
	canDeleteGarden,
	deleteGarden
}) => {
	const moistureTitle = 'Moisture Level';
	const lightTitle = 'Light Level';
	const advancedInfoTitle = 'Advanced info';

    return(
        <View style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 30, flexDirection: "column", height: "100%" }}>
			<View style={{flexGrow: 1, justifyContent: "center"}}>
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
			</View>
			
			<View>
				<EnvironmentSettingsSwitch
					title={ advancedInfoTitle }
					onToggle={ setAdvancedInfo }
					active={ advancedInfo }
				/>
				<Button mode="contained" style={{marginTop: 25}} onPress={deleteGarden} disabled={!canDeleteGarden}>Delete garden from collection</Button>
			</View>
		</View>
    )
}