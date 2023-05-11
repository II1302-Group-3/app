import database from '@react-native-firebase/database';
import { Alert } from "react-native";

import {
    setGardenSyncing,
    setNickname,
    setMoisture,
    setLight,
    setWaterLevelLow
} from "../slices/garden";

import {
    setDisplayName,
    setUserSyncing,
    addGardenNameMapping
} from '../slices/firebaseAuth';

import {
    setTemplateName
} from "../slices/templateName";


async function readTemplates(state, dispatch) {
    // const refs = getUserRefs(state.firebaseAuth.user.uid);
    // console.log("read template")
    // const templateData = (await database().ref(refs.templateRef).once('value')).val()
    // const plantNames = Object.values(templateData).map(item => item);

    // if (templateData) {
    //     console.log(plantNames)
    //     console.log("whaat")
    //     console.log(templateData)
    //     dispatch(setTemplateName(templateData))
    // }
    
/*
    const {userTemplateRef} = getUserRefs(state.firebaseAuth.user.uid);

    database().ref(userTemplateRef).on('value', (snapshot) => {
        console.log("1" + userTemplateRef)
        snapshot.forEach((childSnapshot) => {
            const templateKey2 = childSnapshot.key;
            const templateData2 = childSnapshot.val();
            console.log(templateKey2, templateData2);
        });
    }) */
}

export function enablePersistence(store) {
    let prevState = store.getState();
    const dispatch = store.dispatch;

    console.log("Firebase persistence enabled");

    store.subscribe(() => {
        const state = store.getState();
        let promises = [];

        if(state.garden?.syncing) {
            if(!prevState.garden) {
                promises = [...promises, readGardenFromFirebase(state, dispatch)];
            }
        }
        else {
            syncGardenToFirebase(state, prevState);
        }

        if(state.firebaseAuth.user?.syncing) {
            if(!prevState.firebaseAuth.user) {
                promises = [...promises, readUserFromFirebase(state, dispatch)];
                promises = [...promises, readTemplates(state, dispatch)];

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

    return { nicknameRef, moistureRef, lightRef, waterLevelRef };
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
    const waterLevelLow = (await database().ref(refs.waterLevelRef).once("value")).val();

    if(moisture) {
        console.log(`Dispatched moisture for garden ${state.garden.serial}: ${moisture}`);
        dispatch(setMoisture(moisture));
    }
    if(light) {
        console.log(`Dispatched light for garden ${state.garden.serial}: ${light}`);
        dispatch(setLight(light));
    }

    if(waterLevelLow) {
        console.log(`Dispatched notification (water level low) for garden ${state.garden.serial}`);
        dispatch(setWaterLevelLow());

        // Now that the notification has been seen, it should be reset in the database
        await database().ref(refs.waterLevelRef).remove();
    }

    dispatch(setGardenSyncing(false));
}

async function readUserFromFirebase(state, dispatch) {
    const refs = getUserRefs(state.firebaseAuth.user.uid);
    const displayName = (await database().ref(refs.displayNameRef).once("value")).val();

    if(displayName) {
        console.log(`Dispatched display name for user ${state.firebaseAuth.user.uid}: ${displayName}`);
        dispatch(setDisplayName(displayName));
    }

    for(const serial of state.firebaseAuth.user.claimedGardens) {
        const refs = getGardenRefs(serial);
        const nickname = (await database().ref(refs.nicknameRef).once("value")).val();

        if(nickname) {
            console.log(`Dispatched name mapping for user${state.firebaseAuth.user.uid} garden ${serial}: ${nickname}`);
            dispatch(addGardenNameMapping({serial, nickname}));
        }
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