//https://jdh3340.shop/api/user/posts
import { configureStore } from '@reduxjs/toolkit';
import { tokenSlice } from "../modules/AccessToken"
import { postSlice } from '../modules/postSlice'
import { commentSlice } from '../modules/comment';
import { usersSlice } from '../modules/loginSlice'
import { signupSlice } from '../modules/registerSlice'
import { detailSlice } from '../modules/detailSlice'
import { userPageSlice } from '../modules/userPage';
import { userInfoSlice } from '../modules/userPage';
import { commentLikeSlice } from '../modules/commentLike';
import { editProfileSlice } from '../modules/editProfile';

 const store = configureStore(
  {
    reducer: {
      accessToken: tokenSlice.reducer,
      users: usersSlice.reducer,
      register: signupSlice.reducer,

      post: postSlice.reducer,
      detail: detailSlice.reducer,
      comments: commentSlice.reducer,
      commentLike: commentLikeSlice.reducer,

      userPage: userPageSlice.reducer,
      userInfo: userInfoSlice.reducer,
      editProfile: editProfileSlice.reducer,
      
    },
    
  },
  
);

export default store;