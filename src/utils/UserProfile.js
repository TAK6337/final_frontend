import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ token }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('사용자 정보 가져오기 실패:', error);
                setError('사용자 정보를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUserProfile();
        } else {
            setLoading(false); // No token, stop loading
        }
    }, [token]);

    if (loading) {
        return <p>프로필 정보를 가져오는 중입니다...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {profile ? (
                <div>
                    <h1>사용자 프로필</h1>
                    <p>닉네임: {profile.properties?.nickname || profile.kakao_account?.profile?.nickname}</p>
                    <p>이메일: {profile.kakao_account?.email || '이메일 정보 없음'}</p>
                </div>
            ) : (
                <p>프로필 정보가 없습니다.</p>
            )}
        </div>
    );
};

export default UserProfile;
