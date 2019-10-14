import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';

import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    LineShareButton,
    WeiboShareButton,
    PocketShareButton,
    InstapaperShareButton,

    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    OKIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    MailruIcon,
    EmailIcon,
    LivejournalIcon,
    ViberIcon,
    WorkplaceIcon,
    LineIcon,
    PocketIcon,
    InstapaperIcon,
} from 'react-share';

const styles = theme => ({
    share_item: {
        margin: 10
    }
});

class ShareDialog extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    render() {
        const { shareUrl, title, classes, ...other } = this.props;

        return (
            <Dialog position={'absolute'} top={100} left={50} onClose={this.handleClose} aria-labelledby="share-dialog-title" {...other}>
                <Grid container spacing={0}>
                    <Grid item className={classes.share_item}>
                        <FacebookShareButton
                            url={shareUrl}
                            quote={title}
                            className="Facebook_share-button">
                            <FacebookIcon
                                size={32}
                                round />
                        </FacebookShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <TwitterShareButton
                            url={shareUrl}
                            title={title}
                            className="Twitter_share-button">
                            <TwitterIcon
                                size={32}
                                round />
                        </TwitterShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <TelegramShareButton
                            url={shareUrl}
                            title={title}
                            className="Telegram_share-button">
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <WhatsappShareButton
                            url={shareUrl}
                            title={title}
                            separator=":: "
                            className="Whatsapp_share-button">
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <LinkedinShareButton
                            url={shareUrl}
                            windowWidth={750}
                            windowHeight={600}
                            className="Linkedin_share-button">
                            <LinkedinIcon
                                size={32}
                                round />
                        </LinkedinShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <PinterestShareButton
                            url={String(window.location)}
                            media=''
                            windowWidth={1000}
                            windowHeight={730}
                            className="Pinterest_share-button">
                            <PinterestIcon size={32} round />
                        </PinterestShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <VKShareButton
                            url={shareUrl}
                            // image={`${String(window.location)}/${exampleImage}`}
                            windowWidth={660}
                            windowHeight={460}
                            className="VK_share-button">
                            <VKIcon
                                size={32}
                                round />
                        </VKShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <OKShareButton
                            url={shareUrl}
                            // image={`${String(window.location)}/${exampleImage}`}
                            className="OK_share-button">
                            <OKIcon
                                size={32}
                                round />
                        </OKShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <RedditShareButton
                            url={shareUrl}
                            title={title}
                            windowWidth={660}
                            windowHeight={460}
                            className="Reddit_share-button">
                            <RedditIcon
                                size={32}
                                round />
                        </RedditShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <TumblrShareButton
                            url={shareUrl}
                            title={title}
                            windowWidth={660}
                            windowHeight={460}
                            className="Tumblr_share-button">
                            <TumblrIcon
                                size={32}
                                round />
                        </TumblrShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <LivejournalShareButton
                            url={shareUrl}
                            title={title}
                            description={shareUrl}
                            className="Livejournal_share-button"
                        >
                            <LivejournalIcon size={32} round />
                        </LivejournalShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <MailruShareButton
                            url={shareUrl}
                            title={title}
                            className="Mailru_share-button">
                            <MailruIcon
                                size={32}
                                round />
                        </MailruShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <EmailShareButton
                            url={shareUrl}
                            subject={title}
                            body="body"
                            className="Email_share-button">
                            <EmailIcon
                                size={32}
                                round />
                        </EmailShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <ViberShareButton
                            url={shareUrl}
                            title={title}
                            className="Viber_share-button">
                            <ViberIcon
                                size={32}
                                round />
                        </ViberShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <WorkplaceShareButton
                            url={shareUrl}
                            quote={title}
                            className="Workplace_share-button">
                            <WorkplaceIcon
                                size={32}
                                round />
                        </WorkplaceShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <LineShareButton
                            url={shareUrl}
                            title={title}
                            className="Line_share-button">
                            <LineIcon
                                size={32}
                                round />
                        </LineShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <WeiboShareButton
                            url={shareUrl}
                            title={title}
                            // image={`${String(window.location)}/${exampleImage}`}
                            className="Weibo_share-button">
                            <img className="Weibo_custom-icon" width={32} height={32} src="http://icons.iconarchive.com/icons/martz90/circle-addon2/512/weibo-icon.png" alt="Weibo share button" />
                        </WeiboShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <PocketShareButton
                            url={shareUrl}
                            title={title}
                            className="Pocket_share-button">
                            <PocketIcon
                                size={32}
                                round />
                        </PocketShareButton>
                    </Grid>
                    <Grid item className={classes.share_item}>
                        <InstapaperShareButton
                            url={shareUrl}
                            title={title}
                            className="Instapaper_share-button">
                            <InstapaperIcon
                                size={32}
                                round />
                        </InstapaperShareButton>
                    </Grid>
                </Grid>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ShareDialog);