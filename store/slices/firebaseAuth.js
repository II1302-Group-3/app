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

    try {
        const credentials = await auth().createUserWithEmailAndPassword(userEmail, userPassword);
        return { uid: credentials.user.uid, email: credentials.user.email, displayName };
    } catch(error) {
        throw error;
    }
})

export const signIn = createAsyncThunk('firebaseAuth/signIn', async({ userEmail, userPassword } ) => {
    try {
        const credentials = await auth().signInWithEmailAndPassword(userEmail, userPassword);
        return { uid: credentials.user.uid, email: credentials.user.email };
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
            state.user = {...payload, needsSync: false};
        },
        setDisplayName: (state, { payload }) => {
            state.user.displayName = payload;
        },
        setUserNeedsSync: (state, { payload }) => {
            state.user.needsSync = payload;
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
            state.user = {uid: payload.uid, email: payload.email, displayName: payload.displayName, needsSync: false};
        })
        builder.addCase(createAccount.rejected, (state, { error }) => {
            state.signupError = addError(error);
        })
        builder.addCase(signIn.fulfilled, (state, { payload })  => {
            state.user = {uid: payload.uid, email: payload.email, displayName: payload.email, needsSync: true};
        })
        builder.addCase(signIn.rejected, (state, { error }) => {
            state.signinError = addError(error);
        })
    }
})

export const { setfirebaseReady, setUser, setDisplayName, setUserNeedsSync, reset, resetError } = firebaseAuth.actions;

export const logout = () => (dispatch, _) => {
    dispatch(reset());
    auth().signOut();
}

// Checks if user object is non-null
export const selectIsLoggedIn = createSelector(state => state.firebaseAuth.user?.uid, uid => !!uid);