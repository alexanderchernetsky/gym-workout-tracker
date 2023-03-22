import React from "react";
import {Link} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";


import styles from './styles.module.css';
import {PageWithResponsiveAppBar} from "../../App";


interface WorkoutType {
    id: number,
    name: string,
    link: string
}

const workoutTypes: WorkoutType[] = [
    {
        id: 1,
        name: 'Split',
        link: '/split-workout',
    },
    {
        id: 2,
        name: 'Full-body',
        link: '/full-body-workout',
    },
];

const Home = () => {
    return (
        <PageWithResponsiveAppBar>
            <div className={styles.homePageWrapper}>
                <h2>Workouts</h2>
                {/* todo: remove inline styles */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 156,
                            height: 128,
                        },
                    }}
                >
                    {workoutTypes.map(type => (
                        <Link to={type.link} style={{textDecoration: 'none'}} key={type.id}>
                            <Paper elevation={3} key={type.id} className={styles.paper}>
                                <div className={styles.name}>{type.name}</div>
                            </Paper>
                        </Link>
                    ))}
                </Box>
            </div>
        </PageWithResponsiveAppBar>
    )
}

export default Home;
