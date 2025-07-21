import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

function DangNhap({
  onClose,
  onSwitch
}: {
  onClose: () => void;
  onSwitch: () => void;
}) {
  const [visible, setVisible] = useState(false);
    
  useEffect(() => {
      // Trigger animation sau khi mount
    setTimeout(() => setVisible(true), 10);
  }, []);
  const [formData, setFormData] = useState({
      matkhau: '',
      gmail: '',
    });
  
    const [agree, setAgree] = useState(false);
  
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

      if (!agree) {
        alert('Vui lòng đồng ý với điều khoản');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3005/api/admin/dangnhap-ad', formData);
        alert('Đăng nhập thành công!');
        localStorage.setItem('adminInfo',JSON.stringify(response.data));
        console.log(response.data);
      } catch (error) {
        alert('Đăng nhập thất bại!');
        console.error(error);
      }
    };


  return (
    <div className={`w-screen h-screen bg-trans flex justify-center items-center transition-all duration-1000 ease-in-out transform ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <form className="max-w-md mx-auto mx-auto shadow-md p-6 relative bg-white" onSubmit={handleSubmit}>
          <button onClick={onClose} className="absolute top-3 right-3 text-red-500 font-bold text-2xl">
          ✕
        </button>
        <h3 className="font-bold text-center text-xl my-3">Đăng nhập</h3>
        <div className="mb-5">
            <label htmlFor="email-username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
            type="email"
            id="gmail"
            value={formData.gmail}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật Khẩu</label>
            <input
              type="password"
              id="matkhau"
              value={formData.matkhau}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mật khẩu"
              required
            />
        </div>
        <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                
              />
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>
        <p>Bạn chưa có tài khoản ? <span onClick={onSwitch} className="font-bold">Đăng ký ngay</span></p>
        </form>
    </div>
  )
}

export default DangNhap
