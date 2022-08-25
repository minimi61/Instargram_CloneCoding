import { useEffect, useState, } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios'
import { getUserData } from '../../../shared/cookie';
import { getCookieToken } from '../../../shared/cookie';
import GetWhoFollow from './GetWhoFollow';

const Follow =({ userInfoName, openFollow, setOpenFollow }) => {
  const tokenId = getUserData();
  // console.log(tokenId)
  const [getFollowData, setGetFollowData] = useState(null)
  
  const getFollow = async () => {
    const response =  await axios.get(`https://jdh3340.shop/api/user/${userInfoName}/follow`,{
      headers: {
        "Authorization": getCookieToken()
      }
    })
    setGetFollowData(response.data.data)
  }
  useEffect(() => {
    getFollow()
  }, [])

  const handleClose = () => {
    setOpenFollow(false)
  }
  return (
    <Modal
    open={openFollow}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
    <Box sx={mystyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', fontSize: '20px', borderBottom: '1px solid lightgray' }}>
        <div></div>
        <div style={{ fontWeight: '800' }}>팔로우</div>
        <ClearIcon sx={{ cursor: 'pointer' }} onClick={() => {setOpenFollow(false)}} />
      </div>
      {getFollowData && getFollowData.map((followData, i) => {return <GetWhoFollow followData={followData} followed={followData.followed} key={i} />
      })}
  </Box>
  </Modal>  
  )
}
const mystyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: '530px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '30px',
  textAlign: 'center'
};
export default Follow