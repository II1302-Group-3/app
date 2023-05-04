import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import database from '@react-native-firebase/database';
import { MONTHS } from "../../constants";

const initialState = {
    serialNumber: null,
    light: 50,
    moisture: 50,
    ledTestOn: false,

    statistics: {
        light: [],
        water: [],
        xAxis: [],
        month: "",
        error: null
    },
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
            state.statistics.error = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(getStatistics.fulfilled, (state, { payload }) => {
            state.statistics[payload.nutritientName].data = payload.data;
        })
        builder.addCase(getStatistics.rejected, (state, { error }) => {
            state.statistics.error = error.message;
        })
    }
})

export const { setLight, setMoisture, setLedTestOn, resetError } = garden.actions;

const getStatisticsRef = (state, nutritientName) => {
    const date = new Date();

    return 'garden/' + 
        state.serialNumber + 
        `/statistics/${nutritientName}/` + 
        MONTHS[date.getMonth()] + 
        '/' +
        date.getDay() +
        '/data';
}

export const getStatistics = createAsyncThunk('garden/getStatistics', async(nutritientName, { getState }) => {
    const state = getState();
    const ref = getStatisticsRef(state, nutritientName)

    let data;

    try {
        await database()
            .ref(ref)
            .once("value")
            .then(snapshot => data = snapshot.val());
    } catch(error) {
        throw error;
    }
    
    return { data, nutritientName };
});