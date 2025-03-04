import React from 'react';

import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';

import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <Grid className={styles.header} container spacing={2}>
            <Grid item>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${styles.header__nav} ${styles['header__nav--active']}` : styles.header__nav
                    }
                >
                    Users
                </NavLink>
                <NavLink
                    to="/users-edit"
                    className={({ isActive }) =>
                        isActive ? `${styles.header__nav} ${styles['header__nav--active']}` : styles.header__nav
                    }
                >
                    Edit Users
                </NavLink>
            </Grid>
        </Grid>
    );
};

export default Header;
