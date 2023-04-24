import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import Slider from '@react-native-community/slider';

export const EnvironmentSettingsSliderView = ({
    title,
    sliderIcon,
    nutrition,
    onSlide,
    advancedInfo,
    textColor
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

    return(
        <View style={backgroundStyle}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: textColor, marginBottom: 20}}>{title}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25}}>
                <Text style={{fontSize: 18, color: textColor }} >{advancedInfo ? "50" : "Low"}</Text>
                <Text style={{fontSize: 18, color: textColor }} >{advancedInfo ? "100" : "Medium"}</Text>
                <Text style={{fontSize: 18, color: textColor }} >{advancedInfo ? "150" : "High"}</Text>
            </View>

            <View style={{paddingHorizontal: 25}}>
                <Slider
                    style={{width: "100%", height: 60}}
                    minimumValue={50} // min value of the slider 
                    maximumValue={150} // Max value of the slider 
                    onValueChange={(value) => onSlide(value)} // We give waterLevel the value when it changes 
                    value={nutrition}
                    step={50} // step on the slider
                    thumbImage={sliderIcon}
                />
            </View>
        </View>
    )
}