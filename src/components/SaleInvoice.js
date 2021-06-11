import React from 'react';

const SaleInvoice = ({sale, business}) => {
    const productList = sale.products.map(pr => {
        if (pr.promotionApplied = true) {
            let promo = pr.promotionName;
        }
        console.log("map func inside sale invoice");
        console.log(pr);
        return (
            <p>
                <span style={{whiteSpace:"pre-wrap"}}><b>{pr.product}</b></span>
                <span><b>{pr.priceSold.toFixed(2)}</b></span>
             </p>
        )
    });

    const paymentList = sale.payments.map(p => {
       return (
            <p>{p.paymentMethod} : {p.amount} </p>
        )
    });

    console.log("PLAYUSDGSAYU LIST ");
    console.log(sale);
    console.log(paymentList);
    let keyCount = 0;

    return (
        <div className="invoice-body">
            <div>
                <h4>Invoice Number: {sale.invoiceNumber}</h4>
                <p>{sale.date}</p>
                <ul>
                    {sale.products.map(pr => {
                        if (pr.promotionApplied = true) {
                            let promo = pr.promotionName;
                        }
                        return (
                            <li key={`invoice-item-key-${keyCount++}`}>
                                <span>{pr.product}</span>
                                <span>{pr.promotionName}</span>
                            </li>
                        )
                    })}
                </ul>
                <h3>total: {sale.total}</h3>
                <h5>Invoice: {sale.invoiceNumber}</h5>
                <p><b>{sale.dateTime}</b></p>
                <span className="product-list">
                    {productList}
                </span>
                <br />
                <span>
                    {paymentList}
                </span>
                <h5>total: ${sale.total.toFixed(2)}</h5>
            </div>
        </div>
    )
}

export const printInvoice = () => {
    var printContents = document.getElementById("printed-receipt").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

export default SaleInvoice