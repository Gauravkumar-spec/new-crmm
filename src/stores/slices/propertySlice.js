import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
    name: "property",
    initialState: {
        propertyList: [],
    },
    reducers: {
        setProperty: (state, action) => {
            state.propertyList = action.payload;
        },
    },
});

export const { setProperty } = propertySlice.actions;
export default propertySlice.reducer;
