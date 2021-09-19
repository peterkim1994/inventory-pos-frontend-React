import React from "react";
import { useSelector } from "react-redux";
import Helper from "../util/Helper";


const ProductsSoldTable = ( ) => {

    const transactions = useSelector(state => state.transactionsReducer.transactions);

    const products = transactions.flatMap(t=> t.products);
    console.log(" products table");
    console.log(products);

    return(
        <div >
        <table className='table table-striped table-hover products-sold'>
            <thead>
                <tr key={"products-sold-header-row"}>     
                    <th className="table-col"> SaleInvoice Number </th>                                
                    <th className="table-col"> Product ID</th>                   
                    <th className="table-col"> Product Details </th>
                </tr>
            </thead>
            <tbody >
                {
                    products.map(productSale =>
                        <tr key={productSale.id} id={`product-sale-row-${productSale.id}`} style={{height:"50%"}}>                                
                            <td className="table-col"> {productSale.saleInvoiceId} </td> 
                            <td className="table-col"> {productSale.productId} </td>
                            <td className="table-col"> {productSale.product} </td>                                                                         
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
    )    
}

export default ProductsSoldTable;