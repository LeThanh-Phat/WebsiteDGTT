import logo from '../assets/feefat.png'
import { useState } from 'react';
import ThemDM from './ThemDM';
import DangNhap from './DanhNhap';
import DangKy from './DangKy';
import XemDM from './XemDM'; // Đảm bảo đường dẫn đúng
import TintucTable from './TintucTable';
import DanhmucTable from './danhmucTable';
import PhiendaugiaTable from './phienTable';
import ProductTable from './productTable';
import QLtkngTable from './taikhoanngdungTable';

function Admin() {
    const admin = JSON.parse(localStorage.getItem("adminInfo"));
    const [activeComponent, setActiveComponent] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isDark,setIsDark] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popup, setPopup] = useState(null);

    const renderComponent = () => {
      switch (activeComponent) {
        case "xemdm":
          return <DanhmucTable />;
        case "xemtt":
          return <TintucTable/>;
        case "xemsp":
          return <ProductTable />;
        case "xemphien":
          return <PhiendaugiaTable />;
        case "xemtknd":
          return <QLtkngTable />;
        default:
          return <p>Vui lòng chọn chức năng</p>;
      }
    };


  //       Quản lý duyệt sản phẩm
  //       + Duyệt Sản phẩm
  //       + Hủy sản phẩm
  //       Quản lý phiên đấu giá
  //       + Duyệt phiên đáu giá
  //       + Hủy phiên đấu giá
  //       + Xem lịch sử phiên đấu giá
  //       Thống kê báo cáo danh thu
  //       + Tạo báo cáo + Xem chi tiết doanh thu/báo cáo
  //       Quản lý người dùng
  //       + Xem thông tin
  //       + Hủy tài khoản
  //       + Mở lại tài khoản
  //       + Xóa tài khoản
  //       Quản tin tức
  //       + Thêm tin tức
  //       + Xóa tin tức 
  //       + Sửa tin tức
  //       Quản danh mục
  //       + Thêm,sửa danh mục
  return (
    
    <div className={`${isDark ? 'bg-dark' : 'bg-white'} ${isDark ? 'text-white' : 'text-black'} relative`}>
      {popup && (<div className="fixed top-0 left-0 z-50 flex items-center justify-center">
          {popup === 'dangnhap' && <DangNhap onClose={() => setPopup(null)} onSwitch={() => setPopup('dangky')} />}
          {popup === 'dangky' && <DangKy onClose={() => setPopup(null)} />}
        </div>)}
      <div className='popup absolute top-0 left-0'>
        {showPopup && <ThemDM onClose={() => setShowPopup(false)}/>}
      </div>
      
      <div className={`menu-bar flex justify-between items-center pe-5 shadow-md ${isDark ? 'shadow-white':'shadow-black-500'}`}>
        <div className="logo-menu flex w-[60%] justify-around items-center">
          <img src={logo} alt="" className='w-20 h-20'/>
          <nav>Danh mục</nav>
          <nav>Thống kê doanh thu</nav>
          <nav>Tin tức</nav>
        </div>
          {!admin ? (
              <div className="btn block">
                <button className='px-3 py-1 bg-lime-400 rounded-lg' onClick={()=>setPopup('dangnhap')}>Đăng nhập</button>
                <button className='px-3 py-1 bg-lime-400 rounded-lg ms-4' onClick={()=>setPopup('dangky')}>Đăng ký</button>
              </div>
            ) : (<div className='btn block'>
              <h4>Xin chào {admin.admin.gmail}</h4>
              <button className='px-3 py-1 bg-lime-400 rounded-lg ms-4' onClick={()=>{localStorage.removeItem('adminInfo'); location.reload()}}>Đăng xuất</button>
            </div>)}
      </div>
      <div className={`body flex justify-around mt-8 `}>
        <div className={`side-bar`}>
          <div className="manager">
            <h3 className={`font-bold ${isDark ? 'text-gray-400':'text-gray-500'} text-md mb-1`}>Manager</h3>
            <details open={isOpen}
                     onToggle={(e) => setIsOpen(e.currentTarget.open)}
                     className={``}>
              <summary className={`flex w-full px-1 py-2 transition duration-400 ${
              isOpen ? (isDark ? 'bg-emerald-700' : 'bg-lime-500') : (isDark ? 'bg-dark' : 'bg-white')}`}>
                <h4>Quản lý sản phẩm</h4>
                <svg className="w-4 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                </svg>
              </summary>
              <div className="function ms-1 my-2 ps-10 border-s-[2px] border-gray-400 transition duration-600">
                <nav onClick={() => setActiveComponent("xemsp")}>Xem sản phẩm</nav>
                <nav>Hủy sản phẩm</nav>
              </div>
            </details>
            <details open={isOpen1}
                     onToggle={(e) => setIsOpen1(e.currentTarget.open)}
                     className=''>
              <summary className={`flex px-1 py-2 transition duration-400 ${
              isOpen1 ? (isDark ? 'bg-emerald-700' : 'bg-lime-500') : (isDark ? 'bg-dark' : 'bg-white')}`}>
                <h4>Quản lý phiên đấu giá</h4>
                <svg className="w-4 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                </svg>
              </summary>
              <div className="function ms-1 my-2 ps-10 border-s-[2px] border-gray-400 transition duration-600">
                <nav onClick={() => setActiveComponent("xemphien")}>Xem phiên</nav>
                <nav>Hủy phiên</nav>
                <nav>Xem lịch sử</nav>
              </div>
            </details>
            <details open={isOpen2}
                     onToggle={(e) => setIsOpen2(e.currentTarget.open)}
                     className=''>
              <summary className={`flex px-1 py-2 transition duration-400 ${
              isOpen2 ? (isDark ? 'bg-emerald-700' : 'bg-lime-500') : (isDark ? 'bg-dark' : 'bg-white')}`}>
                <h4>Thống kê báo cáo doanh thu</h4>
                <svg className="w-4 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                </svg>
              </summary>
              <div className="function ms-1 my-2 ps-10 border-s-[2px] border-gray-400 transition duration-600">
                <nav>Tạo báo cáo</nav>
                <nav>Xem báo cáo</nav>
              </div>
            </details>
            <details open={isOpen3}
                     onToggle={(e) => setIsOpen3(e.currentTarget.open)}
                     className=''>
              <summary className={`flex px-1 py-2 transition duration-400 ${
              isOpen3 ? (isDark ? 'bg-emerald-700' : 'bg-lime-500') : (isDark ? 'bg-dark' : 'bg-white')}`}>
                <h4>Quản lý tài khoản người dùng</h4>
                <svg className="w-4 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                </svg>
              </summary>
              <div className="function ms-1 my-2 ps-10 border-s-[2px] border-gray-400 transition duration-600">
                <nav onClick={() => setActiveComponent("xemtknd")}>Xem tài khoản</nav>
                <nav>Hủy tài khoản</nav>
                <nav>Xóa tài khoản</nav>
                <nav>Mở lại tài khoản</nav>
              </div>
            </details>
            <details open={isOpen4}
                     onToggle={(e) => setIsOpen4(e.currentTarget.open)}
                     className=''>
              <summary className={`flex px-1 py-2 transition duration-400 ${
              isOpen4 ? (isDark ? 'bg-emerald-700' : 'bg-lime-500') : (isDark ? 'bg-dark' : 'bg-white')}`}>
                <h4>Quản lý tin tức</h4>
                <svg className="w-4 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                </svg>
              </summary>
              <div className="function ms-1 my-2 ps-10 border-s-[2px] border-gray-400 transition duration-600">
                <nav>Thêm tin tức</nav>
                <nav onClick={() => setActiveComponent("xemtt")}>Xem các tin tức</nav>
              </div>
            </details>
            <details open={isOpen5}
                     onToggle={(e) => setIsOpen5(e.currentTarget.open)}
                     className=''>
              <summary className={`flex px-1 py-2 transition duration-400 ${
              isOpen5 ? (isDark ? 'bg-emerald-700' : 'bg-lime-500') : (isDark ? 'bg-dark' : 'bg-white')}`}>
                <h4>Quản lý danh mục</h4>
                <svg className="w-4 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
                </svg>
              </summary>
              <div className="function ms-1 my-2 ps-10 border-s-[2px] border-gray-400 transition duration-600">
                <nav onClick={()=>setShowPopup(true)}>
                  <span>Thêm danh mục</span>
                </nav>
                <nav onClick={() => setActiveComponent("xemdm")}>Xem danh mục</nav>
              </div>
            </details>
          </div>
          <div className="setting mt-3">
            <h3 className={`font-bold ${isDark ? 'text-gray-400':'text-gray-500'} text-md mb-1`}>Settings</h3>
            <div>
              <h4 onClick={()=>{setIsDark(!isDark); console.log(isDark)}}>Light</h4>
            </div>
            <div>
              <h4>Languages</h4>
            </div>
          </div>
        </div>
        <div className="content-bar w-[65%]">
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}

export default Admin
