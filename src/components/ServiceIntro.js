import React from 'react';
import '../styles/ServiceIntro.css';
import NavigationBar from '../components/NavigationBar';
import SideNavBtn from '../components/SideNavBtn';


function ServiceIntro(){
    return(
        <div className="serviceintro-div">
            <NavigationBar/>
            <SideNavBtn/>
            <div className="serviceintro-main-content">
                <div className="serviceintro-up">
                    <div className="serviceintro-title-explain">
                        <div className="serviceintro-title">Target</div>
                        <div className="serviceintro-explain">
                            반반백조의 프로젝트는 대구 신공항에 AI 기술을 도입하여 스마트공항으로의 발전을 도모하고 있습니다.
                            <br/>
                            국내 공항 핵심 서비스들의 단점을 AI 기술로 보완하여 공항 서비스에 대한 솔루션을 제공합니다.
                        </div>
                    </div>
                    <div className="serviceintro-content-divide"></div>
                </div>
                <div className="serviceintro-bottom">
                    <div className="serviceintro-bottom-text">
                        <div className="serviceintro-bottom-title">Service</div>
                        <div className="serviceintro-bottom-explain">
                            ‘반반백조’의 프로젝트가 제공하는 서비스를 한눈에 살펴보세요.
                        </div>
                    </div>
                    <div className="serviceintro-bottom-content">
                        <div className="serviceintro-bottom-3-part">
                            <div className="serviceintro-bottom-3-part-title">고객 서비스</div>
                            <div className="serviceintro-bottom-3-part-content">
                                <div className="serviceintro-content-container">
                                    <img className="serviceintro-image-icon" src="/images/circle(temp).png"/>
                                    <div className="serviceintro-content-title">수속시간안내</div>
                                    <div className="serviceintro-content-explain">
                                        We Keep Your Web build Online 24x7x365.
                                        <br/>
                                        Downtime not only costs you lost visitors but also damages your
                                        reputation and search engine rankings.
                                    </div>
                                </div>
                                <div className="serviceintro-content-container">
                                    <img className="serviceintro-image-icon" src="/images/circle(temp).png"/>
                                    <div className="serviceintro-content-title">반입물품안내</div>
                                    <div className="serviceintro-content-explain">
                                        We Keep Your Web build Online 24x7x365.
                                        <br/>
                                        Downtime not only costs you lost visitors but also damages your
                                        reputation and search engine rankings.
                                    </div>
                                </div>
                                <div className="serviceintro-content-container">
                                    <img className="serviceintro-image-icon" src="/images/circle(temp).png"/>
                                    <div className="serviceintro-content-title">분실물찾기</div>
                                    <div className="serviceintro-content-explain">
                                        We Keep Your Web build Online 24x7x365.
                                        <br/>
                                        Downtime not only costs you lost visitors but also damages your
                                        reputation and search engine rankings.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="serviceintro-bottom-2-part">
                            <div className="serviceintro-bottom-2-part-title">직원 서비스</div>
                            <div className="serviceintro-bottom-2-part-content">
                                <div className="serviceintro-content-container">
                                    <img className="serviceintro-image-icon" src="/images/circle(temp).png"/>
                                    <div className="serviceintro-content-title">분실물찾기</div>
                                    <div className="serviceintro-content-explain">
                                        We Keep Your Web build Online 24x7x365.
                                        <br/>
                                        Downtime not only costs you lost visitors but also damages your
                                        reputation and search engine rankings.
                                    </div>
                                </div>
                                <div className="serviceintro-content-container">
                                    <img className="serviceintro-image-icon" src="/images/circle(temp).png"/>
                                    <div className="serviceintro-content-title">분실물찾기</div>
                                    <div className="serviceintro-content-explain">
                                        We Keep Your Web build Online 24x7x365.
                                        <br/>
                                        Downtime not only costs you lost visitors but also damages your
                                        reputation and search engine rankings.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default ServiceIntro;