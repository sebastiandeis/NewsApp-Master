import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import grey from '@material-ui/core/colors/grey';

import SearchResultList from '../UI/searchresultlist';
import WaitingDialog from '../UI/waitingdlg';

import * as ROUTES from '../../constants/routes';
import { searchIndex } from '../../search/search';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	header: {
		width: '100%',
		height: 56
	},
	appbar: {
		position: 'fixed'
	},
	toolbox: {
		display: 'flex'
	},
	fab: {
		margin: theme.spacing(1)
	},
	close: {
		color: grey[50],
		backgroundColor: '#000',
	},
	linkitem: {
		textDecoration: "none"
	},
	title: {
		flexGrow: 1,
		position: 'relative',
		marginTop: 0
	},
});

class SearchResultPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: true
		}

		this.handleClose = this.handleClose.bind(this);
	}

	componentDidMount() {
		console.log("SearchResultPage!");
		this.props.dataRequestPending();
		searchIndex.search({
			query: this.props.searchKey
		},
			(err, { hits } = {}) => {
				if (err) {
					console.log("Failed to get Search results.", err);
					this.props.dataRequestFailed("Failed to get Search results.");
					return;
				};

				// console.log(hits);
				this.props.updateSearchResult(hits);
				this.props.dataRequestSuccess();
			}
		);
	}

	handleClose() {
		this.setState({
			open: false
		});
	}

	render() {
		const { classes, searchKey } = this.props;

		var title = 'Search results for ' + searchKey;

		return (
			<Paper>
				<div className={classes.root}>
					<div className={classes.header}>
						<div className={classes.root}>
							<AppBar className={classes.appbar}>
								<Toolbar>
									<Typography className={classes.title} variant="h6" noWrap>
										{title}
									</Typography>
									<div className={classes.toolbox}>
										<Link className={classes.linkitem} to={ROUTES.LANDING}>
											<Fab aria-label="close" size="small" className={classes.close} onClick={this.handleClose}>
												<CloseIcon />
											</Fab>
										</Link>
									</div>
								</Toolbar>
							</AppBar>
						</div>
					</div>
				</div>
				<SearchResultList />
				<WaitingDialog open={this.props.isRequesting} />
				</Paper>
		);
	}
}

const mapStateToProps = (state) => ({
	authUser: state.sessionState.authUser,
	searchKey: state.uiState.searchKey,
	isRequesting: state.uiState.isRequesting
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(SearchResultPage));
