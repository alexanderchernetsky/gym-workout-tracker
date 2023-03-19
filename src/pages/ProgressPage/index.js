import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import photo from '../../images/physical-shape-19-03-23.jpg';

import styles from "./styles.module.scss";

const progressItems = [{
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
    return (
        <div className={styles.pageWrapper}>
            <h2 className={styles.pageName}>Progress</h2>
            {progressItems.map(item => {
               return (
                   <Card sx={{ minWidth: 275, width: '90%' }}>
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
                                       <div>{indicator[0]}: {indicator[1]}</div>
                                   )
                               })}
                           </Typography>
                       </CardContent>
                       <CardActions>
                           {/* todo: link to the diet page */}
                           <Button size="small">Diet</Button>
                       </CardActions>
                   </Card>
               )
            })}
        </div>
    )
}

export default ProgressPage;
