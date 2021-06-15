import React from 'react';

const SaleInvoice = ({sale, business}) => {
    const productList = sale.products.map(pr => {
        if (pr.promotionApplied = true) {
            let promo = pr.promotionName;
        }
        return (
            <p>
                <span style={{whiteSpace:"pre-wrap"}}><b>{pr.product}</b></span>
                <span><b>${pr.priceSold.toFixed(2)}</b></span>
             </p>
        )
    });

    const paymentList = sale.payments.map(p => {
       return (
            <p>{p.paymentMethod} : ${p.amount.toFixed(2)} </p>
        );
    });

    console.log("PLAYUSDGSAYU LIST ");
    console.log(sale);
    console.log(paymentList);
    let keyCount = 0;

    return (
        <div className="invoice-body">
            <div>
                <h4>Invoice Number: {sale.invoiceNumber}</h4>                
                <p><b>{sale.dateTime}</b></p>
                <span className="product-list">
                    {productList}
                </span>
                <br />
                <span>
                    {paymentList}
                </span>
                <h4>total: ${sale.total.toFixed(2)}</h4>
            </div>
        </div>
    )
}

export const printInvoice = (divId = "printed-receipt") => {
    var printContents = document.getElementById(divId).innerHTML;
    var originalContents = document.body.innerHTML;
 //   document.body.innerHTML = printContents;
 //   window.print();
  //  document.body.innerHTML = originalContents;
    var myWindow = window.open("", "MsgWindow", "width=500,height=800");
    myWindow.document.write(printContents);   
    myWindow.print();
}

export default SaleInvoice