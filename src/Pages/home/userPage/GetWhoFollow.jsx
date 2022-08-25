import React from 'react'
import styled from 'styled-components'
import 기본로고 from '../../../Image/사용자 기본로고.jpg'
import { getCookieToken } from '../../../shared/cookie'
import axios from 'axios'

const GetWhoFollow = ({ followData, followed }) => {
  const [getFollowData, setGetFollowData] = React.useState(followed)
  const followProcess = async () => {
    const response = await axios.post(`https://jdh3340.shop/api/user/${followData.username}/follow`,followData.username,
      {headers: {
        "Authorization": getCookieToken()
      }}
    )
    setGetFollowData(response.data.data)
  }
  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
           <div style={{ display: 'flex' }}>
          <IdPersonImg src={followData.profileImage == null ? 기본로고 : followData.profileImage} />

             <div style={{ marginLeft: '10px' }}>
               <div style={{ fontWeight: '900' }}>{followData.username}</div>
               <div>{followData.nickname}</div>
             </div>
        </div>{getFollowData ?
          <FollowButton onClick={() => { followProcess() }}>팔로우 취소</FollowButton> : <FollowButton onClick={() => { followProcess() }}>팔로우</FollowButton>}
         </div>
 </div>
  )
}
const IdPersonImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`
const FollowButton = styled.button`
  background-color: white;
  color: #0095f6;
  width: 120px;
  font-size: 18px;
  font-weight: 800;
  border-radius:5px;
  border: 0.5px solid #0095f6;
  padding: 0.2rem;
  cursor: pointer;
`
export default GetWhoFollow