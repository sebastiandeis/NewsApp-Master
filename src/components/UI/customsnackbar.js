import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
        '& .MuiSnackbarContent-action': {
            position: 'absolute',
            right: 16
        }
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        '& .MuiSnackbarContent-action': {
            position: 'absolute',
            right: 16
        }
    },
    info: {
        backgroundColor: theme.palette.primary.main,
        '& .MuiSnackbarContent-action': {
            position: 'absolute',
            right: 16
        }
    },
    warning: {
        backgroundColor: amber[700],
        '& .MuiSnackbarContent-action': {
            position: 'absolute',
            right: 16
        }
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 44,
    },
}));

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

export default function CustomizedSnackbars(props) {
    const { type, message, openStats, vertical, horizontal, handleEvent } = props;

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        handleEvent();
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: vertical || 'bottom',
                    horizontal: horizontal || 'left',
                }}
                open={openStats}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant={type || 'success'}
                    message={message || "This is a success message!"}
                />
            </Snackbar>
        </div>
    );
}