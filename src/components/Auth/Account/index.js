import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';
import CustomizedSnackbars from '../../UI/customsnackbar';
import withAuthorization from '../../Session/withAuthorization';
import ConfirmDialog from '../../UI/confirmdailog';

import { auth } from '../../../firebase';
import {
    DeleteUserProfile,
} from '../../../firebase/user';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 56,
        [theme.breakpoints.up('md')]: {
            marginTop: 64,
        },
    },
    headerBar: {
        position: 'fixed',
        top: 0
    },
    backBtn: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        marginRight: 32,
    },
    heroTxt: {
        color: '#fff',
        fontSize: 26,
        lineHeight: 1.2,
        marginLeft: 28,
        marginRight: 16,
        zIndex: 2,
        marginTop: 56,
        [theme.breakpoints.up('md')]: {
            marginTop: 64,
        },
    },
    textField: {
        color: '#fff',
        '&::before': {
            border: `1px solid #fff`
        },
        '&.MuiInputLabel-root.Mui-focused': {
            color: '#fff',
        },
    },
    alreadyTxt: {
        color: grey[500],
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    customInput: {
        '&:before': {
            borderBottomColor: grey[500]
        },
        '&:after': {
            borderBottomColor: grey[500],
        },
        '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: grey[500],
        },
    },
    submitBtn: {
        backgroundColor: grey[900],
        borderRadius: '30px',
        padding: '10px 8px',
        width: '100%',
        textTransform: 'initial',
        marginTop: 10,
        marginBottom: 10,
    },
    signinForm: {
        marginLeft: 16,
        marginRight: 16
    },
});

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    password: '',
    confirmPassword: '',
    firstValidation: false,
    passwordError: false,
    confirmPasswordError: false,
    snackbarOpen: false,
    confirmDialogOpen: false,
    error: null,
};

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
        }
    }

    handleChange = (e) => {
        const { firstValidation } = this.state;
        this.setState(
            updateByPropertyName(e.target.name, e.target.value)
        );
        if (firstValidation) {
            this.validationForm(e.target.name, e.target.value);
        }
    }

    handleSubmit = () => {
        let { password, confirmPassword, firstValidation, passwordError, confirmPasswordError } = this.state;
        const { history } = this.props;

        if (!firstValidation) {
            passwordError = password === '' ? true : false;
            confirmPasswordError = confirmPassword === password ? false : true;
            firstValidation = true;
            this.setState({
                passwordError,
                confirmPasswordError,
                firstValidation,
            });
        }
        if (!passwordError && !confirmPasswordError) {
            auth.doPasswordUpdate(password)
                .then(() => {
                    this.setState(() => ({ ...INITIAL_STATE }));
                    history.push('/');
                })
                .catch(error => {
                    this.setState({
                        error,
                        snackbarOpen: true,
                    });
                });
        }
    }

    validationForm = (eleName, value) => {
        let { passwordError, confirmPasswordError, password } = this.state;

        if (eleName === 'password') {
            passwordError = value === '' ? true : false;
        }
        if (eleName === 'confirmPassword') {
            confirmPasswordError = value === password ? false : true;
        }
        this.setState({
            passwordError,
            confirmPasswordError,
        })
    }

    handleBack = () => {
        this.props.history.push('/');
    }

    handleSnackBarClose = () => {
        this.setState({ snackbarOpen: false });
    }

    confirmDeleteAccount = () => {
        const { authUser } = this.props
        this.setState({
            confirmDialogOpen: false,
        })

        DeleteUserProfile(authUser.uid)
            .then(() => {
                auth.doDeleteAccount()
                    .then(function () {
                        this.setState(() => ({ ...INITIAL_STATE }));
                        this.props.history.push('/')
                        console.log('Successfully deleted user', authUser.uid);
                    })
                    .catch((error) => {
                        console.log('Error deleting user:', error);
                        this.setState({
                            error,
                            snackbarOpen: true,
                        });
                    });
            })
            .catch(error => {
                this.setState({
                    error,
                    snackbarOpen: true,
                });
            })
    }

    openConfirmDialog = () => {
        this.setState({
            confirmDialogOpen: true,
        })
    }

    render() {
        const { classes } = this.props
        const { passwordError, confirmPasswordError, error, snackbarOpen, confirmDialogOpen } = this.state

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.headerBar}>
                    <Toolbar>
                        <IconButton onClick={this.handleBack} edge="start" className={classes.backBtn} color="inherit" aria-label="Menu">
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Typography className={classes.title}>
                            Account
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box className={classes.container}>
                    <Box className={classes.signinForm}>
                        <Box>
                            <TextField
                                id="filled-password-input"
                                label={<span style={{ color: passwordError ? '#f44336' : '#9e9e9e' }}>Password</span>}
                                onChange={this.handleChange}
                                className={classes.textField}
                                InputProps={
                                    {
                                        classes: {
                                            root: classes.customInput,
                                        }
                                    }
                                }
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                margin="normal"
                                error={passwordError}
                                helperText={passwordError && <span style={{ color: '#f44336' }}>password is not valid</span>}
                                required
                                fullWidth
                            />
                            <TextField
                                id="filled-confirmpassword-input"
                                label={<span style={{ color: confirmPasswordError ? '#f44336' : '#9e9e9e' }}>Confirm Password</span>}
                                onChange={this.handleChange}
                                className={classes.textField}
                                InputProps={
                                    {
                                        classes: {
                                            root: classes.customInput,
                                        }
                                    }
                                }
                                type="password"
                                name="confirmPassword"
                                margin="normal"
                                error={confirmPasswordError}
                                helperText={confirmPasswordError && <span style={{ color: '#f44336' }}>password mismatch</span>}
                                required
                                fullWidth
                            />
                        </Box>
                        <Box>
                            <Button
                                className={classes.submitBtn}
                                onClick={this.handleSubmit}
                            >
                                Change Password
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                className={classes.submitBtn}
                                onClick={this.openConfirmDialog}
                            >
                                Delete Account
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <ConfirmDialog
                    confirmDialogOpen={confirmDialogOpen}
                    handleConfirmItem={this.confirmDeleteAccount}
                    dialogMessage={'Do you actually delete your account?'}
                    dialogContentMessage={'Your account will be deleted permanantly.'}
                />
                {
                    (error && error.message !== undefined) &&
                    <CustomizedSnackbars
                        type={'error'}
                        message={error.message}
                        openStats={snackbarOpen}
                        vertical={'top'}
                        horizontal={'center'}
                        handleEvent={this.handleSnackBarClose}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    showTopNavbar: state.uiState.showTopNavbar,
    showBottomNavbar: state.uiState.showBottomNavbar,
    mainFeedsType: state.uiState.mainFeedsType,
})

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
)(withStyles(styles)(withRouter(AccountPage)));

