import axios from 'axios';
import { useEffect, useState } from 'react';

function TintucTable() {
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState({});
    const [data,setTinTuc] = useState([])

    const loadtintuc = async () => {
        try {
          const response = await axios.get('http://localhost:3005/api/blog/xemtt');
          console.log(response.data);
          setTinTuc(response.data);
        } catch (error) {
          alert('load danh mục thất bại!');
          console.error(error);
        }
  }

  useEffect(()=>{
        loadtintuc();
    },[])

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectedAll(checked);

        const newSelected = {};
        data.forEach((row) => {
            newSelected[row.idblog] = checked;
        });
        setSelectedRows(newSelected);
    };

    const handleSelectRow = (idblog) => {
        const updated = {
            ...selectedRows,
            [idblog]: !selectedRows[idblog],
        };

        setSelectedRows(updated);
        const allSelected = data.every((row) => updated[row.idblog]);
        setSelectedAll(allSelected);
    };

    return (
        <div className="content-bar w-full bg-white p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Danh sách tin tức</h2>
                <div className="space-x-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
                        Thêm tin tức
                    </button>
                    <button className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded border border-red-500 shadow">
                        Xóa tin tức
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
                            <th className="px-4 py-2 text-center">Tiêu đề</th>
                            <th className="px-4 py-2 text-center">Nội dung</th>
                            <th className="px-4 py-2 text-center">Thời gian đăng tin</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {data.map((row) => (
                            <tr key={row.idblog} className="hover:bg-gray-50 border-b text-center">
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows[row.idblog] || false}
                                        onChange={() => handleSelectRow(row.idblog)}
                                    />
                                </td>
                                <td className="px-4 py-3">{row.gmail}</td>
                                <td className="px-4 py-3">{row.tieude}</td>
                                <td className="px-4 py-3">{row.noidung}</td>
                                <td className="px-4 py-3">{row.thoigiandang}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TintucTable;
