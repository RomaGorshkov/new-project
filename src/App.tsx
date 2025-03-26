import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/common/Header/Header';
import UsersPage from './pages/UsersPage/UsersPage';
import UsersEditPage from './pages/UsersEditPage/UsersEditPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<UsersPage />} />
                <Route path="users-edit" element={<UsersEditPage />} />
                <Route path="/user/:id" element={<UserProfilePage />} />
            </Routes>
        </div>
    );
};

export default App;
