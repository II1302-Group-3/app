import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLight, setMoisture } from '../../store/slices/garden';
import { EnvironmentSettingsView } from './EnvironmentSettingsView';

export const EnvironmentSettings = () => {
    const dispatch = useDispatch();

    const light = useSelector(state => state.garden.light);
    const moisture = useSelector(state => state.garden.moisture);

    const [advancedInfo, setAdvancedInfo] = useState(false);
    const changeLight = newLight => dispatch(setLight(newLight))
    const changeMoisture = newMoisture => dispatch(setMoisture(newMoisture))

    return(
        <EnvironmentSettingsView
            setLight={ changeLight }
            setMoisture={ changeMoisture }
            setAdvancedInfo={ setAdvancedInfo }
            advancedInfo={ advancedInfo }
            light={ light }
            moisture={ moisture }
        />
    )
}