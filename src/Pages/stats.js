import React from "react";
import axios from "axios";
import Accordion from "../Components/accordion";
class Stats extends React.Component {
  state = {
    batStat: {},
    bowlStat: {},
    player: {}
  };

  componentDidMount() {
    axios
      .get(
        "https://pure-reaches-06765.herokuapp.com/api/v1/users/" +
          this.props.match.params.playerId
      )
      .then(res => {
        this.setState({
          player: res.data
        });
      });
    axios
      .get(
        "https://pure-reaches-06765.herokuapp.com/api/v1/users/performance/" +
          this.props.match.params.playerId
      )
      .then(res => {
        this.setState({
          batStat: res.data.batting,
          bowlStat: res.data.bowling
        });
      });
  }

  render() {
    const { currentState, batStat, bowlStat } = this.state;
    const batOverall = batStat && batStat.overall;
    const bowlOverall = bowlStat && bowlStat.overall;
    const batMatchWise = batStat && batStat.match_wise;
    const bowlMatchWise = bowlStat && bowlStat.match_wise;
    console.log(this.state);
    const avg =
      batOverall &&
      batOverall.total_runs / (batOverall.total_matches - batOverall.notouts);
    const sr = batOverall && batOverall.total_runs / batOverall.total_balls;
    const eco = bowlOverall && bowlOverall.total_runs / bowlOverall.total_overs;
    const bavg =
      bowlOverall && bowlOverall.total_runs / bowlOverall.total_wickets;
    return (
      <div className="sidebar-exit">
        <div className="container">
          <h2 className="text-center">{this.state.player.name}</h2>
          {batOverall && batOverall.total_matches === 0 ? (
            <h4 className="text-center">No Batting Stat</h4>
          ) : (
            <>
              <h4 className="text-center my-3">Batting Stat</h4>
              <div className="row">
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{batOverall && batOverall.total_matches}</b>
                    </span>
                    <span>
                      <b>Matches</b>
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{batOverall && batOverall.total_runs}</b>
                    </span>
                    <span>
                      <b>Runs</b>
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{batOverall && batOverall.notouts}</b>
                    </span>
                    <span>
                      <b>Not Outs</b>
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{batOverall && batOverall.total_sixes}</b>
                    </span>
                    <span>
                      <b>Sixes</b>
                    </span>
                  </div>
                </div>

                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{batOverall && batOverall.total_fours}</b>
                    </span>
                    <span>
                      <b>Fours</b>
                    </span>
                  </div>
                </div>
                <div className=" col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{batOverall && batOverall.total_balls}</b>
                    </span>
                    <span>
                      <b>Total Balls</b>
                    </span>
                  </div>
                </div>
                <div className=" offset-md-4 col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{avg == "Infinity" ? batOverall.total_runs : avg}</b>
                    </span>
                    <span>
                      <b>Average</b>
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{sr}</b>
                    </span>
                    <span>
                      <b>Strike Rates</b>
                    </span>
                  </div>
                </div>
              </div>
              {batMatchWise &&
                batMatchWise.map((data, index) => {
                  return (
                    <div key={index} className="col-md-12">
                      <Accordion title={data} />
                    </div>
                  );
                })}
            </>
          )}
          <br />
          <br />
          {bowlOverall && bowlOverall.total_matches === 0 ? (
            <h4 className="text-center">No Bowling Stat</h4>
          ) : (
            <>
              <h4 className="text-center">Bowling Stat</h4>
              <div className="row">
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{bowlOverall && bowlOverall.total_matches}</b>
                    </span>
                    <span>
                      <b>Matches</b>
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{bowlOverall && bowlOverall.total_overs}</b>
                    </span>
                    <span>
                      <b>Overs</b>
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{bowlOverall && bowlOverall.total_runs}</b>
                    </span>
                    <span>
                      <b>Runs</b>
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{bowlOverall && bowlOverall.total_wickets}</b>
                    </span>
                    <span>
                      <b>Wickets</b>
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{eco}</b>
                    </span>
                    <span>
                      <b>Economy</b>
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{bavg}</b>
                    </span>
                    <span>
                      <b>Average</b>
                    </span>
                  </div>
                </div>
                <div className="col-md-2 col-4 mt-2">
                  <div className="stat-card">
                    <span>
                      <b>{bavg}</b>
                    </span>
                    <span>
                      <b>Average</b>
                    </span>
                  </div>
                </div>
              </div>
              {bowlMatchWise &&
                bowlMatchWise.map((data, index) => {
                  return (
                    <div key={index} className="col-md-12">
                      <Accordion title={data} />
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Stats;
