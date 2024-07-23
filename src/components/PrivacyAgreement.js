import React, {useState} from 'react';
import '../styles/PrivacyAgreement.css';
import {useNavigate, Link} from 'react-router-dom';

const PrivacyAgreement = ({setAgreed}) => {
    const [allAgreed, setAllAgreed] = useState(false);
    const [serviceAgreed, setServiceAgreed] = useState(false);
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const navigate = useNavigate();

    const handleAllAgreeChange = () => {
        const newValue = !allAgreed;
        setAllAgreed(newValue);
        setServiceAgreed(newValue);
        setPrivacyAgreed(newValue);
    };

    const handleSubmit = () => {
        if (serviceAgreed && privacyAgreed) {
            setAgreed(true);
            navigate('/Signup');
        } else {
            alert('모든 필수 항목에 동의해주세요.');
        }
    };

    return (
        <div className="full-container">
            <Link to="/">
                <img src="/images/chatbot/AIport.png" alt="AIrport 로고" className="home-logo"/>
            </Link>
            <div className="privacy-agreement">
                <h1>개인정보 수집 동의</h1>
                <p><span className="highlight-text">AIrport 이용약관에 동의 해주세요</span></p>
                <div className="checkbox-group">
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={allAgreed}
                            onChange={handleAllAgreeChange}
                        />
                        <span className="checkmark"></span>
                        <span className="highlight-text">모두 동의합니다.</span>
                    </label>
                </div>
                <div className="checkbox-group">
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={serviceAgreed}
                            onChange={() => setServiceAgreed(!serviceAgreed)}
                        />
                        <span className="checkmark"></span>
                        <span className="highlight-text">[필수] AIrport 서비스 이용약관 동의</span>
                    </label>
                </div>
                <div className="scroll-box">
                    <p><span className="highlight-text">여러분을 환영합니다.</span> AIrport 서비스를 이용해 주셔서 감사합니다. 본 약관은 다양한
                        AIrport 서비스의 이용과 관련하여 AIrport 서비스 제공하는 회사(이하
                        ‘AIrport’)의 이용하는 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 여러분의 AIrport 서비스 이용에 도움을 드리고자 마련되었습니다.</p>
                </div>

                <div className="checkbox-group">
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={privacyAgreed}
                            onChange={() => setPrivacyAgreed(!privacyAgreed)}
                        />
                        <span className="checkmark"></span>
                        <span className="highlight-text">[필수] 개인정보 수집 및 이용 동의</span>
                    </label>
                </div>
                <div className="scroll-box">
                    <p><span className="highlight-text">개인정보 수집 및 이용 동의서</span>

                        AIrport는 개인정보보호법에 따라 회원가입 신청 시 수집하는 개인정보의 항목, 개인정보의 수집 및 이용 목적, 개인정보의 보유 및 이용 기간, 동의 거부권 및 동의 거부
                        시
                        불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.<br/><br/>

                        <span className="highlight-text">1. 수집하는 개인정보</span>
                        이용자는 회원가입을 하지 않아도 수속 시간 안내, 반입 물품 안내 등 대부분의 AIrport 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 분실물 등록, 택시
                        승강장 관리
                        등과 같이 관리자 서비스를 이용하기 위해 회원가입을 할 경우, AIrport는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.<br/><br/>

                        회원가입 시점에 AIrport가 이용자로부터 수집하는 개인정보는 아래와 같습니다.

                        회원 가입 시 필수항목으로 아이디, 비밀번호, 이름, 휴대전화번호, 성별, 생년월일을 수집합니다. 실명 인증된 아이디로 가입 시, 암호화된 동일인 식별정보(CI), 중복가입 확인정보(DI)를
                        함께
                        수집합니다.
                        서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.

                        <span className="highlight-text">2. 수집한 개인정보의 이용</span>
                        AIrport 및 관련 제반 서비스(모바일 웹/앱 포함)의 회원관리, 서비스 개발・제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를
                        이용합니다.<br/><br/>

                        회원 가입 의사의 확인, 연령 확인 및 법정대리인 동의 진행, 이용자 및 법정대리인의 본인 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를
                        이용합니다.
                        콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사
                        등에
                        기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다. 신규 서비스 요소의 발굴 및 기존 서비스 개선 등에는 정보
                        검색,
                        다른 이용자와의 커뮤니케이션, 콘텐츠 생성·제공·추천, 상품 쇼핑 등에서의 인공지능(AI) 기술 적용이 포함됩니다.
                        법령 및 AIrport 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용
                        및
                        부정거래 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
                        유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및 서비스의 배송을 위하여 개인정보를 이용합니다.
                        이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.
                        서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에 개인정보를 이용합니다.
                        보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.<br/><br/>

                        <span className="highlight-text">3. 개인정보의 보관기간</span>
                        회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체 없이 파기하고 있습니다. 단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정
                        기간 정보
                        보관 의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다. 이용자에게 개인정보 보관기간에 대해 회원가입 시 또는 서비스 가입 시 동의를 얻은 경우는
                        아래와
                        같습니다.<br/><br/>

                        부정 가입 및 이용 방지
                        부정 이용자의 가입인증 휴대전화번호 및 DI 식별정보는 탈퇴일로부터 6개월간 보관합니다.
                        AIrport서비스 부정 이용 기록
                        부정 가입 및 운영 원칙을 위반한 경우 등 부정 이용 기록은 탈퇴일로부터 1년간 보관합니다.
                        QR코드 발급 서비스
                        공항 패스트트랙 QR코드 발급을 위하여 이름, 생년월일, 성별, 탑승정보(항공사, 편명)를 회원탈퇴 시 지체 없이 파기합니다.
                        위치정보 이용 기록
                        위치정보의 보호 및 이용 등에 관한 법률 제16조에 따라 위치정보 이용 기록은 1년간 보관합니다.<br/><br/>

                        <span className="highlight-text">4. 개인정보 수집 및 이용 동의를 거부할 권리</span>
                        이용자는 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 회원 가입 시 수집하는 최소한의 개인정보, 즉 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우,
                        회원가입이
                        어려울 수 있습니다.
                    </p>
                </div>

                <button className="agree-button" onClick={handleSubmit}>회원가입</button>
            </div>
        </div>
    );
};

export default PrivacyAgreement;
