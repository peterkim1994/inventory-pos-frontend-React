import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CompleteSalePayments } from '../services/Pos';
import SaleInvoice from './SaleInvoice';
import { printInvoice } from './SaleInvoice';
import helper from '../util/Helper';


const SalePaymentUI = ({ sale, processSaleComponent, clearSale }) => {

    const total = parseFloat(sale.total);
    const [amountOwing, setAmountOwing] = useState(total);
    const [paymentAmount, setPaymentAmount] = useState(0.00);
    const saleId = parseInt(sale.invoiceNumber);
    const saleFinished = useSelector(state => state.saleReducer.sale.finalised);
    const [primaryBtn, setPrimaryBtn] = useState("processSale");
    const payOptionsUi = useRef();
    const [eftpos, setEftpos] = useState(0.00);
    const [cash, setCash] = useState(0.00);
    const [afterPay, setAfterPay] = useState(0.00);
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
            if(toggledVisibility === "hidden"){
                btn.checked = false;
            }
        });
        setEftpos(0.00);
        setCash(0.00);
        setStoreCredit(0.00);
        setAfterPay(0.00)
    }

    const processPayments = async() => {
        if (saleFinished) {
            printReceipt();
        } else {            
            let payments = [];
            if (eftpos == 0.00 &&
                cash == 0.00 &&
                afterPay == 0.00 &&
                storeCredit == 0.00) {
                alert("A payment type must be selected");
                return;
            }
            if (eftpos > 0) {
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
            if (afterPay > 0) {
                payments.push({
                    SaleInvoiceId: saleId,
                    PaymentMethodId: 3,
                    Amount: afterPay
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
            try{
                let success = await CompleteSalePayments(dispatch, payments);
                if(success)
                   printReceipt();
                else 
                    throw 100;
            }catch(e){
                console.log(e);
                payments = [];
            }
        }
    }

    const setSinglePayment = (setPaymentType) => {
        setCash(0.00);
        setEftpos(0.00);
        setAfterPay(0.00);
        setPaymentType(total);
    }

    const initEventListeners = () => {
        const inputs = document.getElementsByClassName("amount-field");
        for (let i = 0; i< inputs.length ; i++){
            let input = inputs[i];
            if(input.name === "storeCreditAmount"){
                return;
            }
            input.addEventListener("keypress", (event)=> {                
                if ( event.keyCode === 13 ){                
                    // let autoCalculateFor = input.name === "eftposAmount" ? setCash : setEftpos;                  
                    // let enteredValue =  input.name === "eftposAmount" ? eftpos : cash;  
                    // if(Number.isNaN(enteredValue) && enteredValue > total){
                    //     setCash(0.00);
                    //     setEftpos(0.00);
                    //     setStoreCredit(0.00); 
                    //     setAfterPay(0.00);        
                    //     return;
                    // }                  
                    // try{
                    //     handleNaNs();                 
                    //     autoCalculateFor(total.toFixed(2) - enteredValue.toFixed(2));
                    // }catch (e){
                    //     setCash(0.00);
                    //     setEftpos(0.00);
                    //     setStoreCredit(0.00);    
                    // } 
                  //  let amountPaid = 0.00;                   
                    let amountPaid = eftpos + cash + afterPay + storeCredit;
                    setAmountOwing(total-amountPaid);
                }
            });
        }
    }

    const handleNaNs = ()=>{
        if(Number.isNaN(eftpos)){
            setEftpos(0.0)
            throw 100;
        }
        if(Number.isNaN(cash)){
            setCash(0.00);
            throw 100;
        }
        if(Number.isNaN(storeCredit)){
            setStoreCredit(0.00);
            throw 100;
        }
    }

    initEventListeners();

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
                            <input type="radio" id="afterPay" name="paymentType" value="AFTER PAY" onClick={() => setSinglePayment(setAfterPay)} />
                            <label className="payment-radio-btns" htmlFor="eftposPay">AFTER PAY</label>
                        </form>
                        <input className="btn btn-info" type="button" value="More Options" onClick={enableMoreOptions} />
                        <form className="payment-controls" ref={payOptionsUi} style={{ visibility: "hidden" }}>
                            <fieldset >
                                <div className="payment-input">
                                    <label className="form-control">Eftpos</label>
                                    <input className="form-control amount-field" type="number" name="eftposAmount" value={eftpos} onChange={(event) => {
                                        event.preventDefault();
                                        setEftpos(helper.getFloat(event));
                                    }} />
                                </div>
                                <div className="payment-input">
                                    <label className="form-control">Cash</label>
                                    <input className="form-control amount-field" type="number" value={cash} name="cashAmount" onChange={(event) => setCash(helper.getFloat(event))} />
                                </div>
                                <div className="payment-input">
                                <label className="form-control">After Pay</label>
                                <input type="number" className="form-control after-pay-amount-field" name="storeCreditAmount" value={afterPay} onChange={(event) => setAfterPay(helper.getFloat(event))} />
                            </div>
                                <div className="payment-input">
                                    <label className="form-control">Store credit</label>
                                    <input type="number" className="form-control store-credit-amount-field" name="storeCreditAmount" value={storeCredit} onChange={(event) => setStoreCredit(helper.getFloat(event))} />
                                </div>
                                <br />
                                <span>Amount owing: {amountOwing > 0 ? amountOwing: 0.00}</span>
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