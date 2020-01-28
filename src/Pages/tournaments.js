import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { isLoggedIn } from "../util/helpers";
import Loading from "../Components/loader";
class CreateTeam extends React.Component {
  state = {
    name: "",
    result: "",
    date: "",
    venue: "",
    modal: false,
    alert: false,
    details: [],
    isLoading: true
  };

  getData() {
    axios
      .get("https://pure-reaches-06765.herokuapp.com/api/v1/tournaments")
      .then(res => {
        this.setState({
          details: res.data,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
      });
  }
  componentDidMount() {
    this.getData();
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
    const { name, date, result, venue } = this.state;
    // const d = new Date(time);
    const data = {
      name,
      date,
      venue,
      result
    };

    axios
      .post(
        "https://pure-reaches-06765.herokuapp.com/api/v1/tournaments",
        JSON.stringify(data),
        options
      )
      .then(res => {
        this.setState({
          alert: true,
          modal: false
        });
        this.getData();
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

  handleCloseAlert = () => {
    this.setState({
      alert: false
    });
  };
  render() {
    const { name, result, date, venue, modal, details } = this.state;

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
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={this.handleChange}
              name="name"
            />
            <TextField
              margin="dense"
              value={result}
              onChange={this.handleChange}
              label="Result"
              type="text"
              fullWidth
              name="result"
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
              value={date}
              onChange={this.handleChange}
              label="Date"
              type="date"
              fullWidth
              name="date"
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
            <Loading />
          ) : (
            <>
              {isLoggedIn() ? (
                <button className="btn btn-primary" onClick={this.handleClose}>
                  Add Tournament
                </button>
              ) : null}
              <div className="container">
                <h1 className="text-center">College Tournaments</h1>
                {details.map(data => {
                  return (
                    <div
                      className="row pt-3 d-flex align-items-center"
                      key={data.id}
                    >
                      <div className="col-md-12 text-center">
                        <p>
                          Name: <b>{data.name}</b>
                        </p>
                        <p>
                          Venue: <b>{data.venue}</b>
                        </p>
                        <p>
                          Result: <b>{data.result}</b>
                        </p>
                        <p>
                          Date: <b>{this.getMonthData(data.date)}</b>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default CreateTeam;
