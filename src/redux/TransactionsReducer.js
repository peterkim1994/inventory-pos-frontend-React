const initialState = {
    transactions = [],
    selectedTransaction = {},
    refunds = [],
    refund = []
}

export const ActionTypes = {
    SET_TRANSACTIONS : "SET_TRANSACTIONS",
    DELETE_TRANSACTIONS : "DELETE_TRANSACTIONS",
    SET_REFUNDS : "SET_REFUNDS",
}

export const ActionCreators = {
    setTransactions: payload => ({type: ActionTypes.SET_TRANSACTIONS, payload}),
    deleteTransactions: payload => ({type: ActionTypes.DELETE_TRANSACTIONS, payload}),
    setRefunds: payload => ({type: ActionTypes.SET_REFUNDS, payload}),
}

export default function TransactionsReducer(state = initialState, action) {
    switch (action.type){
        case ActionTypes.SET_TRANSACTIONS:
            return {...state, transactions: action.payload}
        case ActionsTypes.DELETE_TRANSACTIONS:
            return state;
        default:
            return state;
    }
}