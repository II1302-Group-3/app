import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLedTestOn } from '../../../store/slices/garden';
import { EnvironmentSettingsSwitch } from './EnvironmentSettingsSwitch';

export const LEDTestSwitch = ({ textColor }) => {
    const dispatch = useDispatch();

    const title = 'LED test';
    const ledTestOn = useSelector(state => state.garden.ledTestOn);
    const changeLedTestOn = newLedTest => dispatch(setLedTestOn(newLedTest));

    return(
        <EnvironmentSettingsSwitch 
            title={ title }
            onToggle={ changeLedTestOn }
            active={ ledTestOn }
            textColor={ textColor } />
    )
}