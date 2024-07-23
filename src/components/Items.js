import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/Items.css';
import NavigationBar from "./NavigationBar";
import SideNavBtn from "./SideNavBtn";

const Items = () => {
    const [activeSection, setActiveSection] = useState('prohibited');
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleNavClick = (section) => {
        setActiveSection(section);
    };

    const handleChatButtonClick = () => {
        navigate('/chat'); // chat.js로 이동
    };

    return (
        <div className="items-container">
            <NavigationBar/>
            <SideNavBtn/>
            <header className="items-header">
                <h1 className="items-title">기내 반입 금지물품</h1>
                <p className="items-description">
                    홈페이지 내의 정보는 참고사항으로 정확한 정보는 해당 항공사/기관/시설에 확인하여 주시기 바랍니다.
                </p>
                <button className="items-info-button" onClick={handleChatButtonClick}>
                    기내반입 금지물품 챗봇에게 물어보기
                    <img src="/images/Items_img/chat-bot.png"
                         alt="Chat Bot"
                         className="items-info-image"/>
                </button>
            </header>


            <nav className="items-nav">
                <ul className="items-nav-list">
                    <li
                        className={`items-nav-item ${activeSection === 'prohibited' ? 'items-active' : ''}`}
                        onClick={() => handleNavClick('prohibited')}
                    >
                        항공 운송 금지 품목
                    </li>
                    <li
                        className={`items-nav-item ${activeSection === 'restricted' ? 'items-active' : ''}`}
                        onClick={() => handleNavClick('restricted')}
                    >
                        제한적으로 운송 가능한 품목
                    </li>
                    <li
                        className={`items-nav-item ${activeSection === 'electric' ? 'items-active' : ''}`}
                        onClick={() => handleNavClick('electric')}
                    >
                        휴대용 일반 전자기기의 리튬배터리 운송 규정 안내
                    </li>
                    <li
                        className={`items-nav-item ${activeSection === 'liquids' ? 'items-active' : ''}`}
                        onClick={() => handleNavClick('liquids')}
                    >
                        액체류 반입 기준
                    </li>
                    <li
                        className={`items-nav-item ${activeSection === 'exception' ? 'items-active' : ''}`}
                        onClick={() => handleNavClick('exception')}
                    >
                        기내 반입 제한 예외 대상 물품
                    </li>
                </ul>
            </nav>

            {activeSection === 'prohibited' && (
                <section className="items-section">
                    <h2 className="items-subtitle">항공 운송 금지 품목</h2>
                    <div className="items-items">
                        <div className="items-item">
                            <img src="/images/Items_img/no_battery.png" alt="No Battery" className="items-item-image"/>
                            <h3 className="items-item-title">리튬배터리로 구동되는 일체형 탈 것류, 160Wh 초과하는 리튬배터리</h3>
                            <p className="items-item-description">에어휠, 솔로휠, 호버보드, 미니 세그웨이,
                                전기자전거(전동스쿠터), 전동 킥보드 등
                                (장애인, 노약자용 전동휠체어 제외)</p>
                        </div>
                        <div className="items-item">
                            <img src="/images/Items_img/no_bomb.png" alt="No Bomb" className="items-item-image"/>
                            <h3 className="items-item-title">폭발성, 인화성, 유독성 물질</h3>
                            <p className="items-item-description">수류탄, 다이너마이트, 폭죽, 표백제, 수은,
                                산화제, 독극물, 도수 70%이상 알코올성 음료,
                                소화기, 최루가스 등</p>
                        </div>
                        <div className="items-item">
                            <img src="/images/Items_img/no_case.png" alt="No Case" className="items-item-image"/>
                            <h3 className="items-item-title">인화성 고압가스가 들어있는 용기</h3>
                            <p className="items-item-description">부탄가스, 개인용 산소통 등
                                * 개인용 산소통은 사전예약을 통해 당사에서
                                제공하는 산소통을 이용하시기 바랍니다.</p>
                        </div>
                    </div>
                </section>
            )}

            {activeSection === 'restricted' && (
                <section className="items-section">
                    <h2 className="items-subtitle">제한적으로 운송 가능한 품목</h2>
                    <div className="restricted-container">
                        <div className="restricted-list-wrapper">
                            <ul className="restricted-list">
                                <li>
                                    여분의 리튬배터리(보조배터리), 전자담배, 라이터는 부치는 짐으로 운송 불가, 휴대하여 객실 반입만 허용 (단, 충전식 전기라이터는 전 노선 위탁,
                                    객실 반입 불가)
                                </li>
                                <li>1인당 2.5kg 이내의 드라이아이스</li>
                                <li>
                                    용기당(미국행) 또는 인당(호주발) 350ml 미만의 분말류(파우더류) 물품
                                    (&#039;18.6.30 부, 미국행/호주발 국제선 항공편에 한함)
                                </li>
                            </ul>
                        </div>
                        <div className="transport-container">
                            <div className="transport-header">위탁 수하물 운송 (객실 휴대 불가)</div>
                            <div className="transport-header">휴대 수하물 운송 (부치는 짐 불가)</div>
                        </div>
                        <div className="detailed-transport-container">
                            <div className="detailed-transport-item">
                                <ul className="detailed-transport-list">
                                    <li>도검, 칼 등 도검류</li>
                                    <li>야구배트, 골프채, 아령 등 스포츠용품류</li>
                                    <li>
                                        권총, 소총, 전자충격기, 총알 등 총기류 (항공사 승인 필요)
                                    </li>
                                    <li>망치, 못, 드릴 등 공구류</li>
                                    <li>쌍절곤, 격투무기, 수갑 등 무술호신용품</li>
                                    <li>100ml 초과하는 액체류 (국제선 노선 대상)</li>
                                    <li>
                                        에어로졸을 포함한 세면용품은 인당 최대 2L, 용기당 최대 500ml
                                        까지 허용
                                    </li>
                                </ul>
                            </div>
                            <div className="detailed-transport-item">
                                <ul className="detailed-transport-list">
                                    <li>라이터(1개), 성냥(1개)</li>
                                    <li>
                                        중국 출발편에서는 일체 운송 금지
                                        <br/>
                                        (단, 충전식 전기라이터는 전 노선 위탁, 객실 반입 불가)
                                    </li>
                                    <li>
                                        160Wh 이하 단락 방지 포장된 여분의 리튬배터리 및 보조배터리
                                    </li>
                                    <li>전자담배</li>
                                    <li>기내 및 여행지에서 복용해야 하는 의약품</li>
                                    <li>
                                        쉽게 파손되거나 부패될 수 있는 물품, 화폐, 유가증권, 보석류,
                                        고가품 및 귀중품 등
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            )}


            {activeSection === 'electric' && (
                <section className="items-section">
                    <h2 className="items-subtitle">휴대용 일반 전자기기의 리튬배터리 운송 규정 안내</h2>
                    <div className="electric-container">
                        <div className="electric-description">
                            항공 위험물 운송기술기준에 의해 위험물로 분류되는 리튬 배터리는 기내 휴대나
                            위탁수하물 반입이 금지되어 있으나,
                            국제항공 운송협회 위험물 규정(IATA Dangerous Goods Regulations)에 의거하여
                            손님이 여행 중 개인 사용 목적으로
                            인정될 수 있는 소량에 한하여 운송을 허가하고 있습니다.
                        </div>
                        <div className="electric-details">
                            <div className="electric-section">
                                <div className="electric-section-header">
                                    <div className="electric-section-title">리튬 배터리 용량</div>
                                </div>
                                <div className="electric-section-content">
                                    <div className="electric-subsection">
                                        <div className="electric-subtitle">
                                            <div className="electric-subtitle-text">휴대수하물</div>
                                        </div>
                                        <div className="electric-subtitle">
                                            <div className="electric-subtitle-text">위탁수하물(부치는짐)</div>
                                        </div>
                                    </div>
                                    <div className="electric-section-rows">
                                        <div className="electric-row">
                                            <div className="electric-item">
                                                <div className="electric-item-text">기기장착 상태</div>
                                            </div>
                                            <div className="electric-item">
                                                <div className="electric-item-text">여분(보조)배터리</div>
                                            </div>
                                            <div className="electric-item">
                                                <div className="electric-item-text">기기장착 상태</div>
                                            </div>
                                            <div className="electric-item">
                                                <div className="electric-item-text">여분(보조)배터리</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="electric-rules">
                                <div className="electric-rule">
                                    <div className="electric-rule-title">
                                        100Wh 초과~160Wh 이하<br/>
                                        리튬 함량 8g 이하<br/>
                                        (항공사 승인 필요)
                                    </div>
                                    <div className="electric-rule-content">
                                        <div className="electric-rule-item">휴대, 위탁 합하여 1개</div>
                                        <div className="electric-rule-item">2개 가능</div>
                                        <div className="electric-rule-item">휴대, 위탁 합하여 1개</div>
                                        <div className="electric-rule-item">운송불가</div>
                                    </div>
                                </div>
                                <div className="electric-rule">
                                    <div className="electric-rule-title">
                                        100Wh 이하, 리튬 함량 2g 이하
                                    </div>
                                    <div className="electric-rule-content">
                                        <div className="electric-rule-item">5개 가능</div>
                                        <div className="electric-rule-item">5개 가능</div>
                                        <div className="electric-rule-item">5개 가능</div>
                                        <div className="electric-rule-item">운송불가</div>
                                    </div>
                                </div>
                                <div className="electric-rule">
                                    <div className="electric-rule-title">
                                        160Wh 초과
                                    </div>
                                    <div className="electric-rule-content">
                                        <div className="electric-rule-item">운송불가</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="electric-notes">
                    <span>
                        <span className="electric-note">
                            * 배터리 용량 구하는 법 : 용량(Wh) = 전압(V) X 전류(Ah), 1Ah= 1,000mAh
                            <br/>
                        </span>
                        <ul className="electric-notes-list">
                            <li>
                                여분의 리튬배터리 및 보조 배터리는 위탁수하물로 운송이 불가하며,
                                휴대용 전자기기를 위탁수하물로 운송하는 경우 반드시 전원을 꺼주시기 바랍니다.
                            </li>
                            <li>
                                광저우, 베이징 등 중국 출발 항공편에는 리튬배터리(기기 장착, 여분 포함)의 위탁 수하물 반입이 엄격히 제한됩니다.
                                <br/>
                                또한 용량이 표시되지 않았거나 확인 불가시 운송이 거절될 수 있습니다.
                            </li>
                            <li>
                                리튬배터리로 구동되는 일체의 탈 것류(장애인, 노약자용 전동 휠체어 제외)는 배터리 용량에 관계없이 기내반입/수하물 위탁 모두 불가합니다.
                            </li>
                            <li>
                                * 대상 품목 : 에어휠, 솔로휠, 호버보드, 미니 세그웨이, 전기 자전거(전동 스쿠터), 전동 킥보드, 전동 스케이트 보드 등
                            </li>
                            <li>
                                객실 내 사용을 위한 POC, CPAP 등의 휴대용 전자 의료기기에는 별도의 규정이 적용됩니다.
                            </li>
                            <li>
                                일본 출발 항공편의 경우 리튬배터리 분리불가형 헤어컬(고데기)은 기내반입/수하물 위탁 모두 불가합니다.
                            </li>
                        </ul>
                    </span>
                        </div>
                    </div>
                </section>
            )}

            {activeSection === 'liquids' && (
                <section className="items-section">
                    <h2 className="items-subtitle">액체류 반입 기준</h2>
                    <ul className="liquids-item">
                        <li>국제선 전 노선 출발/환승 승객 (국내선 노선 승객은 액체류 기내 반입 제한 없음)</li>
                        <li>각 용기의 용량이 100ml 이하로 1인당 1개의 1L 용량의 투명 비닐 지퍼백에 넣어 휴대반입이 가능합니다.</li>
                        <li>당뇨병 환자용 및 의약품은 항공일정에 필요한 용량에 한하여 기내에 휴대할 수 있습니다.</li>
                    </ul>
                    <div className="items-items">
                        <div className="items-item">
                            <h3 className="items-item-title">전체 1L 이하 가능</h3>
                            <img src="/images/Items_img/img_liquid_01.gif" alt="img_liquid_01"
                                 className="items-item-image"/>
                        </div>
                        <div className="items-item">
                            <h3 className="items-item-title">전체 1L 초과 불가</h3>
                            <img src="/images/Items_img/img_liquid_02.gif" alt="img_liquid_02"
                                 className="items-item-image"/>
                        </div>
                        <div className="items-item">
                            <h3 className="items-item-title">개별용기 100ML 초과 불가</h3>
                            <img src="/images/Items_img/img_liquid_03.gif" alt="img_liquid_03"
                                 className="items-item-image"/>
                        </div>
                    </div>
                </section>
            )}


            {activeSection === 'exception' && (
                <section className="items-section">
                    <div className="items-subtitle">기내 반입 제한 예외 대상 물품</div>
                    <div className="exception-img-box">
                        <div className="exception-top">
                            <div className="exception-first">
                                <div className="pill1-box">
                                    <img className="pill1" src="/images/Items_img/pill1.png" alt="의약품"/>
                                    <div className="pill1-text-box">
                                        <div className="pill1-title">의약품</div>
                                        <div className="pill1-info">
                                            처방약품
                                            <br/>
                                            의사 처방전이 있는 약품
                                            <br/>
                                            <br/>
                                            시판약품
                                            <br/>
                                            액상 감기약, 액상 위장약, 기침 억제시럽, 겔 캅셀약,
                                            <br/>
                                            비강스프레이, 해열파스, 안약, 의료용 식염수,
                                            <br/>
                                            콘택트 렌즈용제(보존 액)
                                            <br/>
                                            <br/>
                                            * 비행 여정에 적합한 용량만 허용
                                            <br/>
                                            * 보안 검색 시 신고 필요
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="exception-second">
                                <div className="pill2-box">
                                    <img className="pill2" src="/images/Items_img/pill2.png" alt="비 의약품"/>
                                    <div className="pill2-text-box">
                                        <div className="pill2-title">비 의약품</div>
                                        <div className="pill2-info">
                                            의료 목적으로 사용되는 얼음(이식용 장기 보관용),
                                            <br/>
                                            혈액 또는 혈액관련 약제, 자폐증환자용 음료
                                            <br/>
                                            * 비행 여정에 적합한 용량만 허용
                                            <br/>
                                            * 보안 검색 시 신고 필요
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="exception-bottom">
                            <div className="exception-third">
                                <div className="pill3-box">
                                    <img className="pill3" src="/images/Items_img/pill3.png" alt="특별 식이 처방 음식"/>
                                    <div className="pill3-text-box">
                                        <div className="pill3-title">특별 식이 처방 음식</div>
                                        <div className="pill3-info">
                                            승객의 건강에 꼭 필요한 의사 처방전이 있는 음식
                                            <br/>
                                            * 비행 여정에 적합한 용량만 허용
                                            <br/>
                                            * 보안 검색 시 신고 필요
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="exception-forth">
                                <div className="pill4-box">
                                    <img className="pill4" src="/images/Items_img/pill4.png" alt="어린아이 용품"/>
                                    <div className="pill4-text-box">
                                        <div className="pill4-title">어린아이 용품</div>
                                        <div className="pill4-info">
                                            우유, 물, 주스, 모유, 액체 ∙ 겔 ∙ 죽 형태의 음식 및
                                            <br/>
                                            젖어있는 티슈
                                            <br/>
                                            * 유아 동반에 한하여 비행여정에 적합한 용량만 허용
                                            <br/>
                                            * 보안 검색 시 신고 필요
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="warning-container">
                        <div className="warning-box">
                                <span>
                                    <span className="warning-title">
                                        유의사항
                                        <br/>
                                    </span>
                                    <ul className="warning-info">
                                        <li>
                                            의사가 처방한 의약품에 대하여는 의약 상품명 또는 의사소견서를
                                            소지하고 물품의 출처를 증명하는
                                            <br/>
                                            서류 (처방전, 약 봉투, 진단서 등)를 제시하여야 합니다.
                                        </li>
                                        <li>
                                            보안 검색요원에 의해 물품 샘플 채취 또는 진위 여부를 확인 받을 수
                                            있습니다.
                                        </li>
                                        <li>의심의 여지가 있는 경우 물품 포기 또는 압수될 수 있습니다.</li>
                                        <li>
                                            각 국가/지역 사정에 따라 해외 도착지 또는 환승 검색 시 압수될 수도
                                            있습니다.
                                        </li>
                                        <li>
                                            비행 여정은 출발 공항부터 최종 목적지 공항 도착까지의 총 비행시간 및
                                            지연운항, 회항, 공항 터미널 대기 시간 등을 고려하여 합한 총 시간을
                                            의미합니다.
                                        </li>
                                        <li>
                                            예외 대상품목은 1리터 투명개폐가능봉투에 담겨져 있지 않아도
                                            허용됩니다.
                                        </li>
                                        <li>
                                            액체류 면세품을 구매한 승객이 환승 검색대를 통과할 때 STEB에 물품과
                                            영수증이 들어있지 않으면 물품이 폐기 또는 압류 처분 됩니다.
                                            <br/>
                                            (인천-부산 내항기 환승시에도 해당)
                                        </li>
                                        <li>
                                            제품 물질의 성분을 확인하기 어려운 물품의 경우,
                                            MSDS(물질안전보건자료)가 요구될 수 있습니다.
                                        </li>
                                    </ul>
                                </span>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Items;
