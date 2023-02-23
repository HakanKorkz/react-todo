import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../../features/counter/counterSlice'
import menusReducer from "features/menu/menuSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        menu:menusReducer
    },
})