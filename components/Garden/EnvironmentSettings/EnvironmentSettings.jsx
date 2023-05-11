import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMoisture, setLight, resetGarden, removeGarden, resetWaterLevelLow } from '../../../store/slices/garden';
import { EnvironmentSettingsView } from './EnvironmentSettingsView';
import { Alert } from 'react-native';

export const EnvironmentSettings = ({ navigation }) => {
    const dispatch = useDispatch();

    const serial = useSelector(state => state.garden?.serial ?? "");
    const nickname = useSelector(state => state.garden?.nickname ?? "");
    const light = useSelector(state => state.garden?.light ?? 0);
    const moisture = useSelector(state => state.garden?.moisture ?? 0);
    console.log(light, moisture)
    const browseTemplate = () => navigation.navigate("BrowseTemplate")

    useEffect(() => {
        return () => dispatch(resetGarden());
    }, [])

    useEffect(() => navigation.setOptions({title: nickname}), [nickname])

    const waterLevelLow = useSelector(state => state.garden?.waterLevelLow ?? false);

    useEffect(() => {
        if(waterLevelLow && nickname !== "") {
            Alert.alert(
                `Warning for ${nickname}`, 
                "The water level in the tank is low. Refill the tank as soon as possible."
            );

            dispatch(resetWaterLevelLow());
        }
    }, [waterLevelLow, nickname]);

    const [advancedInfo, setAdvancedInfo] = useState(false);
    const changeMoisture = newMoisture => dispatch(setMoisture(newMoisture))
    const changeLight = newLight => dispatch(setLight(newLight))

	const userToken = useSelector(state => state.firebaseAuth.user.token);
	const [isDeleting, setIsDeleting] = useState(false);
	
	const deleteGarden = () => {
        setIsDeleting(true);

        const deleteFunction = () => {
            removeGarden(userToken, serial, dispatch)
                .catch(error => Alert.alert("Failed to remove garden", error.message))
                .finally(() => {
                    setIsDeleting(false);
                    navigation.navigate("Home");
                });
        }

        Alert.alert(
            "Are you sure?", 
            "Anyone will be able to claim this garden after you delete it from your collection.", 
            [{
                text: "Cancel",
                onPress: () => setIsDeleting(false),
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: deleteFunction,
                style: "destructive"
            }]
        )
	}

    return(
        <EnvironmentSettingsView
            setLight={ changeLight }
            setMoisture={ changeMoisture }
            setAdvancedInfo={ setAdvancedInfo }
            advancedInfo={ advancedInfo }
            light={ light }
            moisture={ moisture }
            browseTemplate={browseTemplate}
            canDeleteGarden={ !isDeleting }
            deleteGarden={ deleteGarden }
        />
    )
}