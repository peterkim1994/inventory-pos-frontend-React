//not actually a react component, its a function that results in the printing of a receipt


const SaleInvoice = ( sale, business ) => {

    const productList = sale.products.map(pr => {
        if (pr.promotionApplied = true) {
            let promo = pr.promotionName;
        }
        return (
            `<p>
                <span style="white-space:pre-wrap;"><b>${pr.product}</b></span>
                <span><b>${pr.priceSold.toFixed(2)}</b></span>
             </p>`
        )
    });

    let productListString = "";
    productList.forEach(element => {
        productListString += element;
    });

    let paymentsString = "";
    sale.payments.forEach(p => {
        paymentsString += (
            `<p>${p.paymentMethod} : \$ ${p.amount} </p>`
        );
    });


    const receipt = ` 
        <div className="printed-receipt" >
        <h2>GIVE ME BLOWJOB </h2>
            <div className="invoice-header">
                <h2>${business.storeName}</h2>
                <p><b>${business.address}</b></p>
                <p><b>${business.gstNum}</b></p>
                <p><b>${business.contact}</b></p>
            </div>
            <div>
                <h5>Invoice: ${sale.invoiceNumber}</h5>
                <p><b>${sale.dateTime}</b></p>
                <span className="product-list">
                    ${productListString}
                </span>
                <br/>
                <span>
                    ${paymentsString}
                </span>              
                <h5>total:$ ${sale.total.toFixed(2)}</h5>
            </div>
        </div>
    `;

    (function printDiv() {
        var printContents = receipt; //document.getElementById("sale-invoice-receipt").innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        console.log(receipt);
        window.print();
        document.body.innerHTML = originalContents;
    }());

}
export default SaleInvoice