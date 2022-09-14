import {createSlice} from "@reduxjs/toolkit";

export const breakTime = createSlice({
    name: "breakTime",
    initialState: {
        valueMin: 0,
        valueSec: 0
    },
    reducers: {
        decrementBreakMinute: (state) => {
            state.valueMin -= 1;
        },
        setBreakMinuteByAmount: (state, action) => {
            state.valueMin = action.payload
        },
        decrementBreakSecond: (state) => {
            state.valueSec === 0 && state.valueMin === 0
            ? state.valueSec = 0
            : state.valueSec === 0 && state.valueMin != 0 
            ? state.valueSec = 59
            : state.valueSec -= 1;
        }
    }
})

export const { decrementBreakMinute, setBreakMinuteByAmount, decrementBreakSecond } = breakTime.actions;

export const breakMinuteCount = (state) => state.breakMinute.valueMin;
export const breakSecondCount = (state) => state.breakSecond.valueSec;

export default breakTime.reducer;