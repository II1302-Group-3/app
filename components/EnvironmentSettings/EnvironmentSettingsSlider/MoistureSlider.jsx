import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMoisture } from '../../../store/slices/garden';
import { EnvironmentSettingsSliderView } from './EnvironmentSettingsSliderView';

export const MoistureSlider = ({ advancedInfo, textColor }) => {
    const dispatch = useDispatch();

    const title = 'Moisture Level'
    const waterDropIcon = require('../../../assets/WaterDropIcon.png'); // Link to waterDropIcon for the slider
    const moisture = useSelector(state => state.garden.moisture);
    const changeMoisture = newMoisture => dispatch(setMoisture(newMoisture));

    return(
        <EnvironmentSettingsSliderView 
            title={ title } 
            sliderIcon={ waterDropIcon } 
            nutrition={ moisture }
            onSlide={ changeMoisture } 
            advancedInfo={ advancedInfo }
            textColor={ textColor }/>
    )
}