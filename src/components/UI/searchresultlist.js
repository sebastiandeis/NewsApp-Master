import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import SearchResultCard from './searchresultcard';


const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: "#000"
    },
    listitem: {
        padding: 0,
        margin: 0
    }
});

class SearchResultList extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        // window.addEventListener('scroll', this.listenToScroll)
        if (this.props.searchScrollPos === undefined) {
            return;
        }
        console.log("Search Scroll Pos", this.props.searchScrollPos);
        window.scrollTo(this.props.searchScrollPos.x, this.props.searchScrollPos.y);
    }

    componentWillUnmount() {
        // window.removeEventListener('scroll', this.listenToScroll);
    }

	handleClick = (id) => () => {
        this.props.selectSearchArticle(id);
        this.props.saveSearchScrollPos(window.scrollX, window.scrollY);
    };


    render() {
        const { 
            classes,
            searchResults
        } = this.props;

        // console.log("SearchResults", searchResults);
        if (searchResults === undefined || searchResults.length === 0) {
            return (<div></div>);
        }

        return (
            <div className={classes.root}>
                <List component="article-list" aria-label="article list">
                { searchResults.map((item, index) => (
                    <ListItem key={index} className={classes.listitem}>
                        <SearchResultCard article={item} 
                            handleClick={this.handleClick}
                        />
                    </ListItem>
                ))}
                </List>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    searchResults: state.uiState.searchResults,
    searchScrollPos: state.uiState.searchScrollPos
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SearchResultList));
