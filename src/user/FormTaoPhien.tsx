import sdg1 from '../assets/sdg1.png'
function FormTaoPhien() {
  return (
    <div>
        <form className="max-w-sm mx-auto">
            <h3 className="font-bold text-center text-xl my-3">Tạo phiên đấu giá</h3>
            <div className="mb-5">
                <label htmlFor="ten-sp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</label>
                <input type="text" id="ten-sp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="Pikachu" readOnly />
            </div>
            <div className="mb-5">
                <label htmlFor="ten-dm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Danh mục</label>
                <input type="text" id="ten-dm" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value='Pikcachu' readOnly />                
            </div>
            <div className="mb-5">
                <label htmlFor="hinh-anh" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh</label>
                <img src={sdg1} alt="" />
            </div>
            <h3 className="font-bold text-center text-xl my-3">Thông tin phiên đấu giá</h3>
            <div className="mb-5">
                <label htmlFor="tgbddk" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian bắt đầu đăng ký</label>
                <input type="date" id="tgbddk" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-5">
                <label htmlFor="tgktdk" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian kết thúc đăng ký</label>
                <input type="date" id="tgktdk" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-5">
                <label htmlFor="tgbd" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian bắt đầu phiên</label>
                <input type="date" id="tgbd" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-5">
                <label htmlFor="tgkt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian kết thúc phiên</label>
                <input type="date" id="tgkt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-5">
                <label htmlFor="gkd" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá khởi điểm</label>
                <input type="number" id="gkd" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-5">
                <label htmlFor="buoc-gia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bước giá</label>
                <input type="number" id="buoc-gia" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-5">
                <label htmlFor="phi-tham-gia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phí tham gia</label>
                <input type="number" id="phi-tham-gia" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="mb-5">
                <label htmlFor="tien-coc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiền cọc</label>
                <input type="number" id="tien-coc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>
        </form>
    </div>
  )
}

export default FormTaoPhien
