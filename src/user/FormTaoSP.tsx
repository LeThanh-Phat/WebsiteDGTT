import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"


function FormTaoSP() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const danhmuc = JSON.parse(localStorage.getItem("danhmuc"));
    const [formData, setFormData] = useState({
        iddm: '',
        tensp: '',
        trangthai: 'Chờ duyệt',
        images: []
    });

    useEffect(()=>{
        if (!user) {
            alert("Bạn chưa đăng nhập!");
            // điều hướng về trang đăng nhập nếu cần
        }
        console.log(danhmuc)
    },[])

    const handleChange = (e) => {
        const { id, value, files, type } = e.target;
        if (type === "file") {
        setFormData((prev) => ({
            ...prev,
            images: Array.from(files)
        }));
        } else {
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        // B1: Gửi thông tin sản phẩm
        const spRes = await axios.post("http://localhost:3005/api/trangchu/taosp", {
            tensp: formData.tensp,
            iddm: formData.iddm,
            idtk: user.user.idtk,
            trangthai: formData.trangthai
        });

        const idsp = spRes.data.idsp;
        console.log(spRes)
        // B2: Gửi ảnh
        const imageForm = new FormData();
        formData.images.forEach((img) => {
            imageForm.append("images", img);
        });
        imageForm.append("idsp", idsp);
        await axios.post("http://localhost:3005/api/hinhanh/themha", imageForm, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        alert("Tạo sản phẩm thành công!");
        } catch (err) {
        console.error(err);
        alert("Tạo sản phẩm thất bại!");
        }
    };

  return (
    <div>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h3 className="font-bold text-center text-xl my-3">Tạo sản phẩm</h3>
        <div className="mb-5">
            <label htmlFor="tensp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
            <input type='text'
                   placeholder="Tên sản phẩm"
                   id="tensp"
                   value={formData.tensp}
                   onChange={handleChange}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
            <label htmlFor="iddm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Danh mục</label>
            <select
                id="iddm"
                value={formData.iddm}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            >
                {danhmuc.map((dm,key)=>(
                    <option key={dm.iddm} value={dm.iddm}>{dm.tendm} + {dm.iddm}</option>
                ))}
            </select>
        </div>
        <div className="mb-5">
            <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh</label>
            <input
                type="file"
                id="images"
                multiple
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tạo sản phẩm</button>
        </form>
    </div>
  )
}

export default FormTaoSP
