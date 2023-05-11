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
    addGardenWaterLevelLow
} from '../slices/firebaseAuth';

import {
    setTemplateName,
    setUserTemplate
} from "../slices/templateName";


async function readTemplates(state, dispatch) {
    const  refs = getUserRefs(state.firebaseAuth.user.uid);
    console.log("read template")
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

        // User just logged in and needs to download data from Firebase
        if(state.firebaseAuth.user?.syncing) {
            if(!prevState.firebaseAuth.user) {
                promises = [...promises, readUserFromFirebase(state, dispatch)];

                //readTemplates(state, dispatch);
            }
        }
        else {
            syncUserToFirebase(state, prevState);
        }

        if(promises.length > 0) {
            const errorFn = e => Alert.alert("Failed to read from Firebase", "Error: " + e);
            const finallyFn = () => prevState = store.getState();

            Promise.all(promises).catch(errorFn).finally(finallyFn);
        }

        prevState = store.getState();
    })
}

function getGardenRefs(serial) {
    const garden = `garden/${serial}/`;
    console.log(garden)

    const nicknameRef = garden + 'nickname';
    const moistureRef = garden + 'target_moisture';
    const lightRef = garden + 'target_light_level';
    const waterLevelRef = garden + 'water_level_low';
    const syncTimeRef = garden + 'last_sync_time';

    return { nicknameRef, moistureRef, lightRef, waterLevelRef, syncTimeRef };
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
        console.log(`Dispatched moisture for garden ${state.garden.serial}: ${moisture}`);
        dispatch(setMoisture(moisture));
    }
    if(light) {
        console.log(`Dispatched light for garden ${state.garden.serial}: ${light}`);
        dispatch(setLight(light));
    }

    dispatch(setGardenSyncing(false));
}

async function readUserFromFirebase(state, dispatch) {
    console.log("Reading user from Firebase...");

    const refs = getUserRefs(state.firebaseAuth.user.uid);
    const displayName = (await database().ref(refs.displayNameRef).once("value")).val();

    if(displayName) {
        console.log(`Dispatched display name for user ${state.firebaseAuth.user.uid}: ${displayName}`);
        dispatch(setDisplayName(displayName));
    }

    for(const serial of state.firebaseAuth.user.claimedGardens) {
        const refs = getGardenRefs(serial);
        const nickname = (await database().ref(refs.nicknameRef).once("value")).val() ?? "";

        console.log(`Dispatched name mapping for user ${state.firebaseAuth.user.uid} garden ${serial}: ${nickname}`);
        dispatch(addGardenNameMapping({serial, nickname}));

        const lastSyncTime = (await database().ref(refs.syncTimeRef).once("value")).val() ?? 0;
        const online = (Date.now() / 1000) - lastSyncTime < 5 * 60;

        console.log(`Dispatched online status for user ${state.firebaseAuth.user.uid} garden ${serial}: ${online}`);
        dispatch(addGardenOnlineStatus({serial, online}));

        const waterLevelLow = (await database().ref(refs.waterLevelRef).once("value")).val() ?? false;
        console.log(`Dispatched water tank status for user ${state.firebaseAuth.user.uid} garden ${serial}: low = ${waterLevelLow}`);
        dispatch(addGardenWaterLevelLow({serial, waterLevelLow}));
    }

    dispatch(setUserSyncing(false));
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