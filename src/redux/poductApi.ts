import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { user } from './cartApi';
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    products: T;
}
export interface IProduct {
    _id: string;
    name: string;
    desc: string;
    price: number;
    stock: number;
    mrp: number;
    hero: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        //baseUrl: "http://localhost:3300/api/products",
        baseUrl: 'https://micro-service-order-server.vercel.app/api/products',
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as any;
            const sliceToken = state.auth.user?.token;
            if (sliceToken) {
                headers.set("Authorization", sliceToken);
            } else if (user.token) {
                headers.set("Authorization", user.token);
            }
            return headers;
        },
    }),
    tagTypes: ['product'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: '/products',
                method: 'GET',
            }),
            providesTags: ['product'],
            transformResponse: (data: ApiResponse<IProduct[]>) => data?.products,
        }),
        addProduct: builder.mutation<void, Partial<IProduct>>({
            query: (productData) => ({
                url: '/add-product',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['product'],
        }),
        updateProduct: builder.mutation<void, { form: FormData; _id: string }>({
            query: ({ form, _id }) => ({
                url: `/update-product/${_id}`,
                method: 'PUT',
                body: form,
            }),
            invalidatesTags: ['product'],
        }),
        deleteProduct: builder.mutation<void, { _id: string }>({
            query: ({ _id }) => ({
                url: `/delete-product/${_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['product'],
        }),
        deactivateProduct: builder.mutation<void, { _id: string }>({
            query: (_id) => ({
                url: `/deactivate-product/${_id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['product'],
        }),
        activateProduct: builder.mutation<void, { _id: string }>({
            query: (_id) => ({
                url: `/activate-product/${_id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['product'],
        }),
        getProductDetails: builder.query<IProduct, string>({
            query: (id) => ({
                url: `/product-details/${id}`,
                method: 'GET',
            }),
            providesTags: ['product'],
            transformResponse: (data: ApiResponse<IProduct>) => data.result,
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useDeactivateProductMutation,
    useActivateProductMutation,
    useGetProductDetailsQuery,
} = productApi;
