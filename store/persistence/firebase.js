import database from '@react-native-firebase/database';
import { Alert } from "react-native";

import {
    setGardenSyncing,
    setMoisture,
    setLight,
} from "../slices/garden";

import {
    setDisplayName,
    setUserSyncing,
    addGardenNameMapping,
    addGardenOnlineStatus,
    addGardenWaterLevelLow,
    addGardenPlantDetected,
    setUserRefreshTimeoutId
} from '../slices/firebaseAuth';

import {
    setTemplateName,
    setUserTemplate
} from "../slices/templateName";
import { log } from 'react-native-reanimated';


async function readTemplates(state, dispatch) {
    const  refs = getUserRefs(state.firebaseAuth.user.uid);
    console.log("Reading templates...");
    const templateData = (await database().ref(refs.templateRef).once('value')).val() ?? {};
    const plantNames = Object.values(templateData).map(item => item);
    if (templateData) {
        dispatch(setTemplateName(plantNames))
    }

    const userTemplates = (await database().ref(refs.userTemplateRef).once('value')).val() ?? {};
    const userTemplate = Object.values(userTemplates).map(item => item.templateKey);

    if (userTemplate) {
        dispatch(setUserTemplate({userTemplate, templateData} ))
    }
}

export function enablePersistence(store) {
    let prevState = store.getState();
    const dispatch = store.dispatch;

    console.log("Firebase persistence enabled");

    store.subscribe(() => {
        const state = store.getState();
        let promises = [];

        // User selected new garden
        if(state.garden?.syncing) {
            if(!prevState.garden) {
                promises = [...promises, readGardenFromFirebase(state, dispatch)];
            }
        }
        else {
            syncGardenToFirebase(state, prevState);
        }

        // User just logged in
        if(state.firebaseAuth.user && !prevState.firebaseAuth.user) {
            promises = [...promises, readTemplates(state, dispatch)];
        }

        const loggedIn = state.firebaseAuth.user?.syncing && !prevState.firebaseAuth.user?.syncing;
        const refreshExpired =
            (state.firebaseAuth.user?.uid && prevState.firebaseAuth.user?.uid) &&
            (state.firebaseAuth.user.refreshTimeoutId === -1 && prevState.firebaseAuth.user.refreshTimeoutId !== -1);
        const shouldRefresh = loggedIn || refreshExpired;

        // User needs to download data from Firebase
        if(shouldRefresh) {
            console.log(`Refreshing user due to ${refreshExpired ? "refresh timeout" : "new login"}`);

            // Start a timer to refresh user in 10 seconds
            const promise = readUserFromFirebase(state, dispatch).then(() => {
                const timeout = setTimeout(() => dispatch(setUserRefreshTimeoutId(-1)), 10000);
                dispatch(setUserRefreshTimeoutId(timeout));
            });

            promises = [...promises, promise];
        }

        if(state.firebaseAuth.user && !state.firebaseAuth.user?.syncing) {
            syncUserToFirebase(state, prevState);
        }

        prevState = store.getState();

        if(promises.length > 0) {
            const errorFn = e => Alert.alert("Failed to read from Firebase", "Error: " + e);
            const finallyFn = () => prevState = store.getState();

            Promise.all(promises).catch(errorFn).finally(finallyFn);
        }
    })
}

function getGardenRefs(serial) {
    const garden = `garden/${serial}/`;

    const nicknameRef = garden + 'nickname';
    const moistureRef = garden + 'target_moisture';
    const lightRef = garden + 'target_light_level';
    const waterLevelRef = garden + 'water_level_low';
    const plantDetectedRef = garden + 'plant_detected';
    const syncTimeRef = garden + 'last_sync_time';

    return { nicknameRef, moistureRef, lightRef, waterLevelRef, plantDetectedRef, syncTimeRef };
}

function getUserRefs(uid) {
    const user = `users/${uid}/`;
    const templateRef = 'templates';
    const userTemplateRef = user + 'templates';
    const displayNameRef = user + 'displayName';

    return { templateRef, userTemplateRef, displayNameRef };
}

async function readGardenFromFirebase(state, dispatch) {
    const refs = getGardenRefs(state.garden.serial);

    const moisture = (await database().ref(refs.moistureRef).once("value")).val();
    const light = (await database().ref(refs.lightRef).once("value")).val();

    if(moisture) {
        dispatch(setMoisture(moisture));
    }
    if(light) {
        dispatch(setLight(light));
    }

    dispatch(setGardenSyncing(false));
}

async function readUserFromFirebase(state, dispatch) {
    try {
        console.log("Reading user from Firebase...");

        const refs = getUserRefs(state.firebaseAuth.user.uid);
        const displayName = (await database().ref(refs.displayNameRef).once("value")).val();

        if(displayName) {
            dispatch(setDisplayName(displayName));
        }

        for(const serial of state.firebaseAuth.user.claimedGardens) {
            const refs = getGardenRefs(serial);
            const nickname = (await database().ref(refs.nicknameRef).once("value")).val() ?? "";

            console.log(`New garden ${serial} for user ${state.firebaseAuth.user.uid}: ${nickname}`);
            dispatch(addGardenNameMapping({serial, nickname}));

            const lastSyncTime = (await database().ref(refs.syncTimeRef).once("value")).val() ?? 0;
            const online = (Date.now() / 1000) - lastSyncTime < 25;

            dispatch(addGardenOnlineStatus({serial, online}));

            const waterLevelLow = (await database().ref(refs.waterLevelRef).once("value")).val() ?? false;
            dispatch(addGardenWaterLevelLow({serial, waterLevelLow}));

            const plantDetected = (await database().ref(refs.plantDetectedRef).once("value")).val() ?? false;
            dispatch(addGardenPlantDetected({serial, plantDetected}));
        }

        dispatch(setUserSyncing(false));
    }
    catch(error) {
        console.log("Couldn't read user - probably signed out");
        console.log(`Error is ${error}`);
    }
}

async function syncGardenToFirebase(state, prevState) {
    if(state.garden) {
        const refs = getGardenRefs(state.garden.serial);

        const moisture = state.garden.moisture;
        const prevMoisture = prevState.garden?.moisture;

        const light = state.garden.light;
        const prevLight = prevState.garden?.light;

        if(moisture !== prevMoisture) {
            console.log(`Synced moisture to garden ${state.garden.serial}: ${moisture} (prev ${prevMoisture})`);
            await database().ref(refs.moistureRef).set(moisture);
        }

        if(light !== prevLight) {
            console.log(`Synced light to garden ${state.garden.serial}: ${light} (prev ${prevLight})`);
            await database().ref(refs.lightRef).set(light);
        }
    }
}

async function syncUserToFirebase(state, prevState) {
    if(state.firebaseAuth.user) {
        const refs = getUserRefs(state.firebaseAuth.user.uid);

        const displayName = state.firebaseAuth.user.displayName;
        const prevDisplayName = prevState.firebaseAuth.user?.displayName;

        if(displayName !== prevDisplayName) {
            console.log(`Synced display name to user ${state.firebaseAuth.user.uid}: ${displayName} (prev ${prevDisplayName})`);
            await database().ref(refs.displayNameRef).set(displayName);
        }
    }
}