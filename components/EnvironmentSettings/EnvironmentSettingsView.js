import React, {useState,useEffect, Image}from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView, Text, useColorScheme, View, TouchableOpacity, Switch} from 'react-native';
import Slider from '@react-native-community/slider';

export const EnvironmentSettingsView = ({
    setLight,
    setMoisture,
    light,
    moisture
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

	const toggleSwitch = () => {setAdvanceInfo(advanceInfo => !advanceInfo)
								};

	const [waterLevel, setWaterValue] = useState(50); // Initial value of the waterLevel 
	const [lightLevel, setLightValue] = useState(50);// Initial value of the LightLevel 
	const bulbIcon = require('../../assets/BulpIcon.png'); // Link to bulbIcon for the slider
	const WaterDropIcon = require('../../assets/WaterDropIcon.png'); // Link to WaterDropIcon for the slider
	const [advanceInfo, setAdvanceInfo] = useState(false);

    return(
        <View>
			
			<View style={backgroundStyle}>
				<Text style={{fontSize: 24, fontWeight: 'bold', color: textColor}}>Moisture level</Text>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25}}>
    				<Text style={{fontSize: 18, color: textColor}} >Low</Text>
					<Text style={{fontSize: 18, color: textColor}} >Medium</Text>
					<Text style={{fontSize: 18, color: textColor}} >High</Text>
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


			<View>
				<View //A wrapper for making views respond properly to touches.
        			style={{ paddingVertical: 10, paddingLeft:20 }}> 

        			<Text style={{ fontSize: 20, color: textColor  }}>Advanced info 
						<Switch 
        					onValueChange={toggleSwitch}
        					value={advanceInfo}
      					/>
					</Text>
      			</View>
			
				{advanceInfo && ( // When thouched advanceInfo value becomes true and this becomes true
        			<Text style={{ marginTop: 5, paddingLeft:20, color: textColor }}>
						Raw sensor values. 
						The water Level value is {moisture}.
						The light Level value is {light}.
				</Text>
      			)}
			</View>

		</View>
    )
}