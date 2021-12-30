import { ActionCreators } from '../redux/SaleReducer';
import { axiosObj } from './RequestServer';


export const SetShop = async (dispatch) => {
    try {
        const { data } = await axiosObj.get("sales/getstore");
        dispatch(ActionCreators.SetShop(data));
    } catch (err) {
        console.log("set shop service err");
        console.log(err);
    }
}

export const GetPrevSale = async (dispatch, saleId) => {
    try {
        const { data } = await axiosObj.get("sales/getSale/" + saleId);
        dispatch(ActionCreators.setSale(data));
    } catch (err) {
        console.log("get sale service err");
        console.log(err);
    }
}

export const StartSale = async (dispatch) => {
    try {
        const { data } = await axiosObj.post("sales/StartNewSale");
        await dispatch(ActionCreators.startNewSale(data));
        //return data.id;
        return parseInt(data.invoiceNumber);
    } catch (err) {
        console.log("start sale service err");
        console.log(err);
    }
}

//note for later: improve this function, setSale() changes state for the sale obj not just products...
export const AddProductSales = async (dispatch, saleId, products) => {
    try {
        const reqBody = {
            productIds: products.map(p => p.id),
            saleId: saleId
        }
        const { data } = await axiosObj.post("sales/AddProductSales", reqBody);
        await dispatch(ActionCreators.setSale(data));
    } catch (err) {
        console.log("addProductSales  service err");
        console.log(err);
    }
}

export const CompleteSalePayments = async (dispatch, payments) => {
    try {
        console.log("completesalePayment services :");
        console.log(payments);
        const { data } = await axiosObj.post("sales/AddSalePayments", payments);
        console.log(data);
        await dispatch(ActionCreators.addPayments(data.payments));
        //     await dispatch(ActionCreators.setSale(data));     
        await dispatch(ActionCreators.updateSaleStatus(data.finalised));
        return true;
    } catch (e) {
        if (e.response && e.response.data) {
            console.log(e.response.data);
            alert(e.response.data);            
        }
        console.log("AddSalePayments  service err");
        console.log(e);
        return false;
    }
}

export const ClearSale = (dispatch) => {
    dispatch(ActionCreators.clearSale());
}

export const ProcessRefund = async (refund, setMsg) => {
    try {
        const { data } = await axiosObj.post("sales/ProcessRefund", refund);
        setMsg(data);
    }
    catch (e) {
        if (e.response && e.response.data) {
            console.log(e.response.data);
            setMsg(e.response.data);
        } else {
            console.log(e);
        }
    }
}

export const CancelSale = async(dispatch, sale) => {
    try {        
        const { data } = await axiosObj.post("sales/cancelSale", sale);
        dispatch(ActionCreators.clearSale());      
    }
    catch (e) {
        if (e.response && e.response.data) {
            console.log(e.response.data); 
            alert("sale doesnt exist, was not canceled");
        } else {
            console.log(e);
        }
    }
}

//for total cash given and change owed
export const UpdateSaleCashStatus = async(dispatch, sale)=> {
    try {               
        dispatch(ActionCreators.updateSaleChangeGiven(sale));      
    }
    catch (e) {
        if (e.response && e.response.data) {
            console.log(e.response.data);           
        } else {
            console.log(e);
        }
    }
}