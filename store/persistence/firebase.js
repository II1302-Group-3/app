import database from '@react-native-firebase/database';
import {
    setLight,
    setMoisture,
    setLedTestOn
} from "../slices/garden";

export const enablePersistence = (store) => {
    console.log("entered firebase")
    let prevState = store.getState();
    const dispatch = store.dispatch;
    //fromFirebaseSub();

    store.subscribe(() => {
        const state = store.getState();
        toFirebase(state);
        prevState = store.getState();
    })

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

    function fromFirebaseSub() {
        const {
            lightRef,
            moistureRef,
            ledTestRef
        } = getRefs();

        database()
            .ref(lightRef)
            .on('value', snapshot => {
                dispatch(setLight(snapshot.val()))
            });

        database()
            .ref(moistureRef)
            .on('value', snapshot => {
                dispatch(setMoisture(snapshot.val()))
            })

        database()
            .ref(ledTestRef)
            .on('value', snapshot => {
                dispatch(setLedTestOn(snapshot.val()))
            })
    }
}