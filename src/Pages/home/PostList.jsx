
import React, { useEffect, useState, useRef} from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import styled_components from 'styled-components';
import Comment from './Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DetailPage from './userPage/detailPage/DetailPage';
import MyModal from './modals/MyModal';
import axios from 'axios'
import { getCookieToken } from '../../shared/cookie';
import { useDispatch } from "react-redux";
import { getPost } from '../../Redux/modules/postSlice';
import LikeButtonDetail from './modals/LikeButtonDetail'
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../shared/cookie';
import OthersModal from './modals/OthersModal'
import noImg from '../../Image/noImg.jpg'
import heart from '../../Image/heart.png'
import send from '../../Image/send.png'
import commentIcon from '../../Image/commentIcon.png'
import colorHeart from '../../Image/colorHeart.png'

const PostList = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(data)

  const [profileImg, setProfileImg] = useState(noImg)
  
  const tokenId = getUserData();
  // console.log(tokenId)

  let tagContent = data.tag.tagName.split('#')[1];
  // Card modal창
  const [othersMenuOpen, setOthersMenuOpen] = React.useState(false);
  const handleOpen = () => setOthersMenuOpen(true);
  //Detail modal창
  const [openDetail, setOpenDetail] = React.useState(false);
  const handleDetail = () => {
    setOpenDetail(!openDetail)
  };

// 좋아요 버튼
  const [likeButton, setLikeButton] = React.useState(data.liked);
  const clickLikeButton = async () => {
    const response = await axios.post(`https://jdh3340.shop/api/user/posts/${data.id}/likes`,{likesCount: data.likesCount+1},
      {
        headers: {
          "Authorization": getCookieToken()
        }
      })
    setLikeButton(response.data.data)
    dispatch(getPost())
  }
  // 좋아요 개수 클릭시 모달창
  const [countModal, setCountModal] = React.useState(false);
  const clickLikeCount = () => {
    setCountModal(!countModal)
  }
  return (
    <Card sx={{ maxWidth: 600, borderRadius: '20px', border: '1px solid lightgray', marginTop: '50px', marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent:'space-between',padding:'1rem', borderBottom:'1px solid lightgray' }}>
            <div style={{ display: 'flex' }}>
              <IdPersonImg src={ data.profileImage !== null ? data.profileImage : profileImg } onClick={()=>{navigate(`/user/${data.username}`)}} type='button'></IdPersonImg>
              <span style={{ marginLeft: '10px', marginTop: '7px', fontSize:'18px', fontWeight:'800'}}>{data.nickname}</span>

            </div>
            <div>
              <MoreHorizIcon sx={{ m: 1, cursor: 'pointer' }}  onClick={handleOpen}/>
            </div>
        </div>

      <DetailImageContainer>
        <DetailImage src={data.imageSource} alt="img"></DetailImage>
        </DetailImageContainer>
        <div>
        <CardInnerIcons>
          {/* 좋아요 버튼 */}
          <img style={{
            width: likeButton ? '38px' : '50px',
            height: likeButton ? '38px' : '50px',
            marginTop: likeButton ? '5px' : null,
            marginLeft: likeButton ? '5px' : null,
            marginRight: likeButton ? '16px' : '9px',
            cursor: 'pointer'
          }}
            alt="heart"
            onClick={clickLikeButton}
            src={likeButton && likeButton ? colorHeart : heart}>
          </img>
          
          <img style={{ width: '30px', height: '30px', marginRight: '20px', cursor: 'pointer' }} alt="heart" onClick={handleDetail} src={send}></img>
          <img style={{ width: '30px', height: '30px', marginRight: '15px', cursor: 'pointer' }} alt="heart" src={commentIcon}></img>
        </CardInnerIcons>
        {/* 좋아요개수 클릭시 모달창 */}
        <CardLike onClick={clickLikeCount}>좋아요 {data.likesCount}개</CardLike>
          <CardInnerContent >
            <p style={{  marginTop: '2px',fontWeight: '900', fontSize: '16px' }}>{data.nickname}</p>
            <div style={{ marginTop: '2px', marginLeft: '10px', fontSize: '16px' }}>{data.description}</div >
            <div style={{ cursor: 'pointer' }} onClick={handleDetail}> ...더보기</div>
            
        </CardInnerContent>
          {console.log()}
           <div style={{ marginBottom: '20px', marginLeft: '22px', fontSize: '16px',cursor: 'pointer' }}>{tagContent ? '#' + tagContent : null}</div>
          <CommentsCount onClick={handleDetail}>댓글 {data.commentsCount}개 모두보기</CommentsCount>
          <Comment />
        </div>
      {/* 게시글 디테일 페이지입니다 */}
      {openDetail ? <DetailPage openDetail={openDetail} setOpenDetail={setOpenDetail} data={data}
        likeButton={likeButton} setLikeButton={setLikeButton} tagContent={tagContent}
        othersMenuOpen={othersMenuOpen} setOthersMenuOpen={setOthersMenuOpen} /> : null}
      {/*본인 MUI modal창 구현부분입니다  */}
      {data.username === tokenId ? <MyModal othersMenuOpen={othersMenuOpen} setOthersMenuOpen={setOthersMenuOpen}  data={data}/> : <OthersModal othersMenuOpen={othersMenuOpen} setOthersMenuOpen={setOthersMenuOpen}  data={data}/>}
      
      {/* 좋아요한 사람들을 모달창으로 보여줍니다 */}
      {countModal ? <LikeButtonDetail countModal={countModal} setCountModal={setCountModal} data={data} />: null}
    </Card>
  )
}
const CardInnerIcons = styled_components.div`
  width: 100%;
  padding: 1rem;
  padding-bottom: 0;
`
const CardInnerContent = styled_components.div`
  float:left;
  display: flex;
  width: 100%;
  margin-left: 20px;
`
const CommentsCount = styled_components.div`
  margin-top:-10px;
  margin-left: 20px;
  cursor: pointer;
  font-size: 18px;
  color: #7f7a7a;
  font-weight: 700;
  `
const IdPersonImg = styled_components.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`
const CardLike = styled_components.div`
  margin-left: 20px;
  font-size:16px;
  font-weight: 600;
  cursor:pointer;
`
const DetailImageContainer = styled_components.div`
  height: 500px;
  // background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`
const DetailImage = styled_components.img`
  width:100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

export default PostList