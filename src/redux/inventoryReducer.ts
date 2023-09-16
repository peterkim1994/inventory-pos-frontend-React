import { InitialState } from "../types/state/inventory/inventoryInitialState"
import { ActionTypes } from "../types/state/inventory/inventoryActionTypes"
import { AddProductAttributeAction, InventoryAction, ProductAction, ProductsAction, SetProductAttributesAction, UpdateProductAttributeAction } from "../types/state/inventory/inventoryActions"
import { Product } from "../types/product/product"
import { ProductAttribute } from "../types/product/productAttribute"

const initialState: InitialState = {
    products: [],
    colours: [],
    sizes: [],
    categories: [],
    brands: [],
}

export const ActionCreators = {
    setProducts: (payload: Product[]): ProductsAction => ({ type: ActionTypes.SET_PRODUCTS, payload }),
    addProducts: (payload: Product[]): ProductsAction => ({type: ActionTypes.ADD_PRODUCTS, payload }),
    newProduct: (payload: Product): ProductAction => ({ type: ActionTypes.NEW_PRODUCT, payload }),
    editProduct: (payload: Product): ProductAction => ({ type: ActionTypes.EDIT_PRODUCT, payload }),
    setColours: (payload: ProductAttribute[]): SetProductAttributesAction => ({ type: ActionTypes.SET_COLOURS, payload }),
    newColour: (payload: ProductAttribute): AddProductAttributeAction => ({ type: ActionTypes.NEW_COLOUR, payload }),
    editColour: (payload: ProductAttribute): UpdateProductAttributeAction => ({ type: ActionTypes.EDIT_COLOUR, payload }),
    newCategory: (payload: ProductAttribute): AddProductAttributeAction => ({ type: ActionTypes.NEW_CATEGORY, payload }),
    setCategories: (payload: ProductAttribute[]): SetProductAttributesAction => ({ type: ActionTypes.SET_CATEGORIES, payload }),
    editCategory: (payload: ProductAttribute): UpdateProductAttributeAction => ({ type: ActionTypes.EDIT_CATEGORY, payload }),
    setBrands: (payload: ProductAttribute[]): SetProductAttributesAction => ({ type: ActionTypes.SET_BRANDS, payload }),
    newBrand: (payload: ProductAttribute): AddProductAttributeAction => ({ type: ActionTypes.NEW_BRAND, payload }),
    editBrand: (payload: ProductAttribute): UpdateProductAttributeAction => ({ type: ActionTypes.EDIT_BRAND, payload }),
    setSizes: (payload: ProductAttribute[]): SetProductAttributesAction => ({ type: ActionTypes.SET_SIZES, payload }),
    newSize: (payload: ProductAttribute): AddProductAttributeAction => ({ type: ActionTypes.NEW_SIZE, payload }),
    editSize: (payload: ProductAttribute): UpdateProductAttributeAction => ({ type: ActionTypes.EDIT_SIZE, payload }),
}

export default function InventoryReducer(state = initialState, action: InventoryAction) {
    switch (action.type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: [...action.payload] }

        case ActionTypes.ADD_PRODUCTS:
            const itemsNotInCurrentState = action.payload.filter(x => !state.products.some(stateProduct => x.id === stateProduct.id))
            return {...state, products: [...state.products, ...itemsNotInCurrentState]}

        case ActionTypes.NEW_PRODUCT:
            return { ...state, products: [...state.products, action.payload] }

        case ActionTypes.EDIT_PRODUCT:
            let updatedProducts = state.products.map(prod => {
                if (prod.id === action.payload.id) {
                    prod = action.payload;
                }
                return prod;
            });
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
            return { ...state, categories: [...state.categories, action.payload] }

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