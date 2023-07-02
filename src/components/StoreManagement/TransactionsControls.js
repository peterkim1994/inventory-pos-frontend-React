import { useEffect, useState } from "react"
import {setTransactions} from "../../services/Transactions";
import { GetReport } from "../../services/Transactions";
import { useDispatch } from "react-redux";


export const TransactionControls = () => {

    let from = new Date().toISOString().slice(0, 10);
    let to = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10);

    const [startDate, setStartDate] = useState(from);
    const [toDate, setToDate] = useState(to);
    const dispatch = useDispatch();

    useEffect(()=>{
        setTransactions(dispatch, startDate, toDate);
    },[])

    const selectFromDate = (event) => {
        let from = event.target.value;
        setStartDate(from);
    }

    const selectToDate = (event) => {
        let to = event.target.value;
        setToDate(to);
    }

    const searchDates = (event) =>{
        event.preventDefault();
        setTransactions(dispatch, startDate, toDate);
    }

    const showReport = async (event) =>{
        event.preventDefault();
        const report = await GetReport(startDate, toDate);
        let reportWindow = window.open("", "MsgWindow", "width=370, height=400");
        reportWindow.document.write(report);  
    }

    return (
        <div className="transactions-controls">
            <form>
                <input
                    type="date"
                    id="start-date"
                    name="startDate"
                    value={startDate}
                    onChange={selectFromDate}
                />
                ➔
                <input
                    type="date"
                    id="to-date"
                    name="toDate"
                    value={toDate}
                    onChange={selectToDate}
                />
                <button className="transactions-controls btn btn-primary btn-sm" onClick = {searchDates}>
                    Search
                </button>
                <button className="transactions-controls btn btn-warning btn-sm" onClick = {showReport}>
                    GetReport
                </button>
               
            </form>
        </div>
    )
}
// <button className="transactions-controls btn btn-warning">TodaysReport</button>