import { ActionCreators } from '../redux/TransactionsReducer';
import { axiosObj } from './RequestServer';


export const setTransactions = async (dispatch, from, to) => {
    try {
        const { data } = await axiosObj.get("StoreManagement/GetTransactions?from=" + from + "&to=" + to);
        console.log(" set transaction ");
        console.log(data);
        dispatch(ActionCreators.setTransactions(data));
        //return data;
    } catch (err) {
        console.log(" problem in transsaction services: \n" + err);
    }
}

export const GetReport = async (from, to) => {
    try {
        const { data } = await axiosObj.get("StoreManagement/GetReport?from=" + from + "&to=" + to);
        console.log("report");
        console.log(data);
        let report = `<div class="sales-report">
                            <h2>SALES REPORT</h2>
                            ${getBoldPara("FROM", data.from)}
                            ${getBoldPara("TO", data.to)}
                            ${getBoldPara("TOTAL CASH", data.cashAmount.toFixed(2))}
                            ${getBoldPara("TOTAL EFTPOS", data.eftposAmount.toFixed(2))}
                            ${getBoldPara("TOTAL AFTER-PAY", data.afterPayAmount.toFixed(2))}
                            ${getBoldPara("TOTAL ", data.totalAmount.toFixed(2))}   
                            ${getBoldPara("TOTAL REFUNDS", data.totalRefunds.toFixed(2))}
                            ${getBoldPara("NET TOTAL", data.netTotal.toFixed(2))}  
                        </div>`;
        return report;
    } catch (err) {
        console.log(" problem in transsaction services: \n" + err);
    }
}

export const VoidProductSale = async (productSale) => {
    try {
        const reqBody = {
            productSaleId: productSale.id,
            saleId: productSale.saleInvoiceId
        }
        const { data } = await axiosObj.post("StoreManagement/VoidProductSale", reqBody);
        
        return data;
    } catch (err) {
        console.log(" problem in void productsale services: \n" + err);
    }
}

export const UpdateBulkPrintList = async (dispatch, products) =>{
    try{
        dispatch(ActionCreators.updateBulkPrintList(products));
    }
    catch(err){
        console.log("update bulk print list err");
        console.log(err);
        alert("update bulk print list err");
    }    
}

export const ClearBulkPrintList = async (dispatch) =>{
    try{     
        await dispatch(ActionCreators.clearBulkPrintList());
    }
    catch(err){
        console.log("clear bulk print list err");
        console.log(err);
        alert("clear bulk print list err");
    }    
}

const getBoldPara = (text, text2) => {
    return `<p>
        <span style=""float:left;"><b>${text}</span></b>
        <span style="float:right;"> ${text2}</span> 
    </p>`;
}

export const RestockProductSales = async (dispatch, productSales) =>{
    try{      
        if(productSales && productSales.length > 1){
            const {data} = await axiosObj.post("StoreManagement/restockProductSales", productSales.map(ps => ps.id));
            productSales.forEach(ps => {
                ps.restocked = true;
            });           
        }
        dispatch(ActionCreators.restockProducts(productSales));
    }
    catch(e){
        console.log(e);
    }
}