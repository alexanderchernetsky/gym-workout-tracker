import React from "react";
import {useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import {exercises} from "../../data/exercises";

import styles from './styles.module.css';


const boxStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
        m: 1,
        width: '100%',
        height: 128,
    }
}

const ExercisePage = () => {
    const {id} = useParams()

    const exercise = exercises.find(exercise => exercise.id === Number(id));

    if (!exercise) {
        return <div className={styles.notFound}>Exercise not found.</div>
    }

    const image = exercise.image || 'placeholder.jpeg';

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.boxWrapper}>
                <Box sx={boxStyles}>
                    <Paper elevation={3} className={styles.paper}>
                        <div className={styles.textWrapper}>
                            <div className={styles.exerciseName}>{exercise.name}</div>
                            <div className={styles.muscleType}>{exercise.muscleTypes}</div>
                        </div>
                       <div className={styles.imageWrapper}>
                            <img alt={exercise.name} src={require(`../../images/${image}`)} className={styles.image} />
                       </div>
                    </Paper>
                </Box>
            </div>

        </div>
    )}

export default ExercisePage;
