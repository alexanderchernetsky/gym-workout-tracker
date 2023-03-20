import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import photo from '../../images/arnold_physcial_shape.jpeg';

import styles from "./styles.module.scss";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "../../App";

type ProgressIndicator = [string, number];

interface ProgressItem {
    id: number,
    date: string,
    weight: number,
    indicators: ProgressIndicator[],
    diet: string
}

// todo: this should be fetched from API
const progressItems: ProgressItem[] = [{
    id: 1,
    date: '19/03/2023',
    weight: 70,
    indicators: [
        ['pushups', 92],
        ['bench press', 50],
        ['incline dumbbell fly', 14],
        ['dumbbell shoulder press', 14],
        ['dumbbell shoulder fly', 8],
        ['rope pushdown triceps', 12.5],
        ['parallel bar dips', 38],
        ['pull-ups', 41],
        ['single-arm dumbbell row', 24],
        ['lat pulldown', 50],
        ['side lying dumbbell rear delt rise', 6],
        ['dumbbel curls', 12],
    ],
    diet: 'link_to_my_diet'
}];

const ProgressPage = () => {
    const navigate = useNavigate();

    const onAddIconClick = () => {
        navigate(AppRoutes.CREATE_PROGRESS_ITEM_PAGE);
    }

    return (
        <div className={styles.pageWrapper}>
            <Fab color="primary" aria-label="add" className={styles.addIcon} >
                <AddIcon onClick={onAddIconClick} />
            </Fab>
            {progressItems.map(item => {
               return (
                   <Card sx={{ minWidth: 275, width: '90%', marginTop: '20px' }} key={item.id}>
                       <div className={styles.imageWrapper}>
                           <img src={photo} alt="physical shape" />
                       </div>
                       <CardContent>
                           <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                               {item.date}
                           </Typography>
                           <Typography sx={{ mb: 1.5 }} color="text.secondary">
                               Weight: {item.weight}
                           </Typography>
                           <Typography variant="body2">
                               {item.indicators.map(indicator => {
                                   return (
                                       <div key={indicator[0]}>
                                           <span className={styles.indicatorName}>{indicator[0]}</span>: {indicator[1]}
                                       </div>
                                   )
                               })}
                           </Typography>
                       </CardContent>
                   </Card>
               )
            })}
        </div>
    )
}

export default ProgressPage;
