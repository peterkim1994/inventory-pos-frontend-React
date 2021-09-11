import React from "react";
import Helper from "../util/Helper";


const ProductsSoldTable = ( {productsSold} ) => {

    const getPaymentType = (s, paymentType)=>{
         return s.paymentMethodId == paymentType;
    }

    console.log("transactions table");
    console.log(transactions);
    return(
        <div >
        <table className='table table-striped table-hover'>
            <thead>
                <tr key={"transactions-header-row"}>     
                    <th className="table-col"> SaleInvoice Number </th>                   
                    <th className="table-col"> Date and time </th>                 
                    <th className="table-col"> Product ID </th>                   
                    <th className="table-col"> Brand </th>
                    <th className="table-col"> Type </th>
                    <th className="table-col"> Colour</th>
                    <th className="table-col"> Size </th>
                    <th className="table-col"> Price Sold </th>
                </tr>
            </thead>
            <tbody >
                {
                        products.map(productSale =>
                        <tr key={productSale.id} id={`product-sale-row-${productSale.id}`} style={{height:"50%"}}>                                
                            <td className="table-col"> {sale.invoiceNumber} </td>
                                                                            
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
    )    
}

export default TransactionsTable;