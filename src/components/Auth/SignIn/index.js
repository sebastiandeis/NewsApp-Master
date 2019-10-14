import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';

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
import * as ROUTES from '../../../constants/routes';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 120,
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
        position: 'fixed',
        zIndex: 2,
        top: 56,
        [theme.breakpoints.up('md')]: {
            top: 64,
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
        paddingBottom: 20,
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
    firstValidation: false,
    emailError: false,
    passwordError: false,
    snackbarOpen: false,
    error: null,
};

class SignInPage extends React.Component {
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
        let { email, password, firstValidation, passwordError, emailError } = this.state;
        const { history } = this.props;

        if (!firstValidation) {
            emailError = !this.validateEmail(email);
            passwordError = password === '' ? true : false;
            firstValidation = true;
            this.setState({
                emailError,
                passwordError,
                firstValidation
            });
        }
        if (!emailError && !passwordError) {
            auth.doSignInWithEmailAndPassword(email, password)
                .then((result) => {
                    if (result.user) {
                        this.props.getCurrentUser(result.user.uid);
                    }
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
        let { emailError, passwordError } = this.state;
        if (eleName === 'email') {
            emailError = !this.validateEmail(value);
        }
        if (eleName === 'password') {
            passwordError = value === '' ? true : false;
        }
        this.setState({
            emailError,
            passwordError,
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
        const { emailError, passwordError, error, snackbarOpen } = this.state

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.headerBar}>
                    <Toolbar>
                        <IconButton onClick={this.handleBack} edge="start" className={classes.backBtn} color="inherit" aria-label="Menu">
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Typography className={classes.title}>
                            Sign In
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
                        </Box>
                        <Box>
                            <Typography className={classes.alreadyTxt}>
                                <Link to={ROUTES.PASSWORD_FORGET} style={{ color: grey[500], textDecoration: 'none' }}>Forgot Password ?</Link>
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                className={classes.submitBtn}
                                onClick={this.handleSubmit}
                            >
                                Sign In
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
                    <Box style={{ marginBottom: 20 }}>
                        <Typography className={classes.alreadyTxt}>
                            Don't have an account?&nbsp;&nbsp;
                            <Link to={'/signup'} style={{ color: '#fff', textDecoration: 'none' }}>Sign Up</Link>
                        </Typography>
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
    users: state.userState.users,
    showTopNavbar: state.uiState.showTopNavbar,
    showBottomNavbar: state.uiState.showBottomNavbar,
    mainFeedsType: state.uiState.mainFeedsType,
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(SignInPage)))
