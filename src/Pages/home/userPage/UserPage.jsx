import logo from '../../../Image/사용자 기본로고.jpg'
import logo2 from '../../../Image/인스타 게시글 로고.png'
import logo3 from '../../../Image/인스타 팔로워 로고.png'
import logo4 from '../../../Image/인스타 팔로우 로고.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faGear, faHeart, faL } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState, } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useParams } from 'react-router-dom'
import { __getUserPage, __getUserInfo } from '../../../Redux/modules/userPage'
import { getUserData } from '../../../shared/cookie'
import EditProfile from '../modals/EditProfile'
import Follower from './Follower'
import Follow from './Follow'

function UserPage() {
    const username = getUserData()
    const dispatch = useDispatch()
    const params = useParams().username
    // console.log(params)
    // console.log(username)

    const {isLoading, error, userPage} =  useSelector((state)=> state.userPage)
    const UserPage = userPage.data
    // console.log(UserPage)

    const userInfo = useSelector((state)=> state.userInfo)
    const UserInfo = userInfo.userInfo
    // console.log(UserInfo.username)
     
     // 프로필편집
     const [openEditProfile, setOpenEditProfile] = useState(false)

    // 팔로워
    const [openFollower, setOpenFollower] = useState(false);
    const checkFollower = () => {
        setOpenFollower(!openFollower)
    }
    // 팔로우
    const [openFollow, setOpenFollow] = useState(false);
    const checkFollow = () => {
        setOpenFollow(!openFollow)
    }
useEffect(()=>{
    dispatch(__getUserPage(params))
    dispatch(__getUserInfo(params))
},[])

if( isLoading ) {
    return(
        <div>로딩중...</div>
    )
}
    return(
        <div style={{padding:'20px', height:'1000px', maxWidth:'1000px', minWidth:'800px', margin:'0 auto'}}>
            
            <Header>
                <div style={{width:'200px', height:'200px', display:'flex', justifyContent:'center', margin:'29px 37px 44px 74px'}}>
                <HeaderImg><img src={UserInfo.profileImage !== null ? UserInfo.profileImage : logo} style={{borderRadius:'57%', width:'100%'}}/></HeaderImg>
                </div>
                <HeaderText>
                    <div > <span style={{fontSize:'23px', marginRight:'20px'}}>{UserInfo.username}</span> 
                        
                        {/* 본인 userPage 아니면 프로필 편집 버튼 안보이게 */}
                        {
                            username !== UserInfo.username ? '' : 
                            <><Button onClick={() => { setOpenEditProfile(!openEditProfile) }}>프로필 편집</Button> <span style={{margin:'3px 0 0 3px'}}><FontAwesomeIcon icon={faGear} /></span></>
                        }
                        
                    </div>
                    <div style={{ margin: '20px 0 0 0' }}>
                        <HeaderText2 >게시물 {UserInfo.postsCount}개</HeaderText2>
                        <HeaderText2 style={{ cursor:'pointer' }} onClick={checkFollower}>팔로워 {UserInfo.followerCount}개</HeaderText2>
                        <HeaderText2 style={{ cursor:'pointer' }} onClick={checkFollow}>팔로우 {UserInfo.followCount}개</HeaderText2></div>
                    <div style={{margin:'27px 0 0 0', fontWeight:'bold'}}>{UserInfo.nickname} <span style={{margin:'0 0 0 20px', fontWeight:'normal'}}>{UserInfo.description}</span> </div>
                </HeaderText>
            </Header>

            <Mid>
                <MidContent><img src={logo2} style={{width:'30px', margin:'5px 5px 0 0'}}/>게시물</MidContent>
                <MidContent><img src={logo3} style={{width:'30px', margin:'5px 5px 0 0'}}/>저장됨</MidContent>
                <MidContent><img src={logo4} style={{width:'30px', margin:'5px 5px 0 0'}}/>태그됨</MidContent>
            </Mid>

            <Container>
                <Row md={3}>
                    {
                        UserPage?.map((val)=>
                        <Col key={val.id}>
                            <Img props={val.imageSource}>
                                <OverLay>
                                    <div style={{color:'white', fontWeight:'bold'}}>
                                        <FontAwesomeIcon icon={faHeart} /><span style={{margin:'0 0 0 5px'}}>{val.likesCount}</span>
                                        <FontAwesomeIcon icon={faComment} style={{marginLeft:'30px'}}/><span style={{margin:'0 0 0 5px'}}>{val.commentsCount}</span>
                                    </div>
                                </OverLay>
                            </Img>
                        
                        </Col>
                        )
                    }
                    
                </Row>
            </Container>
            {/*프로필 편집 모달창입니다  */}
            {openEditProfile ?
                <EditProfile openEditProfile={openEditProfile} setOpenEditProfile={setOpenEditProfile} UserInfo={UserInfo} />
                : null}    
            {/* 팔로워 모달창입니다 */}
            {openFollower ? <Follower userInfoName={UserInfo.username} openFollower={openFollower} setOpenFollower={setOpenFollower} /> : null}
            {/* 팔로우 모달창입니다 */}
            {openFollow ? <Follow userInfoName={UserInfo.username} openFollow={openFollow} setOpenFollow={setOpenFollow} />: null}
        </div>
    );
}


const Button = styled.button`
    border: 2.5px solid #eaeaea;
    border-radius: 5px;
    background-color: #fafafa;
    font-size: 17px;
    padding: 5px 9px;
    font-weight: bold;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    margin: 100px 0 0 0;
`

const HeaderImg = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

const HeaderText = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 17px;
    padding: 20px;
    margin-top: 36px;
`

const HeaderText2 = styled.span`
    margin: 10px 40px 0 0;
`

const Mid = styled.div`
    height: 60px;
    border-top: 1px solid #dbdbdb;
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 0 0 10px 0;
`

const MidContent = styled.div`
    width: 150px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const OverLay = styled.div`
    position: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    opacity: 0;
    :hover {
        background-color:rgba(0, 0, 0, 0.5);
        opacity: 1;
  }
`

const Img = styled.div`
    margin: 10px 0 20px 0;
    width: 250px;
    height: 250px;
    background: url(${props => props.props});
    background-position: center;
    background-size: cover;
    background-color:rgba(0, 0, 0, 1)
`


export default UserPage;