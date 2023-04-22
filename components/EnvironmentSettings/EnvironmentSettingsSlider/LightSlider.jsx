import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLight } from '../../../store/slices/garden';
import { View, Text, useColorScheme } from 'react-native';
import { EnvironmentSettingsSliderView } from './EnvironmentSettingsSliderView';

export const LightSlider = ({ advancedInfo, textColor }) => {
    const dispatch = useDispatch();

    const title = 'Light Level'
    const bulbIcon = require('../../../assets/BulpIcon.png'); // Link to bulbIcon for the slider
    const light = useSelector(state => state.garden.light);
    const changeLight = newLight => dispatch(setLight(newLight));

    return(
        <EnvironmentSettingsSliderView 
            title={ title } 
            sliderIcon={ bulbIcon } 
            nutrition={ light }
            onSlide={ changeLight } 
            advancedInfo={ advancedInfo }
            textColor={ textColor }/>
    )
}