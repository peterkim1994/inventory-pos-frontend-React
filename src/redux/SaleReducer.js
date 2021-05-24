const initialState = {
    sale : {      
        invoiceNumber : 0,
        productSales : [],

        
    },
    previousSale : {},

}

export const ActionTypes = {
    START_NEW_SALE: "START_NEW_SALE",
    COMPLETE_SALE: "COMPLETE_SALE",
    CANCEL_SALE: "CANCEL_SALE",
    HOLD_SALE: "HOLD_SALE",
    GET_PREV_SALE: "GET_PREV_SALE",
    ADD_PRODUCT_SALE: "ADD_PRODUCT_SALE",
    DELETE_PRODUCT_SALE: "DELETE_PRODUCT_SALE",
    ADD_PAYMENT: "ADD_PAYMENT",
    EDIT_PAYMENT: "EDIT_PAYMENT",
    DELETE_PAYMENT: "DELETE_PAYMENT",
}

export const ActionCreators = {
    startNewSale: payload => ({ type: ActionTypes.START_NEW_SALE, payload }),
    cancelSale: payload => ({ type: ActionTypes.CANCEL_SALE, payload }),
    completeSale: payload => ({ type: ActionTypes.COMPLETE_SALE, payload }),
    holdSale: payload => ({ type: ActionTypes.HOLD_SALE, payload }),
    getPreviousSale: payload => ({ type: ActionTypes.GET_PREV_SALE, payload }),
    addProductSale: payload => ({ type: ActionTypes.ADD_PRODUCT_SALE, payload }),
    deleteProductSale: payload => ({ type: ActionTypes.DELETE_PRODUCT_SALE, payload }),
    addPayment: payload => ({ type: ActionTypes.ADD_PAYMENT, payload }),
    editPayment: payload => ({ type: ActionTypes.EDIT_PAYMENT, payload }),
    deletePayment: payload => ({ type: ActionTypes.DELETE_PAYMENT, payload }),
}

export default function SaleReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_NEW_SALE:
            return { ...state, sale: action.payload }
        case ActionTypes.CANCEL_SALE:
            return { ...state, sale: action.payload }
        case ActionTypes.HOLD_SALE: //holds current sale as previous, and assigns new sale to current
            return { ...state, previousSale: state.sale, sale: action.payload }
        case ActionTypes.COMPLETE_SALE:
            return { ...state, sale: action.payload }
        case ActionTypes.ADD_PRODUCT_SALE :
            return { ...state, sale: {...state.sale, sale.productSales : [...state.sale.productSales, action.payload] }
    }
}
