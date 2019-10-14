
import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Button } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';

import SearchAppBar from '../UI/searchappbar';
import SourcesList from '../UI/sourceslist';
import BottomNavBar from '../UI/bottomnavbar';
import AddSourceDialog from '../UI/addsourcedialog';

import * as globalStyles from '../../constants/globalstyles';
import * as ROUTES from '../../constants/routes';
import * as MENU from '../../constants/menu';
import grey from '@material-ui/core/colors/grey';

const styles = {
    root: {
        flexGrow: 1,
    },
    header: {
        width: '100%',
        zIndex: 10,
    },
    headerUp: {
        zIndex: 10
    },
    headerDown: {
        position: 'fixed',
        zIndex: 10,
        backgroundColor: '#000',
        padding: 16,
        width: 'calc(100% - 32px)',
    },
    appbar: {
        position: 'relative',
        minHeight: 56,
    },
    iconImg: {
        height: 100,
        width: 100,
        borderRadius: 'inherit',
        marginRight: 16
    },
    feedslogo: {
        height: 32,
        width: 32,
        marginTop: -100,
        position: 'absolute'
    },
    listview_info: {
        display: 'flex',
    },
    list_title: {
        fontSize: '1.25rem',
        fontWeight: 500,
        color: '#fff',
    },
    list_summary: {
        fontSize: '0.8rem',
        color: grey[500]
    },
    boxdefault: {
        width: "100%"
    },
    headerFollowerPart: {
        width: '100%',
        paddingTop: 16
    },
    headerFollowerPartTxt: globalStyles.FOLLOWERS_MARK_TXT,
    headerFollowerPartBtn: globalStyles.BTN_FOLLOW_MID,
    floatRight: {
        float: 'right'
    }

}

class YourListSources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showShareDlg: false
        };
    }

    clickAddButton = () => {
        this.setState({
            showShareDlg: true
        });
    }

    handleShareClose = () => {
        this.setState({
            showShareDlg: false
        });
    };

    render() {
        const { showShareDlg } = this.state;
        const { classes, showTopNavbar, showBottomNavbar, activeCategory, mainType } = this.props

        const positionStyle = {
            height: showTopNavbar ? 190 : 50,
            show: showTopNavbar,
            searchBarPositionTop: showTopNavbar ? 60 : 0,
            categoryBarPositionTop: showTopNavbar ? 105 : 30
        }

        var currentCategory = this.props.categories.filter(category => category.value === activeCategory);
        var activeSources = this.props.sources.filter(item => item.category === activeCategory);

        if (currentCategory && currentCategory.length > 0) {
            currentCategory = currentCategory[0];
        } else {
            currentCategory = null;
        }

        return (
            <div className={classes.root}>
                <div className={classes.header} style={{ height: positionStyle.height }}>
                    <div className={classes.headerUp}>
                        {
                            positionStyle.show &&
                            <SearchAppBar
                                title={mainType === MENU.NEWS ? 'News List Sources' : 'Social List Sources'}
                                backroute={mainType === MENU.NEWS ? ROUTES.YOUR_NEWS_LISTS : ROUTES.YOUR_SOCIAL_LISTS}
                            />
                        }
                    </div>
                    {
                        currentCategory &&
                        <div className={classes.headerDown} style={{ top: positionStyle.searchBarPositionTop }}>
                            <Box className={classes.listview_info}>
                                <Box>
                                    <Avatar
                                        className={classes.iconImg}
                                        alt={currentCategory.label}
                                        src={`/static/images/icons/${currentCategory.image}`}
                                    />
                                    <Avatar alt={'FeedsLogo'} src={`/static/images/icons/${currentCategory.feedsLogo ? currentCategory.feedsLogo : 'main.gif'}`} className={classes.feedslogo} />
                                </Box>
                                <Box className={classes.boxdefault}>
                                    <Typography className={classes.list_title}>
                                        {currentCategory.label}
                                        <SvgIcon style={{ float: 'right' }}>
                                            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                                        </SvgIcon>
                                    </Typography>
                                    <Typography className={classes.list_summary}>
                                        This list draws from these {activeSources.length} news sources
                                    </Typography>
                                    <Box className={classes.headerFollowerPart}>
                                        <Button 
                                            className={classnames(classes.headerFollowerPartBtn, classes.floatRight)}
                                            onClick={this.clickAddButton}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                    }
                </div>
                {showBottomNavbar && <BottomNavBar />}
                <SourcesList categoryValue={currentCategory.value} />
                <AddSourceDialog
                    open={showShareDlg}
                    onClose={this.handleShareClose}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    showTopNavbar: state.uiState.showTopNavbar,
    showBottomNavbar: state.uiState.showBottomNavbar,
    mainType: state.uiState.mainType,
    mainFeedsType: state.uiState.mainFeedsType,
    activeCategory: state.uiState.activeCategory,
    categories: state.uiState.categories,
    sources: state.uiState.sources,
})

export default connect(mapStateToProps)(withStyles(styles)(YourListSources))
