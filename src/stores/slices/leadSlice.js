import { createSlice } from "@reduxjs/toolkit";

const leadSlice = createSlice({
    name: "leads",
    initialState: {
        leadList: [],
    },
    reducers: {
        setLeads: (state, action) => {
            state.leadList = action.payload;
        },
    },
});

export const { setLeads } = leadSlice.actions;
export default leadSlice.reducer;
