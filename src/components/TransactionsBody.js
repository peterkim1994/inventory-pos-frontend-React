import TransactionsTable from "./TransactionsTable";
import {setTransactions} from "../services/Transactions";
import { TransactionControls} from "./TransactionsControls";
import { useEffect } from "react";
import helper from "../util/Helper";
import { useDispatch, useSelector } from "react-redux";

const TransactionsBody = ()=>{

    const dispatch = useDispatch();
    

    useEffect(()=>{
        setTransactions(dispatch, helper.getDateMinusDays(1),helper.getCurrentDate());
    },[]);
    let transactions = useSelector(state => state.transactionsReducer.transactions);
    return(
        <div>
            <div>asddsa</div>
            <TransactionControls/>
       
        </div>
    );
}

export default TransactionsBody