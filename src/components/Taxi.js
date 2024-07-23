import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Taxi.css';
import NavigationBar from '../components/NavigationBar';
import SideNavBtn from "./SideNavBtn";

function Taxi() {
    const [isOn, setIsOn] = useState(false);
    const [isOn2, setIsOn2] = useState(false);
    const [data, setData] = useState({
        taxiCount: 0,
        totalCalls: 0,
        peopleCount: 0,
        callCount: 0,
        pendingTaxis: 0,
        aiStatus: ''
    });
    const [history, setHistory] = useState([]);

    const handleToggle = () => {
        setIsOn(prevIsOn => !prevIsOn);
    };

    const handleToggle2 = () => {
        setIsOn2(prevIsOn2 => !prevIsOn2);
    };

    const fetchData = () => {
        axios.get('/taxi-requests/flask-data')
            .then(response => {
                const newData = response.data;
                console.log('Fetched data:', newData); // 데이터를 로그에 찍어 확인
                setData(newData);
                setHistory(prevHistory => [
                    ...prevHistory,
                    {
                        time: new Date().toLocaleTimeString(),
                        ...newData
                    }
                ]);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    };

    const sendDetectionData = () => {
        const postData = {
            peopleCount: data.peopleCount || 0,
            taxiCount: data.taxiCount || 0
        };

        console.log('Sending detection data:', postData); // 전송할 데이터 로그에 찍기

        axios.post('/taxi-requests/detection', postData)
            .then(response => {
                console.log('Detection data sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Error sending detection data:', error);
            });
    };

    useEffect(() => {
        if (isOn2) {
            const fetchInterval = setInterval(() => {
                fetchData(); // 주기적으로 데이터 가져오기
            }, 5000); // 5초마다 데이터 가져오기

            const sendInterval = setInterval(() => {
                console.log('Sending detection data because AI is ON'); // 상태 확인 로그
                sendDetectionData(); // 데이터 전송
            }, 5000); // 5초마다 데이터 전송

            return () => {
                clearInterval(fetchInterval); // 컴포넌트 언마운트 시 클리어
                clearInterval(sendInterval); // 컴포넌트 언마운트 시 클리어
            };
        }
    }, [isOn2]); // isOn2가 변경될 때마다 실행



    return (
        <div className="taxi-div">
            <NavigationBar />
            <SideNavBtn/>
            <div className="taxi-entire">
                <div className="taxi-top">
                    <div className="taxi-subtitle">service monitoring</div>
                    <div className="taxi-title">택시 승강장 관리서비스 실시간 모니터링</div>
                    <div className="taxi-title-explain">
                        대기승객 수를 감지해 자동으로 택시를 호출합니다
                    </div>
                </div>
                <div className="taxi-main">
                    <div className="taxi-middle">
                        <div className="taxi-video-frame">
                            <div className="taxi-live">
                                <div className="taxi-red"></div>
                                <div className="taxi-live-text">Live</div>
                            </div>
                            <div className="taxi-effect">
                                <div className="taxi-effect-text">Effects : On</div>
                            </div>
                            <div className="taxi-video">
                                <video className="taxi-video-player" src="/images/uploaded_video.mp4" autoPlay muted
                                       loop></video>
                            </div>
                        </div>
                        <div className="taxi-middle-right">
                            <div className="taxi-waiting">
                            <div className="taxi-waiting-frame">
                                    <div className="taxi-waiting-container">
                                        <div className="taxi-waiting-container-left">
                                            <div className="taxi-waiting-text">대기승객</div>
                                            <div className="taxi-waiting-image">
                                                <div className="taxi-user-multiple-group-close-geometric-human-multiple-person-up-user">
                                                    <img
                                                        className="taxi-user-multiple-group-close-geometric-human-multiple-person-up-user2"
                                                        src="/images/multi-user.png"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="taxi-number">
                                            <div className="taxi-digit">{data.peopleCount}</div>
                                            <div className="taxi-span">명</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="taxi-waiting-frame">
                                    <div className="taxi-waiting-container">
                                        <div className="taxi-waiting-container-left">
                                            <div className="taxi-waiting-text">대기차량</div>
                                            <div className="taxi-waiting-image">
                                                <div className="taxi-car-taxi-1-transportation-travel-taxi-transport-cab-car">
                                                    <img
                                                        className="taxi-car-taxi-1-transportation-travel-taxi-transport-cab-car2"
                                                        src="/images/taxi.png"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="taxi-number">
                                            <div className="taxi-digit">{data.pendingTaxis}</div>
                                            <div className="taxi-span">대</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="taxi-service-container">
                                <div className="taxi-service-frame">
                                    <div className="taxi-service">
                                        <div className="taxi-service-text">서비스상태</div>
                                        <div className="taxi-service-condition">{data.aiStatus === 'running' ? '정상' : '비정상'}</div>
                                    </div>
                                    <div className="taxi-btn-container">
                                        {/*<div className="taxi-btn-frame">*/}
                                        {/*    <div className="taxi-btn-ex">택시호출</div>*/}
                                        {/*    <div className={`taxi-slide-btn ${isOn ? 'taxi-slide-btn-on' : ''}`} onClick={handleToggle}>*/}
                                        {/*        <div className={`taxi-slider ${isOn ? 'taxi-slider-on' : ''}`}></div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className="taxi-btn-frame">
                                            <div className="taxi-btn-ex">서비스 작동</div>
                                            <div
                                                className={`taxi-slide-btn ${isOn2 ? 'taxi-slide-btn-on' : ''}`}
                                                onClick={handleToggle2}
                                            >
                                                <div className={`taxi-slider ${isOn2 ? 'taxi-slider-on' : ''}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="taxi-bottom">
                        <div className="taxi-bottom-frame">
                            <div className="taxi-bottom-title">서비스 기록</div>
                            <div className="taxi-bottom-contents">
                                {history.map((record, index) => (
                                    <div className="taxi-response" key={index}>
                                        {record.time} 대기승객 {record.peopleCount}명 대기차량 {record.pendingTaxis}대 자동호출차량 {record.callCount}대 서비스상태 {record.aiStatus === 'running' ? '정상' : '비정상'}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Taxi;
