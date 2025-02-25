import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/common/Header/Header';
import UsersPage from './pages/UsersPage/UsersPage';
import UsersEditPage from './pages/UsersEditPage/UsersEditPage';

import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
<<<<<<< HEAD
                <Route path="/users" element={<UsersPage />} />
=======
                <Route path="/" element={<UsersPage />} />
>>>>>>> bb005e437e4526c84cbecfa077f159c4cc92efab
                <Route path="users-edit" element={<UsersEditPage />} />
            </Routes>
        </div>
    );
};

export default App;
