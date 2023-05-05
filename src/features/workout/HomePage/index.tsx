import React from 'react';
import Button from '@mui/material/Button';

import {PageWithResponsiveAppBar} from '../../../components/ResponsiveAppBar';
import {Exercise, exercises} from '../../../mock-data/exercises';
import TemplateCard from '../../../components/TemplateCard';

import styles from './styles.module.scss';

export interface IWorkoutTemplate {
    id: number;
    name: string;
    exercises: Exercise[];
}

const mockTemplates: IWorkoutTemplate[] = [
    {
        id: 1,
        name: 'Split chest and triceps',
        exercises: exercises.filter(exercise => exercise.muscleTypes.includes('chest') || exercise.muscleTypes.includes('triceps'))
    }
];

const mockExampleTemplates: IWorkoutTemplate[] = [];

const Home = () => {
    const onStartEmptyWorkoutClick = () => {
        window.alert('To be continued...');
    };

    const onAddTemplateClick = () => {
        window.alert('To be continued...');
    };

    return (
        <PageWithResponsiveAppBar>
            <div className={styles.homePageWrapper}>
                <h1 className={styles.pageTitle}>Start Workout</h1>
                <h3 className={styles.pageSecondaryTitle}>Quick start</h3>
                <Button variant="contained" className={styles.button} onClick={onStartEmptyWorkoutClick}>
                    Start an Empty Workout
                </Button>
                <div className={styles.templates}>
                    <h2>Templates</h2>
                    <Button variant="outlined" className={styles.newTemplateButton} onClick={onAddTemplateClick}>
                        + template
                    </Button>
                </div>
                <h3 className={styles.pageSecondaryTitle}>My templates</h3>
                <div className={styles.myTemplatesWrapper}>
                    {mockTemplates.map(item => {
                        return <TemplateCard key={item.id} {...item} />;
                    })}
                </div>
                <h3>Example templates</h3>
                {mockExampleTemplates.map(item => {
                    return <div>Example Template 1</div>;
                })}
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default Home;
