import { useState } from "react"
import helper from '../util/Helper';

export const TransactionControls = () => {

    let from = helper.getCurrentDate();
    let to = helper.getDateMinusDays(1);

    const [startDate, setStartDate] = useState(from);
    const [toDate, setToDate] = useState(to);

    const selectFromDate = (event) => {
        let from = event.target.value;
        startDate(from);
    }

    const selectToDate = (event) => {
        let to = event.target.value;
        setToDate(to);
    }

    const searchDates = () =>{
        
    }

    return (
        <div>
            <form>
                <input
                    type="date"
                    id="start-date"
                    name="startDate"
                    value={startDate}
                    onChange={selectFromDate}
                />
                <input
                    type="date"
                    id="to-date"
                    name="toDate"
                    value={toDate}
                    onChange={selectToDate}
                />
                <button onClick = {searchDates}>
                    Search
                </button>
            </form>
        </div>
    )
}