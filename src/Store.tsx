import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../src/slice/CartSlice'
import modalReducer from './slice/modalSlice'
export const store=configureStore({
    reducer:{
        cart:cartReducer,
        modal:modalReducer
    }
})
