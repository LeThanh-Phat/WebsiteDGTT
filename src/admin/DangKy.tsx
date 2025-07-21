import { useEffect, useState } from 'react';
import axios from 'axios';

function DangKy({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation sau khi mount
    setTimeout(() => setVisible(true), 10);
  }, []);

  const [formData, setFormData] = useState({
    ho: '',
    tenlot: '',
    ten: '',
    ngaysinh: '',
    sdt: '',
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
      const response = await axios.post('http://localhost:3005/api/admin/dangky-ad', formData);
      alert(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      alert('Không thể kết nối với link đăng ký');
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
        <h4 className="text-center my-3 font-bold text-xl">Đăng ký tài khoản dành cho admin</h4>

        <div className="mb-5 flex justify-between">
          <input
            type='text'
            placeholder="Họ"
            name="ho"
            value={formData.ho}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            type='text'
            placeholder="Tên đệm"
            name="tenlot"
            value={formData.tenlot}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            type='text'
            placeholder="Tên"
            name="ten"
            value={formData.ten}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-5 flex justify-between">
          <input
            type='date'
            name="ngaysinh"
            value={formData.ngaysinh}
            onChange={handleChange}
            placeholder="Ngày sinh"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[45%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            type='phone'
            name="sdt"
            value={formData.sdt}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[45%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
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

        <div className="mb-5">
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

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Tôi cam kết với điều khoản và chấp nhận thực hiện theo điều khoản
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng ký tài khoản
        </button>
      </form>
    </div>
  );
}

export default DangKy;
