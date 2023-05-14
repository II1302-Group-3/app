import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

const initialUserState = {
    uid: "",
    token: "",

    email: "",
    displayName: "",

    claimedGardens: [],
    claimedGardenNames: {},

    claimedGardensOnline: {},
    claimedGardensWaterLevelLow: {},
    claimedGardensPlantDetected: {},

    syncing: true
};

const initialState = {
    signinError: null,
    signupError: null,

    user: null,

    firebaseReady: false,
};

// We need to unsubscribe from the auth observer because otherwise it will set the user to "syncing" when creating a new account
let authObserverUnsubscribe;

export const listenToAuthChanges = () => (dispatch, _) => {
    authObserverUnsubscribe = auth().onAuthStateChanged(async user => {
        if(user) {
            const idTokenResult = await user.getIdTokenResult(false);

            const params = {
                uid: user.uid,
                token: idTokenResult.token,

                email: user.email,
                displayName: user.email,

                claimedGardens: Object.keys(idTokenResult.claims.claimedGardens ?? {})
            };

            dispatch(firebaseAuth.actions.setUser({...initialUserState, ...params}));
            authObserverUnsubscribe();
        }
    });
};

export const createAccount = createAsyncThunk('firebaseAuth/createAccount', async ({
    displayName,
    userEmail,
    userPassword,
    confirmPassword
}) => {
    if(userPassword !== confirmPassword) { 
        throw new Error("Passwords do not match.");
    }

    if(authObserverUnsubscribe) {
        authObserverUnsubscribe();
        authObserverUnsubscribe = null;
    }

    const credentials = await auth().createUserWithEmailAndPassword(userEmail, userPassword);
    const idTokenResult = await credentials.user.getIdTokenResult(false);

    return {
        uid: credentials.user.uid,
        token: idTokenResult.token,

        email: credentials.user.email,
        displayName
    };
})

export const signIn = createAsyncThunk('firebaseAuth/signIn', async ({ userEmail, userPassword } ) => {
    if(authObserverUnsubscribe) {
        authObserverUnsubscribe();
        authObserverUnsubscribe = null;
    }

    const credentials = await auth().signInWithEmailAndPassword(userEmail, userPassword);
    const idTokenResult = await credentials.user.getIdTokenResult(false);

    return {
        uid: credentials.user.uid,
        token: idTokenResult.token,

        email: credentials.user.email,
        claimedGardens: Object.keys(idTokenResult.claims.claimedGardens ?? {})
    };
})

export const firebaseAuth = createSlice({
    name: 'firebaseAuth',
    initialState,
    reducers: {
        setUser: (state, { payload }) => { state.user = payload },
        setDisplayName: (state, { payload }) => { state.user.displayName = payload },
        setUserSyncing: (state, { payload }) => { state.user.syncing = payload },
        setUserToken: (state, { payload }) => { state.user.token = payload },
        addGarden: (state, { payload }) => {
            state.user.claimedGardens = [...state.user.claimedGardens, payload.serial];
            state.user.claimedGardenNames[payload.serial] = payload.nickname;
            state.user.claimedGardensOnline[payload.serial] = payload.online;
            state.user.claimedGardensWaterLevelLow[payload.serial] = payload.waterLevelLow;
            state.user.claimedGardensPlantDetected[payload.serial] = payload.plantDetected;
        },
        removeGarden: (state, { payload }) => {
            state.user.claimedGardens = [...state.user.claimedGardens].filter(s => s !== payload);
            delete state.user.claimedGardenNames[payload];
            delete state.user.claimedGardensOnline[payload];
            delete state.user.claimedGardensWaterLevelLow[payload];
            delete state.user.claimedGardensPlantDetected[payload];
        },
        addGardenNameMapping: (state, { payload }) => { state.user.claimedGardenNames[payload.serial] = payload.nickname },
        addGardenOnlineStatus: (state, { payload }) => { state.user.claimedGardensOnline[payload.serial] = payload.online },
        addGardenWaterLevelLow: (state, { payload }) => { state.user.claimedGardensWaterLevelLow[payload.serial] = payload.waterLevelLow },
        addGardenPlantDetected: (state, { payload }) => { state.user.claimedGardensPlantDetected[payload.serial] = payload.plantDetected },
        reset: () => initialState,
        resetError: state => {
            state.signupError = null;
            state.signinError = null;
        }
    },
    extraReducers: builder => {
        const addError = error => error?.code ? error.code : error.message;

        builder.addCase(createAccount.fulfilled, (state, { payload }) => { 
            state.user = {...initialUserState, ...payload, syncing: false}
        });
        builder.addCase(createAccount.rejected, (state, { error }) => { 
            state.signupError = addError(error)
        });
        builder.addCase(signIn.fulfilled, (state, { payload }) => { 
            state.user = {...initialUserState, ...payload}
        });
        builder.addCase(signIn.rejected, (state, { error }) => { 
            state.signinError = addError(error)
        });
    }
})

export const { 
    setDisplayName, 
    setUserSyncing, 
    addGarden, 
    removeGarden, 
    addGardenNameMapping, 
    addGardenOnlineStatus, 
    addGardenWaterLevelLow, 
    addGardenPlantDetected, 
    resetError 
} = firebaseAuth.actions;

export const logout = () => (dispatch, _) => {
    dispatch(firebaseAuth.actions.reset());
    auth().signOut();
}

// This is used by addGarden and removeGarden to refresh the ID token, which contains the user's collection of gardens
export const reloadToken = () => (dispatch, state) => {
    auth().currentUser.getIdToken(false)
        .then(token => dispatch(firebaseAuth.actions.setUserToken(token)))
        .catch(error => Alert.alert("Failed to refresh ID token", error.message));
}

export const selectIsLoggedIn = createSelector(state => state.firebaseAuth.user?.uid, uid => !!uid);