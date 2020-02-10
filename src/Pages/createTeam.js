import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { isLoggedIn } from "../util/helpers";
import Loader from "../Components/loader";
import { NavLink } from "react-router-dom";
const CreateTeam = props => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [users, setData] = useState([]);
  const [isLoading, changeLoading] = useState(true);

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleName = e => {
    setName(e.target.value);
  };

  const handleYear = e => {
    setYear(e.target.value);
  };

  const handleDescription = e => {
    setDescription(e.target.value);
  };

  const handlePhoto = e => {
    setPhoto(e.target.value);
  };
  const handlePhone = e => {
    setPhone(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://pure-reaches-06765.herokuapp.com/api/v1/users")
      .then(res => {
        setData(res.data);
        changeLoading(false);
      })
      .catch(err => {
        console.log(err);
        changeLoading(false);
      });
  }, [openModal]);

  const handleFormSubmit = e => {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("token")
      }
    };

    const data = {
      name,
      photo,
      phone,
      passout_year: year,
      description
    };

    axios
      .post(
        "https://pure-reaches-06765.herokuapp.com/api/v1/users",
        JSON.stringify(data),
        options
      )
      .then(res => {
        console.log(res);

        setOpenModal(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
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
            onChange={handleName}
          />
          <TextField
            margin="dense"
            value={description}
            onChange={handleDescription}
            label="Description"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={year}
            onChange={handleYear}
            label="Year"
            type="number"
            fullWidth
          />
          <TextField
            margin="dense"
            value={photo}
            onChange={handlePhoto}
            label="Photo Link"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={phone}
            onChange={handlePhone}
            label="Contact Number"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <div className="sidebar-exit">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isLoggedIn() ? (
              <button
                className="btn btn-primary"
                onClick={() => setOpenModal(true)}
              >
                Add Player
              </button>
            ) : null}
            <div className="container">
              <h1 className="text-center">JSS Cricket Team Player</h1>
              <div className="row pt-3 d-flex align-items-center">
                {users.map(data => {
                  return (
                    <div key={data.id} className="col-md-4 my-2 text-center">
                      <div className="card">
                        <NavLink
                          to={`/stats/${data.id}`}
                          className="teamdetail"
                        >
                          <img
                            className="card-img-top"
                            src={data.photo}
                            alt="player"
                          />
                          <div className="card-body">
                            <p className="card-text">{data.name}</p>
                            <span className="team-description">
                              {data.description} , {data.passout_year} year
                            </span>
                            <br />
                            <span>
                              Contact: <b>{data.phone}</b>
                            </span>
                          </div>
                        </NavLink>
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
};

export default CreateTeam;
