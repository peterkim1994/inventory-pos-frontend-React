import { ActionCreators } from '../redux/TransactionsReducer';
import {axiosObj} from './RequestServer';


export const setTransactions = async (dispatch, from, to) => {
    try{
        const { data } = await axiosObj.get("StoreManagement/GetTransactions?from="+from +"&to="+to);
        console.log(" set transaction ");
        console.log(data);
        dispatch(ActionCreators.setTransactions(data));
        //return data;
    }catch (err){
        console.log(" problem in transsaction services: \n" + err);
    }
}

