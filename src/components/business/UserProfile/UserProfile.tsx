import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Grid, Input, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../store/storeHooks';
import { uploadUserPicture } from '../../../store/reducers/user';

import UsersLayout from '../../../layouts/UsersLayout';

import styles from './UserProfile.module.scss';

const UserProfile: React.FC = () => {
    const { id } = useParams();
    const { users } = useAppSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const user = users.find((user) => user.id === id);

    const [imageUrl, setImageUrl] = React.useState(user?.image || '/default-avatar.png');

    React.useEffect(() => {
        setImageUrl(user?.image || '/default-avatar.png');
    }, [user?.image]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                dispatch(uploadUserPicture({ userId: id, imageUrl: imageUrl }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <UsersLayout title="User Profile">
            <Grid container className={styles.userProfile}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Box className={styles.userProfile__content}>
                        <Box className={styles.userProfile__avatar}>
                            <Avatar
                                alt="User Avatar"
                                src={imageUrl}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '12px',
                                }}
                            />
                            <label htmlFor="upload-photo" className={styles.userProfile__uploadButton}>
                                <AddIcon sx={{ fontSize: '2rem', color: '#333' }} />
                                <Input
                                    type="file"
                                    id="upload-photo"
                                    className={styles.userProfile__uploadInput}
                                    onChange={handleImageUpload}
                                    inputProps={{ accept: 'image/*' }}
                                />
                            </label>
                        </Box>
                        <Typography variant="h4" className={styles.userProfile__name}>
                            {user?.name}
                        </Typography>
                        <Typography variant="body1" className={styles.userProfile__info}>
                            {user?.department.name}
                        </Typography>
                        <Typography variant="body2" className={styles.userProfile__info}>
                            {user?.country.name} | {user?.status.name}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </UsersLayout>
    );
};
export default UserProfile;
