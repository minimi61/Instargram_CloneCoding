import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './style.css';
import logo1 from '../../Image/애플스토어다운 로고.png';
import logo2 from '../../Image/구글플레이다운 로고.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { __loginUser } from '../../Redux/modules/loginSlice';

function Login() {

const [end, setEnd] = useState('')
const [reload, setReload] = useState(false)
const navigate = useNavigate()
const dispatch = useDispatch()

const [id, setId] = useState('')
const [pw, setPw] = useState('')

const onclickLogin = () => {

    const userInfo = {
        username: id,
        password: pw
    }
    dispatch(__loginUser(userInfo))
    setTimeout(() => {
        setReload(!reload)
        window.location.href='/'
    }, 500);
}

useEffect(()=>{
    setTimeout(() => {
        setEnd('end')
    }, 100);
},[reload])

//setIntervel 써서 몇초마다 다른이미지 넣게 -> styled 컴포넌트에 props로 다른이미지 넣기
// 위에보다는 ->> css keyframe 사용 https://webclub.tistory.com/621


    return(
        <div style={{backgroundColor:'#fafafa', minWidth:'860px'}}>

        <Container>
            <Flex1>
                <FlexSlider className={'start '+end}></FlexSlider>
            </Flex1>
            <Flex2>
                <LoginBox>
                    <div style={{fontSize:'42px', margin:'22px 0 22px 0'}}>Instagram</div>
                    <InputId type='text' placeholder='아이디' onChange={(e)=>{setId(e.target.value)}}/>
                    <InputId type='password'placeholder='비밀번호' onChange={(e)=>{setPw(e.target.value)}}/>
                    <div><Button onClick={()=>{
                        onclickLogin()
                    }}>로그인</Button></div>
                </LoginBox>
                <RegisterBox>계정이 없으신가요? <span type='button' style={{color:'#718fc1', marginLeft:'5px', fontWeight:'bolder' }} onClick={()=>{navigate('/register')}}> 가입하기</span></RegisterBox>
                <div style={{marginTop:'14px', textAlign:'center'}}>앱을 다운로드하세요.</div>
                <div> 
                    <span><a href='https://apps.apple.com/app/instagram/id389801252?vt=lo' target='_blank'><img src={logo1} style={{width:'170px'}} type='button' /></a></span> 
                    <span><a href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D9B535C59-E857-426E-BEF6-A8EE7D62618F%26utm_content%3Dlo%26utm_medium%3Dbadge' target='_blank'><img src={logo2} style={{width:'155px'}}/></a></span>
                </div>
            </Flex2>
        </Container>


        </div>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Flex1 = styled.div`
    width: 460px;
    height: 630px;
    margin: 83px -28px 0 0;

    background-image: url('https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png');
    background-position: center;
    background-size: cover;
`

    const FlexSlider = styled.div`
        width: 250px;
        height: 542px;
        background-image: url('https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png');
        margin: 23px 0 0 153px;
        
    `

const Flex2 = styled.div`
    width: 350px;
    height: 550px;
    margin-top: 83px;
`

    const LoginBox = styled.div`
        margin: 20px auto 0 auto;
        width: 87%;
        height: 54%;
        font-size: 14px;
        border: 1px solid #dbdbdb;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
    `

    const InputId = styled.input`
        border: 0.5px solid #dbdbdb;
        border-radius: 3px;
        background-color: #fafafa;
        width: 234px;
        height: 35px;
        margin: 6px 0 0 0;
        padding: 12px;
    `;

    const Button = styled.button`
        width: 234px;
        background-color: #b2dffc;
        color: white;
        margin: 14px 0 0 0;
        border: 0;
        height: 30px;
        border-radius: 4px;
    `

    const RegisterBox = styled.div`
        margin: 15px auto 0 auto;
        border: 1px solid #dbdbdb;
        width: 87%;
        height: 10%;
        background-color: white;
        align-items: center;
        justify-content: center;
        display: flex;
    `


export default Login;