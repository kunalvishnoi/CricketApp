import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { isLoggedIn } from "../util/helpers";
import Loader from "../Components/loader";
class Matches extends React.Component {
  state = {
    team1: "",
    team2: "",
    time: "",
    venue: "",
    modal: false,
    past: [],
    future: [],
    isLoading: true
  };
  handleData = () => {
    axios
      .get("https://pure-reaches-06765.herokuapp.com/api/v1/matches")
      .then(res => {
        this.setState({
          past: res.data.past,
          future: res.data.upcoming,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
      });
  };
  componentDidMount() {
    this.handleData();
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
      time: d,
      winner: "JSS 11"
    };

    axios
      .post(
        "https://pure-reaches-06765.herokuapp.com/api/v1/matches",
        JSON.stringify(data),
        options
      )
      .then(res => {
        this.handleData();

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

    var year = time.getYear() + 1900;
    return time.getDate() + " " + n + " " + year;
  };
  render() {
    const { team1, team2, time, venue, modal, past, future } = this.state;

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
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <>
              {isLoggedIn() ? (
                <button className="btn btn-primary" onClick={this.handleClose}>
                  Add Matches
                </button>
              ) : null}
              <div className="container">
                {future && future.length > 0 ? (
                  <h3 className="text-center">Upcoming Matches</h3>
                ) : null}
                <div className="row">
                  {future.map(data => {
                    return (
                      <div className="col-md-6 mt-3 text-center " key={data.id}>
                        <div className="match-card">
                          <p>
                            {this.getMonthData(data.time)} , {data.venue}
                          </p>
                          <div
                            className="row mt-3"
                            style={{ alignItems: "center" }}
                          >
                            <div className="col-3">
                              <p>{data.team1}</p>
                            </div>
                            <div className="col-3">
                              <div
                                className={` ${
                                  data.winner === "data.team1"
                                    ? "green-circle"
                                    : "match-circle"
                                }`}
                              >
                                {data.winner === data.team1 ? (
                                  <img
                                    src="https://i.ibb.co/f00mMVx/noun-tick-2881366.png"
                                    alt="noun-tick-2881366"
                                    border="0"
                                  />
                                ) : null}
                              </div>
                            </div>

                            <div className="col-3">
                              <div
                                className={` ${
                                  data.winner === "data.team1"
                                    ? "green-circle"
                                    : "match-circle"
                                }`}
                              >
                                {data.winner === data.team1 ? (
                                  <img
                                    src="https://i.ibb.co/f00mMVx/noun-tick-2881366.png"
                                    alt="noun-tick-2881366"
                                    border="0"
                                  />
                                ) : null}
                              </div>
                            </div>
                            <div className="col-3">
                              <p>{data.team2}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {past && past.length > 0 ? (
                  <h3 className="text-center mt-5">Past Matches</h3>
                ) : null}

                <div className="row ">
                  {past.map(data => {
                    console.log();
                    return (
                      <div className="col-md-6 mt-3 text-center " key={data.id}>
                        <div className="match-card">
                          <p>
                            {this.getMonthData(data.time)} , {data.venue}
                          </p>
                          <div
                            className="row mt-3"
                            style={{ alignItems: "center" }}
                          >
                            <div className="col-3">{data.team1}</div>
                            <div className="col-3">
                              <div
                                className={` ${
                                  data.winner === data.team1
                                    ? "green-circle"
                                    : "match-circle"
                                }`}
                              >
                                {data.winner === data.team1 ? (
                                  <img
                                    src="https://i.ibb.co/f00mMVx/noun-tick-2881366.png"
                                    alt="noun-tick-2881366"
                                    border="0"
                                  />
                                ) : null}
                              </div>
                            </div>

                            <div className="col-3">
                              <div
                                className={` ${
                                  data.winner === data.team2
                                    ? "green-circle"
                                    : "match-circle"
                                }`}
                              >
                                {data.winner === data.team2 ? (
                                  <img
                                    src="https://i.ibb.co/f00mMVx/noun-tick-2881366.png"
                                    alt="noun-tick-2881366"
                                    border="0"
                                  />
                                ) : null}
                              </div>
                            </div>
                            <div className="col-3">{data.team2}</div>
                          </div>
                          <p className="mt-2">
                            {data.winner === null
                              ? null
                              : `Won By ${data.winner}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Matches;
