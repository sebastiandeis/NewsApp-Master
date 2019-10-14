import React from 'react';
import { connect } from 'react-redux';
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

import { auth } from '../../../firebase';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        marginLeft: 16,
        marginRight: 16,
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
    },
    heroTxt: {
        color: grey[500],
        fontSize: 14,
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
    email: '',
    firstValidation: false,
    emailError: false,
    snackbarOpen: false,
    error: null,
};

class PasswordForgetPage extends React.Component {
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
        let { email, firstValidation, emailError } = this.state;
        const { history } = this.props;

        if (!firstValidation) {
            emailError = !this.validateEmail(email);
            firstValidation = true;
            this.setState({
                emailError,
            });
        }
        if (!emailError) {
            auth.doPasswordReset(email)
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

    validateEmail = (email) => {
        // eslint-disable-next-line
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{1,255}[\.][a-z]{2,5}/g;
        return pattern.test(email);
    }

    validationForm = (eleName, value) => {
        let { emailError } = this.state;
        if (eleName === 'email') {
            emailError = !this.validateEmail(value);
        }
        this.setState({
            emailError,
        })
    }

    handleBack = () => {
        this.props.history.push('/');
    }

    handleSnackBarClose = () => {
        this.setState({ snackbarOpen: false });
    }

    render() {
        const { classes } = this.props
        const { emailError, error, snackbarOpen } = this.state

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.headerBar}>
                    <Toolbar>
                        <IconButton onClick={this.handleBack} edge="start" className={classes.backBtn} color="inherit" aria-label="Menu">
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Typography className={classes.title}>
                            Forgot Password
                        </Typography>
                        <Button onClick={this.handleBack} color="inherit">SKIP</Button>
                    </Toolbar>
                </AppBar>

                <Typography className={classes.heroTxt} gutterBottom>
                    Please enter your registered email to reset your password
                </Typography>

                <Box className={classes.container}>
                    <Box className={classes.signinForm}>
                        <Box>
                            <TextField
                                id="filled-email-input"
                                label={<span style={{ color: emailError ? '#f44336' : '#9e9e9e' }}>Email</span>}
                                onChange={this.handleChange}
                                className={classes.textField}
                                InputProps={
                                    {
                                        classes: {
                                            root: classes.customInput
                                        }
                                    }
                                }
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                error={emailError}
                                helperText={emailError && <span style={{ color: '#f44336' }}>email is not valid</span>}
                                required
                                fullWidth
                            />
                        </Box>
                        <Box>
                            <Button
                                className={classes.submitBtn}
                                onClick={this.handleSubmit}
                            >
                                Reset Password
                            </Button>
                        </Box>
                    </Box>
                </Box>
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(PasswordForgetPage)))
