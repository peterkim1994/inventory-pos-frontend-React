import React, { useRef } from 'react';

const SaleInvoice = ({sale}) => {
    
    const invoiceRef = useRef();
    let keyNum = 0;

    const productList = sale.products.map(pr => {        
        if (pr.promotionApplied = true) {
            let promo = pr.promotionName;
        }
        return (
            <div>
                <span key={`${pr.product}-${sale.invoiceNumber}-${++keyNum}`}>
                    <span style={{whiteSpace:"pre-wrap"}}>{pr.product} </span>
                    <span>: ${pr.priceSold.toFixed(2)}</span>  
                    {pr.promotionApplied && <br/>}
                    {pr.promotionApplied &&<span style={{color:"GrayText"}}> {pr.promotionName}</span>}
                </span>               
             </div>
        )
    });

    const sumPayments = (paymentAmounts) =>{
        return paymentAmounts.reduce((a,b)=> a + b, 0);
    }

    const paymentList = sale.payments.map(p => {       
       return (
        <span key={`${sale.invoiceNumber}-${p.product}-${++keyNum}`}>
            {p.paymentMethod} : ${p.amount.toFixed(2)}
            <br/>
        </span>       
        );
    });

    // const promotionsApplied = sale.products.map(pr => {        
    //     if (pr.promotionApplied = true) {
    //         let promo = pr.promotionName;
    //     }
    //     return (
    //         <p key={`${pr.product}-${sale.invoiceNumber}${pr.promotionId}-${++keyNum}`}>
    //             <span style={{whiteSpace:"pre-wrap"}}>{pr.product} </span>
    //             <span>: ${pr.priceSold.toFixed(2)}</span>               
    //          </p>
    //     )
    // });

    let keyCount = 0;
    let refundPolicy = <span style={{fontSize:"10.5px"}}>We do not provide refunds, exchanges are provided 
    within 14 days of the <br/> purchased date. The purchased  
    product must be unused and provided with the  <br/> original receipt and product tags.</span>;

    return (
        <div className="invoice-body" ref={invoiceRef} style={{fontFamily:"Times New Roman, Times, serif", marginLeft:"2mm",position:"relative",top:"2mm"}}>
            <div>            
                L306
                <br/>
                The Base Outlet 
                <br/>
                Te Rapa Rd & Wairere Dr
                <br/>
                Hamilton 3200
                <br/>
                ------------------------------------------------------------
                <br/>
                ph: 07-849-0452
                <br/>
                GST: 125-903-118 
                <br/>
                ------------------------------------------------------------
                <br/>
                Invoice: {sale.invoiceNumber}     
                <br/>          
                {sale.dateTime}
                <br/>
                ------------------------------------------------------------
                <br/>          
                <span>Refund Policy:
                <br/>
                 {refundPolicy}
                </span>
                <br/>
                ------------------------------------------------------------
                <span className="product-list" style={{fontSize:"14.3px"}}>
                    {productList}
                </span>
                <br/>
                ------------------------------------------------------------
                <br/>                 
                <span>
                    {paymentList}
                </span>                
                <span> TOTAL: ${sumPayments(sale.payments.map(p=>p.amount)).toFixed(2)}</span>
                <br/>
            </div>
        </div>
    )
}

export const printInvoice = ( cashAmount = 0.00, changeAmount = 0.00) => {
   let divId = "printed-receipt";

    let myWindow = window.open("http://localhost:3000/printComponent", "MsgWindow", `width=${780}mm,height=${780}mm`);
    let printContents = document.getElementById(divId).innerHTML;

    myWindow.document.write('<html><head><title>receipt</title><link rel="stylesheet" type="text/css" href="../App.css"></head><body>');
    myWindow.document.write(printContents);  
    myWindow.document.write(`<br/><br/>&nbsp CASH RECIEVED: \$${cashAmount} <br/>`);
    myWindow.document.write(`&nbsp CHANGE GIVEN: \$${changeAmount}`);
    myWindow.document.write('</body></html>');
    setTimeout(()=> myWindow.print(), 200);   
  //  myWindow.onafterprint = myWindow.close;
}
 
export default SaleInvoice