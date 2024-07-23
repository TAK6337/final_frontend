import '../styles/PwInquiry.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PwInquiry = () => {
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleUserEmailChange = (e) => {
        setUserEmail(e.target.value);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoLogin = () => {
        navigate('/Login');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleSubmit = async () => {
        setIsVisible(true);
        try {
            const data = new URLSearchParams();
            data.append('userID', userId);
            data.append('name', userEmail);

            const response = await axios.post('/auth/request-password-reset', data);
            console.log('성공적으로 전송됨:', response.data);
            // 비밀번호가 성공적으로 전송되면 다음 단계로 넘어가도록 처리합니다.
            // 예를 들어, 페이지를 이동할 수 있습니다.
        } catch (error) {
            if (error.response) {
                // 서버에서 응답이 오지만 오류가 포함된 경우
                console.error('비밀번호 재설정 요청 중 에러 발생:', error.response.data);
            } else if (error.request) {
                // 서버에 요청은 보냈지만 응답이 없는 경우
                console.error('서버에서 응답을 받지 못했습니다.');
            } else {
                // 오류를 발생시킨 요청 설정 문제
                console.error('비밀번호 재설정 요청 중 오류 발생:', error.message);
            }
        }
    };


    return (
        <div className="pi-Pwinquiry">
            <div className="pi-id-inquiry-content">
                <div className="pi-logo">
                    <div className="pi-a-irport">AIrport</div>
                </div>
                <div className="pi-find-id-title">
                    <div className="pi-div3">비밀번호 찾기</div>
                    <div className="pi-line-32"></div>
                    <div className="pi-div4">
                        회원님의 이름과 아이디를 입력해주세요
                    </div>
                </div>
                <div className="pi-find-id-UserId">
                    <div className="pi-user-name">USER ID</div>
                    <div className="pi-user-name-input">
                        <input
                            className="pi-input-UserId"
                            type="text"
                            name="userid"
                            value={userId}
                            placeholder="아이디 입력"
                            onChange={handleUserIdChange}
                        />
                    </div>
                </div>
                <div className="pi-find-id-useremail">
                    <div className="pi-user-email">USER NAME</div>
                    <div className="pi-user-email-input">
                        <input
                            className="pi-input-useremail"
                            type="email"
                            name="userEmail"
                            value={userEmail}
                            placeholder="이름 입력"
                            onChange={handleUserEmailChange}
                        />
                    </div>
                </div>
                <button onClick={handleSubmit} className="pi-find-id-btn">
                    <div className="pi-div">아이디 찾기</div>
                </button>
            </div>
            <div className={isVisible ? 'pi-Pwinquiry-popup-frame' : 'pi-hidden'}>
                <div className="pi-Pwinquiry-popup">
                    <div className="pi-Pwinquiry-popup-logo">
                        <div className="pi-Pwinquiry-popup-a-irport">AIrport</div>
                    </div>
                    <div className="pi-Pwinquiry-popup-explain">
                        <div className="pi-Pwinquiry-popup-offer">
                            <span>
                                <span className="pi-Pwinquiry-popup-offer-text">
                                    임시 비밀번호가<br/>
                                </span>
                                <span className="pi-Pwinquiry-popup-offer-userid">{userEmail}<br/></span>
                                <span className="pi-Pwinquiry-popup-offer-text">이메일로 전송되었습니다.</span>
                            </span>
                        </div>
                        <div className="pi-Pwinquiry-popup-explain-sub">
                            개인정보 보호를 위해<br/>
                            임시 비밀번호로 변경됩니다.
                        </div>
                    </div>
                    <div className="pi-Pwinquiry-popup-btn" onClick={handleGoHome}>
                        <div className="pi-Pwinquiry-popup-btn-text">로그인으로 돌아가기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PwInquiry;
