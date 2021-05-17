import { ActionCreators } from '../redux/PromotionsReducer';
import * as axios from 'axios';


const axiosObj = axios.create({
    baseURL: "https://localhost:5001/",
});


export const AddPromotion = async (dispatch, promotion) => {
    try {
        console.log("services add promo");
        console.log(promotion);
        const { data } = await axiosObj.post("sales/addPromotion", promotion);
        dispatch(ActionCreators.newPromotion(data));
    } catch (err) {
        console.log("edit brand service error \n");
        console.log(err);
    }
}

export const EditPromotion = async (dispatch, promotion) => {
    try {
        const { data } = await axiosObj.put("sales/editPromotion", promotion);
        dispatch(ActionCreators.editPromotion(data));
    } catch (err) {
        console.log("edit brand service error \n")
        console.log(err);
    }
}

export const GetCurrentPromotions = async (dispatch) => {
    try {
        const { data } = await axiosObj.get("sales/GetActivePromotions");
        dispatch(ActionCreators.setPromotions(data));
    } catch (err) {
        console.log("edit brand service error \n")
        console.log(err);
    }
}

export const AddProductToPromotion = async (dispatch, promotion, product) => {
    try {
        const { data } = await axiosObj.get(`sales/AddProductPromotion/?${product.id}/${promotion.id}`);
        dispatch(ActionCreators.setPromotions(data));
    } catch (err) {
        console.log("edit brand service error \n")
        console.log(err);
    }
}

export const RemoveProductPromotions = async (dispatch, promotion, removedProducts) => {
    try {
        const requestBody = {
            promotionId: promotion.id,
            productIds: removedProducts
        }
        const { data } = await axiosObj.delete("sales/RemoveProductPromotions", { data: requestBody});
        dispatch(ActionCreators.editPromotion(data));
    } catch (err) {
        console.log("RemoveProductPromotions service error \n")
        console.log(err);
    }
}

export const GetPromotionsProducts = async (dispatch, promotionId) => {
    try {
        const { data } = await axiosObj.get(`sales/GetPromotionsProducts/${promotionId}`);
        console.log("dispatch ");
        console.log(data);
        dispatch(ActionCreators.setPromotionProducts(data));
    } catch (err) {
        console.log(" GetPromotionsProducts service error \n");
        console.log(err);
    }
}

export const AddProductPromotions = async (dispatch, promotion, addedProducts) => {
    try {
        const requestBody = {         
            promotionId: promotion.id,
            productIds: addedProducts
        }
        const { data } = await axiosObj.post("sales/AddProductPromotions",requestBody );
        dispatch(ActionCreators.editPromotion(data));
    } catch (err) {
        console.log("AddProductPromotions service error \n")
        console.log(err);
    }
}