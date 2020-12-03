import React from 'react';
import './App.css';

import Routes from './Routes';
import {BrowserRouter, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>        
          <Switch>
            <Routes />
          </Switch>
        </BrowserRouter>  
    </div>
  );
}

export default App;
