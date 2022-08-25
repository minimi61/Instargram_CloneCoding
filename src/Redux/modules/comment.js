import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookieToken } from "../../shared/cookie"

const myToken = getCookieToken()

export const __getComment = createAsyncThunk(
    'comment/getComment',
    async (payload, thunkAPI) => {
        try {
            // console.log(payload)
            const data = await axios.get(`https://jdh3340.shop/api/user/posts/${payload}`,
            { headers: {Authorization: myToken} })
            return thunkAPI.fulfillWithValue(data.data.data.comments)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const __postComment = createAsyncThunk(
    'comment/postComment',
    async (payload, thunkAPI) => {
        try {
            // console.log(payload)
            const postId = payload.postId
            const content = payload.content 
            // console.log(postId, content)
            const data = await axios.post(`https://jdh3340.shop/api/user/posts/${postId}/comments`, {content: content},
            { headers: {Authorization: myToken} })
            return thunkAPI.fulfillWithValue(data.data.data.comments)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    } 
)
export const __deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async (payload, thunkAPI) => {
        try {
            console.log(payload)
            const postId = payload.postId
            const commentId = payload.commentId 
            const data = await axios.delete(`https://jdh3340.shop/api/user/posts/${postId}/comments/${commentId}`,
            { headers: {Authorization: myToken} })
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [__getComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__getComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        },
        [__getComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})