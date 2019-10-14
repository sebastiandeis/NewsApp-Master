import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import grey from '@material-ui/core/colors/grey';

import SearchBar from '../UI/searchbar';
import makeExpanding from '../Hoc/expanding-animation';
import * as ROUTES from '../../constants/routes';

const ExpandingSearchBox = makeExpanding(SearchBar);

const styles = {
    root: {
        flexGrow: 1
    },
    appbar: {
        position: 'fixed',
        borderBottom: 'solid 2px',
        borderColor: grey[500],
    },
    title: {
        flexGrow: 1,
        position: 'relative',
        marginTop: 0
    },
    navbefore: {
        color: "#FFF",
    },
    toolbox: {
        display: 'flex'
    },
};

class SearchAppBar extends React.Component {
    render() {
        const {
            classes,
            title,
            backroute,
        } = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.appbar}>
                    <div className={classes.toolbox}>
                        <ExpandingSearchBox positionTop={10} />
                    </div>
                    <Toolbar>
                        <Link className={classes.linkitem} to={backroute ? backroute : ROUTES.LANDING}>
                            <IconButton edge="start" className={classes.navbefore} aria-label="nav before">
                                <ArrowBackIosIcon />
                            </IconButton>
                        </Link>
                        <Typography className={classes.title} variant="h6" noWrap>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    mainType: state.uiState.mainType,
});

export default connect(mapStateToProps)(withStyles(styles)(SearchAppBar));
