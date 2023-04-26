import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../../store/slices/firebaseAuth';
import { HomeView } from './HomeView';
import { logout } from '../../store/slices/firebaseAuth';
import { displayNameRef } from '../../store/persistence/firebase';

export const Home = () => {
    const dispatch = useDispatch();
    const signOut = () => dispatch(logout());

    return(
        displayNameRef,
        <HomeView signOut={signOut} />
    )
}