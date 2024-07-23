import React, {useState, useRef, useEffect, useCallback} from 'react';
import '../styles/Management.css';
import NavigationBar from "./NavigationBar";
import Calendar from 'react-calendar'; // react-calendar 라이브러리 import
import 'react-calendar/dist/Calendar.css'; // react-calendar 스타일 import
import axios from 'axios';
import {ChevronCompactLeft, ChevronCompactRight, ChevronDoubleLeft, ChevronDoubleRight} from "react-bootstrap-icons";
import SideNavBtn from "./SideNavBtn";

function Management() {
    // State & Refs
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openSessions, setOpenSessions] = useState({});
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(null);
    const [editItem, setEditItem] = useState({});
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);
    const [searchTermName, setSearchTermName] = useState('');
    const [searchTermCategory, setSearchTermCategory] = useState('');
    const [searchTermPlace, setSearchTermPlace] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
    const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
    const [filterStartDate, setFilterStartDate] = useState(null);
    const [filterEndDate, setFilterEndDate] = useState(null);
    const [filterItemName, setFilterItemName] = useState('');
    const [showFilterStartDateCalendar, setShowFilterStartDateCalendar] = useState(false);
    const [showFilterEndDateCalendar, setShowFilterEndDateCalendar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const imageUrlRef = useRef(null);
    const calendarRef = useRef(null);
    const filterCalendarRef = useRef(null);

// Fetch Image URL
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

// Handle Session Toggle
    const handleSessionToggle = async (id) => {
        setOpenSessions(prevState => {
            const newState = {...prevState, [id]: !prevState[id]};
            if (newState[id]) {
                const selectedItem = items.find(item => item.lostID === id);
                setEditItem(selectedItem || {}); // 선택된 아이템의 데이터로 초기화

                // 이미지 URL 설정
                if (selectedItem && selectedItem.imgFilename) {
                    fetchImageUrl(selectedItem.imgFilename).then(url => {
                        setImageUrl(url); // 이미지 URL 설정
                    });
                } else {
                    setImageUrl(null);
                }
            }
            if (Object.values(newState).includes(true)) {
                document.body.classList.add('modal-open');
            } else {
                document.body.classList.remove('modal-open');
            }
            return newState;
        });
    };

// Handle File Change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // 파일 상태 업데이트
            setFile(selectedFile);

            // 이미지 URL 설정
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result); // 파일을 Data URL로 변환하여 상태 업데이트
            };
            reader.readAsDataURL(selectedFile);
        } else {
            // 파일이 선택되지 않은 경우 상태 초기화
            setFile(null);
            setImageUrl(null);
        }
    };


// Handle Popup Open
    const handlePopupOpen = async (item) => {
        setSelectedItem(item);
        setEditItem({
            lostName: item.lostName,
            date: item.date,
            location: item.location,
            description: item.description,
            category: item.category
        });
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

// Handle Popup Close
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

// Fetch Items Batch
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

// SelectedItem 변경 시 이미지 URL 새로 불러옴
    useEffect(() => {
        const loadImage = async () => {
            if (selectedItem && selectedItem.imgFilename) {
                const url = await fetchImageUrl(selectedItem.imgFilename);
                setImageUrl(url);
            }
        };
        loadImage();
    }, [selectedItem]);

// Handle Page Navigation
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
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

// Handle Date Changes
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

// Handle Filter Date Changes
    const handleFilterStartDateChange = (date) => {
        setFilterStartDate(date); // 필터 시작 날짜 업데이트
        setShowFilterStartDateCalendar(false); // 필터 시작 날짜 달력 숨기기
    };
    const handleFilterEndDateChange = (date) => {
        setFilterEndDate(date); // 필터 종료 날짜 업데이트
        setShowFilterEndDateCalendar(false); // 필터 종료 날짜 달력 숨기기
    };
    const handleFilterStartDateCalendarClick = () => {
        setShowFilterStartDateCalendar(!showFilterStartDateCalendar);
        setShowFilterEndDateCalendar(false);
    };
    const handleFilterEndDateCalendarClick = () => {
        setShowFilterEndDateCalendar(!showFilterEndDateCalendar);
        setShowFilterStartDateCalendar(false);
    };

// Handle Search
    const handleSearch = () => {
        let filtered = items;
        // 아이템 이름 필터링
        if (searchTermName.trim() !== '') {
            filtered = filtered.filter(item => item.lostName.toLowerCase().includes(searchTermName.toLowerCase()));
        }
        // 카테고리 필터링
        if (searchTermCategory.trim() !== '') {
            filtered = filtered.filter(item => item.category.toLowerCase().includes(searchTermCategory.toLowerCase()));
        }
        // 장소 필터링
        if (searchTermPlace.trim() !== '') {
            filtered = filtered.filter(item => item.location.toLowerCase().includes(searchTermPlace.toLowerCase()));
        }
        // 날짜 필터링
        if (startDate && endDate) {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            });
        }
        // 검색 조건이 모두 비어있으면 원래 목록을 반환
        if (
            searchTermName.trim() === '' &&
            searchTermCategory.trim() === '' &&
            searchTermPlace.trim() === '' &&
            (!startDate || !endDate)
        ) {
            filtered = items;
        }
        // 상태 업데이트
        setFilteredItems(filtered);
        setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 설정
    };

// Handle Edit Change
    const handleEditChange = (field, value) => {
        setEditItem(prev => ({
            ...prev,
            [field]: value
        }));
    };

// Handle Edit Submit
    const handleEditSubmit = async (e, itemId) => {
        e.preventDefault();

        const dateTime = new Date(editItem.date);
        let formattedDate = dateTime.toISOString().slice(0, 19);
        const finalDate = formattedDate;

        const formData = new FormData();
        if (file) {
            formData.append('file', file); // 선택된 파일을 FormData에 추가
        }
        formData.append('lostItem', JSON.stringify({
            ...editItem,
            date: finalDate
        }));

        try {
            await axios.put(`/lost-items/${itemId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // 상태 갱신 및 페이지 새로고침
            setFilteredItems(prevState =>
                prevState.map(item =>
                    item.lostID === itemId ? {...item, ...editItem} : item
                )
            );
            handleSessionToggle(itemId);
            window.location.reload();

            // 수정 성공 알림
            alert('수정되었습니다!');

        } catch (error) {
            console.error('Error updating item:', error.response ? error.response.data : error.message);

            // 수정 실패 알림
            alert('이미지를 등록하세요!');
        }
    };


// Handle Delete Item
    const handleDeleteItem = async (itemId) => {
        // 사용자가 삭제를 확인하는 팝업을 표시
        const confirmed = window.confirm('삭제 하시겠습니까?');

        // 사용자가 확인 버튼을 클릭한 경우
        if (confirmed) {
            try {
                // 삭제 요청을 서버에 보내기
                await axios.delete(`/lost-items/${itemId}`, {
                    headers: {'Content-Type': 'application/json'}
                });

                // 상태 업데이트: 삭제된 항목을 필터링
                setFilteredItems(prevState => prevState.filter(item => item.lostID !== itemId));

                // 페이지를 새로고침 (필요에 따라 선택 사항)
                window.location.reload();

                // 사용자에게 삭제 완료 알림 표시
                alert('삭제되었습니다!');
            } catch (error) {
                // 오류 처리
                console.error('Error deleting item:', error.response ? error.response.data : error.message);
            }
        }
    };

// Handle New Filter
    const handleNewFilter = () => {
        let filteredItems = items; // 전체 아이템 기준으로 필터링
        // 날짜 필터링
        if (filterStartDate && filterEndDate) {
            filteredItems = filteredItems.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= filterStartDate && itemDate <= filterEndDate;
            });
        }
        // 아이템 이름 필터링
        if (filterItemName.trim() !== '') {
            filteredItems = filteredItems.filter(item => item.lostName.toLowerCase().includes(filterItemName.toLowerCase()));
        }
        // 상태 업데이트
        setFilteredItems(filteredItems); // 기존 필터링된 결과를 갱신
        setCurrentPage(1);
    };

// Handle Reset All
    const handleResetAll = () => {
        setStartDate(null);
        setEndDate(null);
        setSearchTermName('');
        setSearchTermPlace('');
        setSearchTermCategory('');
    };

// Handle Reset Fast
    const handleResetFast = () => {
        setFilterStartDate(null);
        setFilterEndDate(null);
        setFilterItemName('');
    };

// Event Listeners for Click Outside
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterCalendarRef.current && !filterCalendarRef.current.contains(event.target)) {
                setShowFilterStartDateCalendar(false);
                setShowFilterEndDateCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

// Display Items
    const displayedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ad-div">
            <NavigationBar/>
            <SideNavBtn/>
            <div className="ad-entire">
                <div className="ad-top">
                    <div className="ad-top-container">
                        <div className="ad-top-shadow">
                            <div className="ad-top-click-part">
                                <div className="ad-top-fast-title">빠른검색</div>
                                <div className="ad-top-divide"></div>
                                <div className="ad-top-cal-name">
                                    <div className="ad-top-cal">
                                        <div className="ad-top-cal-frame">
                                            <div className="ad-top-placeholder">
                                                {filterStartDate ? filterStartDate.toLocaleDateString() : '시작 날짜'}
                                            </div>
                                            <div className="ad-top-cal-img"
                                                 onClick={handleFilterStartDateCalendarClick}>
                                                <img className="calendar" src="/images/calendar.png"/>
                                            </div>
                                        </div>
                                        {showFilterStartDateCalendar && (
                                            <div ref={filterCalendarRef} className="manage-calendar-popup">
                                                <Calendar
                                                    onChange={handleFilterStartDateChange}
                                                    value={filterStartDate}
                                                    selectRange={false}
                                                />
                                            </div>
                                        )}
                                        <div className="ad-top-ing">~</div>
                                        <div className="ad-top-cal-frame">
                                            <div className="ad-top-placeholder">
                                                {filterEndDate ? filterEndDate.toLocaleDateString() : '종료 날짜'}
                                            </div>
                                            <div className="ad-top-cal-img" onClick={handleFilterEndDateCalendarClick}>
                                                <img className="calendar2" src="/images/calendar.png"/>
                                            </div>
                                        </div>
                                        {showFilterEndDateCalendar && (
                                            <div ref={filterCalendarRef} className="manage-calendar-popup">
                                                <Calendar
                                                    onChange={handleFilterEndDateChange}
                                                    value={filterEndDate}
                                                    selectRange={false}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="ad-top-name-ref">
                                        <div className="ad-top-name-frame">
                                            <input
                                                type="text"
                                                placeholder="검색"
                                                onChange={(e) => setFilterItemName(e.target.value)}
                                                className="ad-top-name-placeholder"
                                            />
                                            <img
                                                className="ad-top-search-img"
                                                src="/images/search.png"
                                                onClick={handleNewFilter}
                                            />
                                        </div>
                                        <img
                                            className="ad-top-refresh"
                                            src="/images/refresh_white.png"
                                            onClick={handleResetFast}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ad-title">분실물 게시판 관리</div>
                    </div>
                </div>
                <div className="ad-main-search-container">
                    <div className="ad-main-search-title">
                        <div className="ad-div2">습득물 상세 검색</div>
                        <img className="chevron-down" src="/images/refresh.png" onClick={handleResetAll}/>
                    </div>
                    <div className="ad-main-search-frame">
                        <div className="ad-main-cate">
                            <input
                                type="text"
                                className="ad-main-cate-placeholder"
                                placeholder="분류"
                                value={searchTermCategory}
                                onChange={(e) => setSearchTermCategory(e.target.value)}
                            />
                            <div className="ad-main-cate-btn">
                                <img className="pencil-01" src="/images/pencil.png"/>
                            </div>
                        </div>
                        <div className="ad-main-name">
                            <input
                                type="text"
                                className="ad-main-name-placeholder"
                                placeholder="분실물 이름"
                                value={searchTermName}
                                onChange={(e) => setSearchTermName(e.target.value)}
                            />
                            <div className="ad-main-name-btn">
                                <img className="pencil-012" src="/images/pencil.png"/>
                            </div>
                        </div>
                        <div className="ad-main-cal-container">
                            <div className="ad-main-cal-frame">
                                <div className="ad-main-cal-placeholder">
                                    {startDate ? startDate.toLocaleDateString() : '시작 날짜'}
                                </div>
                                <div className="calendar-frame" onClick={handleStartDateCalendarClick}>
                                    <img className="calendar2" src="/images/calendar.png" alt="calendar"/>
                                </div>
                                {showStartDateCalendar && (
                                    <div className="manage-calendar-popup2" ref={calendarRef}>
                                        <Calendar onChange={handleStartDateChange} value={startDate}/>
                                    </div>
                                )}
                            </div>
                            <div className="ad-main-ing">~</div>
                            <div className="ad-main-cal-frame">
                                <div className="ad-main-cal-placeholder">
                                    {endDate ? endDate.toLocaleDateString() : '종료 날짜'}
                                </div>
                                <div className="calendar-frame" onClick={handleEndDateCalendarClick}>
                                    <img className="calendar2" src="/images/calendar.png" alt="calendar"/>
                                </div>
                                {showEndDateCalendar && (
                                    <div className="manage-calendar-popup2" ref={calendarRef}>
                                        <Calendar onChange={handleEndDateChange} value={endDate}/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="ad-main-place-person">
                            <div className="ad-main-place-person-frame">
                                <div className="ad-main-place">
                                    <input
                                        type="text"
                                        className="ad-main-cate-placeholder"
                                        placeholder="습득 장소"
                                        value={searchTermPlace}
                                        onChange={(e) => setSearchTermPlace(e.target.value)}
                                    />
                                    <div className="ad-main-place-btn">
                                        <img className="pencil-013" src="/images/pencil.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ad-main-search-container2">
                        <div className="ad-main-search-btn" onClick={handleSearch}>
                            <div className="ad-main-search-txt">검색하기</div>
                            <div className="ad-main-search-img">
                                <img className="ad-main-search-icon" src="/images/search.png"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ad-main-item-cate">
                    <div className="ad-main-cate2">
                        <div className="ad-main-cate-index-box">
                            <div className="ad-main-cate-index">등록번호</div>
                            <div className="ad-main-cate-dot"></div>
                        </div>
                        <div className="ad-main-cate-cate-box">
                            <div className="ad-main-cate-cate">분류</div>
                            <div className="ad-main-cate-dot"></div>
                        </div>
                        <div className="ad-main-cate-name-box">
                            <div className="ad-main-cate-name">습득물 이름</div>
                            <div className="ad-main-cate-dot"></div>
                        </div>
                        <div className="ad-main-cate-place-box">
                            <div className="ad-main-cate-place">습득장소</div>
                            <div className="ad-main-cate-dot"></div>
                        </div>
                        <div className="ad-main-cate-date-box">
                            <div className="ad-main-cate-date">습득일</div>
                            <div className="ad-main-cate-dot"></div>
                        </div>
                        <div className="ad-main-cate-admin-box">
                            <div className="ad-main-cate-admin">게시글 관리</div>
                        </div>
                    </div>
                    <div className="ad-item-container">
                        <div className="lost-main-frame-items">
                            {displayedItems.map((item, index) => (
                                <div key={index} className="frame-item">
                                    <div className="ad-main-cate-index-box" onClick={() => handlePopupOpen(item)}>
                                        <div className="ad-main-cate-index">{item.lostID}</div>
                                    </div>
                                    <div className="ad-main-cate-cate-box" onClick={() => handlePopupOpen(item)}>
                                        <div className="cate-box-text">{item.category}</div>
                                    </div>
                                    <div className="ad-main-cate-name-box" onClick={() => handlePopupOpen(item)}>
                                        <div className="name-box-text">{item.lostName}</div>
                                    </div>
                                    <div className="ad-main-cate-place-box" onClick={() => handlePopupOpen(item)}>
                                        <div className="get-place-box">
                                            <img
                                                className="marker-pin-01"
                                                src="/images/marker-pin-01.png"
                                                alt="marker pin"
                                            />
                                            <div className="place-box-text">{item.location}</div>
                                        </div>
                                    </div>
                                    <div className="ad-main-cate-date-box" onClick={() => handlePopupOpen(item)}>
                                        <div className="cate-date-box">
                                            <div className="date-text">{item.date}</div>
                                        </div>
                                    </div>
                                    <div className="ad-main-cate-admin-box">
                                        <div className="frame-983">
                                            <div className="frame-981" onClick={() => handleSessionToggle(item.lostID)}>
                                                <div className="smbtn">수정</div>
                                            </div>
                                        </div>
                                        {openSessions[item.lostID] && (
                                            <div className="session-overlay">
                                                <div className="session-content">
                                                    <form onSubmit={(e) => handleEditSubmit(e, item.lostID)}>
                                                        <label>
                                                            분류:
                                                            <input
                                                                type="text"
                                                                value={editItem.category || ''}
                                                                onChange={(e) => handleEditChange('category', e.target.value)}
                                                            />
                                                        </label>
                                                        <label>
                                                            이름:
                                                            <input
                                                                type="text"
                                                                value={editItem.lostName || ''}
                                                                onChange={(e) => handleEditChange('lostName', e.target.value)}
                                                            />
                                                        </label>
                                                        <label>
                                                            장소:
                                                            <input
                                                                type="text"
                                                                value={editItem.location || ''}
                                                                onChange={(e) => handleEditChange('location', e.target.value)}
                                                            />
                                                        </label>
                                                        <label>
                                                            날짜 및 시간:
                                                            <input
                                                                type="datetime-local"
                                                                value={editItem.date ? new Date(editItem.date).toISOString().slice(0, 16) : ''}
                                                                onChange={(e) => handleEditChange('date', e.target.value)}
                                                            />
                                                        </label>
                                                        <label>
                                                            설명:
                                                            <textarea
                                                                value={editItem.description || ''}
                                                                onChange={(e) => handleEditChange('description', e.target.value)}
                                                            />
                                                        </label>
                                                        <label>
                                                            이미지:
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                            />
                                                            {imageUrl && <img src={imageUrl} alt="현재 이미지"
                                                                              className="session-image"/>}
                                                        </label>

                                                        <button type="submit">저장</button>
                                                    </form>
                                                    <button onClick={() => handleDeleteItem(item.lostID)}>삭제</button>
                                                    <button className="session-close-button"
                                                            onClick={() => handleSessionToggle(item.lostID)}>
                                                        x
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="ad-regi-line">
                        <div className="ad-regi-container">
                            <a href="/Register" className="ad-regi-btn">
                                <div className="ad-regi-txt">분실물 등록</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="management-page">
                    <div className="management-left-arrow">
                        <ChevronDoubleLeft className="management-left-double" onClick={handleFirstPage}/>
                        <ChevronCompactLeft className="management-left" onClick={handlePrevPage}/>
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
                    <div className="management-right-arrow">
                        <ChevronCompactRight className="management-right" onClick={handleNextPage}/>
                        <ChevronDoubleRight className="management-right-double" onClick={handleLastPage}/>
                    </div>
                </div>
            </div>
            {showPopup && selectedItem && (
                <div className="popup-overlay" onClick={handlePopupClose}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="popup-close" onClick={handlePopupClose}>
                            X
                        </button>
                        <h2>상세 정보</h2>
                        <p><strong>등록번호:</strong> {selectedItem.lostID}</p>
                        <p><strong>분류:</strong> {selectedItem.category}</p>
                        <p><strong>이름:</strong> {selectedItem.lostName}</p>
                        <p><strong>장소:</strong> {selectedItem.location}</p>
                        <p><strong>날짜:</strong> {selectedItem.date}</p>
                        <p><strong>세부사항:</strong></p>
                        <pre>
                {selectedItem.description}
            </pre>
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


        </div>

    );
}

export default Management;