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
import {RootState} from '../../store';
import {ProgressItem} from '../../mock-data/progressItems';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

import styles from './styles.module.scss';

const ProgressPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // todo: make sure ts type is inferred
    const progressItems: ProgressItem[] = useSelector((state: RootState) => state.progress.progressItems);
    const loadingState = useSelector((state: RootState) => state.progress.loadingState);

    const onAddIconClick = () => {
        navigate(AppRoutes.CREATE_PROGRESS_ITEM_PAGE);
    };

    useEffect(() => {
        // todo: get rid of ts ignore
        // @ts-ignore
        dispatch(getProgressItems());
    }, [dispatch]);

    const onDeleteBtnClick = (id: number) => {
        // todo: get rid of ts ignore
        // @ts-ignore
        dispatch(deleteProgressItem(id));
    };

    return (
        <PageWithResponsiveAppBar>
            <div className={styles.pageWrapper}>
                <Loading isLoading={loadingState === LoadingStateType.Loading}>
                    <Error isError={loadingState === LoadingStateType.Error}>
                        <Fab color="primary" aria-label="add" className={styles.addIcon}>
                            <AddIcon onClick={onAddIconClick} />
                        </Fab>
                        {progressItems.map(item => {
                            return (
                                <Card sx={{minWidth: 275, width: '90%', marginTop: '20px'}} key={item.id}>
                                    <div className={styles.imageWrapper}>
                                        <img src={photo} alt="physical shape" />
                                    </div>
                                    <CardContent>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            {item.date}
                                        </Typography>
                                        <Typography sx={{mb: 1.5}} color="text.secondary">
                                            Weight: {item.weight}
                                        </Typography>
                                        <Typography variant="body2">
                                            {item.indicators.map(indicator => {
                                                return (
                                                    <span key={indicator[0]} className={styles.indicator}>
                                                        <span className={styles.indicatorName}>{indicator[0]}</span>:{' '}
                                                        <span className={styles.indicatorValue}>{indicator[1]};</span>
                                                    </span>
                                                );
                                            })}
                                        </Typography>
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
