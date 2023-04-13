import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

import photo from '../../images/arnold_physcial_shape.jpeg';
import {AppRoutes, PageWithResponsiveAppBar} from '../../App';
import {deleteProgressItem, getProgressItems, LoadingStateType} from './progressSlice';
import {AppDispatch, RootState} from '../../store';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import sortProgressItemsByDate from './sortProgressItemsByDate';

import styles from './styles.module.scss';

const ProgressPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>(); //  we have to add <AppDispatch> here to avoid issue - Argument of type 'AsyncThunkAction' is not assignable to parameter of type 'AnyAction'
    const progressItems = useSelector((state: RootState) => state.progress.progressItems);
    const loadingState = useSelector((state: RootState) => state.progress.loadingState);

    const onAddIconClick = () => {
        navigate(AppRoutes.CREATE_PROGRESS_ITEM_PAGE);
    };

    useEffect(() => {
        dispatch(getProgressItems());
    }, [dispatch]);

    const onDeleteBtnClick = (id: string) => {
        dispatch(deleteProgressItem(id));
    };

    const sortedProgressItems = sortProgressItemsByDate(progressItems);

    return (
        <PageWithResponsiveAppBar>
            <div className={styles.pageWrapper}>
                <Loading isLoading={loadingState === LoadingStateType.Loading}>
                    <Error isError={loadingState === LoadingStateType.Error}>
                        <Fab color="primary" aria-label="add" className={styles.addIcon}>
                            <AddIcon onClick={onAddIconClick} />
                        </Fab>
                        {sortedProgressItems.map(item => {
                            return (
                                <Card className={styles.progressItemCard} sx={{minWidth: 275, width: '90%', marginTop: '20px'}} key={item.id}>
                                    <div className={styles.imageWrapper}>
                                        <img src={item.image || photo} alt="physical shape" />
                                    </div>
                                    <CardContent>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            {/* todo: transform date to sth readable */}
                                            {item.date}
                                        </Typography>
                                        <Typography sx={{mb: 1.5}} color="text.secondary">
                                            Weight: {item.weight}
                                        </Typography>
                                        <Typography variant="body2">{item.progressIndicators}</Typography>
                                        <Stack direction="row" spacing={2} className={styles.buttonWrapper}>
                                            {/* todo: handle edit */}
                                            <Button variant="contained" endIcon={<EditIcon />}>
                                                Edit
                                            </Button>
                                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => onDeleteBtnClick(item.id)}>
                                                Delete
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Error>
                </Loading>
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default ProgressPage;
