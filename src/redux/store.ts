import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./cartApi";
import { orderApi } from "./orderApi";
import { productApi } from "./poductApi";
import authSlice from "auth/authSlice"

const reduxStore = configureStore({
    reducer: {
        [cartApi.reducerPath]: cartApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        auth: authSlice

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartApi.middleware, orderApi.middleware, productApi.middleware),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;
