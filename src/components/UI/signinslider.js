import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from "react-slick";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        '& li.slick-active button:before': {
            color: '#fff'
        },
        '& li button:before': {
            color: '#929292'
        }
    },
    bannerImg: {
        marginTop: -20,
        width: '100%',
    },
});

class SignInSlider extends React.Component {
    render() {
        const { classes } = this.props
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
        };

        return (
            <div className={classes.root}>
                <div>
                    <Slider {...settings}>
                        <div>
                            <img className={classes.bannerImg} src={'/static/images/site/signin.png'} alt='slider1' />
                        </div>
                        <div>
                            <img className={classes.bannerImg} src={'/static/images/site/signin.png'} alt='slider1' />
                        </div>
                        <div>
                            <img className={classes.bannerImg} src={'/static/images/site/signin.png'} alt='slider1' />
                        </div>
                    </Slider>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SignInSlider);
