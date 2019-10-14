import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { ActionCreators } from '../../actions';
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import grey from '@material-ui/core/colors/grey';

import * as ROUTES from '../../constants/routes';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        position: 'absolute',
        right: 60,
        zIndex: 1,
        [theme.breakpoints.up('md')]: {
            right: 80,
        },
    },
    rootExpand: {
        flexGrow: 1,
        width: '100%',
        position: 'absolute',
        transform: 'inherit',
        zIndex: 1
    },
    appbar: {
        position: 'inherit',
        flexDirection: 'inherit',
    },
    toolbar: {
        flexGrow: 1,
        width: '100% - 20',
        // minHeight: 28,
    },
    searchbar: {
        display: 'flex',
        alignItems: 'center',
        height: 32,
        minHeight: 32,
        backgroundColor: grey[900]
    },
    searchIconButton: {
        padding: 6,
        color: '#ffffff'
    },
    searchIcon: {
        padding: 6,
        color: grey[500]
    },
    searchOpen: {
        width: '100%',
    },
    searchClosed: {
        width: '0%',
    },
    input: {
        marginLeft: 4,
        flex: 1,
        color: grey[200],
        fontSize: 14,
    },
    arrowIcon: {
        color: '#ffffff',
    },
});


class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTxt: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            searchTxt: event.target.value
        })
    }

    handleSearch() {
        if (this.state.searchTxt === "") {
            return;
        }
        this.props.updateSearchKey(this.state.searchTxt);
    }

    render() {
        const { classes, history, isOpen, onClick, additionalStyles } = this.props;
        const openOrClose = isOpen ? classes.searchOpen : classes.searchClosed;
        const rootStyle = isOpen ? classes.rootExpand : classes.root;
        const textStyle = Object.assign({}, additionalStyles ? additionalStyles.text : {});
        const searchBarStyle = Object.assign({}, textStyle, additionalStyles ? additionalStyles.frame : {});

        return (
            <div className={classNames(rootStyle, openOrClose)} style={searchBarStyle}>
                <AppBar className={classNames(classes.appbar, openOrClose)}>
                    <Toolbar className={classNames(classes.toolbar, openOrClose)} style={searchBarStyle}>
                        <Paper className={classNames(classes.searchbar, openOrClose)} style={searchBarStyle}>
                            {
                                isOpen ?
                                    <IconButton className={classes.searchIconButton} onClick={onClick} aria-label="Search">
                                        <ArrowBackIosIcon />
                                    </IconButton> : ''
                            }
                            <InputBase
                                className={classNames(classes.input, openOrClose)}
                                style={textStyle}
                                placeholder="Search"
                                onChange={this.handleChange}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        if (this.state.searchTxt.length > 0) {
                                            this.props.updateSearchKey(this.state.searchTxt);
                                            history.push(ROUTES.SEARCH_RESULT);
                                        }
                                    }
                                }
                                }
                            />
                            {
                                !isOpen ?
                                    <IconButton className={classes.searchIconButton} onClick={onClick} aria-label="Search">
                                        <SearchIcon />
                                    </IconButton> : ''
                            }
                        </Paper>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(withRouter(SearchBar)));
