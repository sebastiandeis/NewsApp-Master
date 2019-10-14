import React from 'react';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

import arrayMove from '../../utility/utils';


const styles = {
	root: {
		flexGrow: 1
  },
  title: {

  },
  list_avatar: {
    minWidth: 36
  }
};

const DragHandle = sortableHandle(() => <Grid item xs={2}><MenuIcon style={{color: '#FFF', marginLeft: 20}} /></Grid>
);

const SortableItem = sortableElement(({value, onClick}) => (
  <Grid container alignItems="center" style={{width: 400, maxWidth: 400}}>
    <DragHandle />
    <Grid item xs={8}>
      <Typography style={{color: '#FFF', textAlign: 'left'}}>{value}</Typography>
    </Grid>
    <Grid item xs={2}>
      <Checkbox
        edge="end"
        checked={true}
        onClick={onClick}
      />
    </Grid>
  </Grid>
));

const SortableContainer = sortableContainer(({children}) => {
  return <Grid container spacing={1}>{children}</Grid>
});

class SortableList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("SortableList handleClick!");
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    var newItems = arrayMove(this.state.items, oldIndex, newIndex);
    this.setState({
      items: newItems
    });
  };

  render() {
    const { items } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root} >
        <Typography className={classes.title}>Hello, SortableList!</Typography>
          <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
            {items.map((value, index) => (
              <SortableItem key={`item-${index}`} index={index} value={value} onClick={this.handleClick}>
              </SortableItem>
            ))}
          </SortableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(SortableList);