import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateBulkPrintList } from "../services/Transactions";
import Helper from "../util/Helper";

const ProductsSoldTable = () => {

    const transactions = useSelector(state => state.transactionsReducer.transactions);
    const dispatch = useDispatch();
    const products = transactions.flatMap(t => t.products);
    console.log(" products table");
    console.log(products);
    let keyCounter = 0;
    const [bullkPrintProducts, setBulkPrintProducts] = useState([]);

    useEffect(() => {        
        if(!bullkPrintProducts || bullkPrintProducts.length === 0){
     //       initBulkPrintList();
        }        
    },[products.length]);


    const initBulkPrintList =()=>{
        let i = 0;
        let updatedList = [];
        let k=0;
        while (k < 10 && i < products.length) {
            let product = products[i++];
            if (product.restocked === false) {
                updatedList.push(product);           
                k++;                    
            }
        } 
        setBulkPrintProducts([...updatedList]);
        UpdateBulkPrintList(dispatch, [...updatedList]);
    }

    const handleCheckBoxClick = (productSale) => {
        let updatedBulkProductList = [];
        if (bullkPrintProducts.includes(productSale)) {
            updatedBulkProductList = bullkPrintProducts.filter(p => p.id !== productSale.id);
        } else {

            updatedBulkProductList = bullkPrintProducts.concat(productSale);         
            console.log(bullkPrintProducts.concat(productSale));
        }
        setBulkPrintProducts([...updatedBulkProductList]);
        UpdateBulkPrintList(dispatch, [...updatedBulkProductList]);
    }

    const bulkPrintCheckBox = (productSaleId) => {
        return (
            <input type="checkbox" onClick={() => handleCheckBoxClick(productSaleId)} checked={bullkPrintProducts.includes(p => p.id == productSaleId)} />
        )
    }


    const isInBulkPrint = (productSale) =>{
        if(bullkPrintProducts && bullkPrintProducts.includes(productSale)){
            return "secondary";
        }
        else if (productSale.restocked){
            return "info";
        }
        else{
            return "warning";
        }
    }

    //checked={bullkPrintProducts && bullkPrintProducts.includes(productSale)}
    
    return (
        <div >
            <table className='table table-striped table-hover products-sold'>
                <thead>
                    <tr key={"products-sold-header-row"}>
                        <th className="table-col"> SaleInvoice Number </th>
                        <th className="table-col"> Product ID</th>
                        <th className="table-col"> Product Details </th>
                        <th className="table-col"> Date Sold</th>
                        <th className="table-col"> Restocked</th>
                        <th className="table-col"> Bulk-Print</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        products.map(productSale =>  
                            <tr key={"products-sold-" + productSale.id + keyCounter++} id={`product-sale-row-${productSale.id}`} style={{ height: "50%" }}>
                                <td className="table-col"> {productSale.saleInvoiceId} </td>
                                <td className="table-col"> {productSale.productId} </td>
                                <td className="table-col"> {productSale.product} </td>
                                <td className="table-col"> {transactions.filter(t => t.id == productSale.saleInvoiceId)[0].dateTime}</td>
                                <td className="table-col"> {productSale.restocked ? "yes" : "no"} </td>
                                <td className="table-col"> <button  className={`btn btn-${isInBulkPrint(productSale)}`} onClick={() => handleCheckBoxClick(productSale)}> Add To Bulk Print</button> </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductsSoldTable;