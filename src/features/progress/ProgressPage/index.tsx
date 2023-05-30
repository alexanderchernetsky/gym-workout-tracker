import React, {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import Fab from '@mui/material/Fab';
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

    return (
        <PageWithResponsiveAppBar>
            <div className={styles.pageWrapper}>
                <Loading isLoading={isLoading}>
                    <Error isError={isError}>
                        <Fab color="primary" aria-label="add" className={styles.addButton}>
                            <AddIcon onClick={onAddIconClick} />
                            {/* todo: add this text on desktop 'Add new progress item' and variant="extended" to Fab */}
                        </Fab>
                        {sortedProgressItems.map(item => {
                            return <ProgressEntryCard key={item.id} {...item} />;
                        })}
                    </Error>
                </Loading>
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default ProgressPage;
