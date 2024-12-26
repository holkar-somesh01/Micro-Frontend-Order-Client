import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export interface ProductItem {
    product: string;
    qty: number;
}
export interface ProductRequest {
    // address: string,
    user: string,
    products: ProductItem[]

}
export interface Product {
    _id: string
    address: string,
    user: string,
    products: ProductItem[]

}
export interface Product {
    _id: string;
    name: string;
    desc: string;
    price: number;
    pId: number;
    stock: number;
    mrp: number;
    hero: string;
    active: boolean;
}


export interface Cartinfo {
    _id: string
    isDeleted?: boolean
    qty: number,
    productId: Product,
    userId: string,
    pId: string,
}

// export interface OrderItem {
//     image: string,
//     name: string,
//     qty: number,
//     price: number

// }

export interface IProduct {
    _id: string;
    name: string;
    desc: string;
    price: number;
    stock: number;
    mrp: number;
    hero: string;
    active: boolean;
    pId: string
}




export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://micro-service-order-server.vercel.app/api/cart", credentials: "include" }),
    tagTypes: ["cart"],
    endpoints: (builder) => {
        return {
            getcartProduct: builder.query<{ message: string, result: Cartinfo[] }, void>({
                query: () => {
                    return {
                        url: `/get-all-products`,
                        method: "GET"
                    }
                },
                providesTags: ["cart"],
                transformResponse: (data: { message: string, result: Cartinfo[] }) => {
                    return data
                },
            }),
            getallproducts: builder.query<{ message: string, result: IProduct[] }, void>({
                query: () => {
                    return {
                        url: `/get-products`,
                        method: "GET"
                    }
                },
                providesTags: ["cart"],
                transformResponse: (data: { message: string, result: IProduct[] }) => {
                    return data
                },
            }),
            getproductsdetails: builder.query<{ message: string, result: IProduct }, void>({
                query: (id) => {
                    return {
                        url: `/get-products-details/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["cart"],
                transformResponse: (data: { message: string, result: IProduct }) => {
                    return data
                },
            }),
            addtoCart: builder.mutation({
                query: productData => {
                    return {
                        url: "/add-product",
                        method: "POST",
                        body: productData
                    }
                },
                invalidatesTags: ["cart"]
            }),
            deleteItemFromCart: builder.mutation({
                query: (id) => {
                    return {
                        url: `/delete-product/${id}`,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["cart"]
            }),
            emptyCart: builder.mutation<void, void>({
                query: () => {
                    return {
                        url: `/delete-all-products`,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["cart"]
            }),
            placeOrder: builder.mutation<Product, ProductRequest>({
                query: productData => {
                    return {
                        url: `/place-order`,
                        method: "POST",
                        body: productData

                    }
                },
                invalidatesTags: ["cart"]
            }),

        }
    }
})

export const { useGetcartProductQuery, useAddtoCartMutation, useDeleteItemFromCartMutation, useEmptyCartMutation, usePlaceOrderMutation, useGetallproductsQuery, useGetproductsdetailsQuery } = cartApi
