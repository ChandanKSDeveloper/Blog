import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from './authSlice';
import allblogsReducer from "./allblogsSlice";

// Separate persist configurations for each slice
const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage,
};

const allblogsPersistConfig = {
    key: 'allblogs',
    version: 1,
    storage,
};

// Wrap the reducers with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedAllBlogsReducer = persistReducer(allblogsPersistConfig, allblogsReducer);

// Create the store with persisted reducers
const store = configureStore({
    reducer: {
      auth: persistedAuthReducer,
      allblogs: persistedAllBlogsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,  // Disable serializable check to avoid issues with non-serializable values in Redux persist
        }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
