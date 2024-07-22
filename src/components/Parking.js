import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Parking.css'; // CSS 파일을 포함하면 스타일을 추가할 수 있습니다.

function Parking() {
    const [parkingData, setParkingData] = useState([]); // 초기값을 빈 배열로 설정
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 상태 추가

    useEffect(() => {
        const fetchParkingData = async () => {
            try {
                const response = await axios.get('/parking-fees'); // 실제 API URL로 수정 필요
                // JSON을 배열 형태로 변환
                const data = Object.entries(response.data.parking_fees).map(([key, value]) => ({
                    type: key.replace(/_/g, ' '), // 예: "cargo_terminal_parking" -> "cargo terminal parking"
                    ...value
                }));
                setParkingData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching parking data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchParkingData();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="parking-container">
            <h1>Parking Fees Information</h1>
            <button onClick={openModal} className="open-modal-button">Open Parking Fees</button>
            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-button" onClick={closeModal}>X</button>
                        {parkingData.length > 0 && (
                            <table className="parking-fees-table">
                                <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Base Fee</th>
                                    <th>Base Time</th>
                                    <th>Hourly Fee</th>
                                    <th>Additional Fee</th>
                                    <th>Additional Time</th>
                                    <th>Daily Fee</th>
                                    <th>Free Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                {parkingData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.type}</td>
                                        <td>{item.base_fee ? `${item.base_fee} 원` : 'N/A'}</td>
                                        <td>{item.base_time || 'N/A'}</td>
                                        <td>{item.hourly_fee ? `${item.hourly_fee} 원` : 'N/A'}</td>
                                        <td>{item.additional_fee ? `${item.additional_fee} 원` : 'N/A'}</td>
                                        <td>{item.additional_time || 'N/A'}</td>
                                        <td>{item.daily_fee ? `${item.daily_fee} 원` : 'N/A'}</td>
                                        <td>{item.free_time || 'N/A'}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Parking;
