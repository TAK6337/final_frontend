import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Parking.css';

function Parking({ closeModal }) {
    const [parkingData, setParkingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParkingData = async () => {
            try {
                const response = await axios.get('/parking-fees');
                const data = Object.entries(response.data.parking_fees).map(([key, value]) => ({
                    type: key.replace(/_/g, ' '),
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

    return (
        <div className="park-modal-overlay" onClick={closeModal}>
            <div className="park-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-park-modal-button" onClick={closeModal}>X</button>
                <h1>주차 요금 안내</h1>
                {loading && <p className="loading-message">Loading...</p>}
                {error && <p className="error-message">Error: {error}</p>}
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
    );
}

export default Parking;
