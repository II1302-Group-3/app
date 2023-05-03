import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scannedSerial: null
}

export const qrScanner = createSlice({
    name: 'qrScanner',
    initialState,
    reducers: {
        setScannedSerial: (state, { payload }) => {
            state.scannedSerial = payload;
        },
		resetScannedSerial: state => {
            state.scannedSerial = null;
        }
    }
})

export const { setScannedSerial, resetScannedSerial } = qrScanner.actions;