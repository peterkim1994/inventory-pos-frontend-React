import { configureStore } from '@reduxjs/toolkit';
import InventoryReducer from './InventoryReducer';

export const store = configureStore({
  reducer: {
    inventoryReducer: InventoryReducer,
  },
});
