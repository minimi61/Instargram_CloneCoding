import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookieToken } from "../../shared/cookie";

const myToken = getCookieToken(); 

const initialState = {
  posts: [],
  isLoading: true,
  error: null,
  isFinish: false,
};

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("https://jdh3340.shop/api/recent/posts",
      { headers: {Authorization: myToken} })
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postPost = createAsyncThunk(
  'posts/postPost',
  async (payload, thunkAPI) => {
       try{
          // console.log(payload)
          // console.log(myToken)
          const data = await axios.post('https://jdh3340.shop/api/user/posts', payload, 
          { headers: {Authorization: myToken} })
          // console.log(data.data)
          return thunkAPI.fulfillWithValue(data.data)
      } catch (error) {
          console.log(error)
          return thunkAPI.rejectWithValue(error)
    }
  })
export const __editPost = createAsyncThunk(
  "posts/editPost", async (payload, thunkAPI) => {
    try {
      console.log(payload)
    const data = await axios.put(`https://jdh3340.shop/api/user/posts/${payload.id}`, { file: payload.file, description: payload.description, tag: payload.tag },
    { headers: {Authorization: myToken} });
    console.log(data.data)
    return thunkAPI.fulfillWithValue(data.data)
    } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
}
})

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getPost.pending]: (state, action) => {
      state.isLoading = true;
      state.isFinish = false;
    },
    [getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.isFinish = true;
    },
    [getPost.rejected]: (state, action) => 
      {
        state.isLoading= false;
        state.isFinish = true;
        state.posts = action.payload
    },


  },
})

export default postSlice.reducer;