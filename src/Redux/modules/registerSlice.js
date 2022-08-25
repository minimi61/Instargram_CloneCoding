import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'



export const __postsignup = createAsyncThunk(
  
  'signup/postsignup',
  async (payload, thunkAPI) => {
    try {
        console.log(payload)
        const data = await axios.post('https://jdh3340.shop/api/user/register', payload)
        console.log(data.data)
        
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    signup: [],
  },
  reducers: {},
  extraReducers: {},
});