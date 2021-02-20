import React from 'react';

import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useHistory } from 'react-router-dom';


const Routes: React.FC = () => {
    const { signed, loading } = useAuth();

    if (loading) {
        return (
            <div
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000',
                }}
            >
                Loading...
            </div>
        );
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;