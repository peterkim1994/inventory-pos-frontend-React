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
        const { data } = await axiosObj.post("inventory/addcolour", colour);
        dispatch(ActionCreators.newColour(data));
    } catch (err) {
        console.log("Add colour service error \n" + err)
    }
}

export const EditColour = async (dispatch, colour) => {
    try {
        const { data } = await axiosObj.put("inventory/editbrand", colour);
        dispatch(ActionCreators.editColour(data));
    } catch (err) {
        console.log("edit colour service error \n" + err)
    }
}

export const AddItemCategory = async (dispatch, category) => {
    try {
        const { data } = await axiosObj.post("inventory/addItemCategory", category);
        dispatch(ActionCreators.newCategory(data));
    } catch (err) {
        console.log("Add category service error \n" + err)
    }
}

export const AddSize = async (dispatch, size) => {
    try {
        const { data } = await axiosObj.post("inventory/addSize", size);
        dispatch(ActionCreators.newSize(data));
    } catch (err) {
        console.log("Add size service error \n" + err)
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

export const EditBrand = async (dispatch, brand) => {
    try {
        const { data } = await axiosObj.put("inventory/editbrand", brand);
        dispatch(ActionCreators.editBrand(data));
    } catch (err) {
        console.log("edit brand service error \n" + err)
    }
}



export const EditProduct = async(dispatch, product) => {
    
    let userRequestResponse = document.getElementById("addProductApiResponse");
    try{
        const response = await axiosObj.put("inventory/editproduct", product);
        dispatch(ActionCreators.editProduct(response.data));
        userRequestResponse.innerHTML = "success";    
    }catch(err){
        userRequestResponse.innerHTML = err.message;
        console.log(err);
    }   
}

export const AddProduct = async (dispatch, product) => {
    const userRequestResponse = document.getElementById("addProductApiResponse");
    let validProduct = true;
    //   try {
    console.log(product);
    const response = await axiosObj.post("inventory/addproduct", product)
        .catch(err => {                       
            validProduct = false;            
            console.log(err);
            // let errorMessage = "";
            // if(err.response.data && typeof(err.response.data) === "object" ){
            //     err.response.data.errors.Description.map(e => {
            //         errorMessage += (e + "\n");
            //     })
            // }else if(err.response.data){ 
            //     errorMessage = err.response.data;
            // }
            // userRequestResponse.innerHTML = errorMessage;
        });
   
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