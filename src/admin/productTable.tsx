
import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductTable() {
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState({});
    const [data,setSP] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");

    const normalizeString = (str) => {
        return str
            .normalize("NFC") // chuẩn Unicode
            .trim() // bỏ khoảng trắng đầu/cuối
            .toLowerCase(); // bỏ phân biệt hoa/thường
    };

    const loadsp = async () => {
        if(filterStatus == "")
            try {
                const response = await axios.get('http://localhost:3005/api/trangchu/xemsp');
                console.log(response.data);
                setSP(response.data);
            } catch (error) {
                alert('Load sản phẩm thất bại!');
                console.error(error);
        }
    }

    const duyetsp = async () => {
        try {
            const updatedData = [...data];

            for (const id of Object.keys(selectedRows)) {
                // Gọi API duyệt sản phẩm
                const response = await axios.put('http://localhost:3005/api/admin/duyetsp', {
                    idsp: id
                });

                // Nếu API trả về trạng thái mới, cập nhật vào data
                const index = updatedData.findIndex(item => item.idsp === parseInt(id));
                if (index !== -1) {
                    updatedData[index].trangthai = 'Đã duyệt'; // hoặc response.data.trangthai nếu backend trả về
                }
            }

            // Cập nhật UI ngay lập tức
            setSP(updatedData);

            // Clear checkbox sau khi duyệt
            setSelectedRows({});
            setSelectedAll(false);

            alert('✅ Duyệt sản phẩm thành công!');
        } catch (error) {
            alert('❌ Duyệt sản phẩm thất bại!');
            console.error(error);
        }
    };

    useEffect(()=>{
        //loadsp();
        console.log(filterStatus)
    },[filterStatus])

    useEffect(()=>{
        console.log(Object.keys(selectedRows))
    },[selectedRows])

    useEffect(()=>{
        loadsp();
    },[])

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectedAll(checked);

        if (checked) {
            const newSelected = {};
            data.forEach((row) => {
                newSelected[row.idsp] = true;
            });
            setSelectedRows(newSelected);
        } else {
            setSelectedRows({}); // Bỏ hết khi uncheck select all
        }
    };


    const handleSelectRow = (id) => {
        const updated = { ...selectedRows };

        if (updated[id]) {
            // Nếu đang được chọn, bỏ chọn -> xóa key khỏi object
            delete updated[id];
        } else {
            // Nếu chưa được chọn, thêm vào object
            updated[id] = true;
        }

        setSelectedRows(updated);

        // Kiểm tra tất cả đã được chọn hay chưa
        const allSelected = data.every((row) => updated[row.idsp]);
        setSelectedAll(allSelected);
    };


    return (
        <div className="content-bar w-full bg-white p-4 ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Danh sách sản phẩm</h2>
                <div className="space-x-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow" onClick={duyetsp}>
                        Duyệt sản phẩm
                    </button>
                    <button className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded border border-red-500 shadow">
                        Hủy sản phẩm
                    </button>
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <div className="relative w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên sản phẩm..."
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
                <div>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        defaultValue=""
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="Chờ duyệt">Chờ duyệt</option>
                        <option value="Đã duyệt">Đã duyệt</option>
                    </select>
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
                            <th className="px-4 py-2 text-center">Hình ảnh</th>
                            <th className="px-4 py-2 text-center">Tên sản phẩm</th>
                            <th className="px-4 py-2 text-center">Thuộc danh mục</th>
                            <th className="px-4 py-2 text-center">Gmail tài khoản</th>
                            <th className="px-4 py-2 text-center">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {data
                        .filter(row => filterStatus === "" || normalizeString(row.trangthai) === normalizeString(filterStatus))
                        .map(row => (
                            <tr key={row.idsp} className="hover:bg-gray-50 border-b text-center">
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows[row.idsp] || false}
                                        onChange={() => handleSelectRow(row.idsp)}
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    {row.ds_hinhanh?.split(',').map((ha, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:3005/uploads/${ha}`}
                                            alt=""
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    ))}
                                </td>
                                <td className="px-4 py-3">{row.tensp}</td>
                                <td className="px-4 py-3 text-blue-600">{row.tendm}</td>
                                <td className="px-4 py-3">{row.gmail_tkban}</td>
                                <td className="px-4 py-3 text-blue-600">{row.trangthai}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductTable;