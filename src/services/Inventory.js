import { ActionCreators } from '../redux/InventoryReducer';
import * as axios from 'axios';


const axiosObj = axios.create({
    baseURL: "https://localhost:5001/",
});

export const GetInventory = async (dispatch) => {
    try {
        const { data } = await axiosObj.get("inventory");
        dispatch(ActionCreators.setProducts(data));
    } catch (err) {
        console.log("GetInventory service error \n" + err)
    }

}

export const AddColour = async (dispatch, colour) => {
    try {
        const { data, status, statusText } = await axiosObj.post("inventory/addcolour", colour);
        dispatch(ActionCreators.newColour(data));
    } catch (err) {
        console.log("Add colour service error \n" + err)
    }
}

export const AddBrand = async (dispatch, brand) => {
    try {
        const { data } = await axiosObj.post("inventory/addbrand", brand);
        dispatch(ActionCreators.newBrand(data));
    } catch (err) {
        console.log("Add brand service error \n" + err)
    }
}

export const AddProduct = async (dispatch, product) => {
    const userRequestResponse = document.getElementById("addProductApiResponse");
    let validProduct = true;
    //   try {
    const response = await axiosObj.post("inventory/addproduct", product)
        .catch(err => {                       
            validProduct = false;
            let errorMessage = "";
            if(typeof(err.response.data) === "object" ){
                err.response.data.errors.Description.map(e => {
                    errorMessage += (e + "\n");
                })
            }else{
                errorMessage = err.response.data;
            }
            userRequestResponse.innerHTML = errorMessage;
        });
    console.log(response);
    if (validProduct) {
        dispatch(ActionCreators.newProduct(response.data));
        userRequestResponse.innerHTML = "success";
    }
}


export const GetProductAttributes = async (dispatch) => {
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