import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../components/home/HomePage'
import NavBar from './NavBar'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import MyPage from '../components/mypage/MyPage'

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    
    </BrowserRouter>
   )
}

export default Router