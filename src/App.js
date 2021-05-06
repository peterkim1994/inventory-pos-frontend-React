import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route,Link} from 'react-router-dom';
import Header from './components/Header';
import InventoryTabs from './components/InventoryTabs';
import POSBody from './components/PointOfSalesBody';




function App() {
  return (
    <div className="App">
      <Header/>
      <Route exact path = "/inventory" component={InventoryTabs}/>
      <Route exact path = "/pos" component={POSBody}/>
    </div>
  );
}

export default App;
