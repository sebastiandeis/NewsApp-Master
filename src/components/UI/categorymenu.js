import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import {
	sortableContainer,
	sortableElement,
	sortableHandle,
} from 'react-sortable-hoc';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import grey from '@material-ui/core/colors/grey';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as MENU from '../../constants/menu';
import * as CATEGORY from '../../constants/category';


const styles = {
	root: {
		width: '100%',
		maxWidth: 300,
		backgroundColor: grey['900']
	},
	list_avatar: {
		minWidth: 36
	}
};

const DragHandle = sortableHandle(() => <Grid item xs={2}><MenuIcon style={{ color: grey['50'], marginLeft: 20 }} /></Grid>
);

const SortableItem = sortableElement(({ value, checked, onClick }) => (
	<Grid container alignItems="center" style={{ width: 300, maxWidth: 300, zIndex: 1500, backgroundColor: grey['900'] }}>
		<DragHandle />
		<Grid item xs={8}>
			<Typography style={{ color: grey['50'], textAlign: 'left' }}>{value}</Typography>
		</Grid>
		<Grid item xs={2}>
			<Checkbox
				edge="end"
				checked={checked}
				onClick={onClick}
			/>
		</Grid>
	</Grid>
));

const SortableContainer = sortableContainer(({ children }) => {
	return <Grid container spacing={1}>{children}</Grid>
});


class CategoryMenu extends React.Component {
	constructor(props) {
		super(props);

		this.handleToggle = this.handleToggle.bind(this);
		this.onSortEnd = this.onSortEnd.bind(this);
	}

	handleToggle = (value) => () => {
		this.props.toggleCategoryStatus(value);
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.props.changeCategoryOrder(oldIndex, newIndex);
	};
	
	render() {
		const {
			classes,
			mainType,
			categories
		} = this.props;

		var allCategories = [];
		if (mainType === MENU.NEWS) {
			allCategories = categories.filter(category => category.type === mainType && 
				category.value !== CATEGORY.NEWS_ALL);
		} else if (mainType === MENU.REDDIT) {
			allCategories = categories.filter(category => category.type === mainType && 
				category.value !== CATEGORY.REDDIT_ALL);
		}

		return (
			<div className={classes.root} >
				<SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
					{allCategories.map((category, index) => (
						<SortableItem 
							key={category.value} 
							index={index} 
							value={category.label}
							checked={category.selected}
							onClick={this.handleToggle(category.value)}>
						</SortableItem>
					))}
				</SortableContainer>
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
)(withStyles(styles)(CategoryMenu));

