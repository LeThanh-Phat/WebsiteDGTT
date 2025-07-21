import axios from 'axios';
import sdg1 from '../assets/sdg1.png'
import sdg2 from '../assets/sdg2.png'
import sdg3 from '../assets/sdg3.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function XemSPTao() {
    const danhmuc = JSON.parse(localStorage.getItem("danhmuc"));
    const [sp,setSP] = useState([])
    const navigate = useNavigate()

    const normalizeString = (str) => {
        return str
            .normalize("NFC") // chuẩn Unicode
            .trim() // bỏ khoảng trắng đầu/cuối
            .toLowerCase(); // bỏ phân biệt hoa/thường
    };

    const loadsp = async () => {
        try {
        const response = await axios.get('http://localhost:3005/api/trangchu/xemsp');
        console.log(response.data);
        setSP(response.data);
        } catch (error) {
        alert('Load sản phẩm thất bại!');
        console.error(error);
        }
    }

    const locsp = async (tendm = '') => {
        try {
            const response = await axios.get(`http://localhost:3005/api/trangchu/loc?danhmuc=${tendm}`);
            setSP(response.data);
        } catch (error) {
            alert('Load sản phẩm thất bại!');
            console.error(error);
        }
    }

    useEffect(()=>{
        loadsp();
    },[])
  return (
    <div>
        <h2 className='font-bold text-xl text-center py-5'>Sản phẩm của bạn</h2>
        <div className="body flex  justify-around">
            <div className="side-bar w-[20%]">
                <div className="category">
                    <h4 className='font-bold'>Shop by category</h4>
                    <div>
                        {danhmuc.map((value1, key) => (
                        <p
                            key={key}
                            onClick={() => locsp(value1.tendm)}
                            className="cursor-pointer hover:underline"
                        >
                            {value1.tendm}
                        </p>
                        ))}
                        <p  onClick={() => locsp()}
                            className="cursor-pointer hover:underline">Tất cả</p>
                    </div>
                </div>
            </div>
            <div className="sanpham w-[70%] ">
                <button>Tạo sản phẩm</button>
                <table className="table w-full border-separate border-spacing-y-4">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                        <th className="p-3">STT</th>
                        <th className="p-3">Hình ảnh</th>
                        <th className="p-3">Tên danh mục</th>
                        <th className="p-3">Tên sản phẩm</th>
                        <th className="p-3">Trạng thái</th>
                        <th className="p-3">Xóa</th>
                        <th className="p-3">Sửa</th>
                        <th className='p-3'>Tạo phiên</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sp.map((value, idx) => (
                        <tr key={idx} className="bg-white shadow-md rounded-md">
                            <td className="p-3">{idx + 1}</td>
                            <td className="p-3">
                                {value.ds_hinhanh?.split(',').map((ha, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:3005/uploads/${ha}`}
                                    alt=""
                                    className="w-20 h-20 object-cover rounded"
                                />
                                ))}

                            </td>
                            
                            <td className="p-3">{value.tendm}</td>
                            <td className="p-3">{value.tensp}</td>
                            <td className="p-3">{value.trangthai}</td>
                            <td className="p-3"><button className="text-red-500 hover:underline">Xóa</button></td>
                            <td className="p-3"><button className="text-blue-500 hover:underline">Sửa</button></td>
                            {normalizeString(value.trangthai) == normalizeString("Đã duyệt") ? (<td className='p-3'><button className="text-green-500 hover:underline" onClick={()=>navigate(`/form-phientao?idsp=${value.idsp}`)}>Tạo phiên</button></td>) : (null)} 
                        </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    </div>
  )
}

export default XemSPTao
