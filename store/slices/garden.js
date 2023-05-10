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
    MOISTURE: 'moisture_level',
    HUMIDITY: 'humidity_level',
    TEMPERATURE: 'temperature_level'
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
             state.statistics.light.error = error.message :
             state.statistics.moisture.error = error.message;
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