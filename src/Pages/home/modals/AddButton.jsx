import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { getPost, __postPost } from '../../../Redux/modules/postSlice';
import React, { useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { UploadFile } from '@mui/icons-material';
import basicImg from '../../../Image/기본배경사진.jpg'
import { getUserData } from '../../../shared/cookie';

const AddButton = () => {
  
  const userInfo = getUserData()

  const [fileUrl, setFileUrl] = useState('')
  const [comment, setComment] = useState('')
  const [tag, setTag] = useState('')
  const [reload, setReload] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storage = getStorage();
  const storageRef = ref(storage);

  const uploadFB = async (e) => {
    // console.log(e.target.files);
    const upload_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    // console.log(upload_file)

    const file_url = await getDownloadURL(upload_file.ref)
    // console.log(file_url)
    setFileUrl(file_url)
    // file_url !== '' ? setFileUrl(file_url) : setFileUrl(basicImg)
    // 기본 이미지 줄 수 있나? 없음 말고..
  }

  const uploadPost = () => {
    const post = {
      file: fileUrl,
      description: comment,
      tag: "#"+tag
    }
    // console.log(post)
    dispatch(__postPost(post))
    alert('포스팅완료!')
    // dispatch(getPost)
    window.location.reload('/')
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <AddButtonContainer>
        <AddButtonTitle>
          <div>새 게시물 만들기</div>
          <ShareButton onClick={uploadPost}>공유하기</ShareButton>
        </AddButtonTitle>

        <div style={{ display: 'flex' }}>
          <AddButtonImage>
            {/* {console.log(imageUrl)} */}
            <ImageBox src={fileUrl !== '' ? fileUrl : 'images/addImg.png'} />
            <div style={{ fontSize: '18px' }}>사진과 동영상을 여기에 끌어다 놓으세요</div>


            <label htmlFor="upload-photo">
              <input
                encType="multipart/form-data"
                accept="image/*"
                type="file"
                id="upload-photo"
                name="upload-photo"
                style={{ display: 'none' }}
                onChange={uploadFB}
              />
              <SelectComputer>
                컴퓨터에서 가져오기
              </SelectComputer>
            </label>
          </AddButtonImage>
          <AddButtonContent>
            <div style={{ display: 'flex', margin: '10px' }}>
              <img style={{ width: '50px', height: '50px', borderRadius: '50px', marginTop: '5px', marginRight: '20px' }} src='images/noImg.jpg'></img>
              <div style={{ margin:"auto 0" }} > {userInfo} </div>
            </div>

            <ContentBody placeholder='문구 입력...' onChange={(e)=>{setComment(e.target.value)}}/>
            <div style={{borderTop:'1px solid lightGray', height:'30px'}}><ContentInput placeholder='태그 추가 ex) 한강 나들이' onChange={(e)=>{setTag(e.target.value)}}/></div>
            {/* <ContentWhere>접근성</ContentWhere>
            <ContentWhere>고급설정</ContentWhere> */}
          </AddButtonContent>

        </div>
      </AddButtonContainer>
    </div>
  )
}

const AddButtonContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  min-width: 700px;
  height: 500px;
  border-radius: 20px;
  z-index: 2;
  background-color: white;
  text-align: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const AddButtonTitle = styled.div`
  margin-top: 15px;
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: center;
`
const ShareButton = styled.button`
  position: absolute;
  right: 0;
  margin-right:10px;
  border: none;
  background-color: white;
  font-weight: 800;
  color :#0095F6;
`
const AddButtonImage = styled.div`
  align-items: center;
  margin-top: 50px;
  width: 60%;
`
const ImageBox = styled.img`
  width: 250px;
  height: 250px;
  margin-top: 5px;
  margin-right: 20px;
`

const SelectComputer = styled.div`
  background-color: #0095F6;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.2rem 0.7rem;
  margin-top: 10px;
  `

const AddButtonContent = styled.div`
  border-left: 1px solid lightgray;
  width: 50%;
  height: 448px;
  /* background-color: beige; */
  text-align: left;
`

const ContentBody = styled.textarea`
  font-size: 18px;
  color: ContentBody;
  border: none ;
  width: 100%;
  height: 70%;
  padding: 0.5rem;
  vertical-align: top;
  text-align: left;
`

const ContentInput = styled.input`
  border: none;
  width: 100%;
  height: 55px;
  padding: 9px;
`
const ContentWhere = styled.div`
  padding: 0.5rem;
  border-top: 1px solid lightgray;
`
export default AddButton