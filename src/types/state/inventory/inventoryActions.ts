
import { Product } from "../../product/prouduct"
import { ProductAttribute } from "../../product/productAttribute"
import { ActionTypes } from "./inventoryActionTypes";

type InventoryProductsAction = ActionTypes.SET_PRODUCTS;
type InventoryProductAction =  ActionTypes.NEW_PRODUCT |  ActionTypes.EDIT_PRODUCT;
type SetProductAttributesActionTypes = ActionTypes.SET_BRANDS | ActionTypes.SET_COLOURS | ActionTypes.SET_SIZES | ActionTypes.SET_CATEGORIES;
type AddProductAttributeActionTypes =  ActionTypes.NEW_CATEGORY | ActionTypes.NEW_SIZE | ActionTypes.NEW_BRAND | ActionTypes.NEW_COLOUR;
type UpdateProductAttributeActionTypes =  ActionTypes.EDIT_BRAND | ActionTypes.EDIT_COLOUR | ActionTypes.EDIT_CATEGORY | ActionTypes.EDIT_SIZE;

export interface AddProductAttributeAction {
    type: AddProductAttributeActionTypes,
    payload: ProductAttribute
}

export interface UpdateProductAttributeAction {
    type: UpdateProductAttributeActionTypes,
    payload: ProductAttribute
}

export interface SetProductAttributesAction {
    type: SetProductAttributesActionTypes,
    payload: ProductAttribute []
}

export interface ProductAction {
    type: InventoryProductAction,
    payload: Product
}

export interface ProductsAction {
    type: InventoryProductsAction,
    payload: Product[]
}

export type InventoryAction = AddProductAttributeAction | UpdateProductAttributeAction | SetProductAttributesAction | ProductAction | ProductsAction;