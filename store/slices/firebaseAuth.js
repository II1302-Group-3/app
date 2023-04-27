import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";

const initialState = {
    signinError: null,
    signupError: null,
    userUID: null,
    userEmail: null,
    displayName: null,
}

export const createAccount = createAsyncThunk('firebaseAuth/createAccount', async({
    displayName,
    userEmail,
    userPassword,
    confirmPassword
}) => {
    if(userPassword !== confirmPassword) throw new Error("Passwords do not match.")

    try {
        await auth().createUserWithEmailAndPassword(userEmail, userPassword)
    } catch(error) {
        throw error;
    }
    
    return displayName;
})

export const signIn = createAsyncThunk('firebaseAuth/signIn', async({ userEmail, userPassword } ) => {
    try {
        await auth().signInWithEmailAndPassword(userEmail, userPassword)
    } catch(error) {
        throw error;
    }
})

export const firebaseAuth = createSlice({
    name: 'firebaseAuth',
    initialState, 
    reducers: {
        setDisplayName: (state, { meta, payload }) => {
            state.displayName = payload;
        },
        setUser: (state, { payload }) => {
            state.userUID = payload.uid;
            state.userEmail = payload.email;
        },
        reset: () => initialState,
        resetError: state => {
            state.signupError = null;
            state.signinError = null;
        }
    },
    extraReducers: builder => {
        const addError = error => {
            if(error?.code) return error.code;
            return error?.message ? error.message : error;
        }

        builder.addCase(createAccount.fulfilled, (state, { payload }) => {
            state.displayName = payload;
        })
        builder.addCase(createAccount.rejected, (state, { error }) => {
            state.signupError = addError(error);
        })
        builder.addCase(signIn.rejected, (state, { error }) => {
            state.signinError = addError(error);
        })
    }
})

export const { setDisplayName, setUser, reset, resetError } = firebaseAuth.actions;

export const listenToAuthChanges = () => (dispatch, getState) => 
    auth().onAuthStateChanged(user => {
        if(user) dispatch(setUser({uid: user.uid, email: user.email}))
    })

export const logout = () => (dispatch, _) => {
    dispatch(reset());
    auth().signOut();
}

const selectUserUID = state => state.firebaseAuth.userUID;
export const selectIsLoggedIn = createSelector(selectUserUID, uid => !!uid);