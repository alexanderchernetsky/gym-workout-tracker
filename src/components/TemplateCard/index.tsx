import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {IWorkoutTemplate} from '../../features/workout/HomePage';
import truncateStringWithDots from 'src/helpers/truncateStringWithDots';

import styles from './styles.module.scss';

const MAX_EXERCISES_STRING_LENGTH = 100;

const TemplateCard: React.FC<IWorkoutTemplate> = ({name, exercises}) => {
    const onTemplateInfoClick = () => {
        window.alert('To be continued...');
    };

    const exercisesList = exercises.map(exercise => exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)).join(', ');

    return (
        <Card className={styles.card} data-testid="workout-template-card">
            <CardContent className={styles.cardContent}>
                <div className={styles.templateHeader}>
                    <h4 className={styles.templateName}>{name}</h4>
                    <MoreHorizIcon color="info" onClick={onTemplateInfoClick} className={styles.moreInfoIcon} />
                </div>
                <div className={styles.exercisesList}>{truncateStringWithDots(exercisesList, MAX_EXERCISES_STRING_LENGTH)}</div>
            </CardContent>
        </Card>
    );
};

export default TemplateCard;
