import { configureStore } from '@reduxjs/toolkit';
import InventoryReducer from './InventoryReducer';
import PromotionsReducer from './PromotionsReducer';
import {combineReducers} from 'redux';

export const store = configureStore({
  reducer: {
    inventoryReducer: InventoryReducer,
    promotionsReducer : PromotionsReducer
  },
});


