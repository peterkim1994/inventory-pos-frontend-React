import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route,Link} from 'react-router-dom';
import Header from './components/Header';
import InventoryTabs from './components/InventoryTabs';

import PosTabs from './components/PosTabs';



function App() {
  return (
    <div className="App">
      <Header/>
      <Route exact path = "/inventory" component={InventoryTabs}/>
      <Route exact path = "/pos" component={PosTabs}/>
    </div>
  );
}

export default App;
