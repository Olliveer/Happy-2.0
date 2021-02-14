import React from 'react';
import { FiPower, FiMapPin, FiAlertCircle, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './sidebar.css';
import mapMarkerImg from '../../images/map-marker.svg';
import { useAuth } from '../../contexts/auth';

export default function Sidebar() {
    const { signOut } = useAuth();

    return (
        <aside className="app-sidebar">
            <Link to="/">
            <img src={mapMarkerImg} alt="Happy" />
            </Link>
            <div>
            <Link to="/dashboard/users" className="button-users">
                <FiUser size={24} color="#FFF" />
            </Link>

            <Link to="/app" className="map-button">
                <FiMapPin size={24} color="#0089A5" />
            </Link>

            <Link to="/orphanages/pending" className="button-pending">
                <FiAlertCircle size={24} color="#FFF" />
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