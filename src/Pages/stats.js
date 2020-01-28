import React from "react";
import axios from "axios";
class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.player = "";
    if (this.props.location.state) {
      this.player = this.props.location.state;
    } else {
      this.props.history.replace("/team");
    }
    this.state = {
      currentState: "batting",
      batStat: {},
      bowlStat: {}
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://pure-reaches-06765.herokuapp.com/api/v1/users/performance/" +
          this.player.id
      )
      .then(res => {
        this.setState({
          batStat: res.data.batting,
          bowlStat: res.data.bowling
        });
      });
  }
  changeHandle = status => {
    this.setState({
      currentState: status
    });
  };
  render() {
    const { currentState, batStat, bowlStat } = this.state;
    const batOverall = batStat && batStat.overall;
    const bowlOverall = bowlStat && bowlStat.overall;
    return (
      <div className="sidebar-exit">
        <div className="container-fluid">
          <div className="row">
            <div
              className={`col-md-4 offset-md-1 stats-back text-center ${
                currentState === "batting"
                  ? "bg-primary text-white"
                  : "bg-light text-black"
              }`}
              onClick={this.changeHandle.bind(this, "batting")}
            >
              <span>Batting</span>
            </div>
            <div
              className={`col-md-4 offset-md-1 stats-back text-center ${
                currentState === "bowling"
                  ? "bg-primary text-white"
                  : "bg-light text-black"
              }`}
              onClick={this.changeHandle.bind(this, "bowling")}
            >
              <span>Bowling</span>
            </div>
          </div>
          <p className="text-center mt-5">{this.player.name}</p>
        </div>
        {currentState === "batting" ? (
          <div className="container mt-5">
            <div className="row">
              {batOverall && batOverall.total_matches === 0 ? (
                <p>No stats To show</p>
              ) : (
                <p>Batting</p>
              )}
            </div>
          </div>
        ) : (
          <div className="container mt-5">
            <div className="row">
              {bowlOverall && bowlOverall.total_matches === 0 ? (
                <p>No stats To show</p>
              ) : (
                <p>Bowling</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Stats;
