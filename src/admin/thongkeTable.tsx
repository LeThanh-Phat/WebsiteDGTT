import { useState } from 'react';

function ThongKeTable() {
    const data = [
        {
            idblog: '1',
            idtkad: '1',
            noidung: 'Tin tức 1',
            thoigiandang: '2023-10-01',
            thanhcong: true,
            tienthu: 5000000,
        },
        {
            idblog: '2',
            idtkad: '1',
            noidung: 'Tin tức 2',
            thoigiandang: '2023-11-05',
            thanhcong: false,
            tienthu: 0,
        },
        {
            idblog: '3',
            idtkad: '1',
            noidung: 'Tin tức 3',
            thoigiandang: '2023-12-20',
            thanhcong: true,
            tienthu: 3000000,
        },
    ];

    const dataThanhCong = data.filter((d) => d.thanhcong);
    const soPhienThanhCong = dataThanhCong.length;
    const tongTienThu = dataThanhCong.reduce((sum, d) => sum + d.tienthu, 0);
    const doanhThu = tongTienThu * 0.1;

    return (
        <div className="content-bar w-full bg-white p-4 space-y-6">
            <h2 className="text-xl font-bold mb-2">Thống kê hệ thống</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-100 text-green-900 p-4 rounded-xl shadow text-center">
                    <div className="text-sm">Số phiên thành công</div>
                    <div className="text-2xl font-bold">{soPhienThanhCong}</div>
                </div>

                <div className="bg-blue-100 text-blue-900 p-4 rounded-xl shadow text-center">
                    <div className="text-sm">Tổng tiền thu được</div>
                    <div className="text-2xl font-bold">{tongTienThu.toLocaleString()} VNĐ</div>
                </div>

                <div className="bg-yellow-100 text-yellow-900 p-4 rounded-xl shadow text-center">
                    <div className="text-sm">Doanh thu</div>
                    <div className="text-2xl font-bold">{doanhThu.toLocaleString()} VNĐ</div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-center">Danh sách các phiên thành công</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-t">
                        <thead className="bg-gray-100 text-gray-600 text-sm">
                            <tr>
                                <th className="px-4 py-2 text-center">ID phiên</th>
                                <th className="px-4 py-2 text-center">ID admin</th>
                                <th className="px-4 py-2 text-center">Nội dung</th>
                                <th className="px-4 py-2 text-center">Thời gian đăng</th>
                                <th className="px-4 py-2 text-center">Tiền thu</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            {dataThanhCong.map((row) => (
                                <tr key={row.idblog} className="hover:bg-gray-50 border-b text-center">
                                    <td className="px-4 py-3">{row.idblog}</td>
                                    <td className="px-4 py-3">{row.idtkad}</td>
                                    <td className="px-4 py-3">{row.noidung}</td>
                                    <td className="px-4 py-3">{row.thoigiandang}</td>
                                    <td className="px-4 py-3">{row.tienthu.toLocaleString()} VNĐ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ThongKeTable;
