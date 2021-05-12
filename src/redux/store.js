import { configureStore } from '@reduxjs/toolkit';
import InventoryReducer from './InventoryReducer';
import PromotionsReducer from './PromotionsReducer';

export const store = configureStore({
  reducer: {
    inventoryReducer: InventoryReducer,
    promotionsReducer : PromotionsReducer
  },
});
