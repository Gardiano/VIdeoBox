import React, { Component } from "react";
import "./login.css";

import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div class="container">     
        <div class="box"> 
        <p> VIDEOBOX </p> 
                 <button>
                 <Link to="/home">
                 <i id="icon-arrow" class="fas fa-long-arrow-alt-right"> </i>
                 </Link>
                 </button>
          </div>
        </div>
    );
  }
}


  /* <i id="icon-video" class="fas fa-video"></i>
                <i class="fas fa-long-arrow-alt-right"></i>   */

