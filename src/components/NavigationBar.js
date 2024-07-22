// import '../styles/NavDark.css';
import '../styles/NavigationBar.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            setIsVisible(false); // 스크롤 다운 시 숨기기
        } else {
            setIsVisible(true); // 스크롤 업 시 보이기
        }
        setLastScrollY(window.scrollY);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const [isSlideVisible, setIsSlideVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsSlideVisible(true);
    };

    const handleMouseLeave = () => {
        setIsSlideVisible(false);
    };

    return (
        <nav className={`dark-nav-bar ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="dark-nav-bar-frame"
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}>
                {/* 네비 메인 */}
                <div className="dark-nav-bar-box">
                    {/* 로고 */}
                    <div className="dark-nav-bar-box-logo">
                        <div className="dark-a-irport">
                            <a href='/'>AIrport</a>
                        </div>
                    </div>

                    <div
                        className="dark-nav-bar-box-content"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* 서비스 소개 */}
                        <div className="dark-nav-bar-box-service">
                            <div className="dark-service-intro"
                                 href='/ServiceIntro'>
                                <a href='/ServiceIntro'>서비스소개</a>
                            </div>
                            <div className="dark-bar-box-under-bar"></div>
                        </div>

                        {/* 고객 서비스 */}
                        <div className="dark-nav-bar-box-customer">
                            <div className="dark-customer">고객서비스</div>
                            <div className="dark-bar-box-under-bar"></div>
                        </div>

                        {/* 기업 서비스 */}
                        <div className="dark-nav-bar-box-staff">
                            <div className="dark-staff-support">직원서비스</div>
                            <div className="dark-bar-box-under-bar"></div>
                        </div>
                    </div>


                    {/* 우측 아이콘 */}
                    <div className="dark-nav-bar-box-icons">
                        {isLoggedIn ? (
                            <>
                                <Link to='/Mypage'>
                                    <img
                                        className="dark-nav-bar-box-icons-user-mypage"
                                        src="/images/images/navicons/dark/mypage.png"
                                    />
                                </Link>
                                <Link to='/' onClick={handleLogout}>
                                    <img
                                        className="dark-nav-bar-box-icons-user-logout"
                                        src="/images/images/navicons/dark/logout.png"
                                    />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to='/signup'>
                                    <img className="dark-bar-box-icons-signin"
                                         src="/images/images/navicons/dark/signin.png"/>
                                </Link>
                                <Link to='/Login'>
                                    <img className="dark-bar-box-icon-login"
                                         src="/images/images/navicons/dark/login.png"/>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div onMouseEnter={handleMouseEnter}
                             onMouseLeave={handleMouseLeave}>
                {/* 네비 슬라이드 */}
                <div className={`dark-main-nav-bar-slide ${isSlideVisible ? 'dark-visible' : ''}`}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    {/* 고객 서비스 슬라이드 */}
                    <div className="dark-nav-bar-slide-customer"
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}>
                        <div className="dark-nav-bar-slide-customer-1">
                            <div className="dark-nav-bar-slide-text">
                                <a href='/Procedure'>수속시간안내</a>
                            </div>
                        </div>
                        <div className="dark-nav-bar-slide-customer-2">
                            <div className="dark-nav-bar-slide-text">
                                <a href='/Items'>반입물품안내</a>
                            </div>
                        </div>
                        <div className="dark-nav-bar-slide-customer-3">
                            <div className="dark-nav-bar-slide-text">
                                <a href='/Lost'>공항분실물검색</a>
                            </div>
                        </div>
                    </div>

                    {/* 기업 서비스 슬라이드 */}
                    <div className="dark-nav-bar-slide-staff">
                        <div className="dark-nav-bar-slide-staff-1">
                            <div className="dark-nav-bar-slide-text">
                                <Link to='/Register'>분실물간편등록</Link>
                            </div>
                        </div>
                        <div className="dark-nav-bar-slide-staff-2">
                            <div className="dark-nav-bar-slide-text">
                                <Link to='/Management'>분실물게시판관리</Link>
                            </div>
                        </div>
                        <div className="dark-nav-bar-slide-staff-3">
                            <div className="dark-nav-bar-slide-text">
                                <Link to='/Taxi'>택시승강장관리</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
