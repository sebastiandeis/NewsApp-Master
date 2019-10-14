import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grid: {
		justifyContent: 'center',
		flexWrap: 'inherit',
	},
	iconImg: {
		height: 90,
        width: 90,
        opacity: 0.5,
    },
    feedslogo: {
        height: 24,
        width: 24,
        position: 'absolute',
        left: '0'
    }
});

class CategoryTab extends React.Component {
	render() {
		const { classes, categoryImg, selectedCategory, feedsLogo } = this.props;
        const mainFeedImg =`/static/images/icons/${categoryImg || 'west_europe.png'}`; 
        const logo = `/static/images/icons/${feedsLogo || 'main.gif'}`;

		return (
			<div className={classes.root}>
				<Grid container className={classes.grid}>
                    <img className={classes.iconImg} src={mainFeedImg} style={{ opacity: !!selectedCategory && 1 }} alt='Category' />
                    <Avatar alt={'FeedsLogo'} src={logo} className={classes.feedslogo} />
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	mainFeedsType: state.uiState.mainFeedsType,
})

export default connect(mapStateToProps)(withStyles(styles)(CategoryTab))
