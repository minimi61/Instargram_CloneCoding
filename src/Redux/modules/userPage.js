import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookieToken } from '../../shared/cookie';

const myToken = getCookieToken();

export const __getUserPage = createAsyncThunk(
    'userPage/getUserPage',
    async (username, thunkAPI) => {
        try {
            // console.log(username)
            const data = await axios.get(`https://jdh3340.shop/api/user/${username}/posts`,
            { headers: {Authorization: myToken} })
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const __getUserInfo = createAsyncThunk(
    'userInfo/getUserInfo',
    async (username, thunkAPI) => {
        try {
            const data = await axios.get(`https://jdh3340.shop/api/user/${username}`,
            { headers: {Authorization: myToken} })
            return thunkAPI.fulfillWithValue(data.data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)




export const userPageSlice = createSlice({
    name: 'userPage',
    initialState:{
        userPage: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [__getUserPage.pending]: (state) => {
            state.isLoading = true;
        },
        [__getUserPage.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userPage = action.payload;
        },
        [__getUserPage.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState:{
        userInfo: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [__getUserInfo.pending]: (state) => {
            state.isLoading = true;
        },
        [__getUserInfo.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload;
        },
        [__getUserInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})