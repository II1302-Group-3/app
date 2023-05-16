import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeView } from './HomeView';
import { logout } from '../../store/slices/firebaseAuth';
import { selectGarden } from '../../store/slices/garden';
import { Spinner } from '../Spinner';

export const Home = ({ navigation }) => {
    const dispatch = useDispatch();

    const isSyncing = useSelector(state => state.firebaseAuth.user?.syncing ?? true);
    const displayName = useSelector(state => state.firebaseAuth.user?.displayName ?? "");
    const gardens = useSelector(state => {
        return [...state.firebaseAuth.user?.claimedGardens]
            .map(serial => {
                const nickname = state.firebaseAuth.user.claimedGardenNames[serial] ?? "";
                const online = state.firebaseAuth.user.claimedGardensOnline[serial] ?? false;
                const waterLevelLow = state.firebaseAuth.user.claimedGardensWaterLevelLow[serial] ?? false;
                return {serial, nickname, online, waterLevelLow};
            })
            .sort((a, b) => a.nickname.localeCompare(b.nickname));
    });

    const signOut = () => dispatch(logout());

    const addNewGarden = () => navigation.navigate("AddGarden");
    const openGarden = garden => {
        dispatch(selectGarden({serial: garden.serial, nickname: garden.nickname}));
        navigation.navigate("Garden");
    }

    const addNewTemplate = () => navigation.navigate("AddTemplate")
    const myTemplates = () => navigation.navigate("UserTemplate")

    if(isSyncing) {
        return <Spinner></Spinner>;
    }

    return (
        <HomeView
            myTemplates={myTemplates}
            signOut={signOut}
            gardens={gardens}
            addNewGarden={addNewGarden}
            openGarden={openGarden}
            addNewTemplate={addNewTemplate}
            displayName={displayName}
            navigation={navigation}
        />
    );
}