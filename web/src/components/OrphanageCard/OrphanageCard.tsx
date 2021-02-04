import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet'
import { FiEdit3, FiTrash } from 'react-icons/fi';

import './orphanage-card.css';
import mapIcon from '../../utils/mapIcon';

interface Props {
  latitude: number;
  longitude: number;
  name: string;
  id: number;
}

export default function OrphanageCard({
  latitude,
  longitude,
  name,
  id,
}: Props): JSX.Element {
  return (
    <div className="card-container">
      <Map
        center={[latitude, longitude]}
        zoom={16}
        dragging={false}
        touchZoom={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        <Marker
          interactive={false}
          icon={mapIcon}
          position={[latitude, longitude]}
        />
      </Map>

      <div>
        <strong>{name}</strong>
        <div>
          <Link to={`/dashboard/edit/${id}`}>
            <FiEdit3 size={24} color="#15C3D6" />
          </Link>
      
          <Link to={`/dashboard/delete/${id}`}>
            <FiTrash size={24} color="#15C3D6" />
          </Link>
        </div>
      </div>
    </div>
  );
}