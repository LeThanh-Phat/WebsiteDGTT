import axios from 'axios';
import sdg1 from '../assets/sdg1.png'
import sdg2 from '../assets/sdg2.png'
import { useEffect, useState } from 'react';
import XemChiTietPDG from './XemChiTietPDG';
import { useLocation } from 'react-router-dom';

function PhienDauGia() {
    const nguoiTrung = JSON.parse(localStorage.getItem("nguoi_trung"));
    console.log("👑 Người trúng phiên là:", nguoiTrung);

    const danhmuc = JSON.parse(localStorage.getItem("danhmuc"))

    const [pdg,setpdg] = useState([]);
    const [popup,setPopup] = useState(null);

    
    const loadpdg = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/api/phiendaugia/xempdg`);
            setpdg(response.data);
        } catch (error) {
            alert('Load phiên thất bại!');
            console.error(error);
        }
    }

    const locpdg = async (trangthai = '') => {
        try {
            const response = await axios.get(`http://localhost:3005/api/phiendaugia/loctrangthai?trangthai=${trangthai}`);
            setpdg(response.data.data);
        } catch (error) {
            alert('Lọc phiên thất bại!');
            console.error(error);
        }
    }

    const xemctpdg = async (idphiendg = '') => {
        try {
            const response = await axios.get(`http://localhost:3005/api/phiendaugia/chitietphiendaugia?idphiendg=${idphiendg}`);
            localStorage.setItem('xemctpdg',JSON.stringify(response.data));
            setPopup('xemct')
        } catch (error) {
            alert('Xem chi tiết phiên thất bại!');
            console.error(error);
        }
    }

    useEffect(()=>{
        loadpdg();
    },[])
  return (
    <div>
        {popup && <div className="fixed top-0 left-0 z-50 flex items-center justify-center">
          {popup === 'xemct' && <XemChiTietPDG onClose={() => setPopup(null)} />}
        </div>}
        <h3 className='font-bold text-2xl p-[2.5%]'>Auctions Ending Soon</h3>
        <div className="body flex justify-around">
            <div className="side-bar w-[20%]">
                <div className="category">
                    <h4 className='font-bold'>Shop by category</h4>
                    {danhmuc.map((value,key)=>(
                        <nav className='' id={`${key}`}>{value.tendm}</nav>
                    ))}
                    <nav>Tất cả</nav>
                </div>
                <div className="pdg mt-15">
                    <h4 className='font-bold'>Trạng thái</h4>
                    <div>
                        <p onClick={()=>locpdg("đã diễn ra")}>Đã diễn ra</p>
                        <p onClick={()=>locpdg("đang diễn ra")}>Đang diễn ra</p>
                        <p onClick={()=>locpdg("sắp diễn ra")}>Sắp diễn ra</p>
                        <p onClick={()=>loadpdg()}>Tất cả</p>
                    </div>
                </div>
            </div>
            <div className="auctions w-[70%]">
                {/* <div className='flex'>
                        <div className="img me-3">
                            <img src={sdg1} alt=""/>
                        </div>
                        <div className="auctions-content">
                            <p>Ending Soon - Fabulous Grey Fox Tail Vest - one size fits most - very unique</p>
                            <p>Thời gian bắt đầu: 18/9/2024</p>
                            <p>Thời gian kết thúc: 21/9/2021</p>
                            <p>Tiền cọc: 500.000 VNĐ</p>
                            <p>Phí tham gia: 200.000 VNĐ</p>
                            <p>Pre-Owned - Unbranded</p>
                            <div className="prize flex justify-between">
                                <p>2,299,528.00</p>
                                <p>0 bids</p>
                            </div>
                            <div className="ship flex justify-between">
                                <p>Free shipping</p>
                                <p>4d 14h</p>
                            </div>
                        </div>
                    </div> */}
                {pdg.map((value, idx) => (
                    <div className='flex mb-10 border p-4'>
                        <div className="img me-3">
                            {value.ds_hinhanh?.split(',').map((ha, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:3005/uploads/${ha}`}
                                    alt=""
                                    className="w-20 h-20 object-cover rounded"
                                />
                            ))}
                        </div>
                        <div className="auctions-content">
                            <p>{value.tensp}</p>
                            <p>Thời gian bắt đầu: {value.thoigianbd}</p>
                            <p>Thời gian kết thúc: {value.thoigiankt}</p>
                            <p>Tiền cọc: {value.tiencoc}</p>
                            <p>Phí tham gia: {value.phithamgia}</p>
                            <p>Trạng thái: {value.trangthaipdg}</p>
                            {value.trangthaipdg == "đã diễn ra" ? (<p>Kết quả phiên: {value.ketquaphien}</p>):(null)}
                            <div className="prize flex justify-between">
                                <p>Giá khởi điểm: {value.giakhoidiem}</p>
                                <p>10 bids</p>
                            </div>
                            
                            {value.trangthaipdg == "đã diễn ra" && value.ketquaphien != "thất bại" ? 
                            (<div className=''>
                                <p>Giá trúng: {value.giatiencaonhat}</p>
                            </div>) : 
                            (<div></div>)}
                            <div className="ship flex justify-between">
                                <p>Free shipping</p>
                                <p>4d 14h</p>
                            </div>
                            <button className='bg-sky-300 p-2' onClick={()=>{xemctpdg(value.idphiendg);}}>Xem chi tiết</button>
                        </div>
                    </div>
                    ))}
                {/* <div className='flex mt-5'>
                    <div className="img  me-3">
                        <img src={sdg1} alt="" />
                    </div>
                    <div className="auctions-content">
                        <p>Ending Soon - Fabulous Grey Fox Tail Vest - one size fits most - very unique</p>
                        <p>Pre-Owned - Unbranded</p>
                        <div className="prize flex justify-between">
                            <span>2,299,528.00</span>
                            <span>0 bids</span>
                        </div>
                        <div className="ship flex justify-between">
                            <span>Free shipping</span>
                            <span>4d 14h</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default PhienDauGia
