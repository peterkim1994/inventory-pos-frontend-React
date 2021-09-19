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
        let report = `<div>
                            <h2> Report </h2>
                            ${getBoldPara("from", data.from)}
                            ${getBoldPara("to", data.to)}
                            ${getBoldPara("total cash", data.cashAmount)}
                            ${getBoldPara("total eftpos", data.eftposAmount)}
                            ${getBoldPara("total after pay", data.afterPayAmount)}
                            ${getBoldPara("Total ", data.totalAmount)}   
                            ${getBoldPara("total refunds", data.totalRefunds)}
                            ${getBoldPara("Net Total", data.netTotal)}  
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

const getBoldPara = (text, text2) => {
    return `<p><b>${text} : </b> ${text2} </p>`;
}

