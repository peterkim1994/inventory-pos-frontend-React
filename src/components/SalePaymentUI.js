import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux"


const SalePaymentUI = ({ total }) => {

    const payOptionsUi = useRef();
    const [eftpos, setEftpos] = useState(0.00);
    const [cash, setCash] = useState(0.00);
    const [storeCredit, setStoreCredit] = useState(0.00);

    const enableMoreOptions = () => {
        payOptionsUi.current.hidden = false;
    }

    const updateCashPayment = (amount) => {
        setCash(amount);
    }

    const autoCalculate = (event, setPaymentAmount) => {
        //setPaymentAmount is the call back function for the payment type which was entered
        const paymentAmount = parseFloat(event.target.value).toFixed(2);       
        if (storeCredit === 0) {
            const autoCalcFor = (event.target.name === "eftposAmount") ? setCash : setEftpos;
            setPaymentAmount(paymentAmount);
            const remainingAmount = (total - paymentAmount).toFixed(2);
            autoCalcFor(remainingAmount);
        }else{
            setPaymentAmount(paymentAmount);
        }
    }

    return (
        <div className="payment-controls">
            <span>TOTAL: {total}</span>
            <form >
                <input type="radio" id="eftposPay" name="paymentType" value="EFTPOS" />
                <label for="eftposPay">EFTPOS</label>
                <input type="radio" id="cashPay" name="paymentType" value="CASH" />
                <label for="eftposPay">CASH</label>
            </form>
            <input type="button" value="More Options" onClick={enableMoreOptions} />
            <form className="payment-controls" ref={payOptionsUi} hidden={true}>
                <label>EFTPOS</label>
                <input type="number" name="eftposAmount" value={eftpos} onChange={(event) => autoCalculate(event, setCash)}/>
                <label>CASH</label>
                <input type="number" value={cash} name="cashAmount" onChange={(event) => autoCalculate(event, setCash)} />
                <label>STORE CREDIT</label>
                <input type="number" value={storeCredit} onChange={(event)=>setStoreCredit(parseFloat(event.target.value).toFixed(2))} />
                <br/>
            </form>
            <button > complete sale</button>
        </div>
    )
}

export default SalePaymentUI