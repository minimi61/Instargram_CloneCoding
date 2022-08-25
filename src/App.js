import './App.css';
import * as React from 'react';
import { Route, Routes, useNavigate,Link, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login'
import Register from './Pages/Login/Register'
import Home from './Pages/home/Home';
import UserPage from './Pages/home/userPage/UserPage';
import DetailPage from './Pages/home/userPage/detailPage/DetailPage';
import Header from './Pages/Header';
import { getCookieToken } from './shared/cookie';

function App() {
  const [openImg, setOpenImg] = React.useState(false);
  const [dropmenu, setDropmenu] = React.useState(false);

  const isToken = getCookieToken();
  // console.log(isToken)
  if (!isToken) {
    return (
      <div>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </div>
    )
  }

  return (
    <div className="App">

      <Header setOpenImg={setOpenImg} setDropmenu={setDropmenu} dropmenu={dropmenu} />
      
      <Routes>
        <Route path='/' element={<Home openImg={openImg} setOpenImg={setOpenImg} setDropmenu={setDropmenu}/>}></Route>
        <Route path='/user/detail' element={<DetailPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/user/:username' element={<UserPage/>}></Route>
        {/* <Route path='/upLoad' element={<UpLoad/>}></Route> */}
      </Routes>
      

    </div>
  );
}

export default App;