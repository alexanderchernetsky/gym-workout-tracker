import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import photo from '../../images/arnold_physcial_shape.jpeg';
import {AppRoutes} from "../../App";
import {getProgressItems} from "./progressSlice";
import {RootState} from "../../store";
import {ProgressItem} from "../../data/progressItems";

import styles from "./styles.module.scss";


const ProgressPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // todo: make sure ts type is inferred
    const progressItems: ProgressItem[] = useSelector((state: RootState) => state.progress);

    const onAddIconClick = () => {
        navigate(AppRoutes.CREATE_PROGRESS_ITEM_PAGE);
    }

    useEffect(() => {
        // todo: get rid of ts ignore
        // @ts-ignore
        dispatch(getProgressItems())
    }, [dispatch])

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
                                       <span key={indicator[0]} className={styles.indicator}>
                                           <span className={styles.indicatorName}>{indicator[0]}</span>: {indicator[1]}
                                       </span>
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
