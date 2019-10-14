import React from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import grey from '@material-ui/core/colors/grey'

import MainTitleBtn from './maintitlebtn'
import MainMenu from './mainmenu'
import ProfileMenu from './profilemenu'
import * as MENU from '../../constants/menu'
import * as CATEGORY from '../../constants/category'
import * as globalStyles from '../../constants/globalstyles'

const styles = {
  root: {
    flexGrow: 1
  },
  appbar: {
    position: 'fixed',
    borderBottom: `solid 1px ${globalStyles.DARK_GREY}`,
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    margin: 0,
    width: 32,
    height: 32
  },
  avatarBtn: {
    height: 32,
    width: 32,
    '& img': {
      width: 'auto',
      height: 18,
      objectFit: 'contain',
    }
  },
  avatarOpacity: {
    '& img': {
      opacity: 0.4,
    }
  },
  account: {
    marginTop: 3
  },
  mainBtnGroup: {
    flexGrow: 1
  },
  noPadding: {
    padding: 0
  },
  userMenuAvatar: {
    padding: 0
  },
  listItemText: {
    '& span': {
      fontSize: '1.25rem',
    }
  },
  listItemTextSmall: {
    fontSize: '0.825rem !important',
  },
  divider: {
    backgroundColor: grey[500]
  }
}

class MainAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mainMenu: false,
      profileMenu: false,
      signinMenu: false,
      anchorEl: null
    }

    this.handleMainMenuOpen = this.handleMainMenuOpen.bind(this)
    this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.handleMainMenuSelect = this.handleMainMenuSelect.bind(this)
    this.handleProfileMenuItem = this.handleProfileMenuItem.bind(this)
    this.handleSignInMenuOpen = this.handleSignInMenuOpen.bind(this)
  }

  handleProfileMenuOpen(event) {
    this.setState({
      ...this.state,
      mainMenu: false,
      profileMenu: true,
      anchorEl: event.currentTarget
    })
  }

  handleMainMenuOpen(event) {
    this.setState({
      ...this.state,
      mainMenu: true,
      profileMenu: false,
      anchorEl: event.currentTarget
    })
  }

  handleSignInMenuOpen(event) {
    this.setState({
      ...this.state,
      mainMenu: false,
      profileProfileMenu: false,
      signinMenu: true,
      anchorEl: event.currentTarget,
    })
  }

  handleMenuClose() {
    this.setState({
      ...this.state,
      mainMenu: false,
      profileMenu: false,
      signinMenu: false,
      anchorEl: null
    })
  }

  handleProfileMenuItem = path => e => {
    this.props.history.push(path);
    this.handleMenuClose()
  }

  handleMainMenuSelect = menuvalue => e => {
    this.props.selectMainType(menuvalue)

    if (menuvalue === MENU.NEWS) {
      this.props.changeCategory(CATEGORY.NEWS_ALL)
      this.props.initScrollPos()
      this.props.getNewsFirstPage()
    } else if (menuvalue === MENU.REDDIT) {
      this.props.changeCategory(CATEGORY.REDDIT_ALL)
      this.props.initScrollPos()
      this.props.getRedditFirstPage()
    }

    // // get active category
    // var mainCategories = this.props.categories.filter(category => category.type === menuvalue && category.selected);
    // if (mainCategories.length === 0) {
    //   return;
    // }
    // var activeCategory = mainCategories[0].value;

    // // get sources to display
    // var activeSources = this.props.sources.filter(item => item.category === activeCategory);
    // if (activeSources.length > 0) {
    //   this.props.getArticles(menuvalue, activeCategory, activeSources);
    //   this.props.initScrollPos();
    // }

    this.setState({
      mainMenu: false,
      profileMenu: false,
      anchorEl: null
    })
  }

  handleMainFeedsMenu(mainFeedsType) {
    this.props.selectMainFeedsType(mainFeedsType);
  }

  handleSigninMenu = () => {
    console.log(this.props.history)
    this.props.history.push('/signin');
  }

  render() {
    const { classes, mainType, mainFeedsType, show, authUser, currentUser } = this.props
    const avatarUrl = '/static/images/avatars/avatar1.png';

    return (
      <div className={classes.root}>
        {show && (
          <AppBar className={classes.appbar}>
            <Toolbar>
              <Avatar
                alt={'NewsRaven'}
                src={'/static/images/main.gif'}
                className={classes.avatar}
              />
              <div className={classes.mainBtnGroup}>
                <MainTitleBtn
                  maintype={mainType}
                  onClick={this.handleMainMenuOpen}
                />
                <IconButton
                  className={classNames(classes.account, classes.noPadding)}
                  aria-label={'Socials'}
                  onClick={this.handleMainFeedsMenu.bind(this, MENU.SOCIAL_FEEDS)}
                  color="inherit"
                >
                  <Avatar
                    alt={'SocialBtn'}
                    src={'/static/images/icons/members.gif'}
                    className={classNames(classes.avatarBtn, mainFeedsType === MENU.NEWS_FEEDS && classes.avatarOpacity)}
                  />
                </IconButton>
                <IconButton
                  className={classNames(classes.account, classes.noPadding)}
                  aria-label={'News'}
                  onClick={this.handleMainFeedsMenu.bind(this, MENU.NEWS_FEEDS)}
                  color="inherit"
                >
                  <Avatar
                    alt={'NewsBtn'}
                    src={'/static/images/icons/newspaper2.gif'}
                    className={classNames(classes.avatarBtn, mainFeedsType === MENU.SOCIAL_FEEDS && classes.avatarOpacity)}
                  />
                </IconButton>
              </div>
              {
                (authUser) ?
                  <IconButton
                    className={classes.account}
                    edge="end"
                    aria-owns={
                      this.state.profileMenu
                        ? 'material-appbar'
                        : undefined
                    }
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    {
                      avatarUrl ?
                        <Avatar
                          alt={'UserAvatar'}
                          src={(currentUser && currentUser.avatar) || '/static/images/avatars/blank_avatar.png'}
                          className={classes.avatar}
                        /> :
                        <AccountCircle className={classes.avatar} />
                    }
                  </IconButton> :
                  <IconButton
                    className={classes.account}
                    edge="end"
                    aria-owns={
                      this.state.signinMenu
                        ? 'material-appbar'
                        : undefined
                    }
                    aria-haspopup="true"
                    onClick={this.handleSignInMenuOpen}
                    color="inherit"
                  >
                    <MoreVertIcon />
                  </IconButton>
              }
            </Toolbar>
          </AppBar>
        )}

        <Menu
          id="main-menu"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.mainMenu}
          onClose={this.handleMenuClose}
        >
          <MainMenu onSelected={this.handleMainMenuSelect} />
        </Menu>
        <Menu
          id="profile-menu"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.profileMenu}
          onClose={this.handleMenuClose}
        >
          <ProfileMenu onClosed={this.handleMenuClose} onSelected={this.handleProfileMenuItem} />
        </Menu>
        <Menu
          id="signin-menu"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.signinMenu}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleSigninMenu} >
            Sign In
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  currentUser: state.userState.currentUser,
  mainType: state.uiState.mainType,
  mainFeedsType: state.uiState.mainFeedsType,
  categories: state.uiState.categories,
  sources: state.uiState.sources
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(MainAppBar)))
