import { configureStore } from "@reduxjs/toolkit";

import { firebaseAuth } from "./slices/firebaseAuth"
import { garden } from "./slices/garden"
import { qrScanner } from "./slices/qrScanner";
import { templateName } from "./slices/templateName";


import { enablePersistence } from "./persistence/firebase";
import { listenToAuthChanges } from "./slices/firebaseAuth";

const store = configureStore({
    reducer: {
        firebaseAuth: firebaseAuth.reducer,
        garden: garden.reducer,
        qrScanner: qrScanner.reducer,
        templateName: templateName.reducer,

    }
})

store.dispatch(listenToAuthChanges());
enablePersistence(store);

export default store;
