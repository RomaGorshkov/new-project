import React from 'react';

import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';

import './Header.css';

const Header: React.FC = () => {
    return (
        <Grid className="header" container spacing={2}>
            <Grid item>
                <NavLink to="/">Users</NavLink>
                <NavLink to="/users-edit">Edit Users</NavLink>
            </Grid>
        </Grid>
    );
};

export default Header;
