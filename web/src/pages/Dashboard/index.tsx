import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';

import api from '../../services/api';
import OrphanageCard from '../../components/OrphanageCard/OrphanageCard';
import './dashboard.css';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function Dashboard() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, []);


    return (
        <div id="page-dashboard">
            <Sidebar />

            <main className="content-wrapper">
                <h1>Orfanatos Cadastrados</h1>

                <div className="cards-wrapper">
                    {orphanages.map((orphanage) => (
                        <OrphanageCard
                            key={orphanage.id}
                            latitude={orphanage.latitude}
                            longitude={orphanage.longitude}
                            name={orphanage.name}
                            id={orphanage.id}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;