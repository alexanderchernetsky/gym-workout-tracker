import React from 'react';
import Button from '@mui/material/Button';

import {PageWithResponsiveAppBar} from '../../../components/ResponsiveAppBar';

import styles from './styles.module.css';
import {Exercise} from '../../../mock-data/exercises';

interface IWorkoutTemplate {
    id: number;
    name: string;
    exercises: Exercise[];
}

const mockTemplates: IWorkoutTemplate[] = [];
const mockExampleTemplates: IWorkoutTemplate[] = [];

const Home = () => {
    return (
        <PageWithResponsiveAppBar>
            <div className={styles.homePageWrapper}>
                <h1>Start Workout</h1>
                <h3>Quick start</h3>
                <Button>Start an Empty Workout</Button>
                <div>
                    <h2>Templates</h2>
                    {/* todo: replace + with the icon */}
                    <Button>+ template</Button>
                </div>
                <h3>My templates</h3>
                {mockTemplates.map(item => {
                    return <div>My Template 1</div>;
                })}
                <h3>Example templates</h3>
                {mockExampleTemplates.map(item => {
                    return <div>Example Template 1</div>;
                })}
            </div>
        </PageWithResponsiveAppBar>
    );
};

export default Home;
