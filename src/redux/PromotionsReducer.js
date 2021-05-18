const initialState = {
    promotions: [],
    promotionProducts: [],
}

const ActionTypes = {
    SET_PROMOTIONS: 'SET_PROMOTIONS',
    NEW_PROMOTION: 'NEW_PROMOTION',
    EDIT_PROMOTION: 'EDIT_PROMOTION',
    SET_PROMOTION_PRODUCTS: 'SET_PROMOTION_PRODUCTS',
    REMOVE_PRODUCT_PROMOTION: 'REMOVE_PRODUCT_PROMOTION',
    DELETE_PROMOTION: "DELETE_PROMOTION",
}

export const ActionCreators = {
    setPromotions: payload => ({ type: ActionTypes.SET_PROMOTIONS, payload }),
    newPromotion: payload => ({ type: ActionTypes.NEW_PROMOTION, payload }),
    setPromotionProducts: payload => ({ type: ActionTypes.SET_PROMOTION_PRODUCTS, payload }),
    removeProductPromotion: payload => ({ type: ActionTypes.REMOVE_PRODUCT_PROMOTION, payload }),
    editPromotion: payload => ({ type: ActionTypes.EDIT_PROMOTION, payload }),
    deletePromotion: payload => ({ type: ActionTypes.DELETE_PROMOTION, payload }),
}

export default function PromotionsReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_PROMOTIONS:
            return { ...state, promotions: action.payload };
        case ActionTypes.NEW_PROMOTION:
            return { ...state, promotions: [...state.promotions, action.payload] }
        case ActionTypes.EDIT_PROMOTION:
            let updatedPromotions = state.promotions.map((promo) => {
                if (promo.id === action.payload.id) {
                    promo = action.payload;
                }
                return promo;
            });
            return { ...state, promotions: updatedPromotions };
        case ActionTypes.SET_PROMOTION_PRODUCTS:
            return { ...state, promotionProducts: action.payload };
        case ActionTypes.DELETE_PROMOTION:
            let updatedPromos = state.promotions.filter((promo) => {
                return promo.id !== action.payload;
            });
            return { ...state, promotions: updatedPromos };         
        default:
            return state;
    }
}