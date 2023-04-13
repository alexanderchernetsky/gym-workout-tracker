import React from 'react';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {workouts} from '../../mock-data/workouts';

import styles from './styles.module.css';
import {PageWithResponsiveAppBar} from '../../components/ResponsiveAppBar';

const SplitWorkouts = () => {
    return (
        <PageWithResponsiveAppBar>
            <div className={styles.pageWrapper}>
                <h2>Split workouts</h2>
                <div>
                    {/* todo: remove inline styles */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: '100%',
                                height: 128
                            }
                        }}
                    >
                        {workouts.map(workout => (
                            <Link key={workout.id} to={`/split-workout/${workout.id}`} style={{textDecoration: 'none'}}>
                                <Paper elevation={3} key={workout.id} className={styles.paper}>
                                    <div className={styles.exercisesNumber}>{workout.exercises.length} exercises</div>
                                    <div className={styles.workoutName}>{workout.name}</div>
                                    <div className={styles.muscleTypes}>{workout.muscleTypes}</div>
                                </Paper>
                            </Link>
                        ))}
                    </Box>
                </div>
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default SplitWorkouts;
