import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import * as NEWS_COUNTRY from '../../constants/state';
import { news_type } from '../../config/newstype';
import { conf_countries } from '../../config/state';

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: 56,
    left: 30,
    right: 30,
    zIndex: 1500,
    backgroundColor: '#101010'
  },
  appbar: {
    position: 'absolute',
    bottom: 0,
    minWidth: 300,
    backgroundColor: '#101010'
  },  
  togglegroup: {
    margin: 0,
    minWidth: 20,
    minHeight: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#101010'
  },
  all: {
    textAlign: 'center',
    fontFamily: 'Arial',
    color: '#6A6A6A',
    fontSize: 14
  },
  code: {
    textAlign: 'center',
    fontFamily: 'Arial',
    color: '#6A6A6A',
    fontSize: 12
  },  
  toggleallbutton: {
    marginLeft: 5,
    marginRight: 5,
    padding: 0,
    minWidth: 24,
    maxHeight: 24,
    textTransform: 'inherit',
    backgroundColor: '#101010',
    "&:first-child": {
      borderTopLeftRadius: 20
    },
    "&:selected": {
      color: '#FFF'
    }
  },  
  togglebutton: {
    marginLeft: 5,
    marginRight: 5,
    padding: 0,
    minWidth: 24,
    maxHeight: 24,
    textTransform: 'inherit',
    backgroundColor: '#101010',
    "&:last-child": {
      padding: 0,
      borderTopRightRadius: 20
    }
  },
  avatar: {
    margin: 0,
    width: 24,
    height: 24
  },
  typetabs: {
    margin: 0,
    minWidth: 300,
    minHeight: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#101010'
  },
  typetab: {
    marginLeft: 10,
    marginRight: 10,
    padding: 0,
    minWidth: 64,
    minHeight: 20,
    fontFamily: 'Arial',
    fontSize: 14,
    textTransform: 'inherit',
    fullWidth: false,
    backgroundColor: '#101010'
  }
});

class BottomNavBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleChangeSource = this.handleChangeSource.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  handleChangeSource(event, newValue) {
    if (newValue === null) return;
    this.props.initScrollPos();
    this.props.selectNewsCountry(newValue);
  }

  handleChangeType(event, newValue) {
    if (newValue === null) return; 
    this.props.initScrollPos();
    this.props.selectNewsType(newValue);
    this.props.selectNewsCountry(NEWS_COUNTRY.ALL);
  }

  getCountryInfo(countrycode) {
    for (let country of conf_countries) {
      if (country.value === countrycode) {
        return country;
      }
    }
    return null;
  }

  getUniqSources() {
    const { activeCategory, sources, newsType } = this.props;

    var uniqSources = [];
    var selectedSources = sources.filter(source => 
        source.category === activeCategory &&
        source.selected && 
        source.type === newsType
    );
    if (selectedSources.length === 0) {
      return uniqSources;
    }

    var countries = [];
    for (let source of selectedSources) {
      if (countries.includes(source.state) === false) {
        let country = this.getCountryInfo(source.state);
        if (country) {
          uniqSources.push(country);
        }
        countries.push(source.state);
      } 
    }

    return uniqSources;
  }

  render() {
    const {
      classes,
      newsType,
      country
    } = this.props;

    var uniqSources = this.getUniqSources();
    if (uniqSources.length === 0) {
      return (
        <div></div>
      )
    }

    // prepare country button color
    var all_color = '#6A6A6A';
    if (country === NEWS_COUNTRY.ALL) {
      all_color = '#FFF';
    }
    for (let item of uniqSources) {
      item.color = '#6A6A6A';
      if (item.value === country) {
        item.color = '#FFF';
      }
    }

    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Grid container className={classes.togglegroup} justify="center" spacing={0}>
            <Grid item>
              <div />
            </Grid>
            <Grid item>
              <ToggleButtonGroup className={classes.togglegroup} value={country} exclusive onChange={this.handleChangeSource}>
                <ToggleButton key={NEWS_COUNTRY.ALL} value={NEWS_COUNTRY.ALL} className={classes.toggleallbutton}>
                  <Typography className={classes.all} style={{color: all_color}}>{"All"}</Typography>
                </ToggleButton>
              { uniqSources.map(item => (
                <ToggleButton key={item.value} value={item.value} className={classes.togglebutton}>
                  <Avatar src={item.flag} className={classes.avatar} />
                  <Typography className={classes.code} style={{color: item.color}}>{item.code2}</Typography>
                </ToggleButton>
              ))}
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <div />
            </Grid>
          </Grid>
          <Tabs
            className={classes.typetabs}
            value={newsType}
            onChange={this.handleChangeType}
            centered
          >
            {news_type.map((item, index) => (
              <Tab key={index} className={classes.typetab} label={item.label} />
            ))}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  activeCategory: state.uiState.activeCategory,
  sources: state.uiState.sources,
  newsType: state.uiState.newsType,
  country: state.uiState.country
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BottomNavBar));