import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    light: 0,
    moisture: 0
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
        }
    }
})

export const { setLight, setMoisture } = garden.actions;