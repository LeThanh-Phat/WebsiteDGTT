import axios from "axios";
import { useEffect, useState } from "react";

function ThemDM({ onClose }: { onClose: () => void }) {
    const admin = JSON.parse(localStorage.getItem("adminInfo"));
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
      idtkad: admin ? admin.admin.idtkad : null,
      tendm: '',
    });

    // const handleSubmit = async (e) => {
    //   e.preventDefault();

    //   try {
    //     const response = await axios.post('http://localhost:3005/api/user/dangky', formData);
    //     alert(response.data.message);
    //     console.log(response.data.message);
    //   } catch (error) {
    //     alert('Không thể kết nối với link đăng ký');
    //     console.error(error);
    //   }
    // };

    const handleChange = (e) => {
      const { id, value, type, name } = e.target;
      const key = id || name;
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(formData.idtkad == null){
        alert("Bạn cần đăng nhập tài khoản trước khi thêm");
        return;
      }
      try {
        const response = await axios.post('http://localhost:3005/api/danhmuc/themdm', formData);
        alert(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        alert('Không thể kết nối với link đăng ký');
        console.error(error);
      }
    };

    useEffect(() => {
        // Trigger animation sau khi mount
        setTimeout(() => setVisible(true), 10);
    }, []);
  return (
    <div className={`w-screen h-screen bg-trans flex justify-center items-center transition-all duration-1000 ease-in-out transform ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <form className="w-100 mx-auto shadow-md p-6 relative bg-white" onSubmit={handleSubmit}>
            <button onClick={onClose} className="absolute top-3 right-3 text-red-500 font-bold text-2xl">
            ✕
            </button>
            <div>
            <h3 className={`text-center font-bold text-lg`}>Thêm danh mục</h3>
            </div>
            <div className="mb-5">
                <label htmlFor="text" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Tên danh mục</label>
                <input type="text" id="tendm" className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tên danh mục" value={formData.tendm}
                       onChange={handleChange} required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thêm</button>
        </form>
    </div>
  )
}

export default ThemDM
