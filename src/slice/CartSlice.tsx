import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cartItems from '../CartItems'
import axios from 'axios'

interface InitialState {
    cartItems: any
    count: number,
    total: number,
    isLoading: boolean,
    error: any
}
const initialState: InitialState = {
    cartItems: cartItems,
    count: 1,
    total: 0,
    isLoading: true,
    error: null
}
const url = 'https://course-api.com/react-useReducer-cart-project';
export const getCartItems: any = createAsyncThunk('cart/getCartItems',
    async () => {
        const res = await axios(url)
        console.log(res.data);
        return res.data
    })

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//     const response = await axios.get('/api/products');
//     return response.data;
//   });

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            console.log(state.cartItems);
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((each: any) => each.id !== itemId)

        },
        increase: (state, action) => {
            const itemId = action.payload
            const cartItem = state.cartItems.find((item: any) => item.id === itemId);
            if (cartItem?.amount !== undefined) {
                cartItem.amount += 1
            }
        },
        decrease: (state, action) => {
            const itemId = action.payload
            const cartItem = state.cartItems.find((item: any) => item.id === itemId);
            if (cartItem?.amount !== undefined) {
                cartItem.amount -= 1
            }
        },
        calculateTotals: (state: any) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item: any) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions
export default cartSlice.reducer