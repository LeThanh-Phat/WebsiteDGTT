import '../App.css';
import React, { use, useEffect, useRef, useState } from 'react';
import logo from '../assets/feefat.png'
import CountdownTimer from '../CountdownTimer';
import { io } from "socket.io-client";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const socket = io("http://localhost:3005");
//import pkmhinhanh from '../assets/PKM_Box_.jpg'
function Tragia() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const infophien = JSON.parse(localStorage.getItem('xemctpdg'));
    const [tab, setTab] = useState('history');
    const [bidValue, setBidValue] = useState(infophien.giakhoidiem);
    const [giacaonhat,setGCN] = useState(Number(infophien.giakhoidiem) + Number(infophien.buocgia)*10);
    const [giatoithieu,setGTT] = useState(Number(infophien.giakhoidiem) + Number(infophien.buocgia))
    const [savegiatra,setSavegiatra] = useState(0.00);
    const [lan, setlan] = useState(0);
    const [nguoithamgiapdg,setnguoitg] = useState(0);
    const [luottragia,setluottragia] = useState(0);
    const [historyData,setHistoryData] = useState([])
    const [giatracaonhat,setGiaTraCaoNhat] = useState(Number(infophien.giakhoidiem))
    const [hienthiGiaCaoNhat, setHienthiGiaCaoNhat] = useState(() => {
  // lấy từ localStorage nếu có, không thì lấy giá khởi điểm
        const saved = localStorage.getItem(`giacaonhat_1p_${infophien.idphiendg}`);
        return saved ? Number(saved) : Number(infophien.giakhoidiem);
    });
    const [shouldstop,setShouldStop] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const isHandledRef = useRef(false); // Dùng để ngăn gọi lại handleOnTick nhiều lần
    const navigate = useNavigate();

    const giaRef = useRef(hienthiGiaCaoNhat);

    const resetHandledRef = () => {
        console.log("Reset isHandledRef");
        isHandledRef.current = false;
    };

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

    const songuoithamgiadg = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/api/dkphien/countdkphien?idphiendg=${infophien.idphiendg}`);
            console.log(response.data.count[0].sl)
            setnguoitg(response.data.count[0].sl);
        } catch (error) {
            alert('Load phiên thất bại!');
            console.error(error);
        }
    }

    // const historyData = [
    //     { idtk: 'user01', sotientragia: '200.000 VND', thoigiantragia: '28/06/2025 10:00:00' },
    //     { idtk: 'user02', sotientragia: '210.000 VND', thoigiantragia: '28/06/2025 10:05:00' },
    //     { idtk: 'user03', sotientragia: '220.000 VND', thoigiantragia: '28/06/2025 10:10:00' },
    //     { idtk: 'user03', sotientragia: '220.000 VND', thoigiantragia: '28/06/2025 10:10:00' },
    // ];
    const productInfo = (
        <div className="text-base leading-7">
            <div><b>Tên sản phẩm:</b>{infophien.tensp}</div>
            <div><b>Mã sản phẩm:</b>{infophien.idsp}</div>
            <div><b>Mô tả:</b> </div>
            <div><b>Giá khởi điểm:</b> {infophien.giakhoidiem}</div>
            <div><b>Thời gian đấu giá:</b>{infophien.thoigianbd} - {infophien.thoigiankt}</div>
            <div><b>Đơn vị tổ chức:</b> Công ty FEEEFAT</div>
        </div>
    );

    const demLan = () => {
        const data = {
            idtk: userInfo.user.idtk,
            idphiendg: infophien.idphiendg,
        };
        console.log("Emit lan_tra_gia:", data);
        socket.emit("lan_tra_gia", data); // yêu cầu server gửi lại số lần
        socket.emit("gia_cao_nhat_1", data);
        socket.emit("xuat_info_tra_gia",data);
    };

    const demLuot = () => {
        const data = {
            idphiendg: infophien.idphiendg
        };
        socket.emit("dem_nguoi_tra_gia",data)
        socket.emit("gia_cao_nhat_2",data)
    }

    const handleOnTick = () => {
        const infophien = JSON.parse(localStorage.getItem("xemctpdg"));
        if (!infophien || isHandledRef.current) return;

        // ✅ Ngăn chạy lại lần 2 trong vòng tick này
        isHandledRef.current = true;
        console.log("🟢 [handleOnTick] Đang xử lý tick mới");

        // 🔹 1. Lấy người trả giá cao nhất
        socket.emit("gia_cao_nhat_2", { idphiendg: infophien.idphiendg });

        const giaHandler = (res) => {
            const gia = res[0]?.sotientragia || Number(infophien.giakhoidiem);
            giaRef.current = gia;
            setGiaTraCaoNhat(gia);
            localStorage.setItem(`giacaonhat_1p_${infophien.idphiendg}`, gia);

            setTimeout(() => {
                setHienthiGiaCaoNhat(gia);
                setGCN(Number(giaRef.current) + Number(infophien.buocgia)*10)
                setGTT(Number(giaRef.current) + Number(infophien.buocgia))
            }, 5000);

            socket.off("gia_cao_nhat_2", giaHandler); // ✅ clear listener sau khi nhận
        };
        socket.on("gia_cao_nhat_2", giaHandler);

        // 🔹 2. Đếm lượt trả giá
        socket.emit("dem_nguoi_tra_gia", { idphiendg: infophien.idphiendg });

        const demHandler = (res) => {
            const slHientai = res[0]?.luottg || 0;
            const slTruoc = Number(localStorage.getItem("sl_tragia_truocdo") || 0);
            setluottragia(slHientai)
            console.log("🧮 Lượt trả giá trước:", slTruoc);
            console.log("📊 Lượt hiện tại:", slHientai);

            if (slHientai === slTruoc) {
                console.log("✅ Không ai trả giá trong 1 phút → kết thúc phiên!");
                setShouldStop(true);
                setIsFinished(true);

                socket.emit("ket_thuc_phien", { idphiendg: infophien.idphiendg }, (nguoiTrung) => {
                    console.log("🎯 Người trúng phiên:", nguoiTrung);
                    localStorage.setItem("nguoi_trung", JSON.stringify(nguoiTrung));
                });

                socket.off("ket_thuc_phien"); // ✅ clear listener
                capNhatPhien("đã diễn ra","chưa thanh toán",infophien.idphiendg)
                navigate("/phiendaugia");
            } else {
                localStorage.setItem("sl_tragia_truocdo", slHientai);
            }

            socket.off("dem_nguoi_tra_gia", demHandler); // ✅ clear listener
        };
        socket.on("dem_nguoi_tra_gia", demHandler);
        };



    useEffect(() => {
        songuoithamgiadg();
    },[])

    useEffect(()=>{
        return () => {
            socket.off("dem_nguoi_tra_gia");
            socket.off("gia_cao_nhat_2");
        };
    })

    useEffect(() => {
        demLan(); // Gọi khi vào trang
        demLuot();
        console.log("okok")
        socket.on("lan_tra_gia", (soLan) => {
            console.log("Số lần trả giá nhận được từ server:", soLan);
            setlan(soLan); // Cập nhật số lần
        });

        socket.on("gia_cao_nhat_1", (sotientragia) => {
            console.log("Số tiền cao nhất được trả của bạn: ", sotientragia);
            setSavegiatra(sotientragia); // Cập nhật số lần
            const sotientralansau = Number(sotientragia)
            setGTT(giatoithieu > sotientralansau ? giatoithieu : sotientralansau);
            if((giatoithieu > sotientralansau ? giatoithieu : sotientralansau) > bidValue)
                setBidValue(giatoithieu > sotientralansau ? giatoithieu : sotientralansau)
        });

        socket.on("dem_nguoi_tra_gia",(songuoitragia) => {
            console.log(songuoitragia[0].luottg);
            setluottragia(songuoitragia[0].luottg)
        })

        socket.on("xuat_info_tra_gia",(infotragia)=>{
            setHistoryData(infotragia);
            console.log(infotragia)
        })

        // socket.on("gia_cao_nhat_2",(giacaonhat2) => {
        //     giaRef.current = giacaonhat2[0].sotientragia
        //     setGiaTraCaoNhat(giacaonhat2[0].sotientragia)
        //     setHienthiGiaCaoNhat(giaRef.current)
        // })

        console.log("kokok")

        socket.on("cap_nhat_gia", (data) => {
                if (data.idtk === userInfo.user.idtk) {
                    setSavegiatra(data.sotientragia);
                }
                demLan(); // Mỗi khi có ai đặt giá mới, gọi lại
            });

            return () => {
                socket.off("lan_tra_gia");
                socket.off("gia_cao_nhat_1");
            };
    }, [setSavegiatra]);


    return (
        <>
            <div className='header flex items-center justify-around relative'>
                <div className="logo">
                    <img src={logo} alt="" className='w-20 h-20' />
                </div>
                <div className="menu flex justify-between w-[60%]">
                    <nav className='group'>
                        <nav className='danhmuc flex peer group'>
                            <p className='group-hover:text-red-600 transition duration-400 me-2 items-center'>Tạo đấu giá</p>
                            <svg className="w-4 group-hover:text-red-600 transition duration-400 group-hover:rotate-[180deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                            </svg>
                        </nav>
                        <nav className='hover-menu peer-hover:translate-y-7 group-hover:translate-y-7 group-hover:opacity-100 peer-hover:opacity-100 -translate-y-20 translate duration-2000 opacity-0 bg-white z-10 shadow-lg rounded-md absolute'>
                            <nav className='py-2 px-3'>Sản phẩm đấu giá</nav>
                            <nav className='py-2 px-3'>Phiên đấu giá</nav>
                        </nav>
                    </nav>

                    <nav className='group'>
                        <nav className='pdg flex peer group'>
                            <p className='group-hover:text-red-600 transition duration-400 me-2 items-center'>Phiên đấu giá</p>
                            <svg className="w-4 group-hover:text-red-600 transition duration-400 group-hover:rotate-[180deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
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
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                            </svg>
                        </nav>
                        <nav className='hover-menu peer-hover:translate-y-7 peer-hover:opacity-100 group-hover:translate-y-7 group-hover:opacity-100 -translate-y-60 translate duration-2000 opacity-0 bg-white z-10 shadow-lg rounded-md absolute'>
                            <nav className='py-2 px-3'>Đồ cổ</nav>
                            <nav className='py-2 px-3'>Thẻ bài</nav>
                            <nav className='py-2 px-3'>Pokemon</nav>
                            <nav className='py-2 px-3'>Pikachu</nav>
                            <nav className='py-2 px-3'>Dragon</nav>
                            <nav className='py-2 px-3'>Charizard</nav>
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
                    <div className="btn block">
                        <button className='px-3 py-1 bg-lime-400 rounded-lg'>xinchao,Lefat</button>
                    </div>
                </div>

            </div>
            <div className="body flex flex-col items-center bg-white py-10 min-h-[700px]">
                <div className="w-[90%] max-w-5xl flex flex-col gap-4 bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-2 text-left">{infophien.tensp}</h2>
                    <div className="flex gap-8">
                        {/* Left: Product Image */}
                        <div className="flex-1 flex flex-col items-center justify-center">
                            {infophien.ds_hinhanh?.split(',').map((ha, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:3005/uploads/${ha}`}
                                    alt=""
                                    className="w-50 h-50 object-cover rounded"
                                />
                            ))}
                        </div>
                        {/* Right: Product Info */}
                        <div className="flex-[2] flex flex-col gap-6">
                            {/* Title & Timer */}
                            <CountdownTimer
                                onTick={handleOnTick}
                                onNewMinute={resetHandledRef}
                                shouldStop={shouldstop}
                                isFinished={isFinished}
                            />


                            {/* Info Table */}
                            <div className="bg-gray-50 rounded-lg p-4 border text-sm mb-4">
                                <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                                    <div>Mã sản phẩm</div><div>{infophien.idsp}</div>
                                    <div>Phí đăng ký tham gia</div><div>{infophien.phithamgia}</div>
                                    <div>Bước giá</div><div>{infophien.buocgia}</div>
                                    <div>Tiền cọc</div><div>{infophien.tiencoc}</div>
                                    <div>Giá khởi điểm</div><div>{infophien.giakhoidiem}</div>
                                    <div>Phương thức đấu giá</div><div>Trả giá lên</div>
                                    <div>Tổ chức đấu giá tài sản</div><div>Công ty FEEEFAT</div>
                                    <div>Số người đăng ký</div><div>{nguoithamgiapdg}</div>
                                    <div>Thời gian bắt đầu trả giá</div><div>{infophien.thoigianbd}</div>
                                    <div>Thời gian kết thúc trả giá</div><div>None</div>
                                    <div>Giá cao nhất của bạn</div><div>{savegiatra}</div>
                                    <div>Số lần trả giá của bạn</div><div>{lan}</div>
                                </div>
                            </div>
                            {/* Đặt giá */}
                            <div className="flex items-center gap-4 mb-2">
                                <span className="font-semibold">Đặt giá</span>
                                <button className="w-8 h-8 rounded bg-gray-200 text-xl font-bold flex items-center justify-center">-</button>
                                <input
                                    type="number"
                                    value={bidValue}
                                    onChange={e => setBidValue(e.target.value)}
                                    className="w-32 text-center border rounded px-2 py-1 appearance-none hide-number-spin"
                                    max = {giacaonhat}
                                    min = {giatoithieu}
                                />
                                <button className="w-8 h-8 rounded bg-gray-200 text-xl font-bold flex items-center justify-center">+</button>
                                <button
                                    className="ml-2 w-8 h-8 rounded bg-lime-500 text-white flex items-center justify-center text-xl"
                                    onClick={() => {
                                        const data = {
                                        idtk: userInfo.user.idtk, // từ localStorage hoặc props
                                        idphiendg: infophien.idphiendg, // id phiên đang mở
                                        sotientragia: parseInt(bidValue), // giá vừa nhập
                                        thoigiantragia: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19).replace("T", " "),
                                        solantragia: lan + 1,
                                        };

                                        socket.emit("dat_gia_moi", data);

                                            setTimeout(() => {
                                                socket.emit("lan_tra_gia", {
                                                    idtk: userInfo.user.idtk,
                                                    idphiendg: infophien.idphiendg,
                                                });
                                                socket.emit("gia_cao_nhat_1", {
                                                    idtk: userInfo.user.idtk,
                                                    idphiendg: infophien.idphiendg,
                                                });
                                                socket.emit("xuat_info_tra_gia", {
                                                    idtk: userInfo.user.idtk,
                                                    idphiendg: infophien.idphiendg,
                                                });
                                                socket.emit("dem_nguoi_tra_gia", {
                                                    idphiendg: infophien.idphiendg,
                                                });
                                            }, 300);
                                        }}
                                    >
                                    <span>✓</span>
                                </button>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">Giá cao nhất hiện tại <span className="font-semibold text-black">{hienthiGiaCaoNhat} $</span></div>
                            <div  className="text-sm text-gray-500 mb-2">Khoảng giá hiện tại từ <span className="font-semibold text-black">{giatoithieu} $</span> đến <span className="font-semibold text-black">{giacaonhat} $</span></div>
                            <div className="text-sm text-gray-500 mb-2">Số lượt trả giá hiện tại <span className="font-semibold text-black">{luottragia} lượt</span></div>
                        </div>
                    </div>
                </div>
                {/* Tabs */}
                <div className="flex gap-4 mt-8 w-[90%] max-w-5xl">
                    <button
                        className={`flex-1 py-3 font-semibold rounded-t-lg ${tab === 'history' ? 'bg-lime-400 text-white' : 'bg-lime-100 text-lime-600'}`}
                        onClick={() => setTab('history')}
                    >
                        LỊCH SỬ TRẢ GIÁ
                    </button>
                    <button
                        className={`flex-1 py-3 font-semibold rounded-t-lg ${tab === 'desc' ? 'bg-lime-400 text-white' : 'bg-lime-100 text-lime-600'}`}
                        onClick={() => setTab('desc')}
                    >
                        MÔ TẢ PHẨM
                    </button>
                </div>
                {/* Tab content */}
                <div className="w-[100%] max-w-5xl bg-white border rounded-b-lg min-h-[400px] p-6">
                    {tab === 'history' ? (
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">IDTK</th>
                                    <th className="border p-2">Số tiền trả giá</th>
                                    <th className="border p-2">Thời gian trả giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="border p-2">{row.gmail}</td>
                                        <td className="border p-2">{row.sotientragia}</td>
                                        <td className="border p-2">{row.thoigiantragia}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        productInfo
                    )}
                </div>
            </div>
            <footer className="footer mt-15 bg-midnight text-white flex justify-around pt-12 pb-15">
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
            </footer>
        </>
    )
}

export default Tragia