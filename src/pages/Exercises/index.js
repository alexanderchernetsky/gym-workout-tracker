import React from "react";
import {Link} from "react-router-dom";
import {Chip, List, ListItem, ListItemText} from "@mui/material";


import {exercises} from "../../data/exercises";

import styles from "./styles.module.css";

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};

const Exercises = () => {
    return (
        <div className={styles.pageWrapper}>
            <h2>Exercises</h2>
            <List sx={style} component="nav" aria-label="mailbox folders">
                {(exercises || []).map(exercise => (
                    <Link to={`/exercise/${exercise.id}`} style={{textDecoration: 'none'}} key={exercise.id}>
                        <ListItem key={exercise.id} button divider>
                            <ListItemText primary={exercise.name} className={styles.exerciseName}  />
                            <Chip label={exercise.muscleTypes} variant="outlined" />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    )
}

export default Exercises;
