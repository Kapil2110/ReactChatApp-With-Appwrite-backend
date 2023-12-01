import { configureStore } from "@reduxjs/toolkit";
import Authreducer from './AuthSlice'

const store = configureStore({
    reducer: Authreducer,
})

export default store;