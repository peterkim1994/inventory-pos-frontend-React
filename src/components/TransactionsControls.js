import { useState } from "react"
import helper from '../util/Helper';

export const TransactionControls = () => {

    var from = helper.getCurrentDate();
    var to = helper.getDateMinusDays(1);

    const [startDate,setStartDate] = useState(from);
    const [toDate, setToDate] = useState(to);

    const selectFromDate = (event) =>{
        var from = event.target.value;

    }

    return(
        <div>
            <form>
                <input type="date" id="start-date" name="startDate" value={}
                onChange = {} />
               
                
            </form>
        </div>
    )
}