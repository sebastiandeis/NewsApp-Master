import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';

import CategoryMenu from './categorymenu';
import SourceMenu from './sourceMenu';
import CategoryTab from './categorytab';
import * as CATEGORY from '../../constants/category';
import * as NEWS_COUNTRY from '../../constants/state';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3, color: '#FFF' }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const styles = {
    root: {
        flexGrow: 1,
        width: '100%'
    },
    appbar: {
        position: 'inherit',
    },
    toolbar: {
        flexGrow: 1,
        width: '100% - 20',
        height: 124,
        minHeight: 24,
        paddingLeft: 10,
        paddingRight: 30,
        position: 'inherit'
    },
    tabs: {
        flexGrow: 1,
        margin: 0,
        width: '100% - 40',
        height: 124,
        minHeight: 24,
        variant: 'fullWidth',
        scrollButtons: 'on'
    },
    tab: {
        // marginLeft: 5,
        marginRight: 5,
        padding: 0,
        fontFamily: 'Arial',
        fontSize: 16,
        backgroundColor: '#000',
        textTransform: 'inherit',
        width: 90,
        minHeight: 24,
        minWidth: 24,
        indicator: 5
    },
    fab: {
        flexGrow: 1,
        position: 'absolute',
        right: 5,
        width: 20,
        height: 20,
        minHeight: 20,
        display: 'inline'
    },
    removeIndicator: {
        height: 0,
    }
};

const tabLabelStyle = {
    textAlign: 'center',
    fontSize: '12px',
    width: '80%',
    lineHeight: '12px',
    height: '24px',
    // wordBreak: 'break-all',
}


class CategoryBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // value: 0,
            categoryMenu: false,
            sourceMenu: false,
            anchorEl: null,
            anchorPos: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCategoryMenuOpen = this.handleCategoryMenuOpen.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleSourceMenuOpen = this.handleSourceMenuOpen.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);

        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
    }

    componentDidMount() {
        if (this.props.articleNeeded) {
            // all category
            if (this.props.activeCategory === CATEGORY.NEWS_ALL) {
                this.props.getNewsFirstPage();
                return;
            }
            if (this.props.activeCategory === CATEGORY.REDDIT_ALL) {
                this.props.getRedditFirstPage();
                return;
            }
             
            // category
            var activeSources = this.props.sources.filter(item => item.category === this.props.activeCategory);
            if (activeSources && activeSources.length > 0) {
                this.props.getArticles(this.props.mainType, this.props.activeCategory, activeSources);
            }
        }
    }

    handleChange(event, newValue) {
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

        this.setState({
            ...this.state,
            anchorPos: event.currentTarget
        });
    }

    handleCategoryMenuOpen(event) {
        this.setState({
            ...this.state,
            categoryMenu: true,
            sourceMenu: false,
            anchorEl: event.currentTarget
        });
        this.props.needGetArticles(false);
    }

    handleMenuClose() {
        this.props.needGetArticles(true);
        this.setState({
            ...this.state,
            categoryMenu: false,
            sourceMenu: false,
            anchorEl: null
        });

        // get articles and update
        const { 
            mainType,
            activeCategory,
            sources
        } = this.props;

        var activeSources = sources.filter(item => item.category === activeCategory);
        if (activeSources.length === 0) {
            return;
        }
        this.props.getArticles(mainType, activeCategory, activeSources);
    }

    handleTabClick(event) {
        this.setState({
            ...this.state,
            anchorPos: event.currentTarget
        });
    }    

    handleButtonPress() {
        this.buttonPressTimer = setTimeout(this.handleSourceMenuOpen, 500);
    }

    handleButtonRelease() {
        clearTimeout(this.buttonPressTimer);
    }

    handleSourceMenuOpen() {
        // const msg = 'long press activated : ' + this.state.value;
        // alert(msg);
        var anchor = this.state.anchorPos;
        this.setState({
            ...this.state,
            categoryMenu: false,
            sourceMenu: true,
            anchorEl: anchor
        });
        this.props.needGetArticles(false);
    }

    render() {
        const { 
            classes,
            mainType,
            categories,
            activeCategory
        } = this.props;

        const {
            // value,
            categoryMenu,
            sourceMenu,
            anchorEl
        } = this.state;

        var tabValue = activeCategory;

        var allCategories = categories.filter(category => category.type === mainType);
        if (allCategories.length === 0) {
            return (
                <div>
                </div>
            );
        }
        var selectedCategories = allCategories.filter(category => category.selected === true);
        if (activeCategory === -1) {
            tabValue = selectedCategories[0].value;
        }

        const TabLabel = (props) => {
            return (
                <div className={'tabLabel'} style={tabLabelStyle}>
                    <span style={{ wordBreak: 'break-all' }}>
                        {props.label.split(' ')[0]}
                    </span>
                    <br />
                    {
                        props.label.split(' ')[1] && 
                        <span style={{ wordBreak: 'break-all' }}>
                            {props.label.split(' ')[1]}
                        </span>
                    }
                </div>
            )
        }

        return (
            <div className={classes.root}>
                <AppBar className={classes.appbar} >
                    <Toolbar className={classes.toolbar}>
                        <Tabs
                            className={classes.tabs}
                            ref="CategoryTabs"
                            classes={{ indicator: classes.removeIndicator }}
                            value={tabValue}
                            onChange={this.handleChange}
                            onClick={this.handleTabClick}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            {selectedCategories.length > 0 &&
                                selectedCategories.map((category, index) => (
                                    <Tab
                                        key={index}
                                        className={classes.tab}
                                        icon={<CategoryTab categoryImg={category.image} selectedCategory={tabValue === category.value ? true : false} />}
                                        value={category.value}
                                        label={<TabLabel label={category.label} />}
                                        onTouchStart={this.handleButtonPress}
                                        onTouchEnd={this.handleButtonRelease}
                                        onMouseDown={this.handleButtonPress}
                                        onMouseUp={this.handleButtonRelease}
                                        onMouseLeave={this.handleButtonRelease}
                                    />
                                ))}
                        </Tabs>
                        <Fab
                            className={classes.fab}
                            color="primary"
                            edge="end"
                            aria-label="MoreVert"
                            onClick={this.handleCategoryMenuOpen}>
                            <MoreVertIcon fontSize="small" />
                        </Fab>
                    </Toolbar>
                </AppBar>
                <Menu
                    id="category-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={categoryMenu}
                    onClose={this.handleMenuClose}
                >
                    <CategoryMenu />
                </Menu>
                <Menu
                    id="source-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={sourceMenu}
                    onClose={this.handleMenuClose}
                >
                    <SourceMenu categoryValue={tabValue} />
                </Menu>
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
    articleNeeded: state.uiState.articleNeeded
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CategoryBar));
