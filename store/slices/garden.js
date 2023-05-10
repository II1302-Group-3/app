import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as firebaseAuth from "./firebaseAuth";
import database from '@react-native-firebase/database';

const initialActiveState = {
    syncing: true,
    serial: "",

    nickname: "",

    light: 50,
    moisture: 50,

    waterLevelLow: false,
    statistics: {
        light: {
            error: null,
            isLoading: false
        },
        moisture: {
            error: null,
            isLoading: false
        }
    }
};

export const NUTRITIENT_PATHS = {
    LIGHT: 'light_level',
    MOISTURE: 'moisture_level',
    HUMIDITY: 'humidity_level',
    TEMPERATURE: 'temperature_level'
}

export const garden = createSlice({
    name: 'garden',
    initialState: null,
    reducers: {
        selectGarden: (_, { payload }) => { return {...initialActiveState, serial: payload.serial, nickname: payload.nickname} },
        resetGarden: () => null,
        setGardenSyncing: (state, { payload }) => { state.syncing = payload },

        setNickname: (state, { payload }) => { state.nickname = payload },
        setMoisture: (state, { payload }) => { state.moisture = payload },
        setLight: (state, { payload }) => { state.light = payload },

        setWaterLevelLow: state => { state.waterLevelLow = true },
        resetWaterLevelLow: state => { state.waterLevelLow = false },
        resetError: state => {
            state.statistics.light.error = null;
            state.statistics.moisture.error = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(getStatistics.fulfilled, (state, { meta }) => {
            meta.arg.nutritientPath === NUTRITIENT_PATHS.LIGHT ?
             state.statistics.light.isLoading = false :
             state.statistics.moisture.isLoading = false;
        }),
        builder.addCase(getStatistics.pending, (state, { meta }) => {
            meta.arg.nutritientPath === NUTRITIENT_PATHS.LIGHT ?
             state.statistics.light.isLoading = true :
             state.statistics.moisture.isLoading = true;
        }),
        builder.addCase(getStatistics.rejected, (state, { meta, error }) => {
            meta.arg.nutritientPath === NUTRITIENT_PATHS.LIGHT ?
             state.statistics.light.error = error.message :
             state.statistics.moisture.error = error.message;
        })
    }
});

export const { 
    selectGarden, 
    resetGarden,
    resetError, 
    setGardenSyncing, 
    setNickname, 
    setMoisture, 
    setLight,
    setWaterLevelLow, 
    resetWaterLevelLow } = garden.actions;

export async function addGarden(userToken, gardenSerial, gardenNickname, dispatch) {
    const params = new URLSearchParams({
        token: userToken,
        serial: gardenSerial,
        nickname: gardenNickname
    });

    const result = await (await fetch("https://europe-west1-greengarden-iot.cloudfunctions.net/addGarden?" + params)).text();

    try {
        if(result === "success") {
            dispatch(firebaseAuth.addGarden({serial: gardenSerial, nickname: gardenNickname}));
        }
        else {
            const errorCodeToMessage = {
                "missing_parameter": "Missing parameter in request",
                "invalid_token": "Firebase ID token is invalid",
                "invalid_serial": "Invalid serial number specified",
                "garden_nickname_conflict": "You already have another garden with that name",
                "garden_offline": "This garden is not connected to Wi-Fi",
                "garden_already_claimed": "This garden is already claimed by another user",
                "too_many_gardens": "You have claimed too many gardens already"
            };

            throw new Error(errorCodeToMessage[result] ?? `Unknown error: ${result}`);
        }
    }
    finally {
        dispatch(firebaseAuth.refreshToken());
    }
}

export const getStatistics = createAsyncThunk('garden/getStatistics', async({
    nutritientPath,
    date
}, {getState}) => {
    const processedDate = date.toISOString().split('T')[0];
    const state = getState();
    console.log("test");
    console.log(state.garden.serial)
    const ref = `garden/${state.garden.serial}/${nutritientPath}/${processedDate}`;
    const snapshot = await database().ref(ref).once("value")
    const data = snapshot.val();
    if(!data) throw new Error("Data unavailable.")

    const averagePerHour = pairTogetherHourWithAverageSensorDataPerHour(data);

    return averagePerHour

    function pairTogetherHourWithAverageSensorDataPerHour(data) {
        let hours = [];
        for(const hour in data) {
            let vals = data[hour];
            if(vals instanceof Object) {
                let newVals = [];
                for(const minute in vals) {
                    newVals.push(vals[minute]);
                }
                vals = newVals;
            }

            const hourWithMinutes = Object.keys(data).length < 6 ? hour + ":00" : hour;
            const val = vals.filter(val => val !== null).reduce((a, b) => a + b, 0) / vals.length || 0
            hours.push({hour: hourWithMinutes, val})
        }

        return hours;
    }
})

export async function removeGarden(userToken, gardenSerial, dispatch) {
    const params = new URLSearchParams({
        token: userToken,
        serial: gardenSerial
    });

    const result = await (await fetch("https://europe-west1-greengarden-iot.cloudfunctions.net/removeGarden?" + params)).text();

    try {
        if(result === "success") {
            dispatch(firebaseAuth.removeGarden(gardenSerial));
        }
        else {
            const errorCodeToMessage = {
                "missing_parameter": "Missing parameter in request",
                "invalid_token": "Firebase ID token is invalid",
                "invalid_serial": "Invalid serial number specified",
                "garden_not_claimed": "This garden has never been claimed or is claimed by another user",
            };

            throw new Error(errorCodeToMessage[result] ?? `Unknown error: ${result}`);
        }
    }
    finally {
        dispatch(firebaseAuth.refreshToken());
    }
}
