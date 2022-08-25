import React, { useEffect, useState,useRef} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../shared/firebase';
import { __patchEditProfile } from '../../../Redux/modules/editProfile';
import { useDispatch } from 'react-redux';
import addImage from '../../../Image/addImg.png'
import 기본로고 from '../../../Image/사용자 기본로고.jpg'

const EditProfile = ({ openEditProfile,setOpenEditProfile,UserInfo }) => {
  console.log(UserInfo)
  const dispatch = useDispatch()
  const [fileUrl, setFileUrl] = useState(addImage)
  const [description, setDescription] = useState('')
  
  const handleClose = () => {
    setOpenEditProfile(false)
  }
  useEffect(()=>{
    
  },[])
  
// 프로필사진 바꾸기
  const changeImage = async (e) => {
    const upload_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    const file_url = await getDownloadURL(upload_file.ref)
    setFileUrl(file_url)
  }
  
  const EditDone = () => {
    const post = {
      file: fileUrl,
      description: description,
    }
    dispatch(__patchEditProfile(post))
    alert('수정완료!')
    window.location.reload(`/user/${UserInfo.username}`)
  }
  return (
    <div>
      <Modal
      open={openEditProfile}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={mystyle} >
        <EditProfileTitle>
          <div>내 정보 수정하기</div>
          <ShareButton onClick={EditDone}>수정하기</ShareButton>
        </EditProfileTitle>

        <div style={{ display: 'flex' }}>
          <EditButton>
            {/* {console.log(imageUrl)} */}
            <ImageBox src={fileUrl === UserInfo.profileImage ? UserInfo.profileImage : fileUrl}  />
            <div style={{ fontSize: '18px' }}>사진과 동영상을 여기에 끌어다 놓으세요</div>


            <label htmlFor="upload-photo">
              <input
                encType="multipart/form-data"
                accept="image/*"
                type="file"
                id="upload-photo"
                name="upload-photo"
                // ref={}
                style={{ display: 'none' }}
                onChange={changeImage}
              />
              <SelectComputer>
                컴퓨터에서 가져오기
              </SelectComputer>
            </label>
          </EditButton>
          <EditProfileContent>
            <div style={{ display: 'flex', margin: '10px' }}>
              <img style={{ width: '50px', height: '50px', borderRadius: '50px', marginTop: '5px', marginRight: '20px' }} src={UserInfo.profileImage !== null ? UserInfo.profileImage : 기본로고}></img>
              <div style={{ margin: "auto 0" }} > {UserInfo.username }</div>
            </div>
            <div style={{ margin: "auto 10px" }} >닉네임 : {UserInfo.nickname }</div>

            <ContentBody placeholder='소개글...' onChange={(e)=>{setDescription(e.target.value)}}/>

          </EditProfileContent>

        </div>
      </Box>
      </Modal>
    </div>
  )
}
const mystyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: '530px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '30px',
  textAlign: 'center'
};

const EditProfileTitle = styled.div`
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
const EditButton = styled.div`
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

const EditProfileContent = styled.div`
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
export default EditProfile