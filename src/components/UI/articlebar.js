import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Fab from '@material-ui/core/Fab';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ShareIcon from '@material-ui/icons/Share';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';

import * as ROUTES from '../../constants/routes';
import ShareDialog from './sharedialog';
import * as menu from '../../constants/menu'


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appbar: {
    position: 'fixed'
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
  fab: {
    margin: theme.spacing(1),
  },
  bookmark: {
    color: grey[50],
    backgroundColor: grey[700],
    marginRight: 10
  },
  summary: {
    color: grey[50],
    backgroundColor: blue[500],
    marginRight: 10
  },
  share: {
    color: grey[50],
    backgroundColor: purple[500]
  },
  account: {
    marginTop: 3
  },
  linkitem: {
    textDecoration: "none"
  }
});

class ArticleBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showShareDlg: false
    };

    this.clickShareButton = this.clickShareButton.bind(this);
    this.handleShareClose = this.handleShareClose.bind(this);
  }

  componentDidMount() {
    this.props.needGetArticles(false);
  }

  componentWillUnmount() {
    this.props.needGetArticles(true);
  }

  clickShareButton() {
    this.setState({
      showShareDlg: true
    });
  }

  handleShareClose() {
    this.setState({
      showShareDlg: false
    });
  };

  render() {
    const {
      classes,
      title,
      mainType,
      selectedArticle
    } = this.props;

    const { showShareDlg } = this.state;

    var shareUrl = "";
    if (typeof window !== 'undefined') {
      shareUrl = window.location.protocol + '//' + window.location.host;
    }    

    var articleTitle = selectedArticle.category + ' > ' + selectedArticle.source + ' > ';
    if (mainType === menu.NEWS) {
      articleTitle += selectedArticle.headline;
      shareUrl += '/news/' + selectedArticle.nid; 
    } else if (mainType === menu.REDDIT) {
      articleTitle += selectedArticle.title;
      shareUrl += '/reddit/' + selectedArticle.rid;
    }
    console.log("ArticleBar share url", shareUrl);
    
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Link className={classes.linkitem} to={ROUTES.LANDING}>
              <IconButton edge="start" className={classes.navbefore} aria-label="nav before">
                <ArrowBackIosIcon />
              </IconButton>
            </Link>
            <Typography className={classes.title} variant="h6" noWrap>
              {title}
            </Typography>
            <div className={classes.toolbox}>
              <Fab aria-label="bookmark" size="small" className={classes.bookmark}>
                <BookmarkBorderIcon />
              </Fab>
              <Fab aria-label="summary" color="secondary" size="small" className={classes.summary}>
                <TextFieldsIcon />
              </Fab>
              <Fab aria-label="share" color="primary" size="small" className={classes.share} onClick={this.clickShareButton}>
                <ShareIcon />
              </Fab>
            </div>
          </Toolbar>
        </AppBar>
        <ShareDialog 
          open={showShareDlg} 
          onClose={this.handleShareClose} 
          shareUrl={shareUrl}
          title={articleTitle}/>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  mainType: state.uiState.mainType,
  selectedArticle: state.uiState.selectedArticle
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ArticleBar));
