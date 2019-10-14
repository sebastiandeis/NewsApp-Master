import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
    root: {
       color: '#fff'
    },
});

const AddIcon = (props) => {
    const { classes } = props;
    return (
        <SvgIcon className={classes.root}>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </SvgIcon>
    )
};
export default withStyles(styles)(AddIcon);