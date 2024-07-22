import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Mypage.css';
import NavigationBar from "./NavigationBar";

// 모달 컴포넌트 정의
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}></button>
                {children}
            </div>
        </div>
    );
};

function Mypage() {
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 비밀번호 변경 폼 상태
    const [userID, setUserID] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    // 모달 표시 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const emailResponse = await axios.get('/auth/token/email');
                const nameResponse = await axios.get('/auth/token/name');
                setEmail(emailResponse.data);
                setName(nameResponse.data);
                setLoading(false);
            } catch (error) {
                setError('정보를 가져오는 중 에러가 발생했습니다.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/auth/change-password', new URLSearchParams({
                userID,
                oldPassword,
                newPassword
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setPasswordSuccess(response.data);
            setPasswordError(null);
            setIsModalOpen(false);
        } catch (error) {
            console.log(error.response); // 오류 메시지 확인
            if (error.response) {
                setPasswordError(error.response.data);
            } else {
                setPasswordError('비밀번호 변경 중 오류가 발생했습니다.');
            }
            setPasswordSuccess(null);
        }
    };



    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <p>이메일을 불러오는 중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div className="mypage">
            <NavigationBar/>
            <div className="mypage-main-banner">
            <h1 className="mypage-main-banner-text">MYPAGE</h1>
            </div>

            <div className="mypage-content">
                <div className="mypage-content-text">회원정보</div>
                {email && name ? (
                    <>
                        <div className="mypage-username-text">회원이름 :</div>
                        <p className="mypage-username-input">{name}</p>
                        <div className="mypage-useremail-text">이메일 :</div>
                        <p className="mypage-useremail-input">{email}</p>
                    </>
                ) : (
                    <p>정보를 가져오지 못했습니다.</p>
                )}

                <div className="mypage-pw-btn" onClick={handleOpenModal}>
                    <div className="mypage-pw-btn-text">비밀번호 변경</div>
                </div>
            </div>

            <Modal isOpen={isModalOpen}>

                <div className="mypage-pw">

                    <form onSubmit={handlePasswordChange}>
                        <div className="mypage-pw-popup">
                            <dutton className="popup-close-box" onClick={handleCloseModal}>닫기</dutton>
                            <div className="mypage-logo">
                                <div className="mypage-a-irport">AIrport</div>
                            </div>

                            <div className="mypage-pw-popup-text">비밀번호 변경</div>

                            <div>
                                {/*아이디*/}
                                <input
                                    placeholder="아이디"
                                    className="mypage-pw-popup-name"
                                    type="text"
                                    id="userID"
                                    value={userID}
                                    onChange={(e) => setUserID(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                {/*이전*/}
                                <input
                                    placeholder="이전 비밀번호"
                                    className="mypage-pw-popup-current"
                                    type="password"
                                    id="oldPassword"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                {/*신규*/}
                                <input
                                    placeholder="변경할 비밀번호"
                                    className="mypage-pw-popup-change"
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="mypage-pw-popup-btn" type="submit">비밀번호 변경</button>
                        </div>
                    </form>

                    {passwordSuccess && <p>{passwordSuccess}</p>}
                    {passwordError && <p>{passwordError}</p>}
                </div>
            </Modal>
        </div>
    );
}

export default Mypage;
