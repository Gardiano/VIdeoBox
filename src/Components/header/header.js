import React, {Component} from 'react';
import './header.css';

import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() {
        return(
        <div>
            <div className="Header-box">
                <div className="Header-content">
                    <Link to="/Home">
                        <strong>
                           VIDEOBOX 
                        </strong>    
                    </Link>                  
                </div>                
            </div>                              
        </div>
        );
    }
}