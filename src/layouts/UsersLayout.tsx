import React from 'react';
import { Grid } from '@mui/material';

import styles from './UsersLayout.module.scss';

interface UsersLayoutProps {
    title: string;
    children: React.ReactNode;
}

const UsersLayout: React.FC<UsersLayoutProps> = ({ title, children }) => {
    return (
        <Grid className={styles.usersLayout}>
            <Grid className={styles.usersLayout__header}>{title}</Grid>
            <Grid className={styles.usersLayout__body}>{children}</Grid>
        </Grid>
    );
};

export default UsersLayout;
