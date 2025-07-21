import React, { useEffect, useState } from 'react';

interface PopupdkpdgProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const Popupdkpdg: React.FC<PopupdkpdgProps> = ({ onConfirm, onCancel }) => {
  const [visible, setVisible] = useState(false);
  
      useEffect(() => {
          // Trigger animation sau khi mount
          setTimeout(() => setVisible(true), 10);
      }, []);
  return (
    <div className={`w-screen h-screen bg-trans flex justify-center items-center transition-all duration-1000 ease-in-out transform ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
      <div className="w-100 mx-auto shadow-md p-6 relative bg-white">
        <button onClick={onCancel} className="absolute top-3 right-3 text-red-500 font-bold text-2xl">
        ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Bạn có chắc muốn đăng ký tham gia phiên đấu giá này?
        </h2>
        <p className="text-gray-700 mb-6">
          Lệ phí tham gia phiên là <strong>10.000 VNĐ</strong>
        </p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold"
          >
            CÓ
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold"
          >
            KHÔNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popupdkpdg;
