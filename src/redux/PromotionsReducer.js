const initialState = {
    promotions : [],
}

const ActionTypes = {
    SET_PROMOTIONS : 'SET_PROMOTIONS',
    NEW_PROMOTION : 'NEW_PROMOTION',
    EDIT_PROMOTION : 'EDIT_PROMOTION'
}

export const ActionCreators = {
    setPromotions : payload => ({type: ActionTypes.SET_PROMOTIONS, payload}),
    newPromotion : payload => ({type: ActionTypes.NEW_PROMOTION, payload }),
}

export default function PromotionsReducer(state=initialState, action){
    switch(action.type){
        case ActionTypes.SET_PROMOTIONS:
            return {...state, promotions:action.payload};
        case ActionTypes.NEW_PROMOTION:
            return {...state, promotions:[...state.promotions, action.payload]}
        case ActionTypes.EDIT_PROMOTION:
            let updatedPromotions = state.promotions.map((item)=>{
                if(item.id === action.payload.id){
                    item = action.payload;
                }
                return item;
            });
            return {...state, promotions: updatedPromotions};
        default:
            return state;
    }
}