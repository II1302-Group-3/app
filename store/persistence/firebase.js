import database from '@react-native-firebase/database';
import {
    setLight,
    setMoisture,
    setLedTestOn
} from "../slices/garden";
import { Alert } from 'react-native';

export const enablePersistence = (store) => {
    console.log("Entered firebase");

    let prevState = store.getState();
    const dispatch = store.dispatch;

    readFromFirebase()
        .then(() => {
            console.log("Subscribing to send values to Firebase");

            // Only subscribe once we have read values from Firebase
            store.subscribe(() => {
                const state = store.getState();
                toFirebase(state);
                prevState = store.getState();
            })
        })
        .catch(error => Alert.alert("Failed to read from Firebase", "Error: " + error))

    function getRefs() {
        const garden = 'garden/placeholder/';
        const lightRef = garden + 'target_light_level';
        const moistureRef = garden + 'target_moisture';
        const ledTestRef = garden + 'test_led_on';

        return {
            lightRef,
            moistureRef,
            ledTestRef
        }
    }

    function toFirebase(state) {
        const {
            lightRef,
            moistureRef,
            ledTestRef
        } = getRefs();

        const light = state.garden.light;
        const prevLight = prevState.garden.light;

        const moisture = state.garden.moisture;
        const prevMoisture = prevState.garden.moisture;

        const ledTestOn = state.garden.ledTestOn;
        const prevLedTestOn = prevState.garden.ledTestOn;
 
        if(light !== prevLight) {
            database()
                .ref(lightRef)
                .set(light)
        }

        if(moisture !== prevMoisture) {
            database()
                .ref(moistureRef)
                .set(moisture)
        }

        if(ledTestOn !== prevLedTestOn) {
            database()
                .ref(ledTestRef)
                .set(ledTestOn ? 1 : 0)
        }
    }

    function readFromFirebase() {
        const {
            lightRef,
            moistureRef,
            ledTestRef
        } = getRefs();

        promises = [
            database()
                .ref(lightRef)
                .once("value")
                .then(snapshot => dispatch(setLight(snapshot.val()))),
            database()
                .ref(moistureRef)
                .once("value")
                .then(snapshot => dispatch(setMoisture(snapshot.val()))),
            database()
                .ref(ledTestRef)
                .once("value")
                .then(snapshot => dispatch(setLedTestOn(snapshot.val() == 1)))
        ];

        // We have to update prevState here or the app doesn't understand if values are different from the initial ones
        return Promise.all(promises).then(() => prevState = store.getState());
    }
}