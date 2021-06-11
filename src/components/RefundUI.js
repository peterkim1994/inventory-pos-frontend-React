import {GetPrevSale} from '../services/Pos';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const RefundUI = () => {
    const dispatch = useDispatch();
    const sale = useSelector(state => state.saleReducer.sale);
    const [searchedInvoice, setInvoiceSearch] = useState(sale.invoiceNumber);
    const [isPrevSale, setPrevSale] = useState(false);

    const searchPreviousSale = async() =>{        
        try{
            setPrevSale(true);
            await GetPrevSale(dispatch,parseInt(searchedInvoice));
        }catch(err){
            console.log(err);
            alert("are you sure that sale id exists")
        }
       
    }

    return (
        <div className="invoice-search" style={{ display: "flex", justifyContent: "flex-start", alignContent: "space-around", alignItems: "start", width: "25vw" }}>
            <label>Invoice Id </label>
            <input className="form-control" onChange={(event) => setInvoiceSearch(event.target.value)} />
            <button className="btn btn-secondary" onClick={searchPreviousSale}>Search</button>
        </div>
    )
}

export default RefundUI