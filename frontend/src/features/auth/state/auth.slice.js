import { createSlice } from "@reduxjs/toolkit";
import { savedCrops } from "../../crops/service/crops.saved.api";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        savedCrops: [],
        loading: true,
        error: null,
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setLoading: (state, action) => {
            state.loading =  action.payload;
        },

        setSavedCrops: (state, action) => {
            state.savedCrops = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setError, setLoading, setUser, setSavedCrops} = authSlice.actions;
export default authSlice.reducer;