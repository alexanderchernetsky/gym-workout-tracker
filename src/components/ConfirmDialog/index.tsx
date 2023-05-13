import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

interface IConfirmDialog {
    dialogTitle: string;
    dialogContent: string;
    handleConfirm: () => void;
    handleClose: () => void;
}

const ConfirmDialog: React.FC<IConfirmDialog> = ({dialogTitle, dialogContent, handleConfirm, handleClose}) => {
    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} autoFocus>
                    Yes
                </Button>
                <Button onClick={handleClose}>No</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
