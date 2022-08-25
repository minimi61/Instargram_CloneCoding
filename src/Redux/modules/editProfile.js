import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookieToken } from '../../shared/cookie';

const myToken = getCookieToken();

export const __patchEditProfile = createAsyncThunk(
    'editProfile/patchEditProfile',
    async (payload, thunkAPI) => {
        console.log(payload)
        try {
            const data = await axios.put('https://jdh3340.shop/api/user/profile', payload,
            { headers: {Authorization: myToken} })
            console.log(data.data)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const editProfileSlice = createSlice({
    name: 'editProfile',
    initialState:{
        editProfile: [],
    },
    reducers: {},
    extraReducers: {}
})