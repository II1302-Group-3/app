import { createSlice } from "@reduxjs/toolkit";

const initialActiveState = {
    needsSync: true,
    serial: "",
    nickname: "",
    light: 50,
    moisture: 50
}

export const garden = createSlice({
    name: 'garden',
    initialState: null,
    reducers: {
        selectGarden: (state, { payload }) => {
            state = {...initialActiveState, serial: payload};
        },
        resetGarden: () => null,
        setNickname: (state, { name }) => {
            if(state) {
                state.nickname = name;
            }
        },
        setMoisture: (state, { moisture }) => {
            if(state) {
                state.moisture = moisture;
            }
        },
        setLight: (state, { light }) => {
            if(state) {
                state.light = light;
            }
        }
    }
})

export const { selectGarden, resetGarden, setNickname, setMoisture, setLight } = garden.actions;

async function addGarden(userIdToken, gardenSerial, gardenNickname) {
    const params = new URLSearchParams({
        token: userIdToken,
        serial: gardenSerial,
        nickname: gardenNickname
    });

    const result = await fetch("https://europe-west1-greengarden-iot.cloudfunctions.net/addGarden?" + params, { method: "POST" });

    if(result == "success") {
        // TODO: Refresh token to get new user claims
    }
    else {
        const errorCodeToMessage = {
            "missing_parameter": "Missing parameter in request",
            "invalid_token": "Firebase ID token is invalid",
            "invalid_serial": "Invalid serial number specified",
            "garden_offline": "This garden is not connected to Wi-Fi",
            "garden_already_claimed": "This garden is already claimed by another user",
            "too_many_gardens": "You have claimed too many gardens already"
        };

        throw new Error(errorCodeToMessage[result]);
    }
}

async function removeGarden(userIdToken, gardenSerial, gardenNickname) {
    const params = new URLSearchParams({
        token: userIdToken,
        serial: gardenSerial,
        nickname: gardenNickname
    });

    const result = await fetch("https://europe-west1-greengarden-iot.cloudfunctions.net/removeGarden?" + params, { method: "POST" });

    if(result == "success") {
        // TODO: Refresh token to get new user claims
    }
    else {
        const errorCodeToMessage = {
            "missing_parameter": "Missing parameter in request",
            "invalid_token": "Firebase ID token is invalid",
            "invalid_serial": "Invalid serial number specified",
            "garden_not_claimed": "This garden has never been claimed or is claimed by another user",
        };

        throw new Error(errorCodeToMessage[result]);
    }
}