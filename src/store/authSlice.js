import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null,
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true;
            /* I create the major blunder here, I was using

                    state.userData = action.payload.userData;  -> Just like Github repo of Hitesh sir

                but it should 
            
                    state.userData = action.payload; 

                if i Try to use the first one I will get undefined or null when printing the store userData
            */
            state.userData = action.payload;
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