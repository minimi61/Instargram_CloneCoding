import React from 'react'
import styled from 'styled-components'
import Main from './Main'
import AddButton from './modals/AddButton';

const Home = ({ openImg, setOpenImg, setDropmenu }) => {
  const ClickOuter = () => {
    setOpenImg(false)
    setDropmenu(false)
  }
  return (
    <div>
      <HomeContainer openImg={openImg}>
        {/* 메뉴-새로운 사진 추가하기버튼입니다 */}
        {openImg ? <AddButton /> : null}
        <HomeInner onClick={ClickOuter}>
          <Main openImg={openImg} setOpenImg={setOpenImg} />
        </HomeInner>
      </HomeContainer>

    </div>
  )
}

const HomeContainer = styled.div`
    position: absolute;
    top:80px; 
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    /* 배경회색으로 바꾸기가 안됨 ㅠ */
    background-color:${({ openImg }) => openImg ? 'rgba( 200, 200, 200, 0.9 )' : '#f1f1f1'} ;
    
  `

const HomeInner = styled.div`

    min-width: 700px;
    display: flex;
    justify-content: center;
   
`

export default Home