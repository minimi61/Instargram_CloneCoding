import React, { useEffect } from 'react'
import styled from 'styled-components'
import 기본로고 from '../../../Image/사용자 기본로고.jpg'
import { getCookieToken } from '../../../shared/cookie'
import axios from 'axios'


const GetWhoFollower = ({ followerData,followed }) => {
  const [getFollowData, setGetFollowData] = React.useState(followed)

  const followProcess = async () => {
    const response = await axios.post(`https://jdh3340.shop/api/user/${followerData.username}/follow`,followerData.username,
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
             <IdPersonImg src={followerData.profileImage == null ? 기본로고 : followerData.profileImage} />

             <div style={{ marginLeft: '10px' }}>
               <div style={{ fontWeight: '900' }}>{followerData.username}</div>
               <div>{followerData.nickname}</div>
             </div>
           </div>{getFollowData ?
          <FollowCancel onClick={() => { followProcess() }}>팔로우 취소</FollowCancel> : <FollowButton onClick={() => { followProcess() }}>팔로우</FollowButton>}
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
  width: 100px;
  height: 40px;
  background-color: #0095f6;
  color: white;
  border:none;
  border-radius:5px;
  font-size: 20px;
  font-weight: 800;
`
const FollowCancel = styled.div`
  background-color: white;
  height: 40px;
  color: #0095f6;
  width: 120px;
  font-size: 18px;
  font-weight: 800;
  border-radius:5px;
  border: 0.5px solid #0095f6;
  padding: 0.2rem;
  cursor: pointer;
`
export default GetWhoFollower