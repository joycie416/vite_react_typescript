import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../components/home/HomePage'
import NavBar from './NavBar'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    
    </BrowserRouter>
   )
}

export default Router