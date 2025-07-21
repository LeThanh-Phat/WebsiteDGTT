
import axios from 'axios';
import { useEffect, useState } from 'react';

function QLtkngTable() {
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState({});
    const [data,setTKND] = useState([]);

    const loadtknd = async () => {
            try {
                const response = await axios.get('http://localhost:3005/api/admin/gettk');
                console.log(response.data);
                setTKND(response.data);
            } catch (error) {
                alert('Load sản phẩm thất bại!');
                console.error(error);
            }
    }

    useEffect(()=>{
        loadtknd();
    },[])

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectedAll(checked);

        const newSelected = {};
        data.forEach((row) => {
            newSelected[row.idtk] = checked;
        });
        setSelectedRows(newSelected);
    };

    const handleSelectRow = (idtk) => {
        const updated = {
            ...selectedRows,
            [idtk]: !selectedRows[idtk],
        };

        setSelectedRows(updated);
        const allSelected = data.every((row) => updated[row.idtk]);
        setSelectedAll(allSelected);
    };

    return (
        <div className="content-bar w-full bg-white p-4 ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Danh sách tài khoản người dùng</h2>
                <div className="space-x-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
                        Mở lại tài khoản
                    </button>
                    <button className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded border border-red-500 shadow">
                        Hủy tài khoản
                    </button>
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên gmail..."
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <svg
                        className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.65 13.65z"
                        />
                    </svg>
                </div>

            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-t">
                    <thead className="bg-green-100 text-gray-600 text-sm">
                        <tr>
                            <th className="px-4 py-2 text-center">
                                <input
                                    type="checkbox"
                                    checked={selectedAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="px-4 py-2 text-center">Họ</th>
                            <th className="px-4 py-2 text-center whitespace-nowrap">Tên lót</th>
                            <th className="px-4 py-2 text-center">Tên</th>
                            <th className="px-4 py-2 text-center">Gmail</th>
                            <th className="px-4 py-2 text-center whitespace-nowrap">Ngày sinh</th>
                            <th className="px-4 py-2 text-center whitespace-nowrap" >Địa chỉ</th>
                            <th className="px-4 py-2 text-center whitespace-nowrap">Nơi nhận hàng</th>
                            <th className="px-4 py-2 text-center">SĐT</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {data.map((row) => (
                            <tr key={row.idtk} className="hover:bg-gray-50 border-b text-center">
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows[row.idtk] || false}
                                        onChange={() => handleSelectRow(row.idtk)}
                                    />
                                </td>
                                <td className="px-4 py-3">{row.ho}</td>
                                <td className="px-4 py-3">{row.tenlot}</td>
                                <td className="px-4 py-3">{row.ten}</td>
                                <td className="px-4 py-3">{row.gmail}</td>
                                <td className="px-4 py-3">{row.ngaysinh}</td>
                                <td className="px-4 py-3">{row.diachi}</td>
                                <td className="px-4 py-3">{row.noinhanhang}</td>
                                <td className="px-4 py-3">{row.sdt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
export default QLtkngTable;