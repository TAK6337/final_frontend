import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Confirm.css';

const Confirm = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        const confirmToken = async () => {
            try {
                const response = await axios.get(`/auth/confirm?token=${token}`);
                setMessage(response.data);
            } catch (error) {
                if (error.response && error.response.data) {
                    setMessage(error.response.data);
                } else {
                    setMessage('인증 처리 중 오류가 발생했습니다.');
                }
            }
        };

        confirmToken();
    }, [location.search]);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="confirm-container">
            <h2>{message}</h2>
            {message === '사용자 인증에 성공했습니다. 로그인이 가능합니다.' && (
                <button className="login-button" onClick={handleLoginRedirect}>
                    로그인 페이지로 이동
                </button>
            )}
        </div>
    );
};

export default Confirm;
