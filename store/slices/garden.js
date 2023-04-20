import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    light: 50,
    moisture: 50,
    ledTestOn: false
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
        }
    }
})

export const { setLight, setMoisture, setLedTestOn } = garden.actions;