import { TransactionControls} from "./TransactionsControls";
import TransactionsTabs from "./TransactionsTabs";
import React,{ useEffect } from "react";

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