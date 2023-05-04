import { configureStore } from "@reduxjs/toolkit";

import { firebaseAuth } from "./slices/firebaseAuth"
import { garden } from "./slices/garden"
import { qrScanner } from "./slices/qrScanner";

import { enablePersistence } from "./persistence/firebase";
import { listenToAuthChanges } from "./slices/firebaseAuth";

const store = configureStore({
    reducer: {
        firebaseAuth: firebaseAuth.reducer,
        garden: garden.reducer,
        qrScanner: qrScanner.reducer
    }
})

enablePersistence(store);

export default store;
