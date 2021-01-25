import React from 'react';
import { FiPower, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './sidebar.css';
import mapMarkerImg from '../../images/map-marker.svg';
import { useAuth } from '../../contexts/auth';

export default function Sidebar() {
    // const { goBack } = useHistory();
    const { signOut } = useAuth();

    return (
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Happy" />

            <div className="buttons-container">
                <Link to="/app" className="map-button">
                    <FiMapPin size={24} color="#0089A5" />
                </Link>

                <Link to="/orphanages/pending" className="button-pending">
                    <FiPower size={24} color="#FFF" />
                </Link>
            </div>

            <footer>
                <button type="button" onClick={signOut}>
                    <FiPower size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    );
}