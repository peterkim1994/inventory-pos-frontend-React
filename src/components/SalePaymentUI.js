import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CompleteSalePayments } from '../services/Pos';
import SaleInvoice from './SaleInvoice';
import { printInvoice } from './SaleInvoice';

const SalePaymentUI = ({ sale, processSaleComponent, clearSale }) => {

    const total = sale.total;
    const saleId = parseInt(sale.invoiceNumber);
    const saleFinished = useSelector(state => state.saleReducer.sale.finalised);
    const [primaryBtn, setPrimaryBtn] = useState("processSale");
    const payOptionsUi = useRef();
    const [eftpos, setEftpos] = useState(0.00);
    const [cash, setCash] = useState(0.00);
    const [storeCredit, setStoreCredit] = useState(0.00);
    const dispatch = useDispatch();
    const printReceipt = printInvoice;
    useEffect(() => {
        if (saleFinished) {
            setPrimaryBtn("reprint receipt");
        } else {
            setPrimaryBtn("process payments");
        }
    }, [saleFinished])

    //toggles between 
    const enableMoreOptions = () => {
        const toggledVisibility = (payOptionsUi.current.style.visibility === "hidden") ? "visible" : "hidden";
        payOptionsUi.current.style.visibility = toggledVisibility;
        const radioBtns = document.getElementsByName("paymentType");
        radioBtns.forEach(btn => {
            btn.checked = !btn.checked;
            btn.disabled = !btn.disabled;
        });
        setEftpos(0.00);
        setCash(0.00);
        setStoreCredit(0.00);
    }

    const processPayments = async() => {
        if (saleFinished) {
            printReceipt();
        } else {
            let payments = [];
            if (eftpos == 0.00 &&
                cash == 0.00 &&
                storeCredit == 0.00) {
                alert("A payment type must be selected");
                return;
            }
            if (eftpos > 0.00) {
                payments.push({
                    SaleInvoiceId: saleId,
                    PaymentMethodId: 2,
                    Amount: eftpos
                });
            }
            if (cash > 0) {
                payments.push({
                    SaleInvoiceId: saleId,
                    PaymentMethodId: 1,
                    Amount: cash
                });
            }
            if (storeCredit > 0) {
                payments.push({
                    SaleInvoiceId: sale.id,
                    PaymentMethodId: 4,
                    Amount: storeCredit
                });
            }
            // async  await
            await CompleteSalePayments(dispatch, payments);
            printReceipt();
        }
    }

    const setSinglePayment = (setPaymentType) => {
        setCash(0.00);
        setEftpos(0.00);
        setPaymentType(total);
    }

    const autoCalculate = async (event, setPaymentAmount) => {
        //setPaymentAmount is the call back function for the payment type which was entered
        const paymentAmount = parseFloat(event.target.value);
        if (storeCredit === 0) {
            const autoCalcFor = (event.target.name === "eftposAmount") ? setCash : setEftpos;
            await setPaymentAmount(paymentAmount);
            const remainingAmount = (total - paymentAmount);
            autoCalcFor(remainingAmount);
        } else {
            setPaymentAmount(paymentAmount);
        }
    }

    return (
        <div className="payment-controls">
            {
                total === 0.00 ? processSaleComponent() :
                    <div>
                        <h4>TOTAL: {total.toFixed(2)}</h4>
                        <form className="payment-radio-btns">
                            <input type="radio" id="eftposPay" name="paymentType" value="EFTPOS" onClick={() => setSinglePayment(setEftpos)} />
                            <label className="payment-radio-btns" htmlFor="eftposPay">EFTPOS</label>
                            <input type="radio" id="cashPay" name="paymentType" value="CASH" onClick={() => setSinglePayment(setCash)} />
                            <label className="payment-radio-btns" htmlFor="eftposPay">CASH</label>
                        </form>
                        <input className="btn btn-info" type="button" value="More Options" onClick={enableMoreOptions} />
                        <form className="payment-controls" ref={payOptionsUi} style={{ visibility: "hidden" }}>
                            <fieldset >
                                <div className="payment-input">
                                    <label className="form-control">Eftpos</label>
                                    <input className="form-control" type="number" name="eftposAmount" value={eftpos.toFixed(2)} onChange={(event) => autoCalculate(event, setEftpos)} />
                                </div>
                                <div className="payment-input">
                                    <label className="form-control">Cash</label>
                                    <input className="form-control" type="num" value={cash.toFixed(2)} name="cashAmount" onChange={(event) => autoCalculate(event, setCash)} />
                                </div>
                                <div className="payment-input">
                                    <label className="form-control">Store credit</label>
                                    <input type="number" className="form-control" value={storeCredit.toFixed(2)} onChange={(event) => setStoreCredit(parseFloat(event.target.value).toFixed(2))} />
                                </div>
                                <br />
                            </fieldset>
                        </form>
                        <div className="payment-controls">
                            {saleFinished && <button className="btn btn-primary" onClick={clearSale} style={{width:"130px"}}> New Sale </button>}
                            <button className="btn btn-light" onClick={processPayments} style={{width:"130px"}}> {primaryBtn}</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default SalePaymentUI