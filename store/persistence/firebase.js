import database from '@react-native-firebase/database';
import { Alert } from "react-native";

import {
    setNickname,
    setLight,
    setMoisture
} from "../slices/garden";

import {
    addGardenMapping,
    setDisplayName,
    setfirebaseReady,
    setUserNeedsSync
} from '../slices/firebaseAuth';

export function enablePersistence(store) {
    console.log("Entered firebase");

    let prevState = store.getState();
    const dispatch = store.dispatch;

    console.log("Subscribing to read and send values to Firebase");

    store.subscribe(() => {
        const state = store.getState();

        let promises = [];

        if(state.garden?.needsSync) {
            if(!prevState.garden) {
                promises = [...promises, readGardenFromFirebase(state, dispatch)];
            }
        }
        else {
            syncGardenToFirebase(state, prevState);
        }

        if(state.firebaseAuth.user?.needsSync) {
            if(!prevState.firebaseAuth.user) {
                promises = [...promises, readUserFromFirebase(state, dispatch)];
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

        if (state.firebaseAuth.firebaseReady && state.firebaseAuth.user) {

            const {templateRef} = getUserRefs(state);
            database()
            .ref(templateRef).on('value', (snapshot) => { snapshot
            .forEach((childSnapshot) => {
                const templateKey = childSnapshot.key;
                const templateData = childSnapshot.val();
                console.log(templateKey, templateData);
            });})

            const {userTemplateRef} = getUserRefs(state);
                    database().
                    ref(userTemplateRef).on('value', (snapshot) => {
                    console.log("1" + userTemplateRef)
                    snapshot.forEach((childSnapshot) => {
                    const templateKey2 = childSnapshot.key;
                    const templateData2 = childSnapshot.val();
                    console.log(templateKey2, templateData2);
                });})

            dispatch(setfirebaseReady(false))
        }

        prevState = store.getState();
    })
}

function getGardenRefs(serial) {
    const garden = `garden/${serial}/`;

    const nicknameRef = garden + 'nickname';
    const moistureRef = garden + 'target_moisture';
    const lightRef = garden + 'target_light_level';

    return { nicknameRef, moistureRef, lightRef };
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

    const nickname = (await database().ref(refs.nicknameRef).once("value")).val();
    const moisture = (await database().ref(refs.moistureRef).once("value")).val();
    const light = (await database().ref(refs.lightRef).once("value")).val();

    if(nickname) {
        console.log(`Dispatched nickname for garden ${state.garden.serial}: ${nickname}`);
        dispatch(setNickname(nickname));
    }
    if(moisture) {
        console.log(`Dispatched moisture for garden ${state.garden.serial}: ${moisture}`);
        dispatch(setMoisture(moisture));
    }
    if(light) {
        console.log(`Dispatched light for garden ${state.garden.serial}: ${light}`);
        dispatch(setLight(light));
    }

    dispatch(setGardenNeedsSync(false));
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
            dispatch(addGardenMapping({serial, nickname}));
        }
    }

    dispatch(setUserNeedsSync(false));
}

async function syncGardenToFirebase(state, prevState) {
    if(state.garden) {
        const refs = getGardenRefs(state.garden.serial);

        const moisture = state.garden.moisture;
        const prevMoisture = prevState.garden?.moisture;

        const light = state.garden.light;
        const prevLight = prevState.garden?.light;

        if(moisture !== prevMoisture) {
            console.log(`Synced moisture to garden ${state.garden.serial}: ${moisture}`);
            await database().ref(refs.moistureRef).set(moisture);
        }

        if(light !== prevLight) {
            console.log(`Synced light to garden ${state.garden.serial}: ${light}`);
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
            console.log(`Synced display name to user ${state.firebaseAuth.user.uid}: ${displayName}`);
            await database().ref(refs.displayNameRef).set(displayName);
        }

        /**
         * For saving new templates in firebase. For each new template, we will genarate a new key using push() function.
         * This function will save that key under the user so we know who creaated the tempate.
         */
        if (/*templateName !==templateName*/false) {
            const newChildRef = database().ref(templateRef).push();
            const templateKey = newChildRef.key;
            console.log(templateKey);
            newChildRef.set({plantName: 'apple', lightLevel: light, moistureLevel: moisture });
            database().ref(userTemplateRef).push().set({templateKey: templateKey});
        }
    }
}