import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import grey from '@material-ui/core/colors/grey';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Zoom from '@material-ui/core/Zoom';

const styles = {
	root: {
		width: '100%',
		color: '#fff',
		'& li': {
			marginLeft: 12,
			marginRight: 12,
			backgroundColor: grey[900],
			marginTop: 16,
			borderRadius: 3
		}
	},
	title: {
		flexGrow: 1,
		marginTop: 10,
		marginBottom: 10,
		padding: 5,
		fontFamily: 'Arial',
		fontSize: 16,
		fontWeight: 500,
		color: '#FFF',
	},
	avatar: {
		margin: 0,
		width: 24,
		height: 24
	},
	listItem: {
		paddingLeft: 0,
	},
	listItemTxt: {
		height: 80,
	},
	list_avatar: {
		minWidth: 36
	},
	iconImg: {
		height: 100,
		width: 100,
		marginRight: 15,
		marginLeft: 4,
		borderRadius: 20,
	},
	checkboxPanel: {
		position: 'absolute',
		top: -3,
		marginLeft: -8,
		zIndex: 1,
	},
	customCheckbox: {
		height: 16,
		width: 16,
	},
	checkboxIcon: {
		backgroundColor: '#fff',
		height: 16,
		width: 16,
		borderRadius: 0,
		marginRight: 3
	},
	triangleBox: {
		position: 'absolute',
		top: 0,
		zIndex: 0
	},
	triangleIconImg: {
		width: 50,
		height: 50,
		marginLeft: -16,
		marginTop: -16,
	},
	listItemIdx: {
		fontStyle: 'italic',
		marginTop: -30,
		marginLeft: 10
	}
};

class SourcesList extends React.Component {
	constructor(props) {
		super(props);

		this.handleToggle = this.handleToggle.bind(this);
		this.state = {
			checkBoxes: []
		}
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

	handleToggle = (value) => () => {
		this.props.toggleSourceStatus(value);
	};

	listenToScroll = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

		const scrolled = winScroll / height;

		if (scrolled === 0) {
			this.props.handleShowTopNavbar(true);
		} else {
			this.props.handleShowTopNavbar(false);
		}
	}

	handleCheckBox = index => () => {
		const { checkBoxes } = this.state;
		if (checkBoxes[index] === undefined || checkBoxes[index] === false) {
			checkBoxes[index] = true;
		} else {
			checkBoxes[index] = false;
		}
		this.setState({ checkBoxes });
		this.props.saveScrollPos(window.scrollX, window.scrollY);
	}

	render() {
		const {
			classes,
			categories,
			categoryValue,
			sources
		} = this.props;
		const { checkBoxes } = this.state;
		var allSources = sources.filter(source => source.category === categoryValue);
		if (allSources.length === 0) {
			console.log("Unknown error!");
			return (<div></div>);
		}

		var category = null;
		for (let item of categories) {
			if (item.value === categoryValue) {
				category = item;
				break;
			}
		}

		if (category === null) {
			console.log("Unknown error!");
			return (<div></div>);
		}

		const SourceItemText = ({ label, summary }) => {
			return (
				<div className={'sourceitemtext'}>
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
				<List dense className={classes.root}>
					{allSources.map((source, index) => (
						<ListItem key={source.value} button className={classes.listItem}>
							<ListItemAvatar className={classes.list_avatar}>
								<div>
									<Avatar
										className={classes.iconImg}
										alt={source.label}
										src={`${source.image ? source.image : '/static/images/icons/greater_china.png'}`}
									/>
									<Box className={classes.checkboxPanel}>
										<Zoom 
											in={checkBoxes[index] === undefined ? false : checkBoxes[index]} 
											style={{ transitionDelay: checkBoxes[index] ? '500ms' : '0ms' }}
										>
											<Checkbox
												className={classes.customCheckbox}
												edge="end"
												onChange={this.handleToggle(source.value)}
												checked={source.selected}
												checkedIcon={
													<SvgIcon className={classes.checkboxIcon}>
														<path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z" />
													</SvgIcon>
												}
											/>
										</Zoom>
										<Zoom 
											in={checkBoxes[index] === undefined ? true : !checkBoxes[index]}
											style={{ transitionDelay: !checkBoxes[index] ? '500ms' : '0ms' }}
										>
											<Typography className={classes.listItemIdx}>
												{index + 1}
											</Typography>
										</Zoom>
									</Box>
									<Box className={classes.triangleBox}>
										<img className={classes.triangleIconImg} src={'/static/images/icons/triangle_black.png'} alt={'Triangle'} />
									</Box>
								</div>
							</ListItemAvatar>
							<ListItemText
								className={classes.listItemTxt}
								primary={<SourceItemText label={source.label} summary={'Beijing based, the more radical'} />}
							/>
							<ListItemSecondaryAction
								onClick={this.handleCheckBox(index)}
							>
								<Typography>
									<ArrowDropUp />
								</Typography>
								<Typography style={{ fontSize: '0.8rem' }}>
									456
								</Typography>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
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
	articleNeeded: state.uiState.articleNeeded,
	scrollPos: state.uiState.scrollPos,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(SourcesList));
