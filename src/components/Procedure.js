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

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // 1초마다 업데이트

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
    }, []);

    return (
        <div className="home-div">
            <NavigationBar/>
            <SideNavBtn/>
            <div className="home-content">

                {isNextScreen ? (
                    <div className={`time-middle ${isNextScreen ? 'active' : 'inactive'}`}>
                        <div className="procedure-ai-title">
                            <div className="procedure-ai-title-sub-1">Restricted Items Carried On Board</div>
                            <div className="procedure-ai-title-main">실시간 보안검사 소요시간</div>
                            <div className="procedure-ai-title-sub-2">
                                실시간 보안검사 대기시간을 알려드립니다
                            </div>
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
                        <div className="procedure-ai-title">
                            <div className="procedure-ai-title-sub-1">Restricted Items Carried On Board</div>
                            <div className="procedure-ai-title-main">실시간 체크인 대기시간</div>
                            <div className="procedure-ai-title-sub-2">
                                실시간 체크인 대기시간을 알려드립니다
                            </div>
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
                <div>
                    <p className="procedure-time-now">{currentTime.toLocaleTimeString()}</p>
                </div>


                <div className="frame-1139">
                <div className="procedure-text-explain-title-2">공항 탑승 수속 절차</div>
                    <div className="procedure-text-explain-title">
                        공항 도착에서부터 항공편 탑승까지 절차를 안내해 드립니다.
                    </div>

                    <div className="procedure-text-explain">
                        <img
                            className="procedure-text-explain-img"
                            src="/images/Procedure/step1.jpg"
                        />
                        <img
                            className="procedure-text-explain-img2"
                            src="/images/Procedure/step2.jpg"
                        />
                        <img
                            className="procedure-text-explain-img3"
                            src="/images/Procedure/step3.png"
                        />
                        <img
                            className="procedure-text-explain-img4"
                            src="/images/Procedure/step4.png"
                        />
                        <img
                            className="procedure-text-explain-img5"
                            src="/images/Procedure/step5.jpg"
                        />
                        <img
                            className="procedure-text-explain-img6"
                            src="/images/Procedure/step6.jpg"
                        />
                        <div className="procedure-text-explain-text">STEP 01. 공항 도착</div>
                        <div className="procedure-text-explain-text2">
                            STEP 02. 탑승 수속 및 탑승권 발급
                        </div>
                        <div className="procedure-text-explain-text3">
                            STEP 03. 병무 심사, 검역 신고, 세관 신고
                        </div>
                        <div className="procedure-text-explain-text4">STEP 04. 보안 검색</div>
                        <div className="procedure-text-explain-text5">STEP 05. 출국 심사</div>
                        <div className="procedure-text-explain-text6">STEP 06. 항공기 탑승</div>
                        <div className="procedure-text-explain-text-sub">
                            출발 2시간 전까지 공항에 도착하셔야 합니다.
                        </div>
                        <div className="procedure-text-explain-text-sub2">
      <span>
        <span className="procedure-text-explain-text-sub-2-span">
          탑승 수속 시 반드시 지참하세요!
          <br/>
        </span>
        <ul className="procedure-text-explain-text-sub-2-span2">
          <li>
            여권 : 대부분의 국가는 출국일 기준 여권 유효기간이 6개월 이상 남아
            있어야 하며,
            <br/>
            서명란에 본인 자필 서명 필요 국내선은 유효 신분증
          </li>
          <li>비자 : 필요 유무는 방문국의 대사관에 문의</li>
          <li>전자항공권(e-Ticket)</li>
        </ul>
      </span>
                        </div>
                        <div className="procedure-text-explain-text-sub3">
                            <ul className="procedure-text-explain-text-sub-3-span">
                                <li>
                                    여권 및 여행에 필요한 서류(비자), 전자항공권을 제시하여 좌석 배정을
                                    받고
                                    <br/>
                                    수하물 위탁과 함께 탑승권과 수하물표를 받으실 수 있습니다.
                                </li>
                                <li>탑승 수속 마감 시간 : 항공편 출발 60분 전</li>
                                <li>국제선 : 항공편 출발 60분 전</li>
                                <li>국내선 : 항공편 출발 30분 전</li>
                            </ul>
                        </div>
                        <div className="procedure-text-explain-text-sub4">
                            <ul className="procedure-text-explain-text-sub-4-span">
                                <li>
                                    병무 심사 : 25세 이상 병역 미필 병역 의무자가 국외를 여행하고자 할
                                    때는
                                    <br/>
                                    병무청에 국외 여행허가를 받고 출국 당일 법무부 출입국에서 출국심사 시
                                    <br/>
                                    국외 여행허가 증명서를 제출하여야 합니다. (영주권 사유 병역연기 및
                                    면제자 포함)
                                </li>
                                <li>
                                    검역 신고 : 여행자 및 동식물에 대한 검역증명서 발급이 필요한 경우
                                    <br/>
                                    탑승수속 전에 검역소를 통해 절차를 밟으셔야 합니다.
                                </li>
                                <li>
                                    세관 신고 : 미화 1만불을 초과하는 일반 해외여행 경비를 가지고 출국하실
                                    경우
                                    <br/>
                                    세관에 반드시 신고하셔야 하며 귀중품/고가품 등의 휴대품에 대해서도
                                    신고하셔야 합니다.
                                </li>
                            </ul>
                        </div>
                        <div className="procedure-text-explain-text-sub5">
                            <ul className="procedure-text-explain-text-sub-5-span">
                                <li>
                                    여행자와 항공기의 안전을 위해 여행객 및 휴대품을 대상으로 보안검색을
                                    실시합니다.
                                </li>
                                <li>
                                    기내 반입 금지 물품을 아래 링크에서 사전에 확인해 주시기 바랍니다.
                                </li>
                            </ul>
                        </div>
                        <div className="procedure-text-explain-text-sub6">
                            <ul className="procedure-text-explain-text-sub-6-span">
                                <li>
                                    여행자는 유효한 여권과 도착 국가에서 요구하는 여행서류(비자)를
                                    <br/>
                                    지참하고 출국심사를 받으시게 됩니다.
                                </li>
                                <li>
                                    인천공항의 경우 자동화된 출국 심사제도를 운용하고 있어
                                    <br/>
                                    사전 등록을 마친 고객은 좀 더 편리하고 신속하게 출국심사를 받을 수
                                    있습니다.
                                </li>
                                <li>
                                    자동 출국심사제도 및 일반 출국심사 절차와 관련된
                                    <br/>
                                    자세한 내용은 아래 링크를 확인해 주시기 바랍니다.
                                </li>
                            </ul>
                        </div>
                        <div className="procedure-text-explain-text-sub7">
                            <ul className="procedure-text-explain-text-sub-7-span">
                                <li>
                                    출발 탑승구에 미리 도착 후 대기하시어 정시 출발에 협조를 부탁
                                    드립니다.
                                </li>
                                <li>
                                    국제선 : 항공기 출발 25 ~ 30분 전 탑승 시작, 출발 10분 전 탑승 마감
                                </li>
                                <li>국내선 : 항공기 출발 20분 전 탑승 시작, 출발 5분 전 탑승 마감</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
        ;
}

export default ServiceIntro;
