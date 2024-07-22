import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Procedure.css';
import NavigationBar from '../components/NavigationBar';

function Procedure() {

    return(
        <div className="procedure-div">
            <NavigationBar/>
            <div className="procedure-main">
                <div className="procedure-main-title">탑승수속 과정 상세</div>
                <div className="procedure-main-ex">
                    <div className="procedure-one">STEP 01. 공항 도착</div>
                    <div className="procedure-one-ex">
                        <span>
                          <span className="procedure-one-ex-span">
                            출발 2시간 전까지 공항에 도착하셔야 합니다.
                            <br/>
                            탑승 수속 시 반드시 지참하세요!
                            <br/>
                          </span>
                          <ul className="procedure-one-ex-span2">
                            <li>
                              여권 : 대부분의 국가는 출국일 기준 여권 유효기간이 6개월 이상 남아
                              있어야 하며, 서명란에 본인 자필 서명 필요 국내선은 유효 신분증
                            </li>
                            <li>비자 : 필요 유무는 방문국의 대사관에 문의</li>
                            <li>전자항공권(e-Ticket)</li>
                          </ul>
                        </span>
                    </div>
                    <div className="procedure-two">STEP 02. 탑승 수속 및 탑승권 발급</div>
                    <div className="procedure-two-ex">
                        <ul className="procedure-two-ex-span">
                            <li>
                                여권 및 여행에 필요한 서류(비자), 전자항공권을 제시하여 좌석 배정을
                                받고 수하물 위탁과 함께 탑승권과 수하물표를 받으실 수 있습니다.
                            </li>
                            <li>탑승 수속 마감 시간 : 항공편 출발 60분 전</li>
                            <li>국제선 : 항공편 출발 60분 전</li>
                            <li>국내선 : 항공편 출발 30분 전</li>
                        </ul>
                    </div>
                    <div className="procedure-three">STEP 03. 병무 심사, 검역 신고, 세관 신고</div>
                    <div className="procedure-three-ex">
                        <ul className="procedure-three-ex-span">
                            <li>
                                병무 심사 : 25세 이상 병역 미필 병역 의무자가 국외를 여행하고자 할
                                때는 병무청에 국외 여행허가를 받고 출국 당일 법무부 출입국에서
                                <br/>
                                출국심사 시 국외 여행허가 증명서를 제출하여야 합니다. (영주권 사유
                                병역연기 및 면제자 포함)
                            </li>
                            <li>
                                검역 신고 : 여행자 및 동식물에 대한 검역증명서 발급이 필요한 경우
                                탑승수속 전에 검역소를 통해 절차를 밟으셔야 합니다.
                            </li>
                            <li>
                                세관 신고 : 미화 1만불을 초과하는 일반 해외여행 경비를 가지고
                                출국하실 경우 세관에 반드시 신고하셔야 하며
                                <br/>
                                귀중품/고가품 등의 휴대품에 대해서도 신고하셔야 합니다.
                            </li>
                        </ul>
                    </div>
                    <div className="procedure-four">STEP 04. 보안 검색</div>
                    <div className="procedure-four-ex">
                        <ul className="procedure-four-ex-span">
                            <li>
                                여행자와 항공기의 안전을 위해 여행객 및 휴대품을 대상으로 보안검색을
                                실시합니다.
                            </li>
                            <li>
                                기내 반입 금지 물품을 아래 링크에서 사전에 확인해 주시기 바랍니다.
                            </li>
                        </ul>
                    </div>
                    <div className="procedure-five">STEP 05. 출국 심사</div>
                    <div className="procedure-five-ex">
                        <ul className="procedure-five-ex-span">
                            <li>
                                여행자는 유효한 여권과 도착 국가에서 요구하는 여행서류(비자)를
                                지참하고 출국심사를 받으시게 됩니다.
                            </li>
                            <li>
                                인천공항의 경우 자동화된 출국 심사제도를 운용하고 있어 사전 등록을
                                마친 고객은 좀 더 편리하고 신속하게 출국심사를 받을 수 있습니다.
                            </li>
                            <li>
                                자동 출국심사제도 및 일반 출국심사 절차와 관련된 자세한 내용은 아래
                                링크를 확인해 주시기 바랍니다.
                            </li>
                        </ul>
                    </div>
                    <div className="procedure-six">STEP 06. 항공기 탑승</div>
                    <div className="procedure-six-ex">
                        <ul className="procedure-six-ex-span">
                            <li>
                                출발 탑승구에 미리 도착 후 대기하시어 정시 출발에 협조를 부탁
                                드립니다.
                            </li>
                            <li>
                                국제선 : 항공기 출발 25 ~ 30분 전 탑승 시작, 출발 10분 전 탑승 마감
                            </li>
                            <li>국내선 : 항공기 출발 20분 전 탑승 시작, 출발 5분 전 탑승 마감</li>
                        </ul>
                    </div>
                </div>
            </div>
            <img className="procedure-process-images" src="/images/process-images.png">

            </img>
            <div className="procedure-title">
                <div className="procedure-title-text">탑승수속 과정 안내</div>
                <div className="procedure-title-explain">
                    <div className="procedure-mini-plane">
                        <img
                            className="procedure-airplane-travel-plane-adventure-airplane-transportation"
                            src="/images/mini_plane.png"
                        />
                    </div>
                    <div className="procedure-title-explain-text">
                        공항 도착에서부터 항공편 탑승까지 절차를 안내해 드립니다
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Procedure;