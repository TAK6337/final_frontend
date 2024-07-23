// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Procedure.css';
import NavigationBar from "./NavigationBar";
import axios from "axios";
import SideNavBtn from "./SideNavBtn";

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let homeNavi = document.querySelector(".home-navi");

    if (homeNavi) {
        if (currentScroll > lastScrollTop) {
            homeNavi.style.top = "-80px"; // 네비게이션 바 높이만큼 숨김
        } else {
            homeNavi.style.top = "0";
        }
    }

    lastScrollTop = currentScroll;
});

function ServiceIntro() {
    const [selectedNumber, setSelectedNumber] = useState(null); // 초기값을 null로 설정
    const [selectedNumber2, setSelectedNumber2] = useState(null); // 초기값을 null로 설정
    const [isNextScreen, setIsNextScreen] = useState(false);

    // 체크인 소요시간 가져오기
    const fetchCheckInTime = async () => {
        try {
            const response = await axios.get('/api/checkin-to-baggage');
            if (response.status === 200) {
                const data = response.data;
                console.log('체크인 데이터:', data);
                setSelectedNumber(Number(data.prediction)); // 숫자로 변환
            } else {
                console.error('서버 응답 상태 오류:', response.status);
            }
        } catch (error) {
            console.error('체크인 소요시간을 가져오는 중 오류 발생:', error);
        }
    };

    // 보안검색 소요시간 가져오기
    const fetchSecurityTime = async () => {
        try {
            const response = await axios.get('/api/baggage-to-security');
            if (response.status === 200) {
                const data = response.data;
                console.log('보안검색 데이터:', data);

                // prediction을 문자열로 받고 숫자로 변환
                const prediction = Number(data.prediction);
                if (!isNaN(prediction)) {
                    setSelectedNumber2(prediction);
                } else {
                    console.error('예상 데이터 형식이 아닙니다:', data);
                }
            } else {
                console.error('서버 응답 상태 오류:', response.status);
            }
        } catch (error) {
            console.error('보안검색 소요시간을 가져오는 중 오류 발생:', error);
        }
    };

    // 컴포넌트가 마운트될 때 API 호출
    useEffect(() => {
        fetchCheckInTime();
        fetchSecurityTime();
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정



    // 갱신 버튼 클릭 시 체크인 및 보안 검색 시간 갱신
    const handleRefreshClick = async () => {
        await Promise.all([fetchCheckInTime(), fetchSecurityTime()]);
    };

    const getImagePath = (number) => {
        if (number >= 0 && number <= 20) {
            return "/images/clean.png"; // 0부터 20 사이
        } else if (number > 20 && number <= 40) {
            return '/images/normal.png'; // 21부터 40 사이
        } else if (number > 40 && number <= 60) {
            return '/images/busy.png'; // 41부터 60 사이
        } else {
            return null; // 범위를 벗어나면 null 반환
        }
    };

    const handleMoveClick = () => {
        setIsNextScreen(!isNextScreen); // isNextScreen 상태를 토글하여 화면 전환
    };

    return (
        <div className="home-div">
            <NavigationBar/>
            <SideNavBtn/>
            <div className="home-content">

                {isNextScreen ? (
                    <div className={`time-middle ${isNextScreen ? 'active' : 'inactive'}`}>
                        <div className="time-middle-title">
                            보안검색 소요시간
                        </div>
                        <div className="time-main-image">
                            <div className="time-image-container">
                                {selectedNumber2 && (
                                    <img
                                        className="time-image"
                                        src={getImagePath(selectedNumber2)}
                                        alt={`Image for number ${selectedNumber2}`}
                                    />
                                )}
                                <div className="time-time-container">
                                    <span className="time-time-span">
                                        {selectedNumber2}
                                    </span>
                                    <span className="time-time-span2">
                                        분
                                    </span>
                                </div>
                                <button className="time-move-btn2" onClick={handleMoveClick}>
                                    <img
                                        className="time-next"
                                        src="/images/Arrow_drop_left@3x.png"
                                        alt="next"
                                    />
                                </button>
                            </div>
                            <button className="time-btn-frame" onClick={handleRefreshClick}>
                                <div className="time-btn-text">수속시간 갱신</div>
                                <img
                                    className="time-refresh"
                                    src="/images/refresh.png"
                                    alt="refresh"
                                />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={`time-middle ${isNextScreen ? 'active' : 'inactive'}`}>
                        <div className="time-middle-title">
                            체크인 소요시간
                        </div>
                        <div className="time-main-image">
                            <div className="time-image-container">
                                {selectedNumber && (
                                    <img
                                        className="time-image"
                                        src={getImagePath(selectedNumber)}
                                        alt={`Image for number ${selectedNumber}`}
                                    />
                                )}
                                <div className="time-time-container">
                                    <span className="time-time-span">
                                        {selectedNumber}
                                    </span>
                                    <span className="time-time-span2">
                                        분
                                    </span>
                                </div>
                                <button className="time-move-btn" onClick={handleMoveClick}>
                                    <img
                                        className="time-next"
                                        src="/images/Arrow_drop_right@3x.png"
                                        alt="next"
                                    />
                                </button>
                            </div>
                            <button className="time-btn-frame" onClick={handleRefreshClick}>
                                <div className="time-btn-text">수속시간 갱신</div>
                                <img
                                    className="time-refresh"
                                    src="/images/refresh.png"
                                    alt="refresh"
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>


    )
        ;
}

export default ServiceIntro;
