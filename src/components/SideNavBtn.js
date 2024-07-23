import '../styles/SideNavBtn.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Parking from './Parking'; // Parking 모달 컴포넌트 import
import Airchat from './Airchat'; // Airchat 모달 컴포넌트 import

function SideNavBtn() {
    const [isParkingModalOpen, setIsParkingModalOpen] = useState(false);
    const [isAirModalOpen, setIsAirModalOpen] = useState(false);

    const openParkingModal = () => {
        setIsParkingModalOpen(true);
    };

    const closeParkingModal = () => {
        setIsParkingModalOpen(false);
    };

    const openAirModal = () => {
        setIsAirModalOpen(true);
    };

    const closeAirModal = () => {
        setIsAirModalOpen(false);
    };
    return (
        <nav>
            <div className="side-nav-btn">
                <div className="side-nav-btn-item">
                    <Link to="/Chat">
                        <img className="frame-1132" src="/images/side-nav-btn/side-nav-btn-item-img.png"/>
                    </Link>
                    <div className="side-nav-btn-item-text">반입물품상담</div>
                </div>
                <div className="side-nav-btn-air">
                    <button onClick={openAirModal} className="side-nav-btn-item-button">
                        <img className="frame-1132" src="/images/side-nav-btn/side-nav-btn-air-img.png" alt="항공편"/>
                    </button>
                    <div className="side-nav-btn-item-text">항공편</div>
                </div>
                <div className="side-nav-btn-park">
                    <button onClick={openParkingModal} className="side-nav-btn-item-button">
                        <img className="frame-1132" src="/images/side-nav-btn/side-nav-btn-parking-img.png" alt="주차요금"/>
                    </button>
                    <div className="side-nav-btn-item-text">주차요금</div>
                </div>
            </div>
            {isParkingModalOpen && <Parking closeModal={closeParkingModal}/>}
            {isAirModalOpen && <Airchat closeModal={closeAirModal} />}

        </nav>
    );
}

export default SideNavBtn;
