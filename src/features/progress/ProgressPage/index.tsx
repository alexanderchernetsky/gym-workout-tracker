import React, {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

import photo from '../../../images/arnold_physcial_shape.jpeg';
import {PageWithResponsiveAppBar} from '../../../components/ResponsiveAppBar';
import {AppRoutes} from '../../../constants/routes';
import {deleteProgressItem} from '../progressSlice';
import {AppDispatch} from '../../../store';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import sortProgressItemsByDate from '../sortProgressItemsByDate';
import {useFetchProgressEntriesQuery} from '../../../services';

import styles from './styles.module.scss';

const ProgressPage = () => {
    const navigate = useNavigate();
    //  we have to add <AppDispatch> here to avoid issue - Argument of type 'AsyncThunkAction' is not assignable to parameter of type 'AnyAction'
    const dispatch = useDispatch<AppDispatch>();
    const {data, isLoading, isError} = useFetchProgressEntriesQuery();

    const onAddIconClick = () => {
        navigate(AppRoutes.CREATE_PROGRESS_ITEM_PAGE);
    };

    const onDeleteBtnClick = (id: string) => {
        // todo: use RTK Query mutation
        dispatch(deleteProgressItem(id));
    };

    const onEditProgressEntryClick = (id: string) => {
        // todo
        window.alert('To be continued...');
    };

    const sortedProgressItems = useMemo(() => sortProgressItemsByDate(data), [data]);

    return (
        <PageWithResponsiveAppBar>
            <div className={styles.pageWrapper}>
                <Loading isLoading={isLoading}>
                    <Error isError={isError}>
                        <Fab color="primary" aria-label="add" className={styles.addIcon}>
                            <AddIcon onClick={onAddIconClick} />
                        </Fab>
                        {sortedProgressItems.map(item => {
                            return (
                                <Card className={styles.progressItemCard} key={item.id}>
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
                                            <Button variant="contained" endIcon={<EditIcon />} onClick={() => onEditProgressEntryClick(item.id)}>
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
