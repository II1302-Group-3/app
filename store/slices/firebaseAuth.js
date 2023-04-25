import { createSlice } from "@reduxjs/toolkit";
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
        // Sign in with an existing user with Firebase
        signIn: (state, {payload}) => {
            auth().
                signInWithEmailAndPassword('test@gmail.com', 'test123')
                .then((userAuth) => {
                    state.userEmail = payload.userEmail;
                    state.userUID = userAuth.user.uid;
                }).catch((error) => {
                    console.log("An error has occered", error); 
                })
        },
        //Create account in firebase
        createAccount: (state, { payload }) => {
            if (payload.userPassword != payload.confirmPassword ) {
                console.log("Password don't match")
            }
            else{
                auth().
                createUserWithEmailAndPassword(payload.userEmail, payload.userPassword)
                .then((userAuth) => {
                    state.userName = payload.userName;
                    state.userEmail = payload.userEmail;
                    state.userUID = userAuth.user.uid;
                }).catch((error) => {
                    console.log("An error has occered", error); 
                })
            }
        },
    }
})


export const { signIn, createAccount} = firebaseAuth.actions;

