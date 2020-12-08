import React, {Component} from 'react';
import './error.css';

import {Link} from 'react-router-dom';

export default class Erro extends Component {
    render() {
        return(
        <div>
            
            <div className="login-box">
           
                <div className="login-logo">    
                <strong style={{fontSize:'20px'}}> Ops.. página não encontrada tente </strong>  
                                                   
                     <Link to="/Home" style={{color:'white'}}>  
                       Vídeo Box 
                     </Link>                                       
                </div> 
               
            </div> 
                                         
        </div>
        );
    }
}