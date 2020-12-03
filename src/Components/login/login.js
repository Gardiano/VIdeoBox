import React, {Component} from 'react';
import './login.css';

import {Link} from 'react-router-dom';

export default class Login extends Component {
    render() {
        return(
        <div>
            <div className="login-box">
                <div className="login-logo">                 
                   <i class="fas fa-video"> VídeoBox                    
                    <button> 
                        <Link to="/Home">
                            <i class="fas fa-long-arrow-alt-right"></i>
                        </Link> </button>
                    </i>                   
                </div> 
            </div>                              
        </div>
        );
    }
}