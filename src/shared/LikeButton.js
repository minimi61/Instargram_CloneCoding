// import React from 'react'
// import { getCookieToken } from './cookie';
// import axios from 'axios'
// import { getUserData } from './cookie';

// const LikeButton = async (data) => {
//   const [likeButton, setLikeButton] = React.useState(data.liked);
//   const tokenId = getUserData();
//   console.log(tokenId)
//   console.log('data는?', data)
//   const response = await axios.post(`https://jdh3340.shop/api/user/posts/${tokenId}/likes`,{likesCount: data.likesCount+1},
//       {
//         headers: {
//           "Authorization": getCookieToken()
//         }
//       })
//     console.log(response.data.data)
//   setLikeButton(response.data.data)
//   return likeButton
// }

// export default LikeButton

