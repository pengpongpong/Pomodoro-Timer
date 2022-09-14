import {createSlice} from "@reduxjs/toolkit";

export const pomoTime = createSlice({
    name: "pomoTime",
    initialState: {
        valueMin: 25,
        valueSec: 0
    },
    reducers: {
        incrementPomoMinute: (state) => {
            state.valueMin += 1
        },
        decrementPomoMinute: (state) => {
            console.log("decrementPomo")
            state.valueMin === 0 ? state.valueMin = 0 : state.valueMin -= 1
        },
        setPomoMinuteByAmount: (state, action) => {
            state.valueMin = action.payload
        },
        decrementPomoSecond: (state) => {
            state.valueMin === 0 && state.valueSec === 0 
            ? state.valueSec = 0 
            : state.valueSec === 0 
            ? state.valueSec = 59 
            : state.valueSec -= 1;
        }, 
        decrementPomoSecondByAmound: (state, action) => {
            state.valueSec = action.payload
        }
    }
})


export const { incrementPomoMinute, decrementPomoMinute, setPomoMinuteByAmount, decrementPomoSecond, decrementPomoSecondByAmound } = pomoTime.actions;

export const pomoMinuteCount = (state) => state.pomoMinute.valueMin;
export const pomoSecondCount = (state) => state.pomoSecond.valueSec;

export default pomoTime.reducer;