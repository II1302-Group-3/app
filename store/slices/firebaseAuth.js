import { createSlice, createSelector } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";

const initialState = {
    userUID: null,
    userEmail: null,
    userName: null,
}

export const firebaseAuth = createSlice({
    name: 'firebaseAuth',
    initialState, 
    reducers: {
        createAccount: (state, { payload }) => {
            auth().createUserWithEmailAndPassword(payload.userEmail, payload.userPassword);
            state.displayName = payload.displayName;
        },
        setUser: (state, { payload }) => {
            state.userUID = payload.uid;
            state.userEmail = payload.email;
        },
    },
    extraReducers: {
        RESET: () => initialState
    }
})

export const { createAccount, setUser } = firebaseAuth.actions;

export const signIn = ({userEmail, userPassword}) => auth().signInWithEmailAndPassword(userEmail, userPassword); 

export const listenToAuthChanges = () => (dispatch, _) => 
    auth().onAuthStateChanged(user => {
        if(user) dispatch(setUser({uid: user.uid, email: user.email}))
    })

export const logout = () => (dispatch, _) => {
    dispatch( {type: "RESET"} );
    auth().signOut();
}

const selectUserUID = state => state.firebaseAuth.userUID;
export const selectIsLoggedIn = createSelector(selectUserUID, uid => !!uid);