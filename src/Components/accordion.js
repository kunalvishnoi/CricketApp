import React from "react";
// import Chevron from "./Chevron";
import ".././accordion.css";

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.content = React.createRef();
    this.state = {
      setActive: "",
      setHeight: "0px"
    };
  }

  toggleAccordion = () => {
    this.setState({
      setActive: this.state.setActive === "" ? "active" : "",
      setHeight:
        this.state.setActive === "active"
          ? "0px"
          : `${this.content.current.scrollHeight}px`
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
    const data = this.props.title;

    const { setActive, setHeight } = this.state;
    return (
      <div className="accordion-new__section my-5">
        <button
          className={`accordion-new ${setActive}`}
          onClick={this.toggleAccordion}
        >
          <div className="plus-contain">
            <p className="accordion-new__title">
              {data && data.team1} VS {data && data.team2} ,{" "}
              {this.getMonthData(data && data.time)} , {data && data.venue}
            </p>
            {/* <Chevron className={`${setRotate}`} width={10} fill={"#777"} /> */}
            <i className="fa fa-plus plus-color" />
          </div>
        </button>
        <div
          ref={this.content}
          style={{ maxHeight: `${setHeight}` }}
          className="accordion-new__content row"
        >
          <div className="col-md-2 offset-md-2 col-4 my-2">
            <div className="stat-card">
              <span>
                {data.runs}
                {data.out || data.wickets ? null : "*"}
              </span>
              <span>Runs</span>
            </div>
          </div>
          {data.balls ? (
            <div className="col-md-2 col-4 my-2">
              <div className="stat-card">
                <span>{data.balls}</span>
                <span>Balls</span>
              </div>
            </div>
          ) : (
            <div className="col-md-2 col-4 my-2">
              <div className="stat-card">
                <span>{data.overs}</span>
                <span>Overs</span>
              </div>
            </div>
          )}
          {data.sixes || data.sixes === 0 ? (
            <div className="col-md-2 col-4 my-2">
              <div className="stat-card">
                <span>{data.sixes}</span>
                <span>Sixes</span>
              </div>
            </div>
          ) : (
            <div className="col-md-2 col-4 my-2">
              <div className="stat-card">
                <span>{data.wickets}</span>
                <span>Wickets</span>
              </div>
            </div>
          )}
          {data.fours ? (
            <div className="col-md-2 col-4 my-2">
              <div className="stat-card">
                <span>{data.fours}</span>
                <span>Fours</span>
              </div>
            </div>
          ) : (
            <div className="col-md-2 col-4 my-2">
              <div className="stat-card">
                <span>{data.runs / data.overs}</span>
                <span>Economy</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Accordion;
