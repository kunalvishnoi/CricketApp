import React, { useEffect, useState } from "react";
// import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import HomeLoader from "./home-loader";
import dummy from "../dummy.svg";

const Resource = () => {
  const [resources, setResouces] = useState([]);
  const [load, setLoader] = useState(true);

  return (
    <div>
      <h1>Kunal</h1>
    </div>
  );
};
export default Resource;
