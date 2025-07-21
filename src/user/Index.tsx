import '../App.css'
import logo from '../assets/feefat.png'
import criativo from '../assets/criativo.png'
import hinh from '../assets/background-nd-index.png'
import sdg1 from '../assets/sdg1.png'
import sdg2 from '../assets/sdg2.png'
import sdg3 from '../assets/sdg3.png'
import ddg1 from '../assets/ddg1.png'
import ddg2 from '../assets/ddg2.png'
import ddg3 from '../assets/ddg3.png'
import tt from '../assets/tt.png'
import arrow from '../assets/arrow.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PayPalCheckout from '../PayPalCheckout.tsx'
import Clock from '../Clock.tsx'
import RegisterUser from './RegisterUser.tsx'
import LoginUser from './LoginUser.tsx'
import { useNavigate } from 'react-router-dom'

function Index() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [danhmuc, setDanhMuc] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [popup, setPopup] = useState(null);
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

    const loadDanhMuc = async () => {
        try {
        const response = await axios.get('http://localhost:3005/api/danhmuc/xemdm');
        console.log(response.data);
        setDanhMuc(response.data);
        localStorage.setItem('danhmuc',JSON.stringify(response.data));
        } catch (error) {
        alert('load danh mục thất bại!');
        console.error(error);
        }
    }

    useEffect(()=>{
        loadDanhMuc();
    },[])

  return (
    <>
      <div className='header flex items-center justify-around relative'>
        {/* <div className='popup fixed top-0 left-0'>
          {showPopup && <RegisterUser onClose={() => setShowPopup(false)}/>}
        </div>
        <div className='popup fixed top-0 left-0'>
          {showPopup1 && <LoginUser onClose={() => setShowPopup1(false)}/>}
        </div> */}
        {popup && (<div className="fixed top-0 left-0 z-50 flex items-center justify-center">
          {popup === 'login' && <LoginUser onClose={() => setPopup(null)} onSwitch={() => setPopup('register')} />}
          {popup === 'register' && <RegisterUser onClose={() => setPopup(null)} />}
        </div>)}
        <div className="logo">
          <img src={logo} alt="" className='w-20 h-20'/>
        </div>
        <div className="menu flex justify-between w-[60%]">
          <nav className='group'>
            <nav className='danhmuc flex peer group'>
              <p className='group-hover:text-red-600 transition duration-400 me-2 items-center'>Tạo đấu giá</p>
              <svg className="w-4 group-hover:text-red-600 transition duration-400 group-hover:rotate-[180deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
              </svg>  
            </nav>
            <nav className='hover-menu peer-hover:translate-y-7 group-hover:translate-y-7 group-hover:opacity-100 peer-hover:opacity-100 -translate-y-20 translate duration-2000 opacity-0 bg-white z-10 shadow-lg rounded-md absolute'>
              <nav className='py-2 px-3' onClick={()=>navigate('/sptao')}>Sản phẩm đấu giá</nav>
              <nav className='py-2 px-3' onClick={()=>navigate('/phiendaugia')}>Phiên đấu giá</nav>
            </nav>  
          </nav>
          
          <nav className='group'>
            <nav className='pdg flex peer group'>
              <p className='group-hover:text-red-600 transition duration-400 me-2 items-center'>Phiên đấu giá</p>
              <svg className="w-4 group-hover:text-red-600 transition duration-400 group-hover:rotate-[180deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
              </svg>  
            </nav>
            <nav className='hover-menu peer-hover:translate-y-7 peer-hover:opacity-100 group-hover:translate-y-7 group-hover:opacity-100 -translate-y-60 translate duration-2000 opacity-0 bg-white z-10 shadow-lg rounded-md absolute'>
              <nav className='py-2 px-3'>Phiên đấu giá sắp diễn ra</nav>
              <nav className='py-2 px-3'>Phiên đấu giá đã diễn ra</nav>
              <nav className='py-2 px-3'>Phiên đấu giá đang diễn ra</nav>
            </nav>  
          </nav>
          <nav className='group'>
            <nav className='pdg flex peer group'>
              <p className='group-hover:text-red-600 transition duration-400 me-2 items-center'>Danh mục sản phẩm</p>
              <svg className="w-4 group-hover:text-red-600 transition duration-400 group-hover:rotate-[180deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/>
              </svg>  
            </nav>
            <nav className='hover-menu peer-hover:translate-y-7 peer-hover:opacity-100 group-hover:translate-y-7 group-hover:opacity-100 -translate-y-60 translate duration-2000 opacity-0 bg-white z-10 shadow-lg rounded-md absolute'>
              {/* <nav className='py-2 px-3'>Đồ cổ</nav>
              <nav className='py-2 px-3'>Thẻ bài</nav>
              <nav className='py-2 px-3'>Pokemon</nav>
              <nav className='py-2 px-3'>Pikachu</nav>
              <nav className='py-2 px-3'>Dragon</nav>
              <nav className='py-2 px-3'>Charizard</nav> */}
              {
                danhmuc.map((value,key)=>(
                  <nav className='py-2 px-3' id={`${key}`}>{value.tendm}</nav>
                ))
              }
            </nav>  
          </nav>
          <nav className='hover:text-red-600 transition duration-400'>Ngôn ngữ</nav>
          <nav className='hover:text-red-600 transition duration-400'>Tin tức</nav>
        </div>
        <div className="tool flex items-center justify-self-end">
          <div className="search me-5">
          <div className="p-2 border border-gray-400 rounded-full w-fit">
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          </div>
            {!user ? (
              <div className="btn block">
              <button className='px-3 py-1 bg-lime-400 rounded-lg' onClick={()=>setPopup('login')}>Đăng nhập</button>
              <button className='px-3 py-1 bg-lime-400 rounded-lg ms-4' onClick={()=>setPopup('register')}>Đăng ký</button>
              </div>
            ) : (<div className='btn block'>
              <h4>Xin chào !!!</h4>
              <button className='px-3 py-1 bg-lime-400 rounded-lg ms-4' onClick={()=>{localStorage.removeItem('userInfo'); location.reload()}}>Đăng xuất</button>
            </div>)}
        </div>
        
      </div>
      <div className="body">
        <div className="content py-8 bg-no-repeat bg-cover flex flex-col items-center" style={{ backgroundImage: `url(${hinh})` }}>
          <h3 className='font-bold text-2xl mb-12 mt-20'>Website đấu giá trực tiếp FEEFAT</h3>
          <p className='content-words w-[75%] mb-5'>
            FEEFAT nơi bạn có thể tìm sản phẩm theo nhu cầu của bản thân và mua hàng thông qua hình thức đấu giá mới lạ, giúp trải nghiệm mua hàng thú vị và không kém phần hồi hộp. Bằng sự đơn giản và giao diện thân thiên mong sẽ mang đến trải nghiệp tốt cho  người dùng. Tạo ra xu thế mua hàng đấu giá phô biến hơn trong tương lai
          </p>
          <img src={criativo} alt="" className='border-none'/>
        </div>
        <div className="sap">
          <h3 className='text-center py-15 text-2xl font-bold'>Các sản phẩm sắp đấu giá</h3>
          <div className='bg-lime-50'>
            <div className='imgsap flex justify-around pt-17 pb-5'>
              <div className='bg-white px-4 py-2 rounded-lg text-center shadow-md w-[40]'>
                <p className='font-bold text-gray-400 mt-2'>Thời gian đấu giá</p>
                <p className='mt-1'>23/3/2023</p>
                <img src={sdg1} alt="" className='h-40 mt-3 '/>
                <h5 className='w-40 text-start my-2 font-bold leading-5'>Pokemon đầu trứng có 1 không 2</h5>
                <p className=''>Giá khởi điểm: <span className='text-red-400 font-bold'>200</span> USD</p>
                <button className='px-4 py-2 font-bold bg-leaf my-4 rounded-lg'>Xem chi tiết</button>
              </div>
              <div className='bg-white px-4 py-2 rounded-lg text-center shadow-md w-[40]'>
                <p className='font-bold text-gray-400 mt-2'>Thời gian đấu giá</p>
                <p className='mt-1'>23/3/2023</p>
                <img src={sdg2} alt="" className='h-40 mt-3 '/>
                <h5 className='w-40 text-start my-2 font-bold leading-5'>Bộ sưu tập Pokemon ý chí rồng thiêng</h5>
                <p className=''>Giá khởi điểm: <span className='text-red-400 font-bold'>200</span> USD</p>
                <button className='px-4 py-2 font-bold bg-leaf my-4 rounded-lg'>Xem chi tiết</button>
              </div>
              <div className='bg-white px-4 py-2 rounded-lg text-center shadow-md w-[40]'>
                <p className='font-bold text-gray-400 mt-2'>Thời gian đấu giá</p>
                <p className='mt-1'>23/3/2023</p>
                <img src={sdg3} alt="" className='h-40 mt-3 '/>
                <h5 className='w-40 text-start my-2 font-bold leading-5'>Thợ săn đồ cổ Việt Nam</h5>
                <p className=''>Giá khởi điểm: <span className='text-red-400 font-bold'>200</span> USD</p>
                <button className='px-4 py-2 font-bold bg-leaf my-4 rounded-lg'>Xem chi tiết</button>
              </div>
            </div>
            <div className='arrow flex justify-center pb-1'>
              <img src={arrow} alt="" className='w-18 h-18'/>
              <img src={arrow} alt="" className='w-18 h-18 rotate-[180deg]'/>
            </div>
            <div className='btn flex justify-center'>
              <button className='px-5 py-3 font-bold bg-emerald-300 my-4 rounded-lg'>Xem tất cả</button>
            </div>
          </div>
        </div>
        <div className="da">
          <h3 className='text-center py-15 text-2xl font-bold'>Các sản phẩm đã đấu giá</h3>
          <div className='bg-lime-50'>
            <div className='imgsap flex justify-around pt-17 pb-5'>
              <div className='bg-white px-4 py-2 rounded-lg text-center shadow-md w-[40]'>
                <p className='f1ont-bold text-gray-400 mt-2'>Thời gian đấu giá</p>
                <p className='mt-1'>23/3/2023</p>
                <img src={ddg1} alt="" className='h-40 mt-3 data-twe-lazy-src data-twe-lazy-load-init'/>
                <h5 className='w-40 text-start my-2 font-bold leading-5'>Pokemon đầu trứng có 1 không 2</h5>
                <p className=''>Giá khởi điểm: <span className='text-red-400 font-bold'>200</span> USD</p>
                <button className='px-4 py-2 font-bold bg-leaf my-4 rounded-lg'>Xem chi tiết</button>
              </div>
              <div className='bg-white px-4 py-2 rounded-lg text-center shadow-md w-[40]'>
                <p className='font-bold text-gray-400 mt-2'>Thời gian đấu giá</p>
                <p className='mt-1'>23/3/2023</p>
                <img src={ddg2} alt="" className='h-40 mt-3 '/>
                <h5 className='w-40 text-start my-2 font-bold leading-5'>Bộ sưu tập Pokemon ý chí rồng thiêng</h5>
                <p className=''>Giá khởi điểm: <span className='text-red-400 font-bold'>200</span> USD</p>
                <button className='px-4 py-2 font-bold bg-leaf my-4 rounded-lg'>Xem chi tiết</button>
              </div>
              <div className='bg-white px-4 py-2 rounded-lg text-center shadow-md w-[40]'>
                <p className='font-bold text-gray-400 mt-2'>Thời gian đấu giá</p>
                <p className='mt-1'>23/3/2023</p>
                <img src={ddg3} alt="" className='h-40 mt-3 '/>
                <h5 className='w-40 text-start my-2 font-bold leading-5'>Thợ săn đồ cổ Việt Nam</h5>
                <p className=''>Giá khởi điểm: <span className='text-red-400 font-bold'>200</span> USD</p>
                <button className='px-4 py-2 font-bold bg-leaf my-4 rounded-lg'>Xem chi tiết</button>
              </div>
            </div>
            <div className='arrow flex justify-center pb-1'>
              <img src={arrow} alt="" className='w-18 h-18'/>
              <img src={arrow} alt="" className='w-18 h-18 rotate-[180deg]'/>
            </div>
            <div className='btn flex justify-center'>
              <button className='px-5 py-3 font-bold bg-emerald-300 my-4 rounded-lg'>Xem tất cả</button>
            </div>
          </div>
        </div>
        <div className="tintuc">
          <h3 className='text-center py-15 text-2xl font-bold'>Tin tức</h3>
          <div className='bg-lime-50'>
            <div className='imgsap flex justify-around pt-17 pb-5'>
              <div className='bg-white px-4 py-2 rounded-lg text-center shadow-md w-[40]'>
                <p className='font-bold text-gray-400 mt-2'>Thời gian đấu giá</p>
                <p className='mt-1'>23/3/2023</p>
                <img src={tt} alt="" className='h-40 mt-3 '/>
                <h5 className='w-40 text-start my-2 font-bold leading-5'>Pokemon đầu trứng có 1 không 2</h5>
                <p className=''>Giá khởi điểm: <span className='text-red-400 font-bold'>200</span> USD</p>
                <button className='px-4 py-2 font-bold bg-leaf my-4 rounded-lg'>Xem chi tiết</button>
              </div>
              <div className='bg-white px-4 py-2 rounded-lg text-center shadow-md w-[40]'>
                <p className='font-bold text-gray-400 mt-2'>Thời gian đấu giá</p>
                <p className='mt-1'>23/3/2023</p>
                <img src={tt} alt="" className='h-40 mt-3 '/>
                <h5 className='w-40 text-start my-2 font-bold leading-5'>Bộ sưu tập Pokemon ý chí rồng thiêng</h5>
                <p className=''>Giá khởi điểm: <span className='text-red-400 font-bold'>200</span> USD</p>
                <button className='px-4 py-2 font-bold bg-leaf my-4 rounded-lg'>Xem chi tiết</button>
              </div>
              <div className='bg-white px-4 py-2 rounded-lg text-center shadow-md w-[40]'>
                <p className='font-bold text-gray-400 mt-2'>Thời gian đấu giá</p>
                <p className='mt-1'>23/3/2023</p>
                <img src={tt} alt="" className='h-40 mt-3 '/>
                <h5 className='w-40 text-start my-2 font-bold leading-5'>Thợ săn đồ cổ Việt Nam</h5>
                <p className=''>Giá khởi điểm: <span className='text-red-400 font-bold'>200</span> USD</p>
                <button className='px-4 py-2 font-bold bg-leaf my-4 rounded-lg'>Xem chi tiết</button>
              </div>
            </div>
            <div className='arrow flex justify-center pb-1'>
              <img src={arrow} alt="" className='w-18 h-18'/>
              <img src={arrow} alt="" className='w-18 h-18 rotate-[180deg]'/>
            </div>
            <div className='btn flex justify-center'>
              <button className='px-5 py-3 font-bold bg-emerald-300 my-4 rounded-lg'>Xem tất cả</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer mt-15 bg-midnight text-white flex justify-around pt-12 pb-15">
        <div className="vct leading-8">
          <h5 className='font-bold'>Về chúng tôi</h5>
          <p>Giới thiệu</p>
          <p>Hướng dẫn sử dụng</p>
          <p>Điều khoản</p>
        </div>
        <div className="lienhe leading-8">
          <h5 className='font-bold'>Liên hệ</h5>
          <p>SĐT: 0945193939</p>
          <p>Email: lethanhphat0910@gmail.com</p>
        </div>
        <div className="dichvu leading-8">
          <h5 className='font-bold'>Dịch vụ</h5>
          <p>Tin tức</p>
          <p>Mua và bán</p>
          <p>Hoa hồng khi bán</p>
          <div>
            <i>Facebook</i>
          </div>
        </div>
      </div>
      <div style={{ padding: 50 }}>
        <h1>PayPal Checkout Demo</h1>
        <PayPalCheckout amount="15.00" />
      </div>
      <div>
      </div>
      <div>
        <Clock></Clock>
      </div>
    </>
    
  )
}

export default Index
