import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    actionBtn: {
        color: '#fff',
    }
})

const ConfirmDialog = ({ classes, confirmDialogOpen, handleConfirmItem, dialogMessage, dialogContentMessage }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        handleConfirmItem()
        handleClose()
    }

    useEffect(() => {
        setOpen(confirmDialogOpen)
    }, [confirmDialogOpen])

    return (
        <div className={classes.root}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogMessage}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContentMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.actionBtn}>
                        No
                    </Button>
                    <Button onClick={handleConfirm} className={classes.actionBtn} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(ConfirmDialog)