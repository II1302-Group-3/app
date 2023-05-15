import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Slider from '@react-native-community/slider';

export const EnvironmentSettingsSliderView = ({
    title,
    unit,
    sliderIcon,
    nutrition,
    onSlide,
    advancedInfo,
    highRange,
    isDisabled = false
}) => {
    const lowRangeValues = [0, 20, 40, 60, 80];
    const highRangeValues = [0, 3000, 6000, 9000, 12000];

    const range = highRange ? highRangeValues : lowRangeValues;
    const rangeText = range.map(n => {
        const r = n.toString();

        const missing = 5 - r.length;
        const add = Math.ceil(missing / 2);

        return r.padStart(r.length + add, " ").padEnd(r.length + add * 2, " ");
    });

    const step = highRange ? 3000 : 20;

    return(
        <Card mode="contained">
            <Card.Title titleVariant="titleMedium" title={title + (advancedInfo ? ` (${unit})` : "")} />
            <Card.Content>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: "8%"}}>
                    <Text style={{fontSize: 15 }} >{advancedInfo ? rangeText[0] : "Low"}</Text>
                    <Text style={{fontSize: 15 }} >{advancedInfo ? rangeText[1] : ""}</Text>
                    <Text style={{fontSize: 15 }} >{advancedInfo ? rangeText[2] : "Medium"}</Text>
                    <Text style={{fontSize: 15 }} >{advancedInfo ? rangeText[3] : ""}</Text>
                    <Text style={{fontSize: 15 }} >{advancedInfo ? rangeText[4] : "High"}</Text>
                </View>

                <View style={{paddingHorizontal: 25}}>
                    <Slider
                        style={{width: "100%", height: 60}}
                        minimumValue={range[0]} // min value of the slider
                        maximumValue={range[4]} // Max value of the slider
                        disabled = {isDisabled}
                        onValueChange={(value) => onSlide(value)} // We give waterLevel the value when it changes
                        value={nutrition}
                        step={step} // step on the slider
                        thumbImage={sliderIcon}
                    />
                </View>
            </Card.Content>
        </Card>
    )
}