import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMoisture, setLight, removeGarden } from '../../../store/slices/garden';
import { EnvironmentSettingsView } from './EnvironmentSettingsView';
import { Alert } from 'react-native';
import { Spinner } from '../../Spinner';

export const EnvironmentSettings = ({ navigation }) => {
    const dispatch = useDispatch();
    const isSyncing = useSelector(state => state.garden?.syncing ?? true);

    const serial = useSelector(state => state.garden?.serial ?? "");
    const nickname = useSelector(state => state.garden?.nickname ?? "");
    const light = useSelector(state => state.garden?.light ?? 0);
    const moisture = useSelector(state => state.garden?.moisture ?? 0);

    const copyToTemplate = () => navigation.navigate("AddTemplate");
    const browseTemplate = () => navigation.navigate("BrowseTemplate")

    useEffect(() => navigation.setOptions({title: `Settings for ${nickname}`}), [nickname])

    const waterLevelLow = useSelector(state => state.firebaseAuth.user?.claimedGardensWaterLevelLow[state.garden?.serial ?? ""] ?? false);
    const online = useSelector(state => state.firebaseAuth.user?.claimedGardensOnline[state.garden?.serial ?? ""] ?? false);
    const plantDetected = useSelector(state => state.firebaseAuth.user?.claimedGardensPlantDetected[state.garden?.serial ?? ""] ?? false);

    useEffect(() => {
        if(waterLevelLow && nickname !== "") {
            Alert.alert(
                `Warning for ${nickname}`,
                "The water level in the tank is low. Refill the tank as soon as possible."
            );
        }
    }, [waterLevelLow, nickname]);

    const [advancedInfo, setAdvancedInfo] = useState(false);
    const changeMoisture = newMoisture => dispatch(setMoisture(newMoisture))
    const changeLight = newLight => dispatch(setLight(newLight))

	const userToken = useSelector(state => state.firebaseAuth.user.token);
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteGarden = () => {
        setIsDeleting(true);

        const deleteFunction = (clearStatistics) => {
            removeGarden(userToken, serial, dispatch, clearStatistics)
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
                text: "Delete and clear old statistics",
                onPress: () => deleteFunction(true),
                style: "destructive"
            },
            {
                text: "Delete and keep old statistics",
                onPress: () => deleteFunction(false),
                style: "destructive"
            }]
        )
	}

    if(isSyncing) {
        return <Spinner></Spinner>;
    }

    let warning = "";

    if(online) {
        if(!plantDetected) {
            warning = "No plant detected in garden";
        }
    }
    else {
        warning = "This garden is not connected to the internet";
    }

    return(
        <EnvironmentSettingsView
            setLight={ changeLight }
            setMoisture={ changeMoisture }
            setAdvancedInfo={ setAdvancedInfo }
            advancedInfo={ advancedInfo }
            light={ light }
            moisture={ moisture }
            copyToTemplate={ copyToTemplate }
            browseTemplate={ browseTemplate }
            canDeleteGarden={ !isDeleting }
            deleteGarden={ deleteGarden }
            warning={ warning }
        />
    )
}