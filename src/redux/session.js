import {createSlice} from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name: "session",
    initialState: {
        value: 4,
    },
    reducers: {
        incrementSession: (state) => {
            state.value += 1;
        },
        decrementSession: (state) => {
            state.value === 0 ? state.value = 0 : state.value -= 1;
        }, 
        setSessionByAmount: (state) => {
            state.value = 4;
        }
    }
})

export const { incrementSession, decrementSession, setSessionByAmount } = sessionSlice.actions;
export const sessionCount = (state) => state.session.value;
export default sessionSlice.reducer;