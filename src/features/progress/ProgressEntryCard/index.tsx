import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Snackbar} from '@mui/material';
import Alert from '@mui/material/Alert';

import photo from '../../../images/arnold_physcial_shape.jpeg';
import {IProgressItem} from '../progressSlice';
import {useDeleteProgressEntryMutation} from '../../../services';
import ConfirmDialog from '../../../components/ConfirmDialog';

import styles from './styles.module.scss';

interface IProgressEntryCard extends IProgressItem {}

const ProgressEntryCard: React.FC<IProgressEntryCard> = ({image, date, weight, progressIndicators, id}) => {
    const [deleteProgressEntry, {isError, isLoading}] = useDeleteProgressEntryMutation();
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [isConfirmOpen, setConfirmOpen] = React.useState(false);
    const navigate = useNavigate();

    const onEditProgressEntryClick = () => {
        navigate(`/progress/${id}`);
    };

    const closeSnackBar = () => {
        setIsSnackBarOpen(false);
    };

    useEffect(() => {
        if (isError) {
            setIsSnackBarOpen(true);
        }
    }, [isError]);

    const onDeleteBtnClick = () => {
        setConfirmOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        await deleteProgressEntry(id).unwrap();

        setConfirmOpen(false);
    };

    const handleClose = () => {
        setConfirmOpen(false);
    };

    return (
        <React.Fragment>
            {isConfirmOpen ? (
                <ConfirmDialog
                    dialogTitle="Are you sure?"
                    dialogContent="Do you want to delete progress entry?"
                    handleConfirm={handleDeleteConfirmed}
                    handleClose={handleClose}
                />
            ) : null}
            <Card className={styles.progressItemCard} data-testid="progress-entry-card">
                {/*todo: create a re-usable SnackBar component (also used on Register page) */}
                <Snackbar open={isSnackBarOpen} onClose={closeSnackBar} autoHideDuration={3000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert severity="error" sx={{width: '100%'}}>
                        Delete failed!
                    </Alert>
                </Snackbar>
                <div className={styles.imageWrapper}>
                    <img src={image || photo} alt="physical shape" />
                </div>
                <CardContent>
                    <Typography color="text.secondary" gutterBottom className={styles.date}>
                        {moment(date).format('L')}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Weight: {weight}
                    </Typography>
                    <Typography variant="body2">{progressIndicators}</Typography>
                    <Stack direction="row" spacing={2} className={styles.buttonWrapper}>
                        <Button variant="contained" endIcon={<EditIcon />} onClick={onEditProgressEntryClick} disabled={isLoading}>
                            Edit
                        </Button>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDeleteBtnClick} disabled={isLoading}>
                            Delete
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default ProgressEntryCard;
