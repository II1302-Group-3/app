import { createSlice } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import { addGardenMapping, pushGarden, updateToken } from "./firebaseAuth";

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

export async function addGarden(userIdToken, gardenSerial, gardenNickname, dispatch) {
    const params = new URLSearchParams({
        token: userIdToken,
        serial: gardenSerial,
        nickname: gardenNickname
    });

    const result = await (await fetch("https://europe-west1-greengarden-iot.cloudfunctions.net/addGarden?" + params)).text();

    if(result === "success") {
        const newToken = await auth().currentUser.getIdToken(true);
        dispatch(updateToken(newToken));
        dispatch(pushGarden(gardenSerial));
        dispatch(addGardenMapping({serial: gardenSerial, nickname: gardenNickname}));
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

        throw new Error(errorCodeToMessage[result] ?? `Unknown error: ${result}`);
    }
}

export async function removeGarden(userIdToken, gardenSerial, dispatch) {
    const params = new URLSearchParams({
        token: userIdToken,
        serial: gardenSerial
    });

    const result = await (await fetch("https://europe-west1-greengarden-iot.cloudfunctions.net/removeGarden?" + params)).text();

    if(result === "success") {
        const newToken = await auth().currentUser.getIdToken(true);
        dispatch(updateToken(newToken));
        dispatch(popGarden(gardenSerial));
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