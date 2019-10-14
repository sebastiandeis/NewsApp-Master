import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import * as MENU from '../../constants/menu';
import * as CATEGORY from '../../constants/category';
import * as NEWSTYPE from '../../constants/newstype';
import * as ROUTES from '../../constants/routes';

import NewsCard from './newscard';
import RedditCard from './redditcard';
import WaitingDialog from './waitingdlg';


const styles = theme => ({
    root: {
        width: '100%',
        // maxWidth: 480,
        backgroundColor: "#000",
    },
    listitem: {
        padding: 0,
        margin: 0
    },
    linkitem: {
        textDecoration: "none"
    }
});

class ArticleList extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
        window.scrollTo(this.props.scrollPos.x, this.props.scrollPos.y);
    }

    componentDidUpdate() {
        window.scrollTo(this.props.scrollPos.x, this.props.scrollPos.y);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll);
    }


	handleClick = (id) => () => {
        this.props.selectArticle(id);
        this.props.saveScrollPos(window.scrollX, window.scrollY);
    };

    handleGroupId = (nid) => () =>  {
        this.props.getNewsArticle(nid);
        this.props.saveScrollPos(window.scrollX, window.scrollY);
    }    

    listenToScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const scrolled = winScroll / height;
        // console.log("scroll pos, ", window.scrollX, window.scrollY);

        if (scrolled === 0) {
            this.props.handleShowTopNavbar(true);
        } else if (scrolled === 1) {
            this.props.saveScrollPos(window.scrollX, window.scrollY);
            if (this.props.activeCategory === CATEGORY.NEWS_ALL) {
                this.props.getNewsNextPage(this.props.selectedLastId);
            } else if (this.props.activeCategory === CATEGORY.REDDIT_ALL) {
                this.props.getRedditNextPage(this.props.selectedLastId);
            } else {
                this.props.handleShowBottomNavbar(false);
            }
        } else {
            this.props.handleShowTopNavbar(false);
            if (this.props.activeCategory !== CATEGORY.NEWS_ALL && this.props.activeCategory !== CATEGORY.REDDIT_ALL) {
                this.props.handleShowBottomNavbar(true);
            }
        }
    }

    render() {
        const { 
            classes,
            mainType,
            sources,
            selectedArticles
        } = this.props;

        function getSource(name, newsType) {
            let newstype = NEWSTYPE.NEWS_TYPE_BREAKING;
            if (newsType === "Breaking") {
                newstype = NEWSTYPE.NEWS_TYPE_BREAKING;
            } else if (newsType === "Opinion") {
                newstype = NEWSTYPE.NEWS_TYPE_OPINION;
            }
    
            let source = sources.find(item => item.label === name &&
                item.type === newstype);
            if (source) {
                return source;
            }
            return null;
        } 

        function checkValid(item) {
            let source = getSource(item.source, item.type);
            if (source === null) {
                console.log("Failed to check source", item.source, item.type);
                return false;
            }

            if (source.translation !== null) {
                if (item.translated === false) {
                    return false;
                }
                if (item.tr_headline === "" || (item.tr_summary === "" && item.tr_text === "")) {
                    return false;
                }
            }
            return true;
        }

        if (selectedArticles === undefined) {
            return (<div></div>);
        }

        var newsArticles = [];
        if (mainType === MENU.NEWS) {
            newsArticles = selectedArticles.filter(checkValid);
        };

        return (
            <div className={classes.root}>
                <List component="article-list" aria-label="article list">
                { mainType === MENU.NEWS && newsArticles.map((item, newsArticlesKey) => (
                    <ListItem className={classes.listitem} key={newsArticlesKey + 'newsArticle'}>
                        <NewsCard article={item}
                            handleClick={this.handleClick}
                            handleGroupId={this.handleGroupId}/>
                    </ListItem>
                ))}
                { mainType === MENU.REDDIT && selectedArticles.map((item, selectedArticlesKey) => (
                    <ListItem className={classes.listitem} key={selectedArticlesKey + 'selectedArticle'}>
                        <Link className={classes.linkitem} to={ROUTES.REDDIT}>
                            <div onClick={this.handleClick(item.rid)}>
                                <RedditCard article={item} />
                            </div>
                        </Link>
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
    activeCategory: state.uiState.activeCategory,
    sources: state.uiState.sources,
    selectedArticles: state.uiState.selectedArticles,
    isRequesting: state.uiState.isRequesting,
    scrollPos: state.uiState.scrollPos,
    selectedLastId: state.uiState.selectedLastId
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ArticleList));
