import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeView } from './HomeView';
import { logout } from '../../store/slices/firebaseAuth';
import { displayNameRef } from '../../store/persistence/firebase';
import { selectGarden } from '../../store/slices/garden';

export const Home = ({ navigation }) => {
    const dispatch = useDispatch();

    const displayName = useSelector(state => state.firebaseAuth.user.displayName);
    const gardens = useSelector(state => {
        return [...state.firebaseAuth.user?.claimedGardens].map(serial => {
            const nickname = state.firebaseAuth.user.claimedGardenNames[serial] ?? serial;
            return {serial, nickname};
        })
    });

    const signOut = () => dispatch(logout());

    const addNewGarden = () => navigation.navigate("AddGarden");
    const openGarden = garden => {
        dispatch(selectGarden({serial: garden.serial, nickname: garden.nickname}));
        navigation.navigate("EnvironmentSettings");
    }

    return(
        displayNameRef,
        <HomeView signOut={signOut} gardens={gardens} addNewGarden={addNewGarden} openGarden={openGarden} displayName={displayName} navigation={navigation} />
    )
}