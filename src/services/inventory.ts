import axios from 'axios';
import { ActionCreators } from '../redux/inventoryReducer';
import { axiosObj, checkToken } from './RequestServer';
import { Dispatch } from '@reduxjs/toolkit';
import { ProductAttribute } from '../types/product/productAttribute';
import { Product } from '../types/product/prouduct';

export const GetInventory = async (dispatch : Dispatch) => {
    try {
        const { data } = await axiosObj.get("inventory");
        dispatch(ActionCreators.setProducts(data));
    } catch (err) {
        console.log("GetInventory service error \n" + err)
    }
}

export const GetInventoryProducts = async (dispatch : Dispatch) => {
    try {
        const { data } = await axiosObj.get("inventory/GetInventoryProducts", {
            params: {
                storeId: 1,
                numItemsToDisplay: 150,
                pageNum: 1
            }
        });
        dispatch(ActionCreators.setProducts(data));
    } catch (err) {
        console.log("GetInventory service error \n" + err)
    }
}

export const AddColour = async (dispatch : Dispatch, colour : ProductAttribute) => {
    try {
        const { data } = await axiosObj.post("inventory/addcolour", colour);
        dispatch(ActionCreators.newColour(data));
    } catch (err) {
        console.log("Add colour service error \n" + err)
    }
}

export const EditColour = async (dispatch : Dispatch, colour : ProductAttribute) => {
    try {
        const { data } = await axiosObj.post("inventory/editColour", colour);
        dispatch(ActionCreators.editColour(data));

    } catch (err) {
        console.log("edit colour service error \n" + err);
    }
}

export const AddItemCategory = async (dispatch : Dispatch, category : ProductAttribute) => {
    try {
        const { data } = await axiosObj.post("inventory/addItemCategory", category);
        dispatch(ActionCreators.newCategory(data));
    } catch (err) {
        console.log("Add category service error \n" + err)
    }
}

export const EditCategory = async (dispatch : Dispatch, category : ProductAttribute) => {
    try {
        const { data } = await axiosObj.post("inventory/editCategory", category);
        dispatch(ActionCreators.editCategory(data));
    } catch (err) {
        console.log("edit category service error \n" + err)
    }
}

export const AddSize = async (dispatch : Dispatch, size : ProductAttribute) => {
    try {
        const { data } = await axiosObj.post("inventory/addSize", size);
        dispatch(ActionCreators.newSize(data));
    } catch (err) {
        console.log("Add size service error \n" + err)
    }
}

export const EditSize = async (dispatch : Dispatch, size : ProductAttribute) => {
    try {
        const { data } = await axiosObj.post("inventory/editSize", size);
        dispatch(ActionCreators.editSize(size));
    } catch (err) {
        console.log("edit category service error \n" + err)
    }
}

export const AddBrand = async (dispatch : Dispatch, brand : ProductAttribute) => {
    try {
        const { data } = await axiosObj.post("inventory/addbrand", brand);
        dispatch(ActionCreators.newBrand(data));
    } catch (err) {
        console.log("Add brand service error \n" + err)
    }
}

export const EditBrand = async (dispatch : Dispatch, brand : ProductAttribute) => {
    try {
        const { data } = await axiosObj.post("inventory/editbrand", brand);
        dispatch(ActionCreators.editBrand(data));
    } catch (err) {
        console.log("edit brand service error \n" + err)
    }
}

export const EditProduct = async (dispatch : Dispatch, product: Product) => {
    let userRequestResponse : HTMLElement = document.getElementById("addProductApiResponse") as HTMLElement;
    try {
        checkToken();
        const response = await axiosObj.post("Inventory/EditProduct", product);
        dispatch(ActionCreators.editProduct(response.data));
        console.log(response.data);
        userRequestResponse.innerHTML = "success";
        return true;
    } catch (err : any) {
        userRequestResponse.innerHTML = err.message;
        console.log(err);
        return false;
    }
}

export const AddProduct = async (dispatch : Dispatch, product: Product) => {
    const userRequestResponse : HTMLElement = document.getElementById("addProductApiResponse")!;

    try{
        const response = await axiosObj.post("inventory/addproduct", product)
        dispatch(ActionCreators.newProduct(response.data));
        userRequestResponse.innerHTML = "success";
    } catch(err: any) {
        console.log(err);
        let errorMessage = "";
        if (err.response.data != null && err.response.data && typeof (err.response.data) === "object") {
            if (err.response.data.Description)
                err.response.data.errors.Description.map((e: string) => {
                    errorMessage += (e + "\n");
                })
        } else if (err.response.data) {
            errorMessage = err.response.data;
        }

        userRequestResponse.innerHTML = errorMessage;
    }
}

export const GetProductAttributes = async (dispatch : Dispatch) => {
    try {
        const { data } = await axiosObj.get("inventory/productattributes");
        const colours = data[0];
        const brands = data[1];
        const categories = data[2];
        const sizes = data[3];
        dispatch(ActionCreators.setColours(colours));
        dispatch(ActionCreators.setBrands(brands));
        dispatch(ActionCreators.setCategories(categories));
        dispatch(ActionCreators.setSizes(sizes));
    } catch (err) {
        console.log("Set atts service error \n" + err)
    }
}

export const GetTheseProducts = async (productIds : number []) => {
    try {
        const productIdList = productIds.join(',');
        const { data } = await axiosObj.get("inventory/getTheseProducts?productIds=", productIds);
        return data;
    }
    catch (e) {
        console.log(e);
    }
}