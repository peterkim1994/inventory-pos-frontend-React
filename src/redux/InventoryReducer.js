const initialState = {
   // searchedProducts:[],
    products: [],
    colours: [],
    sizes: [],
    categories: [],
    brands: [],
}

export const ActionTypes = {
    SET_SEARCHED_PRODUCTS : 'SET_SEARCHED_PRODUCTS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    NEW_PRODUCT: 'NEW_PRODUCT',
    EDIT_PRODUCT: 'EDIT_PRODUCT',
    SET_COLOURS: 'SET_COLOURS',
    NEW_COLOUR: 'NEW_COLOUR',
    EDIT_COLOUR: 'EDIT_COLOUR',
    SET_CATEGORIES: 'SET_CATEGORIES',
    NEW_CATEGORY: 'NEW_CATEGORY',
    EDIT_CATEGORY: 'EDIT_CATEGORY',
    SET_BRANDS: 'SET_BRANDS',
    NEW_BRAND: 'NEW_BRAND',
    EDIT_BRAND: 'EDIT_BRAND',
    SET_SIZES: 'SET_SIZES',
    NEW_SIZE: 'NEW_SIZE'
}

export const ActionCreators = {
   // setSearchedProducts: payload => ({ type: ActionTypes.SET_SEARCHED_PRODUCTS, payload }),
    setProducts: payload => ({ type: ActionTypes.SET_PRODUCTS, payload }),
    newProduct: payload => ({ type: ActionTypes.NEW_PRODUCT, payload }),
    editProduct: payload => ({ type: ActionTypes.EDIT_PRODUCT, payload }),
    setColours: payload => ({ type: ActionTypes.SET_COLOURS, payload }),
    newColour: payload => ({ type: ActionTypes.NEW_COLOUR, payload }),
    editColour: payload => ({ type: ActionTypes.EDIT_COLOUR, payload }),
    setCategories: payload => ({ type: ActionTypes.SET_CATEGORIES, payload }),
    newCategory: payload => ({ type: ActionTypes.NEW_CATEGORY, payload }),
    editCategory: payload => ({ type: ActionTypes.EDIT_CATEGORY, payload }),
    setBrands: payload => ({ type: ActionTypes.SET_BRANDS, payload }),
    newBrand: payload => ({ type: ActionTypes.NEW_BRAND, payload }),
    editBrand: payload => ({ type: ActionTypes.EDIT_BRAND, payload }),
    setSizes: payload => ({ type: ActionTypes.SET_SIZES, payload }),
    newSize: payload => ({ type: ActionTypes.NEW_SIZE, payload }),
}

export default function InventoryReducer(state = initialState, action) {
    switch (action.type) {
      //  case ActionTypes.SET_SEARCHED_PRODUCTS:
      //      return { ...state, searchedProducts: [...action.payload] }

        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: [...action.payload] }            

        case ActionTypes.NEW_PRODUCT:
            return { ...state, products: [...state.products, action.payload] }

        case ActionTypes.EDIT_PRODUCT:
            let updatedProducts = state.products.map(prod => {
                if (prod.id === action.payload.id) {
                    prod = action.payload;
                }
                return prod;
            });
            console.log("proecuts reducer action");
            console.log(updatedProducts);
            return { ...state, products: updatedProducts }

        case ActionTypes.SET_COLOURS:
            return { ...state, colours: [...action.payload] }

        case ActionTypes.NEW_COLOUR:
            return { ...state, colours: [...state.colours, action.payload] }

        case ActionTypes.EDIT_COLOUR:
            let updatedColours = state.colours.map(c => {
                if (c.id === action.payload.id) {
                    c = action.payload;
                }
                return c;
            })
            return { ...state, colours: [...updatedColours] }

        case ActionTypes.SET_CATEGORIES:
            return { ...state, categories: [...action.payload] }

        case ActionTypes.NEW_CATEGORY:
            return { ...state, categories: [...state.colours, action.payload] }

        case ActionTypes.EDIT_CATEGORY:
            let updatedCategories = state.categories.map(c => {
                if (c.id == action.payload.id) {
                    c = action.payload;
                }
                return c;
            })
            return { ...state, categories: [...updatedCategories] }

        case ActionTypes.SET_BRANDS:
            return { ...state, brands: [...action.payload] }

        case ActionTypes.NEW_BRAND:
            return { ...state, brands: [...state.brands, action.payload] }

        case ActionTypes.EDIT_BRAND:
            let updatedBrands = state.colours.map(b => {
                if (b.id == action.payload.id) {
                    b = action.payload;
                }
                return b;
            })
            return { ...state, brands: [...updatedBrands] }

        case ActionTypes.SET_SIZES:
            return { ...state, sizes: [...action.payload] }

        case ActionTypes.NEW_SIZE:
            return { ...state, sizes: [...state.sizes, action.payload] }

        default:
            return state;
    }
}