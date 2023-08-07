import React, {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import {PageWithResponsiveAppBar} from '../../../components/ResponsiveAppBar';
import {AppRoutes} from '../../../constants/routes';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import sortProgressItemsByDate from '../sortProgressItemsByDate';
import {useFetchProgressEntriesQuery} from '../../../services';
import ProgressEntryCard from '../ProgressEntryCard';

import styles from './styles.module.scss';

const ProgressPage = () => {
    const navigate = useNavigate();
    const {data, isLoading, isError} = useFetchProgressEntriesQuery();

    const onAddIconClick = () => {
        navigate(AppRoutes.CREATE_PROGRESS_ITEM_PAGE);
    };

    const sortedProgressItems = useMemo(() => sortProgressItemsByDate(data), [data]);

    const myProgressEntriesNumber = sortedProgressItems.length;

    // todo: add a text/placeholder when there are no progress items yet

    return (
        <PageWithResponsiveAppBar>
            <div className={styles.pageWrapper}>
                <Loading isLoading={isLoading}>
                    <Error isError={isError}>
                        <div className={styles.contentWrapper}>
                            <h1 className={styles.pageTitle}>Progress</h1>
                            <Button variant="contained" className={styles.addButton} onClick={onAddIconClick}>
                                <AddIcon onClick={onAddIconClick} />
                                &nbsp; Add new progress entry
                            </Button>
                            <h2>Entries</h2>
                            <h3 className={styles.pageSecondaryTitle}>My progress entries ({myProgressEntriesNumber})</h3>
                            <div className={styles.progressItemsWrapper}>
                                {sortedProgressItems.map(item => {
                                    return <ProgressEntryCard key={item.id} {...item} />;
                                })}
                            </div>
                        </div>
                    </Error>
                </Loading>
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default ProgressPage;
