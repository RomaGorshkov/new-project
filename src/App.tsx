import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/common/Header/Header';
import UsersPage from './pages/UsersPage/UsersPage';
import UsersEditPage from './pages/UsersEditPage/UsersEditPage';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<UsersPage />} />
                <Route path="users-edit" element={<UsersEditPage />} />
            </Routes>
        </div>
    );
};

export default App;
