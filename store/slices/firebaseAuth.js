import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";

const initialState = {
    signinError: null,
    signupError: null,

    user: null,

    firebaseReady: false,
}

export const createAccount = createAsyncThunk('firebaseAuth/createAccount', async({
    displayName,
    userEmail,
    userPassword,
    confirmPassword
}) => {
    if(userPassword !== confirmPassword) throw new Error("Passwords do not match.")

    if(authUnsubscribeFunction) {
        authUnsubscribeFunction();
        authUnsubscribeFunction = null;
    }

    try {
        const credentials = await auth().createUserWithEmailAndPassword(userEmail, userPassword);
        const idTokenResult = await credentials.user.getIdTokenResult(false);

        return {
            uid: credentials.user.uid,
            email: credentials.user.email,
            displayName,
            token: idTokenResult.token
        };
    } catch(error) {
        throw error;
    }
})

export const signIn = createAsyncThunk('firebaseAuth/signIn', async({ userEmail, userPassword } ) => {
    if(authUnsubscribeFunction) {
        authUnsubscribeFunction();
        authUnsubscribeFunction = null;
    }

    try {
        const credentials = await auth().signInWithEmailAndPassword(userEmail, userPassword);
        const idTokenResult = await credentials.user.getIdTokenResult(false);

        return {
            uid: credentials.user.uid,
            email: credentials.user.email,
            token: idTokenResult.token,
            gardens: idTokenResult.claims.claimedGardens
        };
    } catch(error) {
        throw error;
    }
})

export const firebaseAuth = createSlice({
    name: 'firebaseAuth',
    initialState,
    reducers: {
        setfirebaseReady: (state, { payload}) =>{
            state.firebaseReady = payload;
        },
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setDisplayName: (state, { payload }) => {
            state.user.displayName = payload;
        },
        setUserNeedsSync: (state, { payload }) => {
            state.user.needsSync = payload;
        },
        pushGarden: (state, { payload }) => {
            state.user.claimedGardens = [...state.user.claimedGardens, payload];
        },
        popGarden: (state, { payload }) => {
            state.user.claimedGardens = [...state.user.claimedGardens].filter(s => s === payload);
            delete state.user.claimedGardenNames[payload];
        },
        addGardenMapping: (state, { payload }) => {
            state.user.claimedGardenNames[payload.serial] = payload.nickname;
        },
        updateToken: (state, { payload }) => {
            state.user.token = payload;
        },
        reset: () => initialState,
        resetError: state => {
            state.signupError = null;
            state.signinError = null;
        }
    },
    extraReducers: builder => {
        const addError = error => error?.code ? error.code : error.message;

        builder.addCase(createAccount.fulfilled, (state, { payload }) => {
            state.user = {
                uid: payload.uid,
                email: payload.email,
                displayName: payload.displayName,

                token: payload.token,
                claimedGardens: [],
                claimedGardenNames: {},

                needsSync: false
            };
        })
        builder.addCase(createAccount.rejected, (state, { error }) => {
            state.signupError = addError(error);
        })
        builder.addCase(signIn.fulfilled, (state, { payload })  => {
            state.user = {
                uid: payload.uid,
                email: payload.email,
                displayName: payload.email,

                token: payload.token,
                claimedGardens: payload.gardens ?? [],
                claimedGardenNames: {},

                needsSync: true
            };
        })
        builder.addCase(signIn.rejected, (state, { error }) => {
            state.signinError = addError(error);
        })
    }
})

export const { setfirebaseReady, setUser, setDisplayName, setUserNeedsSync, pushGarden, popGarden, addGardenMapping, updateToken, reset, resetError } = firebaseAuth.actions;

// We need to unsubscribe from the auth changes callback because otherwise it will set the user before creating a new account
let authUnsubscribeFunction;

export const listenToAuthChanges = () => (dispatch, _) =>
    authUnsubscribeFunction = auth().onAuthStateChanged(async user => {
        if(user) {
            const idTokenResult = await user.getIdTokenResult(false);

            dispatch(setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.email,

                token: idTokenResult.token,
                claimedGardens: idTokenResult.claims.claimedGardens ?? [],
                claimedGardenNames: {},
                needsSync: true
            }));

            authUnsubscribeFunction();
        }
    });

export const logout = () => (dispatch, _) => {
    dispatch(reset());
    auth().signOut();
}

// Checks if user object is non-null
export const selectIsLoggedIn = createSelector(state => state.firebaseAuth.user?.uid, uid => !!uid);