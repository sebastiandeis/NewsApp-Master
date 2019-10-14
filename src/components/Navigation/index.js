import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import SignOutButton from '../SignOut'
import * as routes from '../../constants/routes'
import MainAppBar from '../UI/mainappbar'
import CategoryBar from '../UI/categorybar'
import ArticleBar from '../UI/articlebar'

const styles = {
    root: {
        flexGrow: 1
    },
    mainbar: {
        width: '100%',
        height: 112
    },
    articlebar: {
        width: '100%',
        height: 56
    }
}

class Navigation extends React.Component {
    render() {
        const NavigationAuth = () => (
            <ul>
                <li>
                    <Link to={routes.LANDING}>Landing</Link>
                </li>
                <li>
                    <Link to={routes.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={routes.ACCOUNT}>Account</Link>
                </li>
                <li>
                    <SignOutButton />
                </li>
            </ul>
        )

        const NavigationNonAuth = () => (
            <ul>
                <li>
                    <Link to={routes.LANDING}>Landing</Link>
                </li>
                <li>
                    <Link to={routes.SIGN_IN}>Sign In</Link>
                </li>
            </ul>
        )

        const { classes, authUser, isArticleView } = this.props

        return (
            <div className={classes.root}>
                {!isArticleView ? (
                    <div className={classes.mainbar}>
                        <MainAppBar />
                        <CategoryBar />
                    </div>
                ) : (
                    <div className={classes.articlebar}>
                        <ArticleBar />
                    </div>
                )}
                {/* { authUser
          ? <NavigationAuth />
          : <NavigationNonAuth />
      } */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    isArticleView: state.uiState.isArticleView
})

export default connect(mapStateToProps)(withStyles(styles)(Navigation))
