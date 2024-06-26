import { ProcessRefund } from '../../services/Pos';
import { useState } from 'react';
import {  useSelector } from 'react-redux';

const RefundUI = () => {
    const sale = useSelector(state => state.saleReducer.sale);
    const [invoiceNumber, setInvoiceNumber] = useState(sale.invoiceNumber);
    const [refundAmount, setRefundAmount] = useState(0.00);
    const [refundReason, setRefundReason] = useState("");
    const [serverResponse, setServerResponse] = useState("");
    const processRefund = async () => {
        try {
            const refund = {
                saleInvoiceId: invoiceNumber,
                amount: refundAmount,
                reason: refundReason
            }
            await ProcessRefund(refund,setServerResponse);
        } catch (err) {
            console.log(err);
            alert("are you sure that sale id exists")
        }
    }

    return (
        <div className="refund-ui-container">
            <div className="refund-ui" >
                <div className="refund-field" key="invoiceNum">
                    <label className="refund-field" htmlFor="invoice-number-input" >Invoice Id </label>
                    <input
                        className="form-control"
                        name="invoice-number-input"
                        onChange={(event) => setInvoiceNumber(parseInt(event.target.value))}
                    />
                </div>
                <div className="refund-field" key="amountFor">
                    <label className="refund-field" htmlFor="refund-amount">Amount Refunded</label>
                    <input        
                        type="number"
                        name="refund-amount"
                        className="form-control"        
                        onChange={(event) => setRefundAmount(parseFloat(event.target.value))}
                    />
                </div>
                <div className="refund-field" key="RefundReason">
                    <label className="refund-field" htmlFor="refund-reason">Reason:</label>
                    <textarea           
                        name="refund-reason"
                        className="form-control"       
                        onChange={(event) => setRefundReason(event.target.value)}
                    />
                </div>
                <button className="btn btn-primary" style={{marginTop:"50px", marginLeft: "auto", marginRight: "auto" }} onClick={processRefund}> Submit </button>
                <p>{serverResponse}</p>
                </div>
        </div>
    )
}

export default RefundUI