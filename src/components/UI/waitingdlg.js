import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

class WaitingDialog extends React.Component {

  render() {
    return (
      <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Waiting for results..."}
          </DialogTitle>
          <DialogContent style={{ paddingLeft: 90 }}>
            <CircularProgress disableShrink />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

WaitingDialog.defaultProps = {
  open: false
};

WaitingDialog.propsType = {
  open: PropTypes.bool.isRequired
};

export default WaitingDialog;
