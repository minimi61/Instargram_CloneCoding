import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookieToken } from '../../shared/cookie';

const usertoken = getCookieToken();

export const __getDetail = createAsyncThunk(
    'detail/getDetail',
    async (postId, thunkAPI) => {
        try {
            console.log(postId)
            const data = await axios.get(`https://jdh3340.shop/api/user/posts/${postId}`)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
// export const __postComment = createAsyncThunk(
//     'comment/postComment',
//     async (payload, thunkAPI) => {
//         try {
//             console.log(payload)
//             console.log(usertoken)
//             const data = await axios.post(`http://54.180.122.99/api/comments/${payload.productId}`, {content: payload.comment}, {
//                 headers: {Authorization: usertoken}})
//             return thunkAPI.fulfillWithValue(data.data)
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error)
//         }
//     }
// )
// export const __deleteComment = createAsyncThunk(
//     'comment/deleteComment',
//     async (commentId, thunkAPI) => {
//         try {
//             console.log(commentId)
//             const data = await axios.delete(`http://54.180.122.99/api/comments/${commentId}`, {
//                 headers: {Authorization: usertoken}})
//             return thunkAPI.fulfillWithValue(data.data)
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error)
//         }
//     }
// )




export const detailSlice = createSlice({
    name: 'detail',
    initialState:{
        details: [],
        isLoading2: false,
        error2: null,
    },
    reducers: {},
    extraReducers: {
        [__getDetail.pending]: (state) => {
            state.isLoading2 = true;
        },
        [__getDetail.fulfilled]: (state, action) => {
            state.isLoading2 = false;
            state.comments = action.payload;
        },
        [__getDetail.rejected]: (state, action) => {
            state.isLoading2 = false;
            state.error = action.payload;
        }
    }
})