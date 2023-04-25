import { configureStore } from "@reduxjs/toolkit";

import { garden } from "./slices/garden"
import { firebaseAuth } from "./slices/firebaseAuth"
import { enablePersistence } from "./persistence/firebase";

const store = configureStore({
    reducer: {
        garden: garden.reducer,
        firebaseAuth: firebaseAuth.reducer
    }
})

enablePersistence(store);

export default store;