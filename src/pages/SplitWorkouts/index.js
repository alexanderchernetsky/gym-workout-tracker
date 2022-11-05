import React from "react";
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {workouts} from "../../data/workouts";

import styles from './styles.module.css';


const SplitWorkouts = () => {
    return (
        <div className={styles.pageWrapper}>
            <h2>Split workouts</h2>
            <div>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: '100%',
                            height: 128,
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

    )
}

export default SplitWorkouts;
