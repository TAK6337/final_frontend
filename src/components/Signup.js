import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import '../styles/Signup.css';
import ReCAPTCHA from 'react-google-recaptcha';

const Signup = ({ agreed }) => {
    const [userID, setUsername] = useState('');
    const [userIDError, setUsernameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [notRobot, setNotRobot] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!agreed) {
            navigate('/PrivacyAgreement');
        }
    }, [agreed, navigate]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError('');
    };

    const handleUsernameBlur = () => {
        const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
        if (userID && !usernameRegex.test(userID)) {
            setUsernameError('아이디는 3~16자의 영문, 숫자, 밑줄, 하이픈만 가능합니다.');
        } else {
            setUsernameError('');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handleEmailBlur = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            setEmailError('올바른 이메일 형식이 아닙니다.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword1(e.target.value);
        setPasswordError('');
    };

    const handlePasswordBlur = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (password1 && !passwordRegex.test(password1)) {
            setPasswordError('비밀번호는 최소 10-16자리 대/소/특수문자/숫자 중 2가지 이상을 포함해야 합니다');
        } else {
            setPasswordError('');
        }
    };

    const handlePassword2Change = (e) => {
        setPassword2(e.target.value);
        setPasswordMatchError('');
    };

    const handlePassword2Blur = () => {
        if (password2 && password1 !== password2) {
            setPasswordMatchError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordMatchError('');
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        setPhoneError('');
    };

    const handleRobotChange = (e) => {
        setNotRobot(e.target.value);
    };

    const handlePhoneBlur = () => {
        const phoneRegex = /^01[016789]\d{3,4}\d{4}$/;
        if (phone && !phoneRegex.test(phone)) {
            setPhoneError('올바른 전화번호 형식이 아닙니다.');
        } else {
            setPhoneError('');
        }
    };

    const onCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 최종 검증
        handleUsernameBlur();
        handleEmailBlur();
        handlePasswordBlur();
        handlePassword2Blur();
        handlePhoneBlur();

        if (userIDError || emailError || passwordError || passwordMatchError || phoneError) {
            return;
        }

        // 회원가입 처리 로직
        const user = {
            userID: userID,
            name: name,
            email: email,
            password: password1,
            phoneNumStr: phone,
            captchaResponse: captchaValue
        };

        try {
            const response = await axios.post('/auth/signup', user);
            console.log('Success:', response.data);
            setShowModal(true); // 회원가입 성공 시 모달 표시
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    return (
        <div className="signup-full-container">
            <Link to="/">
                <img src="/images/chatbot/AIport.png" alt="AIrport 로고" className="signup-home-logo"/>
            </Link>
            <div className="signup-container">
                <h1 className="signup-title">회원가입</h1>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="input-label">아이디 입력</label>
                        <input
                            type="text"
                            placeholder="아이디는 3~16자의 영문, 숫자, 밑줄, 하이픈만 가능합니다."
                            className="signup-input"
                            value={userID}
                            onChange={handleUsernameChange}
                            onBlur={handleUsernameBlur}
                        />
                        <div className="error-message-container">
                            {userIDError && <p className="sign-error-message">{userIDError}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="input-label">이메일 입력</label>
                        <div className="input-button-container">
                            <input
                                type="text"
                                placeholder="이메일을 입력해주세요."
                                className="signup-input"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={handleEmailBlur}
                            />
                        </div>
                        <div className="error-message-container">
                            {emailError && <p className="sign-error-message">{emailError}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="input-label">비밀번호 입력</label>
                        <input
                            type={showPassword1 ? "text" : "password"}
                            placeholder="10-16자리 대/소/특수문자/숫자 중 2가지 이상을 포함해야 합니다."
                            className="signup-input"
                            value={password1}
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                        />
                        <button
                            type="button"
                            className="show-hide-button"
                            onClick={() => setShowPassword1(!showPassword1)}
                        >
                            {showPassword1 ? <FaEyeSlash/> : <FaEye/>}
                        </button>
                        <div className="error-message-container">
                            {passwordError && <p className="sign-error-message">{passwordError}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="input-label">비밀번호 확인</label>
                        <input
                            type={showPassword2 ? "text" : "password"}
                            placeholder="비밀번호를 다시 입력해주세요."
                            className="signup-input"
                            value={password2}
                            onChange={handlePassword2Change}
                            onBlur={handlePassword2Blur}
                        />
                        <button
                            type="button"
                            className="show-hide-button"
                            onClick={() => setShowPassword2(!showPassword2)}
                        >
                            {showPassword2 ? <FaEyeSlash/> : <FaEye/>}
                        </button>
                        <div className="error-message-container">
                            {passwordMatchError && <p className="sign-error-message">{passwordMatchError}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="input-label">이름 입력</label>
                        <input
                            type="text"
                            placeholder="이름을 입력해주세요."
                            className="signup-input"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">전화번호 입력</label>
                        <div className="input-button-container">
                            <input
                                type="text"
                                placeholder="전화번호를 입력해주세요."
                                className="signup-input"
                                value={phone}
                                onChange={handlePhoneChange}
                                onBlur={handlePhoneBlur}
                            />
                        </div>
                        <div className="error-message-container">
                            {phoneError && <p className="sign-error-message">{phoneError}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <ReCAPTCHA
                            sitekey="6LcX7hIqAAAAANwXNsGWClj7CFdauq4p-x4e_i7e" // 여기서 YOUR_SITE_KEY를 Google에서 받은 사이트 키로 변경하세요.
                            onChange={onCaptchaChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="signup-button"
                        disabled={!userID || !email || !password1 || !password2 || !phone}
                    >
                        <span>회원가입</span>
                    </button>
                </form>
            </div>

            {showModal && (
                <div className="modal-backdrop" onClick={handleBackdropClick}>
                    <div className="modal">
                        <h2>이메일 인증</h2>
                        <p>회원가입이 완료되었습니다. 이메일을 확인해 주세요.</p>
                        <button className="modal-button" onClick={handleCloseModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
