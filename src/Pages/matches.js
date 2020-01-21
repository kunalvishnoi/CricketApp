import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { isLoggedIn } from "../util/helpers";

class CreateTeam extends React.Component {
  state = {
    team1: "",
    team2: "",
    time: "",
    venue: "",
    modal: false,
    details: []
  };
  componentDidMount() {
    axios
      .get("https://pure-reaches-06765.herokuapp.com/api/v1/matches")
      .then(res => {
        this.setState({
          details: res.data
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = e => {
    const elem = e.target;
    this.setState({
      [elem.name]: elem.value
    });
  };

  handleClose = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Authorization " + localStorage.getItem("token")
      }
    };
    const { team1, team2, time, venue } = this.state;
    const d = new Date(time);
    const data = {
      team1,
      team2,
      venue,
      time: d
    };

    axios
      .post(
        "https://pure-reaches-06765.herokuapp.com/api/v1/matches",
        JSON.stringify(data),
        options
      )
      .then(res => {
        console.log(res);

        this.setState({
          modal: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  getMonthData = d => {
    const time = new Date(d);
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var n = month[time.getMonth()];
    return time.getDay() + " " + n;
  };
  render() {
    const { team1, team2, time, venue, modal, details } = this.state;

    return (
      <>
        <Dialog
          open={modal}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Player</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Team 1"
              type="text"
              fullWidth
              value={team1}
              onChange={this.handleChange}
              name="team1"
            />
            <TextField
              margin="dense"
              value={team2}
              onChange={this.handleChange}
              label="Team 2"
              type="text"
              fullWidth
              name="team2"
            />
            <TextField
              margin="dense"
              value={venue}
              onChange={this.handleChange}
              label="Venue"
              type="text"
              fullWidth
              name="venue"
            />
            <TextField
              margin="dense"
              value={time}
              onChange={this.handleChange}
              label="Time"
              type="datetime-local"
              fullWidth
              name="time"
              InputLabelProps={{
                shrink: true
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleFormSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <div className="sidebar-exit">
          {isLoggedIn() ? (
            <button className="btn btn-primary" onClick={this.handleClose}>
              Add Matches
            </button>
          ) : null}
          <div className="container">
            <h1 className="text-center">College Matches</h1>
            {details.map(data => {
              return (
                <div
                  className="row pt-3 d-flex align-items-center"
                  key={data.id}
                >
                  <div className="col-md-12 text-center">
                    <p>
                      Team1: <b>{data.team1}</b>
                    </p>
                    <p>
                      Team2: <b>{data.team2}</b>
                    </p>
                    <p>
                      Venue: <b>{data.venue}</b>
                    </p>
                    <p>
                      Time: <b>{this.getMonthData(data.time)}</b>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default CreateTeam;
