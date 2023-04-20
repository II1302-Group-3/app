import React, {useState,useEffect, Image}from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView, Text, useColorScheme, View, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';

function App() {
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		//backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
		backgroundColor: 'white',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		elevation: 10, // Height of the shadow
		padding: 20, 
		margin: 15,
	};

	const [waterLevel, setWaterValue] = useState(50); // Initial value of the waterLevel 
	const [lightLevel, setLightValue] = useState(50);// Initial value of the LightLevel 
	const bulbIcon = require('./assets/BulpIcon.png'); // Link to bulbIcon for the slider
	const WaterDropIcon = require('./assets/WaterDropIcon.png'); // Link to WaterDropIcon for the slider
	const [advanceInfo, setAdvanceInfo] = useState(false);


	return (
		
		<View>
			
			<View style={backgroundStyle}>
				<Text style={{fontSize: 24, fontWeight: 'bold'}}>Moisture level</Text>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25}}>
    				<Text style={{fontSize: 18}} >Low</Text>
					<Text style={{fontSize: 18}} >Medium</Text>
					<Text style={{fontSize: 18}} >High</Text>
				</View>

				<Slider
  					style={{width: 285, height: 60, marginHorizontal: 20}}
  					minimumValue={50} // min value of the slider 
  					maximumValue={150} // Max value of the slider 
 			    	onValueChange={(value) => setWaterValue(value)} // We give waterLevel the value when it changes 
					step={50} // step on the slider
					thumbImage={WaterDropIcon}
				/>	
			</View>


			<View style={backgroundStyle}>
				<Text style={{fontSize: 24, fontWeight: 'bold'}} >Light Level</Text>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25}}>
    				<Text style={{fontSize: 18}} >Low</Text>
					<Text style={{fontSize: 18}} >Medium</Text>
					<Text style={{fontSize: 18}} >High</Text>
				</View>
				<Slider
  					style={{width: 285, height: 60, marginHorizontal: 20}}
  					minimumValue={50}
  					maximumValue={150}
					step={50}
 			    	onValueChange={(value) => setLightValue(value)}
				 	thumbImage={bulbIcon}
				/>
			</View>


			<View>
				<TouchableOpacity //A wrapper for making views respond properly to touches.
        			style={{ paddingVertical: 10 }}
        			onPress={() => setAdvanceInfo(!advanceInfo)}> 
        			<Text style={{ color: 'blue', fontSize: 20, }}>Advanced info (Click of more info)</Text>
      			</TouchableOpacity>
			
				{advanceInfo && ( // When thouched advanceInfo value becomes true and this becomes true
        			<Text style={{ marginTop: 5 }}>
						Raw sensor values. 
						The water Level value is {waterLevel}.
						The light Level value is {lightLevel}.
				</Text>
      			)}
			</View>

		</View>
		
	);
}

export default App;
