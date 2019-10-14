import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import grey from '@material-ui/core/colors/grey';

import * as ROUTES from '../../constants/routes';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    appbar: {
        position: 'fixed',
        // top: 90
    },
    toolbar: {
        flexGrow: 1,
        width: '100% - 20',
        height: 16,
        minHeight: 16,
        padding: 0
    },
    searchbar: {
        width: '100%',
        display: 'flex',
        padding: '2px 4px',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        alignItems: 'center',
        height: 16,
        minHeight: 16,
        backgroundColor: grey[900]
    },
    searchIcon: {
        padding: 0,
        color: grey[500]
    },
    input: {
        marginLeft: 4,
        flex: 1,
        color: grey[200],
        fontSize: 14
    }
});


class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTxt: ''
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
        const { classes, history } = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.appbar} style={{ top: this.props.positionTop }}>
                    <Toolbar className={classes.toolbar}>
                        <Paper className={classes.searchbar}>
                            <SearchIcon className={classes.searchIcon} />
                            <InputBase
                                className={classes.input}
                                placeholder="Search keywords in articles"
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
