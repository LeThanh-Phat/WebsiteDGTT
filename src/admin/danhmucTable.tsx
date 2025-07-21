import axios from 'axios';
import { useEffect, useState } from 'react';

function DanhmucTable() {
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState({});
    const [data,setDanhMuc] = useState([])

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

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectedAll(checked);

        const newSelected = {};
        data.forEach((row) => {
            newSelected[row.iddm] = checked;
        });
        setSelectedRows(newSelected);
    };

    const handleSelectRow = (iddm) => {
        const updated = {
            ...selectedRows,
            [iddm]: !selectedRows[iddm],
        };

        setSelectedRows(updated);
        const allSelected = data.every((row) => updated[row.iddm]);
        setSelectedAll(allSelected);
    };

    return (
        <div className="content-bar w-full bg-white p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Danh sách danh mục</h2>
                <div className="space-x-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
                        Thêm danh mục
                    </button>
                    <button className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded border border-red-500 shadow">
                        Xóa danh mục
                    </button>
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
                            <th className="px-4 py-2 text-center">Gmail admin</th>
                            <th className="px-4 py-2 text-center">Tên danh mục</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {data.map((row) => (
                            <tr key={row.iddm} className="hover:bg-gray-50 border-b text-center">
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows[row.iddm] || false}
                                        onChange={() => handleSelectRow(row.iddm)}
                                    />
                                </td>
                                <td className="px-4 py-3">{row.gmail}</td>
                                <td className="px-4 py-3">{row.tendm}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DanhmucTable;
