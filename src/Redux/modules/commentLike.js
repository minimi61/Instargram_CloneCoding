import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookieToken } from "../../shared/cookie"

const myToken = getCookieToken()

export const __postCommentLike = createAsyncThunk(
    'commentLike/postCommentLike',
    async (payload, thunkAPI) => {
        try {
            // console.log(payload)
            const postId = payload.postId
            const commentId = payload.commentId
            const data = await axios.post(`https://jdh3340.shop/api/user/posts/${postId}/comments/${commentId}/likes`, commentId,
            { headers: {Authorization: myToken} })
            console.log(data.data)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const commentLikeSlice = createSlice({
    name: 'commentLike',
    initialState: {
        commentLike: [],
    },
    reducers: {},
    extraReducers: {}
})