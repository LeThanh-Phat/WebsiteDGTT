import axios from "axios";
import { useEffect, useState } from "react";

function XemDM() {
  const [danhmuc,setDanhMuc] = useState([])
  const loadDanhMuc = async () => {
        try {
          const response = await axios.get('http://localhost:3005/api/danhmuc/xemdm');
          console.log(response.data);
          setDanhMuc(response.data);
        } catch (error) {
          alert('load danh mục thất bại!');
          console.error(error);
        }
  }

  useEffect(()=>{
        loadDanhMuc();
    },[])

  return (
    <div>
        <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Danh sách danh mục</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Gmail tài khoản</th>
              <th className="py-2 px-4 border-b">Tên danh mục</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {danhmuc.map((dm, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{dm.gmail}</td>
                <td className="py-2 px-4 border-b">{dm.tendm}</td>
                <td className="py-2 px-4 border-b">Sửa</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default XemDM
