import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';
import DetailPageComment from './DetailPageComment';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { __postComment } from '../../../../Redux/modules/comment';
import { __getComment } from '../../../../Redux/modules/comment';
import { __postPost } from '../../../../Redux/modules/postSlice';
import { __getDetail } from '../../../../Redux/modules/detailSlice';
import 사용자기본로고 from '../../../../Image/사용자 기본로고.jpg'
import heart from '../../../../Image/heart.png'
import send from '../../../../Image/send.png'
import commentIcon from '../../../../Image/commentIcon.png'
import colorHeart from '../../../../Image/colorHeart.png'

const DetailPage = ({openDetail,setOpenDetail,data,likeButton,tagContent,othersMenuOpen,setOthersMenuOpen}) => {


const dispatch = useDispatch()
const [reload, setReload] = useState(false)

const [comment, setComment] = useState('') 

const postComment = () => {

  const postcomment = {
    content: comment,
    postId: data.id
  }
  dispatch(__postComment(postcomment))
  setTimeout(() => {
    setReload(!reload)
  }, 500);
}

useEffect(()=>{
  dispatch(__getComment(data.id))

},[reload])

  return (
    <Modal
      open={openDetail}
      sx={{  top:'-50%'  }}
      >
      <DetailContainer>
        <DetailInner>
          <DetailImageContainer>
            <DetailImageInner>
              <DetailImage style={{ backgroundImage: `url(${data.imageSource})` }} />
            </DetailImageInner>
          </DetailImageContainer>
          <DetailContent>
            <ContentTitle>
              <div style={{ display: 'flex' }}>
                <IdPersonImg src={ data.profileImage !== null ? data.profileImage : 사용자기본로고 } ></IdPersonImg>
                <div style={{ marginLeft: '5px', marginTop: '5px', fontWeight: '700' }}>{data.nickname}</div>
              </div>
              <div>
                <MoreHorizIcon sx={{ m: 1, cursor: 'pointer' }} onClick={()=>{setOthersMenuOpen(!othersMenuOpen)}}/>
                <ClearIcon sx={{ m: 1, cursor: 'pointer' }}  onClick={()=>{setOpenDetail(!openDetail)}}/>
              </div>
            </ContentTitle>
            <ContentBody>
              <IdPersonImg src={ data.profileImage !== null ? data.profileImage : 사용자기본로고 } ></IdPersonImg>
            <div style={{ marginLeft: '5px', marginTop: '5px', fontWeight: '700' }}>{data.nickname}</div>
            <ContentText style={{ marginTop: '8px' }}>
                <span style={{ padding: '1.2rem' }}>{data.description}</span>
            </ContentText>
          </ContentBody>
            <div style={{ padding: '1.2rem' }}>{tagContent ? '#'+tagContent : null}</div>
          <ContentComments>

             <DetailPageComment reload={reload} setReload={setReload} data={data}/>

          </ContentComments>
          <InputComment>
            <CardInnerIcons>
                <img style={{ width: '50px', height: '50px', marginRight: '10px' }} alt="heart" src={likeButton && likeButton ? colorHeart : heart}></img>
                <img style={{ width: '30px', height: '30px', marginRight: '20px' }} alt="heart" src={commentIcon}></img>
              <img style={{ width: '30px', height: '30px', marginRight: '15px' }} alt="heart" src={send}></img>
            </CardInnerIcons>
              <CardLike>좋아요 {data.likesCount}개</CardLike>
            <CommentContainer>
            <CommentInner>
                <div>🙂</div>
                <CommentInput placeholder='댓글달기..' onChange={(e)=>{setComment(e.target.value)}}></CommentInput>
              </CommentInner>
              <SubmitButton onClick={()=>{ postComment() }}>게시</SubmitButton>
            </CommentContainer>
          </InputComment>
        </DetailContent>
      </DetailInner>
    </DetailContainer >
  </Modal>
  )
}

const DetailContainer = styled.div`
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translateX(-50%);
    z-index:100;
    width:1200px
`
const DetailInner = styled.div`
    /* width: 80%; */
    height: 700px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
`
const DetailImageContainer = styled.div`
    width: 50%;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius:20px;
    border-bottom-left-radius :20px;
`

const DetailImageInner = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DetailImage = styled.div`
   width: 100%;
   height:  400px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`
const DetailContent = styled.div`
    width: 50%;
`
const ContentTitle = styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
`
const IdPersonImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50px;
`
const ContentBody = styled.div`
    border-top: 0.5px solid lightgray;
    padding-top: 1rem;
    padding-left: 0.6rem;
    display: flex;
`
const ContentText = styled.div`
    min-height: 50px;
`
const ContentComments = styled.div`
    height: 300px;
    overflow: auto;
`
const InputComment = styled.div`
`

const CardInnerIcons = styled.div`
  width: 100%;
  padding: 1rem;
  padding-bottom: 0;
`
const CardLike = styled.div`
  margin-left: 20px;
  margin-bottom: 25px;
  font-size:18px;
  font-weight: 800;
  
`
const CommentContainer = styled.div`
  border-top: 1px solid gray;
  display: flex;
  justify-content: space-between;
  `
const CommentInner = styled.div`
  display: flex;
  font-size: 18px;
  padding: 1rem;
`
const SubmitButton = styled.button`
  border: none;
  background-color: white;
  color: lightblue;
  font-size: 18px;  
  height:40px ;
  margin-top:10px;
  margin-right:20px ;
`
const CommentInput = styled.input`
  border: none;
  outline: none;
  margin-left: 20px;

`
export default DetailPage