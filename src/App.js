import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      { Routes() }
    </div>
  </Router>
);
