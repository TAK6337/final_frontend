import '../styles/IdInquiry.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IdInquiry = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [foundUserId, setFoundUserId] = useState('');
    const navigate = useNavigate();

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
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
            const response = await axios.get('/auth/find-user-id', {
                params: { email: userEmail, name: userName }
            });

            setFoundUserId(response.data); // 응답 데이터가 사용자 ID 문자열임
            setResponseMessage('');
        } catch (error) {
            console.error('사용자 ID 찾기 중 에러 발생:', error.response ? error.response.data : error.message);
            setFoundUserId('');
            setResponseMessage('사용자를 찾을 수 없습니다. 다시 한 번 확인해주세요.');
        }
    };

    // 사용자 이름 마스킹 함수
    const maskUserName = (name) => {
        if (name.length <= 2) return name; // 이름이 2글자 이하일 경우 마스킹하지 않음
        return name.slice(0, 2) + '*'.repeat(name.length - 2); // 처음 두 글자 + 나머지 문자는 *로 대체
    };

    const maskedUserName = maskUserName(userName);

    return (
        <div className="pi-idinquiry">
            <div className="pi-id-inquiry-content">
                <div className="pi-logo">
                    <div className="pi-a-irport">AIrport</div>
                </div>
                <div className="pi-find-id-title">
                    <div className="pi-div3">아이디 찾기</div>
                    <div className="pi-line-32"></div>
                    <div className="pi-div4">
                        아이디를 찾기 위해서 회원님의 이름과 가입할 때 사용한 이메일을 입력해주세요
                    </div>
                </div>
                <div className="pi-find-id-username">
                    <div className="pi-user-name">USER NAME</div>
                    <div className="pi-user-name-input">
                        <input
                            className="pi-input-username"
                            type="text"
                            name="username"
                            value={userName}
                            placeholder="회원 이름"
                            onChange={handleUserNameChange}
                        />
                    </div>
                </div>
                <div className="pi-find-id-useremail">
                    <div className="pi-user-email">USER EMAIL</div>
                    <div className="pi-user-email-input">
                        <input
                            className="pi-input-useremail"
                            type="email"
                            name="userEmail"
                            value={userEmail}
                            placeholder="이메일 입력"
                            onChange={handleUserEmailChange}
                        />
                    </div>
                </div>
                <button onClick={handleSubmit} className="pi-find-id-btn">
                    <div className="pi-div">아이디 찾기</div>
                </button>
            </div>

            <div className={isVisible ? 'pi-IdInquiry-popup-frame' : 'pi-hidden'}>
                <div className="pi-IdInquiry-popup">
                    <div className="pi-IdInquiry-popup-logo">
                        <div className="pi-IdInquiry-popup-a-irport">AIrport</div>
                    </div>
                    <div className="pi-IdInquiry-popup-explain">
                        {foundUserId ? (
                            <div className="pi-IdInquiry-popup-offer">
                                <span>
                                    <span className="pi-IdInquiry-popup-offer-text">
                                        {maskedUserName} 님의 아이디는<br />
                                    </span>
                                    <span className="pi-IdInquiry-popup-offer-userid">{foundUserId}</span>
                                    <span className="pi-IdInquiry-popup-offer-text">입니다</span>
                                </span>
                            </div>
                        ) : (
                            <div className="pi-IdInquiry-popup-offer">
                                <span>
                                    <span className="pi-IdInquiry-popup-offer-text">{responseMessage}</span>
                                </span>
                            </div>
                        )}
                        <div className="pi-IdInquiry-popup-explain-sub">
                            개인정보 보호를 위해<br />
                            아이디의 일부만 제공됩니다.
                        </div>
                    </div>
                    <div className="pi-IdInquiry-popup-btn" onClick={handleGoLogin}>
                        <div className="pi-IdInquiry-popup-btn-text">로그인으로 돌아가기</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdInquiry;
