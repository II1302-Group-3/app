import database from '@react-native-firebase/database';
import {
    setLight,
    setMoisture
} from "../slices/garden";

import { setfirebaseReady } from '../slices/firebaseAuth';
import { Alert } from 'react-native';

export const enablePersistence = (store) => {
    console.log("Entered firebase");

    let prevState = store.getState();
    const dispatch = store.dispatch;

    readFromFirebase(prevState)
        .then(() => {
            console.log("Subscribing to send values to Firebase");

            // Only subscribe once we have read values from Firebase
            store.subscribe(() => {
                const state = store.getState();
                toFirebase(state);
                if (state.firebaseAuth.firebaseReady) {

                    const {templateRef} = getRefs(state);
                    database()
                    .ref(templateRef).on('value', (snapshot) => { snapshot
                    .forEach((childSnapshot) => {
                        const templateKey = childSnapshot.key;
                        const templateData = childSnapshot.val();
                        console.log(templateKey, templateData);
                    });})

                    const {userTemplateRef} = getRefs(state);
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
        })
        .catch(error => Alert.alert("Failed to read from Firebase", "Error: " + error))



    function getRefs(state) {
        const garden = 'garden/251951091481/';
        const lightRef = garden + 'target_light_level';
        const moistureRef = garden + 'target_moisture';
        const ledTestRef = garden + 'test_led_on';
        const displayNameRef = user + 'displayName';

        const uid = state.firebaseAuth.userUID
        const user = `users/${uid}/`
        const templateRef = 'templates'
        const userTemplateRef = user + 'templates';
        console.log("3" + userTemplateRef)

        return {
            lightRef,
            moistureRef,
            ledTestRef,
            displayNameRef,
            templateRef,
            userTemplateRef
        }
    }

    function toFirebase(state) {
        const {
            lightRef,
            moistureRef,
            ledTestRef,
            displayNameRef,
            templateRef,
            userTemplateRef
        } = getRefs(state);

        const light = state.garden.light;
        const prevLight = prevState.garden.light;

        const moisture = state.garden.moisture;
        const prevMoisture = prevState.garden.moisture;

        const displayName = state.firebaseAuth.displayName;
        console.log("hej"+ displayName);
        const prevDisplayName = prevState.firebaseAuth.displayName;

        if (light !== prevLight) {
            database()
                .ref(lightRef)
                .set(light)
        }

        if (moisture !== prevMoisture) {
            database()
                .ref(moistureRef)
                .set(moisture)
        }

        if (!!state.firebaseAuth.userUID && displayName !== prevDisplayName) {
            database()
                .ref(displayNameRef)
                .set(displayName)
                console.log("wel"+ displayName);
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



    function readFromFirebase(state) {
        const {
            lightRef,
            moistureRef,
            ledTestRef,
            templateRef,
            userTemplateRef
        } = getRefs(state);

        promises = [
            database()
                .ref(lightRef)
                .once("value")
                .then(snapshot => dispatch(setLight(snapshot.val()))),
            database()
                .ref(moistureRef)
                .once("value")
                .then(snapshot => dispatch(setMoisture(snapshot.val())))
        ];

        // We have to update prevState here or the app doesn't understand if values are different from the initial ones
        return Promise.all(promises).then(() => prevState = store.getState());
    }
}

export const addGarden = async (userIdToken, gardenSerial, gardenNickname) => {
    const params = new URLSearchParams({
        token: userIdToken,
        serial: gardenSerial,
        nickname: gardenNickname
    });

    const result = fetch("https://europe-west1-greengarden-iot.cloudfunctions.net/addGarden?" + params, { method: "POST" });

    if(result == "success") {
        // TODO: Refresh token to get new user claims
    }
    else {
        const errorCodeToMessage = {
            "missing_parameter": "Missing parameter in request",
            "invalid_token": "Firebase ID token is invalid",
            "invalid_serial": "Invalid serial number specified",
            "garden_offline": "This garden is not connected to Wi-Fi",
            "garden_already_claimed": "This garden is already claimed by another user",
            "too_many_gardens": "You have claimed too many gardens already"
        };

        throw new Error(errorCodeToMessage[result]);
    }
}

export const removeGarden = async (userIdToken, gardenSerial, gardenNickname) => {
    const params = new URLSearchParams({
        token: userIdToken,
        serial: gardenSerial,
        nickname: gardenNickname
    });

    const result = fetch("https://europe-west1-greengarden-iot.cloudfunctions.net/removeGarden?" + params, { method: "POST" });

    if(result == "success") {
        // TODO: Refresh token to get new user claims
    }
    else {
        const errorCodeToMessage = {
            "missing_parameter": "Missing parameter in request",
            "invalid_token": "Firebase ID token is invalid",
            "invalid_serial": "Invalid serial number specified",
            "garden_not_claimed": "This garden has never been claimed or is claimed by another user",
        };

        throw new Error(errorCodeToMessage[result]);
    }
}