import React, { useEffect, useState,useRef} from 'react'
import { styled } from '@mui/material/styles';
import styled_components from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';



const OthersModal = ({othersMenuOpen, setOthersMenuOpen}) => {
  const handleClose = () => setOthersMenuOpen(false);

  const notFunction = () => {
    alert('준비중입니다')
    setOthersMenuOpen(false)
  }
  return (
    <Modal
     open={othersMenuOpen}
     onClose={handleClose}

          >
     <Box sx={style}>
       <BoxStyle style={{ color: '#CD0000', fontWeight: '800' }}  onClick={notFunction}>신고</BoxStyle>
       <BoxStyle style={{ color: '#CD0000', fontWeight: '800' }}  onClick={notFunction}>팔로우 취소</BoxStyle>
       <BoxStyle onClick={notFunction}>즐겨찾기에 추가</BoxStyle>
       <BoxStyle onClick={notFunction}>게시물로 이동</BoxStyle>
       <BoxStyle onClick={notFunction}>공유 대상..</BoxStyle>
       <BoxStyle onClick={notFunction}>링크 복사</BoxStyle>
       <BoxStyle onClick={notFunction}>퍼가기</BoxStyle>
        <BoxStyle style={{ borderBottom: 'none', cursor:'pointer' }} onClick={()=>{setOthersMenuOpen(false)}}>취소</BoxStyle>
     </Box>
    </Modal>
  )
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: '470px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  // p: 4,
  borderRadius: '30px',
  textAlign: 'center'
};
const BoxStyle = styled_components.div`
  font-size:16px;
  margin-top:2px;
  padding: 1rem;
  border-bottom: 1px solid lightgray;
`
export default OthersModal