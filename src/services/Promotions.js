import {ActionCreators} from '../redux/PromotionsReducer';
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
        console.log("edit brand service error \n")
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

export const GetCurrentPromotions = async(dispatch) =>{
    try {
        const { data } = await axiosObj.get("sales/GetActivePromotions");
        dispatch(ActionCreators.setPromotions(data));
    } catch (err) {
        console.log("edit brand service error \n")
        console.log(err);
    }
}