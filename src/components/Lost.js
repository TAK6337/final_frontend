import React, {useState, useRef, useEffect, useCallback} from 'react';
import '../styles/Lost.css';
import NavigationBar from "./NavigationBar";
import Calendar from 'react-calendar'; // react-calendar 라이브러리 import
import 'react-calendar/dist/Calendar.css'; // react-calendar 스타일
import axios from 'axios';
import { ChevronCompactLeft, ChevronCompactRight, ChevronDoubleLeft, ChevronDoubleRight } from 'react-bootstrap-icons';
import SideNavBtn from "./SideNavBtn";


function Lost() {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const imageUrlRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [startDate, setStartDate] = useState(null); // 시작 날짜 상태
    const [endDate, setEndDate] = useState(null); // 종료 날짜 상태
    const [showStartDateCalendar, setShowStartDateCalendar] = useState(false); // 시작 날짜 달력 표시 여부 상태
    const [showEndDateCalendar, setShowEndDateCalendar] = useState(false); // 종료 날짜 달력 표시 여부 상태
    const [searchTerm, setSearchTerm] = useState('');
    const calendarRef = useRef(null);

// Fetch 이미지 URL
    const fetchImageUrl = async (filename) => {
        try {
            const timestamp = new Date().getTime(); // 현재 타임스탬프 추가
            const response = await axios.get(`/lost-items/display/${filename}?${timestamp}`, {
                responseType: 'blob', // 이미지 데이터를 Blob으로 받음
            });
            const url = URL.createObjectURL(response.data);
            return url;
        } catch (error) {
            console.error('Error fetching image:', error);
            return null;
        }
    };

// Popup 열기
    const handlePopupOpen = async (item) => {
        setSelectedItem(item);

        if (item && item.imgFilename) {
            // 이전 이미지 URL 해제
            if (imageUrlRef.current) {
                URL.revokeObjectURL(imageUrlRef.current);
            }
            // 새로운 이미지 URL 생성
            const url = await fetchImageUrl(item.imgFilename);
            setImageUrl(url);
            imageUrlRef.current = url;
        }
        setShowPopup(true);
        document.body.classList.add('modal-open');
    };

// Popup 닫기
    const handlePopupClose = () => {
        // 이전 이미지 URL 해제
        if (imageUrlRef.current) {
            URL.revokeObjectURL(imageUrlRef.current);
            imageUrlRef.current = null;
        }
        setImageUrl(null); // 상태 초기화
        setShowPopup(false); // 팝업 닫기
        document.body.classList.remove('modal-open');
    };

// 아이템 배치 Fetch
    // Fetch 아이템
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('/lost-items/all', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const results = response.data;
                setItems(results); // 전체 아이템 상태 업데이트
                setFilteredItems(results); // 초기화된 상태로 설정
            } catch (error) {
                setError('An error occurred while fetching items.');
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);


// 페이지 번호 가져오기
    const getPageNumbers = () => {
        const totalItems = filteredItems.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const maxVisiblePages = 5;
        const pageNumbers = [];

        for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

// 페이지 클릭 핸들러
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

// 페이지 컨트롤러
    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handleLastPage = () => {
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        setCurrentPage(totalPages);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

// 날짜 필터 핸들러
    const handleStartDateChange = (date) => {
        setStartDate(date); // 시작 날짜 업데이트
        setShowStartDateCalendar(false); // 시작 날짜 달력 숨기기
    };

    const handleEndDateChange = (date) => {
        setEndDate(date); // 종료 날짜 업데이트
        setShowEndDateCalendar(false); // 종료 날짜 달력 숨기기
    };

    const handleEndDateCalendarClick = () => {
        setShowEndDateCalendar(!showEndDateCalendar);
        setShowStartDateCalendar(false);
    };

    const handleStartDateCalendarClick = () => {
        setShowStartDateCalendar(!showStartDateCalendar);
        setShowEndDateCalendar(false);
    };

// 날짜 클릭 외부 감지 핸들러
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowStartDateCalendar(false);
                setShowEndDateCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

// 검색 핸들러
    const handleSearch = () => {
        let filtered = [...items]; // 전체 아이템을 기준으로 필터링

        // 아이템 이름 필터링
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(item => item.lostName.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // 날짜 필터링
        if (startDate && endDate) {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            });
        }

        // 상태 업데이트
        setFilteredItems(filtered);
        setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 설정
    };

// 날짜 검색어 초기화 핸들러
    const handleResetDates = () => {
        setStartDate(null);
        setEndDate(null);
        setSearchTerm('');
    };

// 현재 페이지에 따라 보여질 아이템을 계산합니다.
    const displayedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

// 태그 클릭 함수
    const handleTagClick = (content) => {
        setSearchTerm(content);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="lost">
            <NavigationBar/>
            <SideNavBtn/>
            <div className="lost-content">
                <div className="lost-top">
                    <div className="lost-top-shadow">
                        <div className="lost-top-main">
                            <div className="lost-top-btn-content">
                                <div className="lost-top-btn-title"># 가장 많이 찾는 분실물 태그</div>
                                <div className="lost-top-btns">
                                    <div className="lost-top-btns-2">
                                        <div className="lost-btn2" onClick={() => handleTagClick('지갑')}>
                                            <div className="lost-btn-type2">지갑</div>
                                        </div>
                                        <div className="lost-btn2" onClick={() => handleTagClick('휴대전화')}>
                                            <div className="lost-btn-type2">휴대전화</div>
                                        </div>
                                        <div className="lost-btn2" onClick={() => handleTagClick('가방')}>
                                            <div className="lost-btn-type2">가방</div>
                                        </div>
                                        <div className="lost-btn2" onClick={() => handleTagClick('의류')}>
                                            <div className="lost-btn-type2">의류</div>
                                        </div>
                                        <div className="lost-btn2" onClick={() => handleTagClick('이어폰')}>
                                            <div className="lost-btn-type2">이어폰</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="line-31"></div>
                            <div className="lost-date-cate">
                                <div className="lost-date">
                                    <div className="lost-date-start">
                                        <div className="lost-date-start-placeholder">
                                            {startDate ? startDate.toLocaleDateString() : '시작 날짜'}
                                        </div>
                                        <div className="calendar-frame" onClick={handleStartDateCalendarClick}>
                                            <img className="calendar2" src="/images/calendar.png" alt="calendar"/>
                                        </div>
                                    </div>
                                    {showStartDateCalendar && (
                                        <div className="lost-calendar-popup" ref={calendarRef}>
                                            <Calendar onChange={handleStartDateChange} value={startDate}/>
                                        </div>
                                    )}
                                    <div className="lost-date-ing">~</div>
                                    <div className="lost-date-end">
                                        <div className="lost-date-end-placeholder">
                                            {endDate ? endDate.toLocaleDateString() : '종료 날짜'}
                                        </div>
                                        <div className="calendar-frame" onClick={handleEndDateCalendarClick}>
                                            <img className="calendar2" src="/images/calendar.png" alt="calendar"/>
                                        </div>
                                    </div>
                                    {showEndDateCalendar && (
                                        <div className="lost-calendar-popup" ref={calendarRef}>
                                            <Calendar onChange={handleEndDateChange} value={endDate}/>
                                        </div>
                                    )}

                                </div>
                                <div className="lost-cate-rfs">
                                    <div className="lost-cate">
                                        <input
                                            type="text"
                                            className="lost-cate-placeholder"
                                            placeholder="습득물"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button className="search-frame" onClick={handleSearch}>
                                            <img className="search" src="/images/search.png" alt="Search"/>
                                        </button>

                                    </div>
                                    <button className="calendar-refresh" onClick={handleResetDates}>
                                        <img src="/images/refresh_white.png"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lost-title">분실물 찾기</div>
                </div>
                <div className="lost-police">
                    <div className="lost-police-container">
                        <div className="lost-police-ex">
                    <span>
                        <span className="lost-police-ex-span">
                            ※분실물(유실물) 관할경찰서 이관시 경주경찰서 생활질서계 054)760-0379 또는 경찰청 유실물 통합포털사이트 로스트112에서 확인바랍니다.
                            <br/>
                        </span>
                        <span className="lost-police-ex-span2">
                            *분실물 보관기간 최대 6개월
                        </span>
                    </span>
                        </div>
                        <a href='https://www.lost112.go.kr/' className="lost-to-police-btn" target="_blank">
                            <div className="lost-to-police-btn-text">
                                경찰청 유실물 통합포털 바로가기
                            </div>
                        </a>
                    </div>
                </div>
                <div className="lost-main-frame">
                    <div className="lost-main-frame-cate">
                        <div className="lost-main-frame-category-container">
                            <div className="lost-main-frame-category">분류</div>
                            <div className="lost-main-frame-dot"></div>
                        </div>
                        <div className="lost-main-frame-name-container">
                            <div className="lost-main-frame-name">습득물</div>
                            <div className="lost-main-frame-dot"></div>
                        </div>
                        <div className="lost-main-frame-place-container">
                            <div className="lost-main-frame-place">습득장소</div>
                            <div className="lost-main-frame-dot"></div>
                        </div>
                        <div className="lost-main-frame-date-container">
                            <div className="lost-main-frame-date">습득일</div>
                        </div>

                    </div>
                    <div className="lost-main-frame-items">
                        {displayedItems.map((item, index) => (
                            <div key={index} className="frame-item">
                                {showPopup && selectedItem && (
                                    <div className="popup-overlay" onClick={handlePopupClose}>
                                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                            <button className="popup-close" onClick={handlePopupClose}>X</button>
                                            <h2>상세 정보</h2>
                                            <p><strong>등록번호:</strong> {selectedItem.lostID}</p>
                                            <p><strong>분류:</strong> {selectedItem.category}</p>
                                            <p><strong>이름:</strong> {selectedItem.lostName}</p>
                                            <p><strong>장소:</strong> {selectedItem.location}</p>
                                            <p><strong>날짜:</strong> {selectedItem.date}</p>
                                            <p><strong>세부사항</strong></p>
                                            <pre>{selectedItem.description}</pre>
                                            <p><strong>이미지:</strong></p>
                                            <p>Image Name: {selectedItem.imgFilename}</p>
                                            {imageUrl ? (
                                                <img src={imageUrl} alt={selectedItem.imgFilename} className="popup-image"/>
                                            ) : (
                                                <p>이미지를 불러오는 중입니다...</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="lost-item-box" onClick={() => handlePopupOpen(item)}>
                                    <div className="lost-item-box-div">{item.category}</div>
                                </div>
                                <div className="lost-item-get" onClick={() => handlePopupOpen(item)}>
                                    <div className="lost-item-get-div">{item.lostName}</div>
                                </div>
                                <div className="lost-item-place-box" onClick={() => handlePopupOpen(item)}>
                                    <div className="lost-item-place">
                                        <img className="marker-pin-01" src="/images/marker-pin-01.png"
                                             alt="marker pin"/>
                                        <div className="lost-item-place-div">{item.location}</div>
                                    </div>
                                </div>
                                <div className="lost-item-date-box" onClick={() => handlePopupOpen(item)}>
                                    <div className="lost-item-date">{item.date.slice(0, 10)}</div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="lost-page">
                    <div className="lost-left-arrow">
                        <ChevronDoubleLeft className="lost-left-double" onClick={handleFirstPage}/>
                        <ChevronCompactLeft className="lost-left" onClick={handlePrevPage}/>
                    </div>
                    {getPageNumbers().map((pageNumber, index) => (
                        typeof pageNumber === 'number' ? (
                            <button key={index}
                                    className={`page-button ${currentPage === pageNumber ? 'active-page' : ''}`}
                                    onClick={() => handlePageClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        ) : (
                            <span key={index} className="ellipsis">...</span>
                        )
                    ))}
                    <div className="lost-right-arrow">
                        <ChevronCompactRight className="lost-right" onClick={handleNextPage}/>
                        <ChevronDoubleRight className="lost-right-double" onClick={handleLastPage}/>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Lost;
