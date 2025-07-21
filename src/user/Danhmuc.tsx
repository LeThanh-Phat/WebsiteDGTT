import sdg1 from '../assets/sdg1.png'
import sdg2 from '../assets/sdg2.png'

function Danhmuc() {
  return (
    <div>
        <h3 className='font-bold text-2xl p-[2.5%]'>Auctions Ending Soon</h3>
        <div className="body flex justify-around">
            <div className="side-bar w-[20%]">
                <div className="category">
                    <h4 className='font-bold'>Shop by category</h4>
                    <div>
                        <p>Đồ cổ</p>
                        <p>Pokemon</p>
                        <p>Pikachu</p>
                        <p>Ok</p>
                        <p>Phi</p>
                    </div>
                </div>
                <div className="pdg mt-15">
                    <h4 className='font-bold'>Phiên đấu giá</h4>
                    <div>
                        <p>Đã diễn ra</p>
                        <p>Đang diễn ra</p>
                        <p>Sắp diễn ra</p>
                    </div>
                </div>
            </div>
            <div className="auctions w-[70%]">
                <div className='flex'>
                    <div className="img me-3">
                        <img src={sdg1} alt=""/>
                    </div>
                    <div className="auctions-content">
                        <p>Ending Soon - Fabulous Grey Fox Tail Vest - one size fits most - very unique</p>
                        <p>Pre-Owned - Unbranded</p>
                        <div className="prize flex justify-between">
                            <p>2,299,528.00</p>
                            <p>0 bids</p>
                        </div>
                        <div className="ship flex justify-between">
                            <p>Free shipping</p>
                            <p>4d 14h</p>
                        </div>
                    </div>
                </div>
                <div className='flex mt-5'>
                    <div className="img  me-3">
                        <img src={sdg1} alt="" />
                    </div>
                    <div className="auctions-content">
                        <p>Ending Soon - Fabulous Grey Fox Tail Vest - one size fits most - very unique</p>
                        <p>Pre-Owned - Unbranded</p>
                        <div className="prize flex justify-between">
                            <span>2,299,528.00</span>
                            <span>0 bids</span>
                        </div>
                        <div className="ship flex justify-between">
                            <span>Free shipping</span>
                            <span>4d 14h</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Danhmuc
