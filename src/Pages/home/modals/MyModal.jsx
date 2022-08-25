import React, { useEffect, useState,useRef} from 'react'
import { styled } from '@mui/material/styles';
import styled_components from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import UpdateDetailPage from './UpdateDetailPage';
import { getCookieToken } from '../../../shared/cookie';
import { useDispatch, useSelector } from "react-redux";
import { getPost } from '../../../Redux/modules/postSlice';

const MyModal = ({ othersMenuOpen, setOthersMenuOpen, data }) => {
  const [clickUpdate, setClickUpdate] = useState(false);
  const dispatch = useDispatch();

  const deletePost =  async() => {
    const response = await axios.delete(`https://jdh3340.shop/api/user/posts/${data.id}`, 
    {headers: {
        "Authorization" : getCookieToken()
      }})
    console.log(response)
    alert('삭제완료!')
    dispatch(getPost())
    setOthersMenuOpen(false)
  }

  const updatePost = () => {
    setClickUpdate(!clickUpdate)
  }

  const handleClose = () => {
    setOthersMenuOpen(false)
  }

  const notFunction = () => {
    alert('준비중입니다')
    setOthersMenuOpen(false)
  }

  return (
    <div>
      {clickUpdate?
        <UpdateDetailPage data={data} clickUpdate={clickUpdate} setClickUpdate={setClickUpdate} setOthersMenuOpen={setOthersMenuOpen} />
          : <Modal
      open={othersMenuOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={mystyle}>
        <BoxStyle style={{ color: '#CD0000', fontWeight: '800' }} onClick={deletePost}>삭제</BoxStyle>
        <BoxStyle onClick={updatePost}>수정</BoxStyle>
        <BoxStyle onClick={notFunction}>좋아요 수 숨기기</BoxStyle>
        <BoxStyle onClick={notFunction}>댓글 기능 해제</BoxStyle>
        <BoxStyle onClick={notFunction}>게시물로 이동</BoxStyle>
        <BoxStyle onClick={notFunction}>공유 대상..</BoxStyle>
        <BoxStyle onClick={notFunction}>링크 복사</BoxStyle>
        <BoxStyle onClick={notFunction}>퍼가기</BoxStyle>
        <BoxStyle style={{ borderBottom: 'none' }} onClick={() => setOthersMenuOpen(false)}>취소</BoxStyle>
      </Box>
        </Modal>
      }
    </div>
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

const BoxStyle = styled_components.div`
  font-size:16px;
  margin-top:2px;
  padding: 1rem;
  border-bottom: 1px solid lightgray;
  cursor:pointer
`
export default MyModal