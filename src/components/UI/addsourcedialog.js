import React from 'react';
import classnames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import AvatarUpload from './avatarupload';
import CheckIcon from '../CustomIcons/checkicon';
import CloseIcon from '../CustomIcons/closeicon';
import AddIcon from '../CustomIcons/addicon';
import RssIcon from '../CustomIcons/rssicon';
import * as globalStyles from '../../constants/globalstyles';
import {
    TwitterIcon,
} from 'react-share';

const BootstrapInput = withStyles((theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '4px 26px 4px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    dialog: {
        width: '100%',
        '& .MuiPaper-root': {
            border: 'solid 1px',
            borderColor: grey[500],
            margin: '16px',
            width: '100%',
            backgroundColor: '#000',
        }
    },
    dialogContainer: {

    },
    dialogHeader: {
        minHeight: 56,
    },
    dialogActionBtns: {
        position: 'absolute',
        top: 6,
        right: 6,
    },
    dialogHeaderTitle: {
        ...globalStyles.TITLE_MID,
    },
    sourceItem: {
        padding: '6px 6px 4px 6px',
        backgroundColor: grey[900],
        borderRadius: '5px',
    },
    avatar: {
        height: 80,
        width: 80
    },
    cameraIcon: {
        height: 24,
        width: 30,
        backgroundColor: '#fff',
        color: '#000',
        justifyContent: 'center',
        display: 'flex',
        textAlign: 'center',
        borderRadius: '5px',
        position: 'absolute',
        marginTop: -30,
        marginLeft: 50,
        borderColor: grey[500],
        border: 'solid 1px'
    },
    sourceInfo: {
        paddingLeft: 20,
        width: '100%'
    },
    sourceName: {
        width: '100%',
        backgroundColor: grey[900],
        padding: 0,
        border: 0,
        fontSize: '1rem',
        color: '#fff',
        '&:focus': {
            outline: '0px',
        },
        '&::placeholder': {
            color: '#fff'
        },
        '&::-webkit-input-placeholder': {
            color: '#fff'
        },
        '&:-ms-input-placeholder': {
            color: '#fff'
        }
    },
    description: {
        width: '100%',
        height: 50,
        backgroundColor: grey[900],
        color: grey[500],
        border: 0,
        fontSize: 14,
        padding: 0,
        fontFamily: 'Roboto',
        '&:focus': {
            outline: '0px',
        }
    },
    countryContainer: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    countrySelect: {
        backgroundColor: grey[900],
        color: grey[500]
    },
    addSourceItemInput: {
        flex: 1,
        margin: '2px 0 2px 0',
        padding: '0 16px 0 16px',
        backgroundColor: '#000',
        '& input': {
            fontSize: 12,
            backgroundColor: '#000',
        }
    },
    iconButton: {
        padding: 4,
    },
    addSourceItem: {
        backgroundColor: grey[900],
        marginTop: 8,
    },
    addSourceBlankItem: {
        backgroundColor: grey[900],
        marginTop: 8,
    },
    addSourceBlankItemTxt: {
        fontSize: 12,
        color: grey[500],
        alignItems: 'center',
        display: 'flex'
    },
    addChildSocialItem: {
        marginLeft: 20,
        marginRight: 54,
        paddingRight: 2,
    },
    selectControl: {
        '& svg': {
            color: '#fff',
        }
    }
});

class AddSourceDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: 0,
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    handleSelectChange = (e) => {
        this.setState({
            country: e.target.value,
        })
    }

    render() {
        const { country } = this.state;
        const { classes, ...other } = this.props;

        return (
            <div className={classes.root}>
                <Dialog className={classes.dialog} fullWidth={true} position={'absolute'} onClose={this.handleClose} aria-labelledby="add-dialog-title" {...other}>
                    <Box m={1} className={classes.dialogContainer}>
                        <Box className={classes.dialogHeader} textAlign="center">
                            <Box>
                                <Typography>Add a Source</Typography>
                            </Box>
                            <Box className={classes.dialogActionBtns}>
                                <IconButton className={classes.iconButton}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton className={classes.iconButton}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box className={classes.dialogContent}>
                            <Box display="flex" className={classes.sourceItem}>
                                <AvatarUpload />
                                <Box className={classes.sourceInfo}>
                                    <input placeholder="Name" className={classes.sourceName} />
                                    <textarea
                                        placeholder="Descripton"
                                        className={classes.description}
                                    />
                                </Box>
                            </Box>
                            <Box className={classes.countryContainer}>
                                <FormControl className={classes.selectControl}>
                                    <Select
                                        value={country}
                                        onChange={this.handleSelectChange}
                                        input={<BootstrapInput name="country" id="age-customized-select" />}
                                        className={classes.select}
                                    >
                                        <MenuItem value={0}>
                                            <em>Country...</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Serbia</MenuItem>
                                        <MenuItem value={20}>Russia</MenuItem>
                                        <MenuItem value={30}>China</MenuItem>
                                        <MenuItem value={30}>Japan</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <Box>
                                    <Box display={'flex'} className={classes.addSourceItem}>
                                        <IconButton className={classes.iconButton}>
                                            <AddIcon />
                                        </IconButton>
                                        <InputBase
                                            className={classes.addSourceItemInput}
                                            placeholder="Website Url"
                                            inputProps={{ 'aria-label': 'Website Url' }}
                                        />
                                        <IconButton className={classes.iconButton}>
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton className={classes.iconButton}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                    <Box display={'flex'} className={classnames(classes.addChildSocialItem, classes.addSourceItem)}>
                                        <IconButton className={classes.iconButton}>
                                            <TwitterIcon
                                                size={24}
                                                iconBgStyle={{ fill: 'transparent' }}
                                            />
                                        </IconButton>
                                        <InputBase
                                            className={classes.addSourceItemInput}
                                            placeholder="Website Url"
                                            inputProps={{ 'aria-label': 'Website Url' }}
                                        />
                                    </Box>
                                    <Box display={'flex'} className={classnames(classes.addChildSocialItem, classes.addSourceItem)}>
                                        <IconButton className={classes.iconButton}>
                                            <RssIcon />
                                        </IconButton>
                                        <InputBase
                                            className={classes.addSourceItemInput}
                                            placeholder="Website Url"
                                            inputProps={{ 'aria-label': 'Website Url' }}
                                        />
                                    </Box>
                                </Box>
                                <Box display={'flex'} className={classes.addSourceBlankItem}>
                                    <IconButton className={classes.iconButton}>
                                        <AddIcon />
                                    </IconButton>
                                    <Typography className={classes.addSourceBlankItemTxt}>
                                        Link a social media account or website
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(AddSourceDialog);