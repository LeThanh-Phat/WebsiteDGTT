import axios from "axios";
import { useEffect, useState } from "react";
import Popupdkpdg from "./Popupdkpdg";
import PayPalCheckout from "../PayPalCheckout";
import { useNavigate } from "react-router-dom";


function XemChiTietPDG({ onClose }: { onClose: () => void }) {
    const chitietpdg = JSON.parse(localStorage.getItem("xemctpdg"))
    const user = JSON.parse(localStorage.getItem("userInfo"))
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [popup,setPopup] = useState(null);
    const [idOrder,setidOrder] = useState(null);
    const [Infotkban,setInfotkban] = useState(null);
    const [Infotktg,setInfotktg] = useState(null);
    const [isDk,setdkpdg] = useState(false);
    const [isCountdk,setCountdk] = useState(0);
    const [isAuctionStarted, setIsAuctionStarted] = useState(false);
    const [isMessage,setMessage] = useState("")

    const checkdkphien = async (idphien,idtk) => {
        try {
            const response = await axios.get(`http://localhost:3005/api/dkphien/checkdkphien?idphiendg=${idphien}&idtk=${idtk}`);
            setdkpdg(response.data.dkphien);
        } catch (error) {
            alert('kiểm tra đăng ký phiên thất bại!');
            console.error(error);
        }
    }

    const countdkphien = async (idphien) => {
        try {
            const response = await axios.get(`http://localhost:3005/api/dkphien/countdkphien?idphiendg=${idphien}`);
            const sl = response.data.count[0].sl
            setCountdk(sl);
            return sl;
        } catch (error) {
            alert('Đếm đăng ký phiên thất bại!');
            console.error(error);
        }
    }

    const getGmailtkban = async (idphien) => {
        try {
            const response = await axios.get(`http://localhost:3005/api/phiendaugia/getgmail?idphiendg=${idphien}`);
            setInfotkban(response.data);
            return response.data.gmail
        } catch (error) {
            alert('lấy thông tin đăng tạo phiên thất bại!');
            console.error(error);
        }
    }

    const getInfotg = async (idphien) => {
        try {
            const response = await axios.get(`http://localhost:3005/api/dkphien/getinfo?idphiendg=${idphien}`);
            setInfotktg(response.data);
            return response.data
        } catch (error) {
            alert('lấy thông tin tham gia phiên thất bại!');
            console.error(error);
        }
    }

        const capNhatPhien = async (trangthai, ketquaphien, idphiendg) => {
            try {
                const url = `http://localhost:3005/api/phiendaugia/capnhatpdg?idphiendg=${idphiendg}&trangthai=${encodeURIComponent(trangthai)}&ketquaphien=${encodeURIComponent(ketquaphien)}`;

                const res = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();
                console.log("✅ Cập nhật thành công:", data);
            } catch (err) {
                console.error("❌ Lỗi khi cập nhật phiên:", err);
            }
        };
    
        const guiThu = async (email, noidung) => {
            try {
                const res = await fetch("http://localhost:3005/api/mail/test-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: email,
                    noidung: noidung
                })
                });

                const data = await res.json();
                console.log("✅ Gửi mail thành công:", data.message);
                return { success: true, message: data.message };
            } catch (err) {
                console.error("❌ Lỗi gửi mail:", err);
                return { success: false, message: "Lỗi gửi email" };
            }
        };




    useEffect(() => {
        // Trigger animation sau khi mount
        setTimeout(() => setVisible(true), 10);
        checkdkphien(chitietpdg.idphiendg,user.user.idtk)
        getGmailtkban(chitietpdg.idphiendg)
        countdkphien(chitietpdg.idphiendg)
        getInfotg(chitietpdg.idphiendg)
    }, []);

    useEffect(() => {
    const interval = setInterval(async() => {
        const now = new Date();
        const auctionStartTime = new Date(chitietpdg.thoigianbd);
        if (now >= auctionStartTime && chitietpdg.trangthaipdg == "sắp diễn ra") {
            const sl = await countdkphien(chitietpdg.idphiendg)
            //tối check
            if(sl < 2){
                clearInterval(interval);
                capNhatPhien("đã diễn ra","thất bại",chitietpdg.idphiendg)
                console.log(chitietpdg.idphiendg)
                console.log(isCountdk,"phi")
                alert("Phiên đấu giá kết thúc");
            }
            //gửi mail cho người bán và người tham gia phiên
            guiThu(await getGmailtkban(chitietpdg.idphiendg),"Thông báo phiên của bạn đã được bắt đầu")
            console.log(await getGmailtkban(chitietpdg.idphiendg))
            const tktgdg = await getInfotg(chitietpdg.idphiendg)
            tktgdg.info.map((value,index) => {
                guiThu(value.gmail,"Phiên đấu giá đã bắt đầu")
            })
            
            setIsAuctionStarted(true);
            capNhatPhien("đang diễn ra","",chitietpdg.idphiendg)
            clearInterval(interval); // Ngừng kiểm tra sau khi đến giờ
        }
    }, 1000); // kiểm tra mỗi giây

    return () => clearInterval(interval); // cleanup khi unmount
}, [chitietpdg.thoigianbd]);


  return (
    <div className="overflow-auto">
        {/* {popup && <div className="fixed top-0 left-0 z-50 flex items-center justify-center">
          {popup === 'dktgpdg' && <Popupdkpdg onCancel={() => setPopup(null)} onConfirm={()=>{onApprove()}}/>}
        </div>} */}
    {popup !== 'dktgpdg' && (<div className={`w-screen h-screen bg-trans flex justify-center items-center transition-all duration-1000 ease-in-out transform ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
            <div className="w-100 mx-auto shadow-md p-6 relative bg-white">
                <button onClick={onClose} className="absolute top-3 right-3 text-red-500 font-bold text-2xl">
                ✕
                </button>
        {
           
                <div className='flex mb-10 border p-4'>
                    <div className="img me-3">
                        {chitietpdg.ds_hinhanh?.split(',').map((ha, index) => (
                            <img
                                key={index}
                                src={`http://localhost:3005/uploads/${ha}`}
                                alt=""
                                className="w-20 h-20 object-cover rounded"
                            />
                        ))}
                    </div>
                    <div className="auctions-content">
                        <p>{chitietpdg.tensp}</p>
                        <p>Thời gian bắt đầu: {chitietpdg.thoigianbd}</p>
                        <p>Thời gian kết thúc: {chitietpdg.thoigiankt}</p>
                        <p>Tiền cọc: {chitietpdg.tiencoc}</p>
                        <p>Phí tham gia: {chitietpdg.phithamgia}</p>
                        <p>Trạng thái: {chitietpdg.trangthaipdg}</p>
                        {chitietpdg.trangthaipdg == "đã diễn ra" ? (<p>Kết quả phiên {chitietpdg.ketquaphien}</p>) : (null)}
                        {chitietpdg.trangthaipdg == "đã diễn ra" && chitietpdg.ketquaphien != "thất bại" ?
                        (<p>Giá trúng {chitietpdg.giatiencaonhat}</p>):(null)}
                        <div className="prize flex justify-between">
                            <p>Giá khởi điểm: {chitietpdg.giakhoidiem}</p>
                            <p>10 bids</p>
                        </div>
                        <div className="ship flex justify-between">
                            <p>Free shipping</p>
                            <p>4d 14h</p>
                        </div>
                        <p>Số người tham gia đấu giá: {isCountdk}</p>
                        <p>Tổng tiền đăng ký tham gia: {parseFloat(chitietpdg.tiencoc) + parseFloat(chitietpdg.phithamgia)}</p>
                        {chitietpdg.trangthaipdg == "sắp diễn ra" || chitietpdg.trangthaipdg == "đang diễn ra" ? (Infotkban != null && user.user.idtk != Infotkban.idtk ? 
                        (isDk ? 
                            (isAuctionStarted || chitietpdg.trangthaipdg == "đang diễn ra" ? (
                                <button className="bg-lime-300 p-2" onClick={()=>navigate('/tragia')}>Tham gia phiên đấu giá</button>
                                ) : (
                                <button className="bg-gray-300 p-2" disabled>Tham gia phiên đấu giá</button>
                            ))
                            : 
                            ((chitietpdg.trangthaipdg == "đang diễn ra") ? (<p>Phiên này đang diễn ra, bạn không thể tham gia phiên này</p>) : (<div>
                                <h4>Để tham gia, bạn sẽ thanh toán phí đăng ký bằng paypal tại đây</h4>
                                <PayPalCheckout amount={`${parseFloat(chitietpdg.tiencoc) + parseFloat(chitietpdg.phithamgia)}`}/>
                            </div>)))
                         : 
                        (<button className="bd-sky-500 p-2">Đây là phiên của bạn</button>)) : (null)}                       
                    </div>
                </div>
        }
        </div>
    </div>)}
    </div>
  )
}

export default XemChiTietPDG
