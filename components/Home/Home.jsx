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
        return [...state.firebaseAuth.user.claimedGardens].map(serial => {
            const name = state.firebaseAuth.user.claimedGardenNames[serial];
            return name ?? serial;
        })
    });

    const signOut = () => dispatch(logout());
    const openGarden = serial => {
        selectGarden(serial);
        navigation.navigate("EnvironmentSettings");
    }
    const addNewGarden = () => navigation.navigate("AddGarden");

    return(
        displayNameRef,
        <HomeView signOut={signOut} gardens={gardens} addNewGarden={addNewGarden} openGarden={openGarden} displayName={displayName} navigation={navigation} />
    )
}