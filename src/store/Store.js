import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import Authreducer from './AuthSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig , Authreducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)

// const store = configureStore({
//     reducer: Authreducer,
// })

// export default store;