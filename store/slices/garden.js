import { createSlice } from "@reduxjs/toolkit";
import "./firebaseAuth";

const initialActiveState = {
    syncing: true,
    serial: "",

    nickname: "",

    light: 50,
    moisture: 50
};

export const garden = createSlice({
    name: 'garden',
    initialState: null,
    reducers: {
        selectGarden: (state, { payload }) => { state = {...initialActiveState, payload} },
        resetGarden: () => null,
        setGardenSyncing: (state, { payload }) => { state.syncing = payload },

        setNickname: (state, { payload }) => { state.nickname = payload },
        setMoisture: (state, { payload }) => { state.moisture = payload },
        setLight: (state, { payload }) => { state.light = payload }
    }
});

export const { selectGarden, resetGarden, setGardenSyncing, setNickname, setMoisture, setLight } = garden.actions;

export async function addGarden(user, gardenSerial, gardenNickname, dispatch) {
    const params = new URLSearchParams({
        token: user.token,
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

export async function removeGarden(user, gardenSerial, dispatch) {
    const params = new URLSearchParams({
        token: user.token,
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