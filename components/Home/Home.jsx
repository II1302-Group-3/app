import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../../store/slices/firebaseAuth';
import { HomeView } from './HomeView';
import { logout } from '../../store/slices/firebaseAuth';
import { displayNameRef } from '../../store/persistence/firebase';

export const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    
    const displayName = useSelector(state => state.firebaseAuth.displayName)
    const signOut = () => dispatch(logout());

    return(
        displayNameRef,
        <HomeView signOut={signOut} displayName={ displayName } navigation={ navigation } />
    )
}