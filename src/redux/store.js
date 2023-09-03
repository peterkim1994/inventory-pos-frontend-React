import { configureStore } from '@reduxjs/toolkit';
import InventoryReducer from './inventoryReducer';
import PromotionsReducer from './PromotionsReducer';
import TransactionsReducer from './TransactionsReducer';
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
    saleReducer: SaleReducer,
    transactionsReducer: TransactionsReducer
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



