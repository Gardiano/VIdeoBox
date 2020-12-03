

import React, {Component} from 'react';
import './footer.css';

export default class Footer extends Component {
    render() {
        return(
        <div>
            <footer className="Footer-box">
                <div className="Footer-content">
                    <a href='https://www.themoviedb.org/' target="_blank">
                        <strong> 
                            themoviedb.org API
                        </strong>
                    </a>                                      
                </div>                
            </footer>                              
        </div>
        );
    }
}