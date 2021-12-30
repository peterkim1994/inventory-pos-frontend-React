import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import ProductLabel from "./ProductLabel";
import { GetTheseProducts } from "../services/Inventory";
import { ClearBulkPrintList } from "../services/Transactions";
import React from "react";
import { RestockProductSales } from "../services/Transactions";

//list for bulk products to print
export const BulkPrintList = () => {
    const productList = useSelector(state => state.transactionsReducer.bulkPrintList);
    const dispatch = useDispatch();
    const [products,setProducts] = useState(productList);
    const ref = useRef();
    const [productLabels, setProductLabels] = useState([]);
    let i = 0;

    useEffect(async ()=>{
        await setProducts(productList);
        let prods = await GetTheseProducts(products.map(p=>p.productId));
        console.log(prods);
        await setProductLabels(prev => ([...productList.map(p=> prods.find(x => x.id === p.productId))]));  
        console.log(productLabels);
    }, [productList]);

    const bulkPrintProducts = async() =>{
        var myWindow = window.open("http://localhost:3000/printComponent", "MsgWindow", `width=${600}mm,height=${600}mm`);
        setTimeout(()=> myWindow.document.write(ref.current.innerHTML), 500); 
        setTimeout(()=>  myWindow.print, 500);  
        await RestockProductSales(dispatch,productList);
    }

    const onAfterPrinting = (myWindow) =>{
        myWindow.print();
        RestockProductSales(dispatch,productList );
    }

    const clearBulkPrintList = async()=> {
        await ClearBulkPrintList(dispatch);
        setProductLabels([]);
    }

    return (
        <div className="bulk-print-list">
           <h3> Bulk Print List {products.length}</h3>            
            <button className="btn btn-primary" onClick={bulkPrintProducts}>bulk print</button>
            <button className= "btn btn-secondary" onClick={clearBulkPrintList}> clear</button>
            <div className="printabless">
                <div ref={ref} name style={{ width:"50mm", maxHeight:`${productLabels.length * 28}mm`,minHeight:`${productLabels.length * 28}mm`, height:`${productLabels.length * 28}mm` }}>
                    {productLabels.map(p => {                        
                        return <div style={{maxHeight:"28mm",minHeight:"28mm", height:"28mm", width:"50mm"}}>                        
                            {p && <ProductLabel product={p} key={`product-barcode-bulk-print-${i++}`} />}
                        </div>
                    })}
                </div>
            </div>
        </div>
    );

  //  <ul hidden={products.length == 0} style={{listStyleType:"none"}}>
  // {products && products.length > 0  && products.map(p => 
  //       <li key={`${p.id}-produictSale`}> {p.product}</li>
  //  )}
  //  </ul>
}