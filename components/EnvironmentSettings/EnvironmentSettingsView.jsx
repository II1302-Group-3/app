import React, {useState} from 'react';
import { Text, useColorScheme, View, Switch} from 'react-native';
import Slider from '@react-native-community/slider';

export const EnvironmentSettingsView = ({
    setLight,
    setMoisture,
	setLedTestOn,
    light,
    moisture,
	ledTestOn
}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
		backgroundColor: isDarkMode ? "#212121" : "white",
		borderRadius: 10,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		elevation: 10, // Height of the shadow
		padding: 20, 
		margin: 15,
	};

	const textColor = isDarkMode ? "#fafafa" : "#050505";

	const [advancedInfo, setAdvancedInfo] = useState(false);

	const bulbIcon = require('../../assets/BulpIcon.png'); // Link to bulbIcon for the slider
	const WaterDropIcon = require('../../assets/WaterDropIcon.png'); // Link to WaterDropIcon for the slider

    return(
        <View>
			<View style={backgroundStyle}>
				<Text style={{fontSize: 24, fontWeight: 'bold', color: textColor }}>Moisture level</Text>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25 }}>
    				<Text style={{fontSize: 18, color: textColor }} >Low</Text>
					<Text style={{fontSize: 18, color: textColor }} >Medium</Text>
					<Text style={{fontSize: 18, color: textColor }} >High</Text>
				</View>

				<Slider
  					style={{width: 285, height: 60, marginHorizontal: 20}}
  					minimumValue={50} // min value of the slider 
  					maximumValue={150} // Max value of the slider 
 			    	onValueChange={(value) => setMoisture(value)} // We give waterLevel the value when it changes 
					step={50} // step on the slider
					thumbImage={WaterDropIcon}
				/>	
			</View>

			<View style={backgroundStyle}>
				<Text style={{fontSize: 24, fontWeight: 'bold', color: textColor}} >Light Level</Text>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25}}>
    				<Text style={{fontSize: 18, color: textColor}} >Low</Text>
					<Text style={{fontSize: 18, color: textColor}} >Medium</Text>
					<Text style={{fontSize: 18, color: textColor}} >High</Text>
				</View>
				<Slider
  					style={{width: 285, height: 60, marginHorizontal: 20}}
  					minimumValue={50}
  					maximumValue={150}
					step={50}
 			    	onValueChange={(value) => setLight(value)}
				 	thumbImage={bulbIcon}
				/>
			</View>

			<View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
				<View style={{ flexDirection: "row" }}>
					<Text style={{ flex: 1, alignSelf: "flex-start", fontSize: 20, color: textColor }}>
						Advanced info 
					</Text>
					<Switch 
						style={{ flex: 1, alignSelf: "flex-end" }}
						onValueChange={() => setAdvancedInfo(!advancedInfo)}
						value={advancedInfo}
					/>
				</View>

				<View style={{ marginTop: 10, flexDirection: "row" }}>
					<Text style={{ flex: 1, alignSelf: "flex-start", fontSize: 20, color: textColor }}>
						LED test 
					</Text>
					<Switch 
						style={{ flex: 1, alignSelf: "flex-end" }}
						onValueChange={() => setLedTestOn(!ledTestOn)}
						value={ledTestOn}
					/>
				</View>
			
				{advancedInfo && ( // When touched advancedInfo value becomes true and this becomes true
        			<Text style={{ marginTop: 10, color: textColor }}>
						Raw sensor values. 
						The water Level value is {moisture}.
						The light Level value is {light}.
					</Text>
      			)}
			</View>

		</View>
    )
}