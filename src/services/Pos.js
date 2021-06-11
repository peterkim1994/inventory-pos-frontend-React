import { ActionCreators } from '../redux/SaleReducer';
import {axiosObj} from './RequestServer';


export const SetShop = async(dispatch)=>{
    try{
        const { data } = await axiosObj.get("sales/getstore");
        dispatch(ActionCreators.SetShop(data));
    }catch(err){
        console.log("set shop service err");
        console.log(err);
    }
}

export const GetPrevSale =  async(dispatch, saleId) =>{
    try{
        const { data } = await axiosObj.get("sales/getSale/" + saleId);
        
        dispatch(ActionCreators.setSale(data));       
    }catch(err){
        console.log("get sale service err");
        console.log(err);
    }
}

export const StartSale = async(dispatch) =>{
    try{
        const { data } = await axiosObj.post("sales/StartNewSale");
        dispatch(ActionCreators.startNewSale(data));
        return parseInt(data.invoiceNumber);
    }catch(err){
        console.log("start sale service err");
        console.log(err);
    }
}

//note for later: improve this function, setSale() changes state for the sale obj not just products...
export const AddProductSales = async(dispatch, saleId, products) =>{
    try{
        const reqBody = {
            productIds : products.map(p=> p.id),
            saleId : saleId
        }
        const { data } = await axiosObj.post("sales/AddProductSales", reqBody);
        dispatch(ActionCreators.setSale(data));
    }catch(err){
        console.log("addProductSales  service err");
        console.log(err);
    }
}

export const CompleteSalePayments = async(dispatch, payments)=> {
    try{
        console.log("completesalePayment services :");
        console.log(payments);
        const { data } = await axiosObj.post("sales/AddSalePayments", payments);
        await dispatch(ActionCreators.addPayments(data.payments));
        await dispatch(ActionCreators.setSale(data));     
        console.log(data);
    }catch(err){
        console.log("AddSalePayments  service err");
        console.log(err);
    }
}

