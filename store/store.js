import { configureStore } from "@reduxjs/toolkit";

import { garden } from "./slices/garden"
import { enablePersistence } from "./persistence/firebase";

const store = configureStore({
    reducer: {
        garden: garden.reducer
    }
})


enablePersistence(store);

export default store;