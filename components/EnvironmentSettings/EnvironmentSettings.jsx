import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMoisture, setLight, resetGarden } from '../../store/slices/garden';
import { EnvironmentSettingsView } from './EnvironmentSettingsView';

export const EnvironmentSettings = ({navigation}) => {
    const dispatch = useDispatch();

    const nickname = useSelector(state => state.garden?.nickname ?? "");
    const light = useSelector(state => state.garden?.light ?? 0);
    const moisture = useSelector(state => state.garden?.moisture ?? 0);

    useEffect(() => {
        return () => dispatch(resetGarden());
    }, [])

    useEffect(() => navigation.setOptions({title: nickname}), [nickname])

    const [advancedInfo, setAdvancedInfo] = useState(false);
    const changeMoisture = newMoisture => dispatch(setMoisture(newMoisture))
    const changeLight = newLight => dispatch(setLight(newLight))

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