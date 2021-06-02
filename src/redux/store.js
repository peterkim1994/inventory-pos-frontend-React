import { configureStore } from '@reduxjs/toolkit';
import InventoryReducer from './InventoryReducer';
import PromotionsReducer from './PromotionsReducer';
import UserReducer from './UserReducer';
import { combineReducers, createStore } from 'redux';
import SaleReducer from './SaleReducer';

// export const store = configureStore({
//   reducer: {
//     inventoryReducer: InventoryReducer,
//     promotionsReducer : PromotionsReducer,
//     userReducer : UserReducer
//   },
// });

const rootReducer = combineReducers({
    inventoryReducer: InventoryReducer,
    promotionsReducer: PromotionsReducer,
    userReducer: UserReducer,
    saleReducer: SaleReducer
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



