import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import grey from '@material-ui/core/colors/grey';
import RemoveIcon from '@material-ui/icons/Remove';

import { websitelists } from '../../config/websitelists';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    addChildSocialItem: {
    },
    addprofileItemInput: {
        flex: 1,
        color: grey[500],
        margin: '2px 0 2px 0',
        padding: '0 16px 0 16px',
        backgroundColor: '#000',
        '& input': {
            fontSize: 12,
            backgroundColor: '#000',
        }
    },
    addprofileItem: {
        backgroundColor: grey[900],
        marginTop: 8,
    },
    iconButton: {
        padding: 4,
        color: '#fff'
    },
    socialIcon: {
        color: '#fff',
        margin: 2,
        fontSize: '1.25rem',
    },
});

class SocialDetectInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWebsite: {},
            websiteUrl: '',
        }
    }

    componentWillMount() {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }

    componentDidMount() {
        this.detectWebsite(this.props.websiteUrl || '')
    }

    componentDidUpdate(prevProps) {
        const { websiteUrl: prevUrl } = prevProps;
        const { websiteUrl } = this.props;
        if (websiteUrl !== prevUrl) {
            this.detectWebsite(websiteUrl)
        }
    }

    detectWebsite(str) {
        let currentWebsite;
        for (var i = 0; i < websitelists.length; i++) {
            var result = str.search(websitelists[i].detectName);
            if (result !== -1) {
                currentWebsite = websitelists[i];
                break;
            } else {
                currentWebsite = {}
            }
        }

        this.setState({
            currentWebsite,
            websiteUrl: str,
        })
    }

    handleChange = (e) => {
        const str = e.target.value;
        this.detectWebsite(str);
        this.props.handleChange(e);
    }

    render() {
        const { classes, handleRemoveSocialItem, itemName } = this.props;
        const { currentWebsite, websiteUrl } = this.state;
        return (
            <div className={classes.root}>
                <Box display={'flex'} className={classnames(classes.addChildSocialItem, classes.addprofileItem)}>
                    <IconButton className={classes.iconButton}>
                        <Icon className={clsx(classes.socialIcon, currentWebsite.iconName || '')} />
                    </IconButton>
                    <InputBase
                        name={currentWebsite.urlName || ''}
                        className={classes.addprofileItemInput}
                        placeholder="Social Url"
                        inputProps={{ 'aria-label': 'Website Url' }}
                        value={websiteUrl}
                        onChange={this.handleChange}
                    />
                    <IconButton
                        onClick={handleRemoveSocialItem(itemName)}
                        className={classes.iconButton}
                    >
                        <RemoveIcon />
                    </IconButton>
                </Box>
            </div>
        )
    }
}

export default withStyles(styles)(SocialDetectInput);
