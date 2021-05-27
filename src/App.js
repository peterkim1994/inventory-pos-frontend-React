import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route,Link} from 'react-router-dom';
import Header from './components/Header';
import InventoryTabs from './components/InventoryTabs';
import PosTabs from './components/PosTabs';
import LoginPage from './components/LoginPage';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductAttributes, GetInventory } from './services/Inventory';

function App() {
  const dispatch = useDispatch();  
  useEffect(() => {
      GetProductAttributes(dispatch);
      GetInventory(dispatch);
  }, []);
  
  return (
    <div className="App">
      <Header/>
      <Route exact path = "/inventory" component={InventoryTabs}/>
      <Route exact path = "/pos" component={PosTabs}/>
      <Route exact path = "/login" component={LoginPage}/>
    </div>
  );
}

export default App;
