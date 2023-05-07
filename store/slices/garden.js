import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import database from '@react-native-firebase/database';

const initialState = {
    serialNumber: null,
    light: 50,
    moisture: 50,
    ledTestOn: false,
    
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
}

export const NUTRITIENT_PATHS = {
    LIGHT: 'light_level',
    MOISTURE: 'moisture_level'
}

export const garden = createSlice({
    name: 'garden',
    initialState,
    reducers: {
        setLight: (state, { payload }) => {
            state.light = payload;
        },
        setMoisture: (state, { payload }) => {
            state.moisture = payload;
        },
        setLedTestOn: (state, { payload }) => {
            state.ledTestOn = payload;
        },
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
             state.statistics.light.error = addError() :
             state.statistics.moisture.error = addError();

             function addError() {
                return error.message === "Cannot read property 'filter' of null" ?
                    "Data unavailable" : error.message;
             }
        })
    }
})

export const { 
    setLight,
    setMoisture,
    setLedTestOn,
    resetError } = garden.actions;

export const getStatistics = createAsyncThunk('garden/getStatistics', async({
    nutritientPath,
    date
}) => {
    const processedDate = date.toISOString().split('T')[0];
    const ref = `garden/251951091481/${nutritientPath}/${processedDate}`;
    const snapshot = await database().ref(ref).once("value")
    const data = snapshot.val();
    
    let averagePerHour = [];
    data.filter(hour => Array.isArray(hour)).forEach(hour => {
        const sum = hour.reduce((a, b) => a + b, 0)
        averagePerHour.push(Math.round((sum / hour.length) || 0))
    })

    return averagePerHour
})