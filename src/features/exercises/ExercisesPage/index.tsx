import React from 'react';
import {Chip, List, ListItem, ListItemText} from '@mui/material';

import {PageWithResponsiveAppBar} from '../../../components/ResponsiveAppBar';
import {useFetchExercisesQuery} from '../../../services/ninjasApi';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';

import styles from './styles.module.css';

interface ICreateSearchStringParams {
    muscle?: string;
    type?: string;
    name?: string;
}

// todo: move this to a separate file
const createSearchString = (params: ICreateSearchStringParams): string => {
    let searchString: string = '';

    Object.entries(params).forEach(item => {
        const [key, value] = item;
        if (value) {
            searchString += `${key}=${value}&`;
        }
    });

    return searchString;
};

const Exercises = () => {
    // todo: pass different params dynamically depending on what's selected in the app
    const searchString = createSearchString({muscle: 'biceps'});

    const {data, isLoading, isError} = useFetchExercisesQuery(searchString);

    return (
        <PageWithResponsiveAppBar>
            <div className={styles.pageWrapper}>
                <h2>Exercises</h2>
                <Loading isLoading={isLoading}>
                    <Error isError={isError}>
                        {/* todo: add search input, add 2 filters (type, muscle) */}
                        <List sx={{bgcolor: 'background.paper'}} component="nav" aria-label="mailbox folders" className={styles.list}>
                            {/* todo: sort exercises alphabetically */}
                            {/*todo: remove ts-ignore*/}
                            {/*@ts-ignore*/}
                            {data.map(exercise => (
                                <ListItem key={exercise.id} button divider>
                                    <ListItemText primary={exercise.name} className={styles.exerciseName} />
                                    <Chip label={exercise.muscle} variant="outlined" />
                                </ListItem>
                            ))}
                        </List>
                    </Error>
                </Loading>
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default Exercises;
