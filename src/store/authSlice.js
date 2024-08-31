import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    // status : true,
    userData : null,
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        logout : (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

// Most common mistake take I have been making is that, I always use "authSlice.reducer" instead of using "authSlice.actions"
// Export Actions Correctly: The login and logout actions should be exported from authSlice.actions, not authSlice.reducer. This is a common practice in Redux Toolkit to use the generated action creators in your components.
export const {login, logout} = authSlice.actions;
export default authSlice.reducer; 