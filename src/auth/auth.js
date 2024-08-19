import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: 'user' // Default role is user, can be 'admin' or 'user'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        }
    }
});

export const { setRole } = authSlice.actions;

export default authSlice.reducer;
