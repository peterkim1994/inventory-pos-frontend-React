import React, { useRef } from 'react';

const SaleInvoice = ({sale}) => {
    
    const invoiceRef = useRef();
    let keyNum = 0;

    const productList = sale.products.map(pr => {        
        if (pr.promotionApplied = true) {
            let promo = pr.promotionName;
        }
        return (
            <p key={`${pr.product}-${sale.invoiceNumber}-${++keyNum}`}>
                <span style={{whiteSpace:"pre-wrap"}}>{pr.product} </span>
                <span>: ${pr.priceSold.toFixed(2)}</span>  
                {pr.promotionApplied && <br/>}
                {pr.promotionApplied &&<span style={{color:"GrayText"}}> {pr.promotionName}</span>}
             </p>
        )
    });

    const sumPayments = (paymentAmounts) =>{
        return paymentAmounts.reduce((a,b)=> a + b, 0);
    }

    const paymentList = sale.payments.map(p => {       
       return (
        <p key={`${sale.invoiceNumber}-${p.product}-${++keyNum}`}>
            {p.paymentMethod} : ${p.amount.toFixed(2)}
        </p>
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

    return (
        <div className="invoice-body" ref={invoiceRef} style={{fontFamily:"Times New Roman, Times, serif",marginLeft:"2mm",position:"relative",top:"2mm"}}>
            <div>            
                <p>The Base Parade, Te Rapa, Hamilton 3200</p>
                <p>ph: 07-849-0452</p>
                <p>GST: 125-903-118</p>
                <p>Invoice: {sale.invoiceNumber}</p>                
                {sale.dateTime}
                <br/>
                ------------------------------------------------------------
                <span className="product-list" style={{fontSize:"14.3px"}}>
                    {productList}
                </span>
                <br />
                <span>
                    {paymentList}
                </span>                
                <span> TOTAL: ${sumPayments(sale.payments.map(p=>p.amount)).toFixed(2)}</span>
            </div>
        </div>
    )
}

// export const printInvoice = (divId = "printed-receipt") => {
//     let printContents = document.getElementById(divId).innerHTML;
//     var originalContents = document.body.innerHTML;
//  //   document.body.innerHTML = printContents;
//  //   window.print();
//   //  document.body.innerHTML = originalContents;
//     var myWindow = window.open("", "MsgWindow", "width=500,height=800");
//     myWindow.document.write(printContents);   
//     myWindow.print();
// }

// {
//     sale.ChangeOwed && sale.totalCashRecieved ? 
//         <span> CASH AMOUNT RECIEVED: {sale.totalCashRecieved} <br/>
//         CHANGE OWED:{sale.ChangeOwed } </span> 
//     : "s"
// }

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