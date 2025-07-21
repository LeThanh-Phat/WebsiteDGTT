import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './user/Index'
import Admin from './admin/Admin'
import ThemDM from './admin/ThemDM'
import RegisterUser from './user/RegisterUser'
import LoginUser from './user/LoginUser'
import Danhmuc from './user/Danhmuc'
import XemSPTao from './user/XemSPTao'
import FormTaoSP from './user/FormTaoSP'
import FormTaoPhien from './user/FormTaoPhien'
import PhienDauGia from './user/PhienDauGia'
import Test from './test'
import XemChiTietPDG from './user/XemChiTietPDG'
import Tragia from './user/Tragia'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/login-user" element={<LoginUser />}></Route>
        <Route path="/register-user" element={<RegisterUser/>}></Route>
        <Route path="/danhmuc" element={<Danhmuc/>}></Route>
        <Route path="/sptao" element={<XemSPTao/>}></Route>
        <Route path="/form-sptao" element={<FormTaoSP/>}></Route>
        <Route path="/form-phientao" element={<FormTaoPhien/>}></Route>
        <Route path="/phiendaugia" element={<PhienDauGia/>}></Route>
        <Route path="/ctpdg" element={<XemChiTietPDG/>}></Route>
        <Route path="/tragia" element={<Tragia/>}></Route>
      </Routes>
    </>
  )
}

export default App
