import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import NavigationBar from "./NavigationBar";
import SideNavBtn from "./SideNavBtn";


function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [textVisible, setTextVisible] = useState(false);
    const images = [
        '/images/testimages/intro_01.jpg',
        '/images/testimages/intro_02.jpg',
        '/images/testimages/intro_03.jpg',
        '/images/testimages/intro_04.jpg',
        '/images/testimages/intro_05.jpg'
    ];
    const texts = [
        '여정을 함께 만드는 AI ASSISTANT \n 이동부터 비행기 탑승까지 편리하게',
        '분실물 서비스',
        '택시승강장관리 자동화',
        '체크인, 보안검사 대기시간 예측',
        '반입금지물품, 항공편, 주차요금 챗봇'
    ];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(currentPage % images.length + 1);
        }, 5000); // 5초마다 페이지 변경

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [currentPage, images.length]);

    useEffect(() => {
        // 이미지가 바뀐 후 텍스트를 나타나게 합니다.
        const textTimer = setTimeout(() => {
            setTextVisible(true);
        }, 1000); // 이미지 애니메이션 시간에 맞춰 설정

        return () => clearTimeout(textTimer); // 컴포넌트 언마운트 시 타이머 정리
    }, [currentPage]);

    return (
        <div>
            <NavigationBar/>
            <SideNavBtn/>
            <div className="ServiceIntroFrame">
                <div className="slide-test-btn-frame">
                    {[1, 2, 3, 4, 5].map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={currentPage === pageNumber ? 'active' : ''}
                        >
                            <div className={`slide-btn-0${pageNumber}`}>
                                <div className={`slide-btn-0${pageNumber}-text`}>0{pageNumber}</div>
                                <div className="slide-btn-under-bar"></div>
                            </div>
                        </button>
                    ))}
                </div>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`ServiceIntroFrame-image ${currentPage === index + 1 ? 'active' : ''}`}
                    />
                ))}
                <div className={`ServiceIntroFrame-text ${textVisible ? 'show' : ''}`}>
                    {/* 현재 페이지에 따라 텍스트를 표시 */}
                    {texts[currentPage - 1]}
                </div>

            </div>
            <div className="info">

            </div>
        </div>


    );
}

export default Home;
