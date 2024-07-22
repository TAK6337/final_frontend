import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

const OAuthRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const provider = queryParams.get('provider');;
        const code = queryParams.get('code');

        if (provider && code) {
            handleOAuthLogin(provider, code);
        } else {
            console.error('Invalid provider or code');
        }
    }, [location.search]);

    const handleOAuthLogin = async (provider, code) => {
        try {
            let token;
            if (provider === 'kakao') {
                token = await getKakaoAccessToken(code);
            } else if (provider === 'google') {
                token = await getGoogleAccessToken(code);
            } else {
                console.error('Unsupported provider');
                return;
            }

            const response = await axios.post(`/auth/social-login`, {provider,  token });
            console.log(response.status)
            if (response.status === 200) {
                alert('Login successful');

            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('OAuth login failed', error);
            alert('Login failed');
        }
    };

    const getKakaoAccessToken = async (code) => {
        console.log(code)
        try {
            const response = await axios.post('https://kauth.kakao.com/oauth/token', qs.stringify, {
                params: {
                    grant_type: 'authorization_code',
                    client_id: '160902b869d905d3e51e7580bdd12709',
                    redirect_uri: 'http://localhost:3000/oauth2/kakao/callback',
                    code
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            return response.data.access_token;
        } catch (error) {
            console.error('Failed to get Kakao access token', error);
            throw error;
        }
    };

    const getGoogleAccessToken = async (code) => {
        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', null, {
                params: {
                    grant_type: 'authorization_code',
                    client_id: 'YOUR_GOOGLE_CLIENT_ID',
                    client_secret: 'YOUR_GOOGLE_CLIENT_SECRET',
                    redirect_uri: 'YOUR_GOOGLE_REDIRECT_URI',
                    code
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            return response.data.access_token;
        } catch (error) {
            console.error('Failed to get Google access token', error);
            throw error;
        }
    };

    return (
        <div>
            <h2>Processing OAuth Login...</h2>
        </div>
    );
};

export default OAuthRedirect;
