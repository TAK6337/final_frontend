import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userState from '../utils/userstate';  // 올바른 경로로 수정합니다.

const OAuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const setUser = useSetRecoilState(userState);

    useEffect(() => {
        const handleOAuthLogin = async (code) => {
            try {
                console.log('Authorization code:', code);

                // 카카오 액세스 토큰 요청
                const tokenResponse = await getKakaoAccessToken(code);

                // 전체 응답에서 access_token 추출
                const accessToken = tokenResponse.access_token;
                console.log('Access token:', accessToken);

                // 백엔드로 토큰 전송
                const response = await axios.post('/auth/social-login', null, {
                    params: {
                        provider: 'kakao',
                        token: accessToken,
                    },
                });

                console.log('Backend response:', response.data);

                if (response.status === 200) {
                    // 로컬스토리지에 토큰 저장
                    localStorage.setItem('token', accessToken);

                    // alert('소셜 로그인 성공');
                    setUser(response.data); // 성공 시 Recoil 상태 업데이트
                    navigate('/'); // 로그인 성공 후 리디렉션
                } else {
                    alert('소셜 로그인 실패');
                    navigate('/error'); // 로그인 실패 시 에러 페이지로 리디렉션
                }
            } catch (error) {
                console.error('OAuth login failed', error);
                alert('소셜 로그인 실패');
                navigate('/error'); // 로그인 실패 시 에러 페이지로 리디렉션
            }
        };

        const getKakaoAccessToken = async (code) => {
            try {
                const response = await axios.post(
                    'https://kauth.kakao.com/oauth/token',
                    new URLSearchParams({
                        grant_type: 'authorization_code',
                        client_id: '160902b869d905d3e51e7580bdd12709', // 카카오 애플리케이션의 REST API 키
                        redirect_uri: 'http://localhost:3000/oauth', // 리디렉션 URI
                        code, // 전달된 authorization code
                    }).toString(), // URLSearchParams를 사용하여 인코딩
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded', // 요청 본문 형식
                        },
                    }
                );

                // 전체 응답 데이터 반환
                console.log('Kakao Access Token Data:', response.data);
                return response.data; // 전체 응답 데이터 반환
            } catch (error) {
                console.error('Failed to get Kakao access token', error.response ? error.response.data : error.message);
                throw error;
            }
        };

        // URL에서 authorization code 추출
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        if (code) {
            handleOAuthLogin(code);
        } else {
            alert('Authorization code not found');
            navigate('/error'); // 코드가 없을 시 에러 페이지로 리디렉션
        }
    }, [location, navigate, setUser]);

    return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};

export default OAuthRedirect;
