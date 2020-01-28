import React, { Component } from "react";

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    render() {
        return (
            <div className="custom-loader">
                <div className="circle"></div>
                <div className="circle delay-1"></div>
                <div className="circle delay-2"></div>
            </div>
        );
    }
}
export default Loader;
