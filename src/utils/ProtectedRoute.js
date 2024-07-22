import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/Login');  // 로그인 페이지로 리다이렉트
        }
    }, [navigate, token]);

    return token ? children : null;  // 토큰이 있으면 자식 컴포넌트 렌더링, 없으면 null
};

export default ProtectedRoute;
