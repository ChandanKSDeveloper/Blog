import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import allblogsSlice from "./allblogsSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        allblogs : allblogsSlice,
    }
});

export default store;