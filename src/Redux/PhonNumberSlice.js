import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data: null
};

export const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState,
    reducers: {
        reset: () => initialState,
        setUser: (state, action) => {
            state.data = action.payload
        }

    }
});
export const { reset, setUser } = LoginSlice.actions;
export default LoginSlice.reducer;