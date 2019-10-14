import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';

import MainAppBar from '../UI/mainappbar'
import CategoryBar from '../UI/categorybar'
import SearchBar from '../UI/searchbar'
import ArticleList from '../UI/articlelist'
import BottomNavBar from '../UI/bottomnavbar'
import MainFeedsTitlebar from '../UI/mainfeedstitlebar'
import HeaderActionBar from '../UI/headeractionbar'

import makeExpanding from '../Hoc/expanding-animation'
import * as markDown from '../../constants/markdown'
import * as MENU from '../../constants/menu'

const ExpandingSearchBox = makeExpanding(SearchBar);

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
		width: '100%',
		zIndex: 10,
		backgroundColor: '#000',
	},
	appbar: {
		position: 'relative',
		minHeight: 56,
	}
}

class ArticleListPage extends React.Component {

	render() {
		const { classes, showTopNavbar, showBottomNavbar, mainFeedsType } = this.props

		const positionStyle = {
			height: showTopNavbar ? 290 : 50,
			show: showTopNavbar,
			searchBarPositionTop: showTopNavbar ? 60 : 0,
			categoryBarPositionTop: showTopNavbar ? 105 : 30
		}

		return (
			<div className={classes.root}>
				<div className={classes.header} style={{ height: positionStyle.height }}>
					<div className={classes.headerUp}>
						<MainAppBar show={positionStyle.show} />
					</div>
					<div className={classes.headerDown} style={{ top: positionStyle.searchBarPositionTop }}>
						<AppBar className={classes.appbar}>
							<MainFeedsTitlebar
								mainTitle={mainFeedsType === MENU.NEWS_FEEDS ? markDown.NEWS_MAIN_TITLE : markDown.SOCIAL_MAIN_TITLE}
								summaryTitle={mainFeedsType === MENU.NEWS_FEEDS ? markDown.NEWS_SUMMARY_TITLE : markDown.SOCIAL_SUMMARY_TITLE}
							/>
							<ExpandingSearchBox positionTop={0} />
						</AppBar>
						<HeaderActionBar />
						<CategoryBar positionTop={positionStyle.categoryBarPositionTop} />
					</div>
				</div>
				{showBottomNavbar && <BottomNavBar />}
				<ArticleList />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	authUser: state.sessionState.authUser,
	showTopNavbar: state.uiState.showTopNavbar,
	showBottomNavbar: state.uiState.showBottomNavbar,
	mainFeedsType: state.uiState.mainFeedsType,
})

export default connect(mapStateToProps)(withStyles(styles)(ArticleListPage))
