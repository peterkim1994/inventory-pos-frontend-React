import React from 'react';
import './assets/App.css';
import './assets/main.scss';
import './assets/POS/refund.scss';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import InventoryTabs from './components/Inventory/InventoryTabs';
import PosTabs from './components/POS/PosTabs';
import LoginPage from './components/User/LoginPage';
import TransactionsBody from './components/StoreManagement/TransactionsBody';
import PrintComponent from './components/POS/Printables/PrintComponent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetProductAttributes, GetInventory, GetInventoryProducts } from './services/inventory';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    GetProductAttributes(dispatch);
    //GetInventory(dispatch);
    GetInventoryProducts(dispatch);
  }, []);

  return (
    <div className="App">
      <Header />
      <Route exact path="/inventory" component={InventoryTabs} />
      <Route exact path="/pos" component={PosTabs} />
      <Route exact path="/transactions" component={TransactionsBody} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/printComponent" component={PrintComponent} />
      <div className="printable" id="printable-label"></div>
    </div>
  );
}

export default App;