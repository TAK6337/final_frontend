import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Items.css';

function Airchat() {
    const [flightData, setFlightData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchFlightData = async () => {
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

        fetchFlightData();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCloseClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            closeModal();
        }
    };

    return (
        <div>
            <div className="airchat-container">
                <h1 className="subtitle">항공편 정보</h1>
                <button onClick={openModal} className="open-modal-button">항공편 정보 보기</button>

                {isModalOpen && (
                    <div className="modal-overlay" onClick={handleCloseClick}>
                        <div className="modal-content">
                            <button className="close-button" onClick={closeModal}>&times;</button>
                            {loading && <p className="loading-message">Loading...</p>}
                            {error && <p className="error-message">Error: {error}</p>}
                            {flightData.length > 0 && (
                                <table className="flight-status-table">
                                    <thead>
                                    <tr>
                                        <th>Airline</th>
                                        <th>Flight Number</th>
                                        <th>Departure</th>
                                        <th>Arrival</th>
                                        <th>Status</th>
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
                )}
            </div>
        </div>
    );
}

export default Airchat;
