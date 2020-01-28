import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class Record extends React.Component {
  state = {
    batting: false,
    bowling: false,
    user_id: "",
    match_id: "",
    runs: "",
    balls: "",
    fours: "",
    sixes: "",
    out: true,
    player: [],
    match: [],
    overs: "",
    wickets: ""
  };

  componentDidMount() {
    axios
      .get("https://pure-reaches-06765.herokuapp.com/api/v1/users")
      .then(res => {
        this.setState({
          player: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    axios

      .get("https://pure-reaches-06765.herokuapp.com/api/v1/matches")
      .then(res => {
        this.setState({
          match: res.data.past
        });
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

  handleCloseBatting = () => {
    this.setState(prevState => ({
      batting: !prevState.batting
    }));
  };

  handleCloseBowling = () => {
    this.setState(prevState => ({
      bowling: !prevState.bowling
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
    const { user_id, match_id, runs, balls, fours, sixes, out } = this.state;
    // const d = new Date(time);
    const data = {
      user_id,
      match_id,
      runs,
      balls,
      fours,
      sixes,
      out
    };

    axios
      .post(
        "https://pure-reaches-06765.herokuapp.com/api/v1/users/batting",
        JSON.stringify(data),
        options
      )
      .then(res => {
        this.setState({
          batting: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleFormSubmit2 = e => {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Authorization " + localStorage.getItem("token")
      }
    };
    const { user_id, match_id, runs, overs, wickets } = this.state;
    // const d = new Date(time);
    const data = {
      user_id,
      match_id,
      runs,
      overs,
      wickets
    };

    axios
      .post(
        "https://pure-reaches-06765.herokuapp.com/api/v1/users/bowling",
        JSON.stringify(data),
        options
      )
      .then(res => {
        this.setState({
          bowling: false
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
    const {
      batting,
      bowling,
      user_id,
      match_id,
      runs,
      fours,
      sixes,
      balls,
      out,
      player,
      match,
      overs,
      wickets
    } = this.state;
    return (
      <>
        <Dialog
          open={batting}
          onClose={this.handleCloseBatting}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Batting Record</DialogTitle>
          <DialogContent>
            <label>Batsman</label>
            <Select
              value={user_id}
              onChange={this.handleChange}
              fullWidth
              label="Batsman"
              name="user_id"
              margin="dense"
            >
              {player.map(data => {
                return (
                  <MenuItem key={data.id} value={data.id}>
                    {data.name}
                  </MenuItem>
                );
              })}
            </Select>
            <label>Match</label>

            <Select
              value={match_id}
              onChange={this.handleChange}
              fullWidth
              label="Match"
              name="match_id"
              margin="dense"
            >
              {match.map(data => {
                return (
                  <MenuItem key={data.id} value={data.id}>
                    {data.team1} vs {data.team2} ({this.getMonthData(data.time)}
                    )
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              margin="dense"
              label="Runs"
              type="number"
              fullWidth
              value={runs}
              onChange={this.handleChange}
              name="runs"
            />
            <TextField
              margin="dense"
              value={balls}
              onChange={this.handleChange}
              label="Balls"
              type="number"
              fullWidth
              name="balls"
            />
            <TextField
              margin="dense"
              value={sixes}
              onChange={this.handleChange}
              label="Sixes"
              type="number"
              fullWidth
              name="sixes"
            />
            <TextField
              margin="dense"
              value={fours}
              onChange={this.handleChange}
              label="Fours"
              type="number"
              fullWidth
              name="fours"
            />
            <Select
              value={out}
              onChange={this.handleChange}
              fullWidth
              label="Out / Not Out"
              name="out"
              margin="dense"
            >
              <MenuItem value={true}>Out</MenuItem>
              <MenuItem value={false}>Not Out</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseBatting} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleFormSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={bowling}
          onClose={this.handleCloseBowling}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Bowling Record</DialogTitle>
          <DialogContent>
            <label>Bowler</label>
            <Select
              value={user_id}
              onChange={this.handleChange}
              fullWidth
              label="Batsman"
              name="user_id"
              margin="dense"
            >
              {player.map(data => {
                return (
                  <MenuItem key={data.id} value={data.id}>
                    {data.name}
                  </MenuItem>
                );
              })}
            </Select>
            <label>Match</label>

            <Select
              value={match_id}
              onChange={this.handleChange}
              fullWidth
              label="Match"
              name="match_id"
              margin="dense"
            >
              {match.map(data => {
                return (
                  <MenuItem key={data.id} value={data.id}>
                    {data.team1} vs {data.team2} ({this.getMonthData(data.time)}
                    )
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              margin="dense"
              value={overs}
              onChange={this.handleChange}
              label="Overs"
              type="number"
              fullWidth
              name="overs"
            />
            <TextField
              margin="dense"
              label="Runs"
              type="number"
              fullWidth
              value={runs}
              onChange={this.handleChange}
              name="runs"
            />

            <TextField
              margin="dense"
              value={wickets}
              onChange={this.handleChange}
              label="Wickets"
              type="number"
              fullWidth
              name="wickets"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseBowling} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleFormSubmit2} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <div className="sidebar-exit">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <button
                  className="btn btn-primary"
                  onClick={this.handleCloseBatting}
                >
                  Add Batting Record
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-primary"
                  onClick={this.handleCloseBowling}
                >
                  Add Bowling Record
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Record;
