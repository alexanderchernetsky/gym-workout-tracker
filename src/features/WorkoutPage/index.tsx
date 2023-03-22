import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import uuid from 'react-uuid';
import {Button, List, ListItem, ListItemText} from "@mui/material";

import {workouts} from "../../mock-data/workouts";
import {PageWithResponsiveAppBar} from "../../App";

import styles from './styles.module.css';


// todo: remove inline styles
const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};

const SplitWorkouts = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const workout = workouts.find(workout => workout.id === Number(id));

    const handleStartButtonClick = () => {
        const workoutId = uuid();
        navigate(`/new-workout/${workoutId}`, {
            state: {
                workout
            }
        });
    }

    return (
        <PageWithResponsiveAppBar>
            <div className={styles.pageWrapper}>
                <h2 className={styles.pageName}>{workout.name}</h2>
                <h4 className={styles.muscles}>{workout.muscleTypes}</h4>
                <List sx={style} component="nav" aria-label="mailbox folders">
                    {workout.exercises.map(exercise => (
                        <Link to={`/exercise/${exercise.id}`} style={{textDecoration: 'none'}} key={exercise.id}>
                            <ListItem key={exercise.id} button divider>
                                <ListItemText primary={exercise.name} className={styles.exerciseName}  />
                            </ListItem>
                        </Link>
                    ))}
                </List>

                <Button variant="contained" className={styles.button} onClick={handleStartButtonClick}>Start Workout</Button>
            </div>
        </PageWithResponsiveAppBar>
    )
}

export default SplitWorkouts;
