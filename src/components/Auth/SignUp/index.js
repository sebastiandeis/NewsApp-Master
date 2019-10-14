import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import grey from '@material-ui/core/colors/grey';
import SignInSlider from '../../UI/signinslider';
import CustomizedSnackbars from '../../UI/customsnackbar';

import { auth } from '../../../firebase';

import {
    doCreateUser,
} from '../../../firebase/user';

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
    socialIcons: {
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 50,
    },
    socialIcon: {
        color: '#fff'
    }
});

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    firstValidation: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    snackbarOpen: false,
    error: null,
};

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
        }
    }

    componentWillMount() {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
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
        let { email, password, confirmPassword, firstValidation, passwordError, confirmPasswordError, emailError } = this.state;
        const { history } = this.props;

        if (!firstValidation) {
            emailError = !this.validateEmail(email);
            passwordError = password === '' ? true : false;
            confirmPasswordError = confirmPassword === password ? false : true;
            firstValidation = true;
            this.setState({
                emailError,
                passwordError,
                confirmPasswordError,
                firstValidation,
            });
        }
        if (!emailError && !passwordError && !confirmPasswordError) {
            auth.doCreateUserWithEmailAndPassword(email, password)
                .then(authUser => {
                    // Create a user in your own accessible Firebase Database too
                    doCreateUser(authUser.user.uid, email)
                    .then(() => {
                        this.setState(() => ({ ...INITIAL_STATE }));
                        history.push('/');
                    })
                    .catch(error => {
                        this.setState(updateByPropertyName('error', error));
                    })
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
        let { emailError, passwordError, confirmPasswordError, password } = this.state;
        if (eleName === 'email') {
            emailError = !this.validateEmail(value);
        }
        if (eleName === 'password') {
            passwordError = value === '' ? true : false;
        }
        if (eleName === 'confirmPassword') {
            confirmPasswordError = value === password ? false : true;
        }
        this.setState({
            emailError,
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

    render() {
        const { classes } = this.props
        const { emailError, passwordError, confirmPasswordError, error, snackbarOpen } = this.state

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.headerBar}>
                    <Toolbar>
                        <IconButton onClick={this.handleBack} edge="start" className={classes.backBtn} color="inherit" aria-label="Menu">
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Typography className={classes.title}>
                            Sign Up
                        </Typography>
                        <Button onClick={this.handleBack} color="inherit">SKIP</Button>
                    </Toolbar>
                </AppBar>

                <Typography className={classes.heroTxt} gutterBottom>
                    Let's curate.<br />Together.
                </Typography>

                <Box className={classes.container}>
                    <Box>
                        <SignInSlider />
                    </Box>
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
                            <Typography className={classes.alreadyTxt}>
                                Already registered?&nbsp;&nbsp;
                                <Link to={'/signin'} style={{ color: '#fff', textDecoration: 'none' }}>Sign In</Link>
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                className={classes.submitBtn}
                                onClick={this.handleSubmit}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </Box>
                    <Box className={classes.socialIcons}>
                        <IconButton>
                            <Icon className={clsx(classes.socialIcon, 'fab fa-apple')} />
                        </IconButton>
                        <IconButton>
                            <Icon className={clsx(classes.socialIcon, 'fab fa-linkedin')} />
                        </IconButton>
                        <IconButton>
                            <Icon className={clsx(classes.socialIcon, 'fab fa-twitter')} />
                        </IconButton>
                        <IconButton>
                            <Icon className={clsx(classes.socialIcon, 'fab fa-facebook-square')} />
                        </IconButton>
                        <IconButton>
                            <Icon className={clsx(classes.socialIcon, 'fab fa-google')} />
                        </IconButton>
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(SignUpPage)))
