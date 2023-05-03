import React from 'react';
import {Chip, List, ListItem, ListItemText} from '@mui/material';

import {exercises} from '../../../mock-data/exercises';
import {PageWithResponsiveAppBar} from '../../../components/ResponsiveAppBar';

import styles from './styles.module.css';

const Exercises = () => {
    return (
        <PageWithResponsiveAppBar>
            <div className={styles.pageWrapper}>
                <h2>Exercises</h2>
                {/* todo: add search input */}
                <List sx={{bgcolor: 'background.paper'}} component="nav" aria-label="mailbox folders" className={styles.list}>
                    {/* todo: sort exercises alphabetically */}
                    {exercises.map(exercise => (
                        <ListItem key={exercise.id} button divider>
                            <ListItemText primary={exercise.name} className={styles.exerciseName} />
                            <Chip label={exercise.muscleTypes} variant="outlined" />
                        </ListItem>
                    ))}
                </List>
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default Exercises;
