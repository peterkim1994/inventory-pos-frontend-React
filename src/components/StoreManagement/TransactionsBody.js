import TransactionsTable from "./TransactionsTable";
import {setTransactions} from "../services/Transactions";
import { TransactionControls} from "./TransactionsControls";
import TransactionsTabs from "./TransactionsTabs";
import React,{ useEffect } from "react";
import helper from "../util/Helper";
import { useDispatch, useSelector } from "react-redux";

const TransactionsBody = ()=>{

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