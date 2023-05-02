import { configureStore } from "@reduxjs/toolkit";

import { garden } from "./slices/garden"
import { firebaseAuth } from "./slices/firebaseAuth"
import { enablePersistence } from "./persistence/firebase";
import { listenToAuthChanges } from "./slices/firebaseAuth";

const store = configureStore({
    reducer: {
        garden: garden.reducer,
        firebaseAuth: firebaseAuth.reducer
    }
})

store.dispatch(listenToAuthChanges());
enablePersistence(store);

export default store;
