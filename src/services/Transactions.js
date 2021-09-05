import { ActionCreators } from '../redux/TransactionsReducer';
import {axiosObj} from './RequestServer';


export const setTransactions = async (dispatch, from, to) => {
    try{
        const { data } = await axiosObj.get("StoreManagement/GetTransactions?from="+from +"&to="+to);
        dispatch(ActionCreators.setTransactions(data));
    }catch (err){
        console.log(" problem in transsaction services: \n" + err);
    }
}

