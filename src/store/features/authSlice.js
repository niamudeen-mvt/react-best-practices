import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const authUser = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        updateAuthUser: (state, action) => {
            state.user = action.payload;
        },
        userlogout: (state) => {
            state.user = null;
        },
    },
});

export const { updateAuthUser, userlogout } = authUser.actions;

export default authUser.reducer;
