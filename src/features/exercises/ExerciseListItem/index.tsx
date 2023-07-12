import React from 'react';
import {Chip, ListItem, ListItemText} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {IExercise} from '../../../services/ninjasApi';

import styles from './styles.module.scss';

interface IExerciseListItemProps {
    exercise: IExercise;
}

const ExerciseListItem: React.FC<IExerciseListItemProps> = ({exercise}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // todo: re-write to use scss styles
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '82vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };

    return (
        <React.Fragment>
            <ListItem button divider onClick={handleOpen}>
                <ListItemText primary={exercise.name} className={styles.exerciseName} />
                <Chip label={exercise.muscle} variant="outlined" />
            </ListItem>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {exercise.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Type: {exercise.type}. Muscle: {exercise.muscle}. Equipment: {exercise.equipment}. Difficulty: {exercise.difficulty}.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {exercise.instructions}
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default ExerciseListItem;
