const initialState = {
    bussinessDetails: {
        storeName: "PROCAMP",
        address: "The Base Outlet, TeRapa Hamilton",
        gstNum: "4234 12312 12",
        contact: "0800 83 83 83"
    },
    sale: {
        id: 0,
        invoiceNumber: "",
        products: [],
        payments: [],
        total: 0.00,
        finalised: false
    },
    previousSale: {},
    refund : {
        invoiceNumber:0,
        amount: 0.00,
        reason: ""
     }
}

export const ActionTypes = {
    SET_STORE: "SET_STORE",
    START_NEW_SALE: "START_NEW_SALE",
    UPDATE_SALE_PAYMENTS: "UPDATE_SALE_PAYMENTS",
    SET_SALE: "SET_SALE",
    CLEAR_SALE : "CLEAR_SALE",
    COMPLETE_SALE: "COMPLETE_SALE",
    CANCEL_SALE: "CANCEL_SALE",
    HOLD_SALE: "HOLD_SALE",
    GET_PREV_SALE: "GET_PREV_SALE",
    ADD_PRODUCT_SALES: "ADD_PRODUCT_SALES",
    DELETE_PRODUCT_SALE: "DELETE_PRODUCT_SALE",
    ADD_PAYMENTS: "ADD_PAYMENTS",
    EDIT_PAYMENT: "EDIT_PAYMENT",
    DELETE_PAYMENT: "DELETE_PAYMENT",
    UPDATE_SALE_STATUS: "UPDATE_SALE_STATUS",
    UPDATE_SALE_CHANGE_GIVEN: "UPDATE_SALE_CHANGE_GIVEN"
}

export const ActionCreators = {
    setStore: payload => ({ type: ActionTypes.SET_STORE, payload }),
    startNewSale: payload => ({ type: ActionTypes.START_NEW_SALE, payload }),
    updateSalePayments: payload => ({ type: ActionTypes.UPDATE_SALE_PAYMENTS, payload }),
    setSale: payload => ({ type: ActionTypes.SET_SALE, payload }),
    cancelSale: payload => ({ type: ActionTypes.CANCEL_SALE, payload }),
    completeSale: payload => ({ type: ActionTypes.COMPLETE_SALE, payload }),
    holdSale: payload => ({ type: ActionTypes.HOLD_SALE, payload }),
    getPreviousSale: payload => ({ type: ActionTypes.GET_PREV_SALES, payload }),
    addProductSales: payload => ({ type: ActionTypes.ADD_PRODUCT_SALES, payload }),
    deleteProductSale: payload => ({ type: ActionTypes.DELETE_PRODUCT_SALE, payload }),
    addPayments: payload => ({ type: ActionTypes.ADD_PAYMENTS, payload }),
    editPayment: payload => ({ type: ActionTypes.EDIT_PAYMENT, payload }),
    deletePayment: payload => ({ type: ActionTypes.DELETE_PAYMENT, payload }),
    updateSaleStatus: payload => ({ type: ActionTypes.UPDATE_SALE_STATUS, payload }),
    clearSale : () => ({type: ActionTypes.CLEAR_SALE}),
    updateSaleChangeGiven : payload => ({type: ActionTypes.UPDATE_SALE_CHANGE_GIVEN, payload})
}

export default function SaleReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_NEW_SALE:
            return { ...state, sale: action.payload }
        case ActionTypes.UPDATE_SALE_PAYMENTS:
            return { ...state, sale: { ...state.sale, payments: action.payload } }
        case ActionTypes.SET_SALE:
            let oldObj = state.sale;
            let newObj = Object.assign({},action.payload);
            return Object.assign({}, state, {
                sale: action.payload
              });
           // return { ...state, sale: newObj }
        case ActionTypes.CANCEL_SALE:
            return { ...state, sale: action.payload }
        case ActionTypes.HOLD_SALE: //holds current sale as previous, and assigns new sale to current
            return { ...state, previousSale: state.sale, sale: action.payload }
        case ActionTypes.COMPLETE_SALE:
            return { ...state, sale: action.payload }
        case ActionTypes.ADD_PRODUCT_SALES:
            return { ...state, sale: { ...state.sale, products: [...action.payload] } }// ...state.sale.productSales,
        case ActionTypes.DELETE_PRODUCT_SALE:
            return { ...state, sale: { ...state.sale, products: [...state.sale.products.filter(ps => ps.id !== action.payload.id)] } }
        case ActionTypes.ADD_PAYMENTS:
            return { ...state, sale: { ...state.sale, payments: action.payload } }
        case ActionTypes.SET_STORE:
            return { ...state, store: action.payload }
        case ActionTypes.UPDATE_SALE_STATUS:
            return { ...state, sale: { ...state.sale, finalised: action.payload } }
        case ActionTypes.CLEAR_SALE:
            return {...state, sale : initialState.sale}
        case ActionTypes.updateSaleChangeGiven:
            return {...state, sale: {...state.sale, totalCashRecieved: action.payload.totalCashRecieved, changeGiven: action.payload.changeGiven}}
        default:
            return state;
    }
}
