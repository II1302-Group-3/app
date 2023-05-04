import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { useCardStyle } from '../../../style';
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
    const backgroundStyle = useCardStyle(isDarkMode);

    return(
        <View style={Object.assign(backgroundStyle, {padding: 20, margin: 15})}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: textColor, marginBottom: 20}}>{title}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: "8%"}}>
                <Text style={{fontSize: 15, color: textColor }} >{advancedInfo ? "0" : "Low"}</Text>
                <Text style={{fontSize: 15, color: textColor }} >{advancedInfo ? "200" : ""}</Text>
                <Text style={{fontSize: 15, color: textColor }} >{advancedInfo ? "400" : "Medium"}</Text>
                <Text style={{fontSize: 15, color: textColor }} >{advancedInfo ? "600" : ""}</Text>
                <Text style={{fontSize: 15, color: textColor }} >{advancedInfo ? "800" : "High"}</Text>
            </View>

            <View style={{paddingHorizontal: 25}}>
                <Slider
                    style={{width: "100%", height: 60}}
                    minimumValue={200} // min value of the slider 
                    maximumValue={1000} // Max value of the slider 
                    onValueChange={(value) => onSlide(value)} // We give waterLevel the value when it changes 
                    value={nutrition}
                    step={200} // step on the slider
                    thumbImage={sliderIcon}
                />
            </View>
        </View>
    )
}