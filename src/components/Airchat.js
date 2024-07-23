import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Airchat.css';

function Airchat({ closeModal }) {
    const [flightData, setFlightData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const airFetchFlightData = async () => {
            try {
                const response = await axios.get('/flight-status?page=1&perPage=10');
                setFlightData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching flight data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        airFetchFlightData();
    }, []);

    return (
        <div className="air-modal-overlay" onClick={closeModal}>
            <div className="air-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-air-button" onClick={closeModal}>X</button>
                <h1 className="subtitle">항공편 정보</h1>
                {loading && <p className="loading-message">Loading...</p>}
                {error && <p className="error-message">Error: {error}</p>}
                {flightData.length > 0 && (
                    <table className="flight-status-table">
                        <thead>
                        <tr>
                            <th>항공사</th>
                            <th>항공기 번호</th>
                            <th>출발지</th>
                            <th>도착지</th>
                            <th>도착 상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {flightData.map((flight, index) => (
                            <tr key={index}>
                                <td>{flight.AIRLINE_ENGLISH}</td>
                                <td>{flight.AIR_FLN}</td>
                                <td>{flight.BOARDING_ENG} ({flight.STD})</td>
                                <td>{flight.ARRIVED_ENG} ({flight.ETD})</td>
                                <td>{flight.RMK_ENG}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Airchat;
