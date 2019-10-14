import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const styles = theme => ({
    imgIcon: {
        height: '100%',
        width: 'auto',
    },
});

const useStyles = makeStyles({
    height: {
        height: props => props.height,
    },
    width: {
        width: props => props.width,
    },
    padding: {
        padding: props => props.padding,
    }
});

const CustomImgIcon = (props) => {
    const { classes, imgSrc, width, height, padding } = props;
    const customStyle = { width: width, height: height, padding: padding };
    const propsClasses = useStyles(customStyle);
    return (
        <Box className={`${propsClasses.height} ${propsClasses.width} ${propsClasses.padding}`}>
            {
                imgSrc &&
                <img 
                    src={imgSrc} 
                    alt={`Custom Img Icon`} 
                    className={classes.imgIcon}    
                />
            }
        </Box>
    )
};
export default withStyles(styles)(CustomImgIcon);