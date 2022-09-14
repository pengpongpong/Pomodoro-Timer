import { configureStore } from "@reduxjs/toolkit"
import sessionSlice from "./sessionSlice.js"
import pomoTimer from "./pomoTime.js"
import breakTimer from "./breakTime.js"


export default configureStore({
    reducer: {
        session: sessionSlice,
        pomoMinute: pomoTimer,
        pomoSecond: pomoTimer,
        breakMinute: breakTimer,
        breakSecond: breakTimer,
    }
})