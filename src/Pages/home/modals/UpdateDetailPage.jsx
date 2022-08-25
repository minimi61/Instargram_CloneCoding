import React, { useEffect, useState,useRef} from 'react'
import styled from 'styled-components'
import Modal from '@mui/material/Modal';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { storage } from '../../../shared/firebase';
import { __editPost } from '../../../Redux/modules/postSlice';
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../../shared/cookie';

const UpdateDetailPage = ({data,clickUpdate, setClickUpdate, setOthersMenuOpen}) => {
  const userInfo = getUserData()

  const [fileUrl, setFileUrl] = useState(data.imageSource)
  const [comment, setComment] = useState('')  
  const [tag, setTag] = useState('')
  const dispatch = useDispatch();
// 취소버튼
  const backButton = () => {
    setClickUpdate(false)
    setOthersMenuOpen((prev)=> (!prev))
  }
// 이미지 바꾸기
  const changeImage = async (e) => {
    const upload_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    const file_url = await getDownloadURL(upload_file.ref)
    setFileUrl(file_url)
  }
  const updateDone = () => {
    const post = {
      id: data.id,
      file: fileUrl,
      description: comment,
      tag: "#"+tag
    }
    console.log(post)
    dispatch(__editPost(post))
    alert('포스팅완료!')
    window.location.reload('/')
  }

  return (
  <Modal
      open={clickUpdate}
      sx={{ border: 'none', top:'-50%'  }}
      >
    <DetailContainer>
    <DetailInner>
          <DetailHeader>
            <div onClick={backButton} style={{cursor:'pointer', }}>취소</div>
            <div style={{fontSize:'20px', fontWeight:'bold', margin:'-2px 0 0 1px'}}>정보 수정</div>
            <div onClick={updateDone} style={{color:'#1877F2',fontWeight:'800', cursor:'pointer'}}>완료</div>
      </DetailHeader>
      <div style={{display:'flex', height:'100%'}}>
        <DetailImageContainer>
          <DetailImageInner>
                <DetailImage src={fileUrl === data.imageSource ? data.imageSource : fileUrl} />
          </DetailImageInner>
          <div style={{display:'flex', justifyContent:'center'}}>
            <label htmlFor="upload-photo">
              <input  encType="multipart/form-data"
                accept="image/*"
                type="file"
                id="upload-photo"
                style={{ display: 'none' }} onChange={changeImage} />
              <UpdateImageButton>사진수정하기</UpdateImageButton>
              </label>
          </div>
        </DetailImageContainer>
        <DetailContent>
          <ContentBody>
            <IdPersonImg src='images/noImg.jpg' ></IdPersonImg>
            <div style={{ margin:'10px 0 0 20px', fontSize:'17px' }}>{userInfo}</div>
          </ContentBody>
              <textarea type='text'
                style={{ padding: '1.2rem', width: '100%', height: '77.2%', border:'none' }}
                placeholder={data.description}
                onChange={(e)=>{setComment(e.target.value)}}></textarea>
            <input
              placeholder={data.tag.tagName} style={{
              padding: '1rem', marginLeft: '5px', marginTop: '-5px', width: '97%', height: '10%', border: 'none', borderTop: '1px solid #e2e2e2'
              }}
              onChange={(e)=>{setTag(e.target.value)}}></input>

            </DetailContent>
            </div>
    </DetailInner>
    </DetailContainer>
  </Modal>
)
}
const DetailContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 80%;
`
const DetailHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 0.9rem;
`
const DetailInner = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const DetailImageContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: black;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  border-bottom-left-radius :20px;
`

const DetailImageInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DetailImage = styled.img`
 width: 100%;
 height:  500px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`
const UpdateImageButton = styled.div`
  padding: 0.5rem 1rem;
  border:none;
  margin-bottom: 1rem;
  background-color:#1877F2;
  color:white;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
`
const DetailContent = styled.div`
  width: 50%;
`
const IdPersonImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin: 0 0 0 8px;
`
const ContentBody = styled.div`
  border-top: 0.5px solid lightgray;
  padding-top: 1rem;
  padding-left: 0.6rem;
  height: 67px;
  display: flex;
`

export default UpdateDetailPage