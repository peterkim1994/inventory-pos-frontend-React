const initialState = {
    transactions : [],
    selectedTransaction : {},
    refunds : [],
    refund : {},
    bulkPrintList : []
}

export const ActionTypes = {
    SET_TRANSACTIONS : "SET_TRANSACTIONS",
    DELETE_TRANSACTIONS : "DELETE_TRANSACTIONS",
    SET_REFUNDS : "SET_REFUNDS",
    RESTOCK_PRODUCT : "RESTOCK_PRODUCT",
    SET_BULK_PRINT_LIST : "SET_BULK_PRINT_LIST",
    CLEAR_BULK_PRINT_LIST : "CLEAR_BULK_PRINT_LIST",
    RESTOCK_PRODUCTS : "RESTOCK_PRODUCTS",
}

export const ActionCreators = {
    setTransactions: payload => ({type: ActionTypes.SET_TRANSACTIONS, payload}),
    deleteTransactions: payload => ({type: ActionTypes.DELETE_TRANSACTIONS, payload}),
    setRefunds: payload => ({type: ActionTypes.SET_REFUNDS, payload}),
    restockProduct : payload => ({type: ActionTypes.RESTOCK_PRODUCT, payload}),
    updateBulkPrintList : payload => ({type: ActionTypes.SET_BULK_PRINT_LIST, payload}),
    clearBulkPrintList : () => ({type: ActionTypes.CLEAR_BULK_PRINT_LIST}),
    restockProducts : payload => ({type: ActionTypes.RESTOCK_PRODUCTS, payload}),
}

export default function TransactionsReducer(state = initialState, action) {
    switch (action.type){
        case ActionTypes.SET_TRANSACTIONS:
            return {...state, transactions: action.payload}
        case ActionTypes.DELETE_TRANSACTIONS:
            return state;
        case ActionTypes.RESTOCK_PRODUCT:
            let restockedProductSale = action.payload;
            let transact = state.transactions.find(x=> x.id === restockedProductSale.saleInvoiceId);
            let transProducts = transact.products.map(p=>{
                if(p.id === restockedProductSale.id){
                    p.restocked = true;
                }
                return p;
            });
            let newTransactions = state.transactions.map(t=>{
                if(t.id === transact.id){
                    t.products = t.transProducts;
                }
                return t;
            } );
            return {...state, transactions: newTransactions}
        case ActionTypes.SET_BULK_PRINT_LIST:
            let newList = [...action.payload];
            return {...state, bulkPrintList: newList}
        case ActionTypes.CLEAR_BULK_PRINT_LIST:   
            return {...state, bulkPrintList: new Array()}
        case ActionTypes.RESTOCK_PRODUCTS:
            let restockedProducts = action.payload;
            let updatedTransactions = state.transactions.map(t => 
                {
                    t.products.forEach(ps => {
                        if(restockedProducts.some(rs => rs.id === ps.id)){
                            ps.restocked = true;
                        }                           
                    });
                    return t;
                }
            );
            return {...state, transactions: updatedTransactions}
        default:
            return state;
    }
}