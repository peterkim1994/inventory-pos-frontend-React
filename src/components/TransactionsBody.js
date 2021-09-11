import TransactionsTable from "./TransactionsTable";
import {setTransactions} from "../services/Transactions";
import { TransactionControls} from "./TransactionsControls";
import TransactionsTabs from "./TransactionsTabs";
import { useEffect } from "react";
import helper from "../util/Helper";
import { useDispatch, useSelector } from "react-redux";

const TransactionsBody = ()=>{

    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactionsReducer.transactions);

    // useEffect(()=>{
    //     if(transactions.length == 0)
    //         setTransactions(dispatch, helper.getDateMinusDays(1),helper.getCurrentDate());
    // },[]);

   

    return(
        <div>
            <div>
                <TransactionControls/>
            </div>
            <div>
                 <TransactionsTabs />
            </div>
        </div>
    );
}

export default TransactionsBody