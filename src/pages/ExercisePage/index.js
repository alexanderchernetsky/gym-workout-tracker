import React from "react";
import {useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import image from '../../images/pull-ups.jpeg';

import {exercises} from "../../data/exercises";

import styles from './styles.module.css';



// todo: write a generic page for all exercises
const ExercisePage = () => {
    const {id} = useParams()

    const exercise = exercises.find(exercise => exercise.id === Number(id));

    if (!exercise) {
        return <div className={styles.notFound}>Exercise not found.</div>
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.exercise}>Exercise</div>
            <div className={styles.boxWrapper}>
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
                    <Paper elevation={3} className={styles.paper}>
                        <div className={styles.textWrapper}>
                            <div className={styles.exerciseName}>{exercise.name}</div>
                            <div className={styles.muscleType}>{exercise.muscleTypes}</div>
                        </div>
                       <div className={styles.imageWrapper}>
                            <img alt="pull ups" src={image} className={styles.image} />
                       </div>
                    </Paper>
                </Box>
            </div>

        </div>
    )}

export default ExercisePage;
