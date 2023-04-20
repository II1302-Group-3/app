import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLight, setMoisture } from '../../store/slices/garden';
import {Text, View} from 'react-native';
import { EnvironmentSettingsView } from './EnvironmentSettingsView';

export const EnvironmentSettings = () => {
    const dispatch = useDispatch();
    const light = useSelector(state => state.garden.light);
    const moisture = useSelector(state => state.garden.moisture);

    const changeLight = newLight => {
        console.log(newLight)
        dispatch(setLight(newLight))
    }

    const changeMoisture = newMoisture => {
        console.log("test");
        dispatch(setMoisture(newMoisture))
    }

    return(
        <EnvironmentSettingsView 
            setLight={ changeLight }
            setMoisture={ changeMoisture }
            light={ light } 
            moisture={ moisture } />
    )
}