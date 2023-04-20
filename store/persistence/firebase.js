import database from '@react-native-firebase/database';
import {
    setLight,
    setMoisture
} from "../slices/garden";

export const enablePersistence = (store) => {
    console.log("entered firebase")
    let prevState = store.getState();
    const dispatch = store.dispatch;
    //fromFirebaseSub();

    store.subscribe(() => {
        const state = store.getState();
        toFirebase(state);
    })

    prevState = store.getState();

    function getRefs() {
        const garden = 'garden/placeholder/';
        const lightRef = garden + 'target_light_level';
        const moistureRef = garden + 'target_moisture';

        return {
            lightRef,
            moistureRef
        }
    }

    function toFirebase(state) {
        const {
            lightRef,
            moistureRef
        } = getRefs();

        const light = state.garden.light;
        const prevLight = prevState.garden.light;

        const moisture = state.garden.moisture;
        const prevMoisture = prevState.garden 

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
    }

    function fromFirebaseSub() {
        const {
            lightRef,
            moistureRef
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
    }
}