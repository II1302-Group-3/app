import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLedTestOn, setLight, setMoisture } from '../../store/slices/garden';
import { EnvironmentSettingsView } from './EnvironmentSettingsView';

export const EnvironmentSettings = () => {
    const dispatch = useDispatch();
    
    const light = useSelector(state => state.garden.light);
    const moisture = useSelector(state => state.garden.moisture);
    const ledTestOn = useSelector(state => state.garden.ledTestOn);

    const [advancedInfo, setAdvancedInfo] = useState(false);
    const changeLight = newLight => dispatch(setLight(newLight))
    const changeMoisture = newMoisture => dispatch(setMoisture(newMoisture))
    const changeLedTestOn = newLedTest => dispatch(setLedTestOn(newLedTest))

    return(
        <EnvironmentSettingsView 
            setLight={ changeLight }
            setMoisture={ changeMoisture }
            setLedTestOn={ changeLedTestOn }
            setAdvancedInfo={ setAdvancedInfo }
            advancedInfo={ advancedInfo }
            light={ light } 
            moisture={ moisture }
            ledTestOn={ ledTestOn } />
    )
}