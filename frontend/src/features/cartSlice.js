// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { domain } from "../env";

// const initialState = {
//     cart: [],
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message: "",
// };



// //Get Books
// export const getBook = createAsyncThunk("books/getAll", async (_, thunkAPI) => {
//     try {
//         const response = await axios.get(API_URL);
//         return response.data;
//     } catch (err) {
//         const message =
//             (err.response && err.response.data && err.response.data.message) ||
//             err.message ||
//             err.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// });


// //Create new Book
// export const createBook = createAsyncThunk(
//     "books/create",
//     async (bookData, thunkAPI) => {
//         try {
//     console.log(bookData);
//     const response = await axios.post(API_URL, bookData);
//     return response.data;
//         } catch (err) {
//             const message =
//                 (err.response && err.response.data && err.response.data.message) ||
//                 err.message ||
//                 err.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// //Update books
// export const updateBook = createAsyncThunk(
//     "books/update",
//     async (bookData, thunkAPI) => {
//         try {
//     const response = await axios.put(API_URL, bookData);
//     return response.data;
//         } catch (err) {
//             const message =
//                 (err.response && err.response.data && err.response.data.message) ||
//                 err.message ||
//                 err.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );
// //Delete book
// export const deleteBook = createAsyncThunk(
//     "books/delete",
//     async (bookId, thunkAPI) => {
//         try {
//     const response = await axios.delete(API_URL + bookId);
//     return response.data;
//         } catch (err) {
//             const message =
//                 (err.response && err.response.data && err.response.data.message) ||
//                 err.message ||
//                 err.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

// export const blogSlice = createSlice({
//     name: "blog",
//     initialState,
//     reducers: {
//         reset: (state) => initialState,
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getBook.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(getBook.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.isSuccess = true;
//                 state.books.push(action.payload);
//             })
//             .addCase(getBook.rejected, (state, action) => {
//                 state.isSuccess = false;
//                 state.isError = true;
//                 state.message = action.payload;
//             })

//         // .addCase(createBook.pending, (state) => {
//         //     state.isLoading = true;
//         // })
//         // .addCase(createBook.fulfilled, (state, action) => {
//         //     state.isLoading = false;
//         //     state.isSuccess = true;
//         //     state.books.push(action.payload);
//         // })
//         // .addCase(createBook.rejected, (state, action) => {
//         //     state.isSuccess = false;
//         //     state.isError = true;
//         //     state.message = action.payload;
//         // })
//         // .addCase(updateBook.pending, (state) => {
//         //     state.isLoading = true;
//         // })
//         // .addCase(updateBook.fulfilled, (state, action) => {
//         //     state.isLoading = false;
//         //     state.isSuccess = true;
//         //     state.books.push(action.payload);
//         // })
//         // .addCase(updateBook.rejected, (state, action) => {
//         //     state.isSuccess = false;
//         //     state.isError = true;
//         //     state.message = action.payload;
//         // })
//         // .addCase(deleteBook.pending, (state) => {
//         //     state.isLoading = true;
//         // })
//         // .addCase(deleteBook.fulfilled, (state, action) => {
//         //     state.isLoading = false;
//         //     state.isSuccess = true;
//         //     state.books.push(action.payload);
//         // })
//         // .addCase(deleteBook.rejected, (state, action) => {
//         //     state.isSuccess = false;
//         //     state.isError = true;
//         //     state.message = action.payload;
//         // });
//     },
// });

// export const { reset } = blogSlice.actions;
// export default blogSlice.reducer;
