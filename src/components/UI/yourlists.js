import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import * as MENU from '../../constants/menu';
import * as CATEGORY from '../../constants/category';
import * as NEWS_COUNTRY from '../../constants/state';
import * as ROUTES from '../../constants/routes';

import WaitingDialog from './waitingdlg';



const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: "#000",
        paddingTop: 20,
    },
    listitem: {
        display: '-webkit-box',
        paddingRight: 80,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#232323',
        }
    },
    listitem_avatar: {
        minWidth: 76,
    },
    listitem_text: {
        paddingRight: 88,
    },
    linkitem: {
        textDecoration: "none"
    },
    iconImg: {
        height: 60,
        width: 60,
        borderRadius: 'inherit',
    },
    feedslogo: {
        height: 20,
        width: 20,
        marginTop: -60,
        position: 'absolute'
    },
    following: {
        fontSize: '10px',
        color: '#000',
        padding: '1px 2px',
    },
});

class YourLists extends React.Component {
    handleToggle = (value) => () => {
        this.props.toggleCategoryStatus(value);
    };

    handleClick(newValue) {
        this.props.changeCategory(newValue);
        this.props.selectNewsCountry(NEWS_COUNTRY.ALL);
        this.props.initScrollPos();

        // all category
        if (newValue === CATEGORY.NEWS_ALL) {
            this.props.getNewsFirstPage();
            return;
        }
        if (newValue === CATEGORY.REDDIT_ALL) {
            this.props.getRedditFirstPage();
            return;
        }

        if (this.props.articleNeeded) {
            // category
            var activeSources = this.props.sources.filter(item => item.category === newValue);
            if (activeSources && activeSources.length > 0) {
                this.props.getArticles(this.props.mainType, newValue, activeSources);
            }
        }

    }

    render() {
        const {
            classes,
            mainType,
            categories,
        } = this.props;

        var allCategories = [];
        if (mainType === MENU.NEWS) {
            allCategories = categories.filter(category => category.type === mainType &&
                category.value !== CATEGORY.NEWS_ALL);
        } else if (mainType === MENU.REDDIT) {
            allCategories = categories.filter(category => category.type === mainType &&
                category.value !== CATEGORY.REDDIT_ALL);
        }

        const CategoryItemText = ({ label, summary }) => {
            return (
                <div className={'categoryitemtext'}>
                    <Typography>
                        {label}
                    </Typography>
                    <Typography style={{ fontSize: '12px', lineHeight: 1 }}>
                        {summary}
                    </Typography>
                </div>
            )
        }

        return (
            <div className={classes.root}>
                <List>
                    {allCategories.map((category, index) => (
                        <ListItem
                            className={classes.listitem}
                            key={index}
                        >
                            <Link 
                                to={mainType === MENU.NEWS ? ROUTES.YOUR_NEWS_LIST_VIEW : ROUTES.YOUR_SOCIAL_LIST_VIEW}
                            >
                                <ListItemAvatar
                                    className={classes.listitem_avatar}
                                    onClick={this.handleClick.bind(this, category.value)}
                                >
                                    <div>
                                        <Avatar
                                            className={classes.iconImg}
                                            alt={category.label}
                                            src={`/static/images/icons/${category.image}`}
                                        />
                                        <Avatar alt={'FeedsLogo'} src={'/static/images/icons/main.gif'} className={classes.feedslogo} />
                                    </div>
                                </ListItemAvatar>
                            </Link>
                            <ListItemText
                                id={index}
                                className={classes.listitem_text}
                                primary={<CategoryItemText label={category.label} summary={category.summary} />}
                                style={{ color: '#fff' }}
                            />
                            <ListItemSecondaryAction>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    className={classes.following}
                                    onClick={this.handleToggle(category.value)}
                                >
                                    {
                                        category.selected ? 'unfollow' : 'following'
                                    }
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <WaitingDialog open={this.props.isRequesting} />
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    mainType: state.uiState.mainType,
    categories: state.uiState.categories,
    activeCategory: state.uiState.activeCategory,
    sources: state.uiState.sources,
    isRequesting: state.uiState.isRequesting,
    scrollPos: state.uiState.scrollPos,
    articleNeeded: state.uiState.articleNeeded
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(YourLists));
