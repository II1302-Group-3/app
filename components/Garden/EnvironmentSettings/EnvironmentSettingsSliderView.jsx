import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Slider from '@react-native-community/slider';

export const EnvironmentSettingsSliderView = ({
    title,
    sliderIcon,
    nutrition,
    onSlide,
    advancedInfo,
    isDisabled = false
}) => {
    return(
        <Card mode="contained">
            <Card.Title titleVariant="titleMedium" title={title} />
            <Card.Content>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: "8%"}}>
                    <Text style={{fontSize: 15 }} >{advancedInfo ? "  0  " : "Low"}</Text>
                    <Text style={{fontSize: 15 }} >{advancedInfo ? "200" : ""}</Text>
                    <Text style={{fontSize: 15 }} >{advancedInfo ? "400" : "Medium"}</Text>
                    <Text style={{fontSize: 15 }} >{advancedInfo ? "600" : ""}</Text>
                    <Text style={{fontSize: 15 }} >{advancedInfo ? "800" : "High"}</Text>
                </View>

                <View style={{paddingHorizontal: 25}}>
                    <Slider
                        style={{width: "100%", height: 60}}
                        minimumValue={0} // min value of the slider
                        maximumValue={800} // Max value of the slider
                        disabled = {isDisabled}
                        onValueChange={(value) => onSlide(value)} // We give waterLevel the value when it changes
                        value={nutrition}
                        step={200} // step on the slider
                        thumbImage={sliderIcon}
                    />
                </View>
            </Card.Content>
        </Card>
    )
}