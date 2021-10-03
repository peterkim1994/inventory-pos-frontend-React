import React, { useRef } from 'react';

const SaleInvoice = ({sale}) => {
    
    const invoiceRef = useRef();

    const productList = sale.products.map(pr => {
        if (pr.promotionApplied = true) {
            let promo = pr.promotionName;
        }
        return (
            <p>
                <span style={{whiteSpace:"pre-wrap"}}>{pr.product}</span>
                <span>${pr.priceSold.toFixed(2)}</span>               
             </p>
        )
    });

    const sumPayments = (paymentAmounts) =>{
        return paymentAmounts.reduce((a,b)=> a + b, 0);
    }

    const paymentList = sale.payments.map(p => {
       return (
            <p>{p.paymentMethod} : ${p.amount.toFixed(2)} </p>
        );
    });

    console.log(sale);
    console.log(paymentList);
    let keyCount = 0;

    return (
        <div className="invoice-body" ref={invoiceRef}>
            <div>
                <p>Invoice: {sale.invoiceNumber}</p>                
                {sale.dateTime}
                <br/>
                <span className="product-list">
                    {productList}
                </span>
                <br />
                <span>
                    {paymentList}
                </span>
                <h5>TOTAL: ${sumPayments(sale.payments.map(p=>p.amount)).toFixed(2)}</h5>
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

export const printInvoice = (numItems) => {
    let divId = "printed-receipt";
    let height = 370;
    if(numItems > 4){
        height = (100 * numItems) + 200;
    }
    let myWindow = window.open("http://localhost:3000/printComponent", "MsgWindow", `width=${300}mm,height=${height}mm`);
    let printContents = document.getElementById(divId).innerHTML;
    myWindow.document.write(printContents);  
//    myWindow.document.write(invoiceRef.current.innerHTML);   
   // console.log(productRef.current.innerHTML);   
   // let printContents = document.getElementById("printable-label");
 //   printContents.appendChild(productRef.current);
    myWindow.print();   
    myWindow.onafterprint = myWindow.close();
}

export default SaleInvoice