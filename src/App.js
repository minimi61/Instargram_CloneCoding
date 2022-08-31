import './App.css';
import * as React from 'react';
import { Route, Routes, useNavigate,Link, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login'
import Register from './Pages/Login/Register'
import Home from './Pages/home/Home';
import UserPage from './Pages/userPage/UserPage'
// import UserPage from './Pages/home/userPage/UserPage';
import DetailPage from './Pages/detailPage/DetailPage';
import Header from './Pages/Header';
import { getCookieToken } from './shared/cookie';
import { ModalAddOpen } from './Redux/modules/AddBtnModal'

function App() {
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
    <ModalAddOpen>
      <div className="App">
        <Header setDropmenu={setDropmenu} dropmenu={dropmenu} />
      
        <Routes>
          <Route path='/' element={<Home setDropmenu={setDropmenu}/>}></Route>
          <Route path='/user/detail' element={<DetailPage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/user/:username' element={<UserPage/>}></Route>
          {/* <Route path='/upLoad' element={<UpLoad/>}></Route> */}
        </Routes>
      
      </div>
    </ModalAddOpen>
  );
}

export default App;