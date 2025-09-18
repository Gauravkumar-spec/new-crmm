import { createSlice } from "@reduxjs/toolkit";

const agentSlice = createSlice({
    name: "agents",
    initialState: {
        agentList: [],
    },
    reducers: {
        setAgents: (state, action) => {
            state.agentList = action.payload;
        },
    },
});

export const { setAgents } = agentSlice.actions;
export default agentSlice.reducer;