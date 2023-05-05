import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import {IWorkoutTemplate} from '../../features/workout/HomePage';

import styles from './styles.module.scss';

// todo
const TemplateCard: React.FC<IWorkoutTemplate> = ({id, name, exercises}) => {
    return (
        <Card className={styles.card}>
            <CardContent>
                <h4>{name}</h4>
            </CardContent>
        </Card>
    );
};

export default TemplateCard;
