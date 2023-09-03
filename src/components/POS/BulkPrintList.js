import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import ProductLabel from "./Printables/ProductLabel";
import { GetTheseProducts } from "../../services/inventory";
import { ClearBulkPrintList } from "../../services/Transactions";
import React from "react";
import { RestockProductSales } from "../../services/Transactions";
import { MedLabel, GetBulkMedLabelDimensions } from '../../data/LabelDimensions';

//list for bulk products to print
export const BulkPrintList = () => {
    const productList = useSelector(state => state.transactionsReducer.bulkPrintList);
    const dispatch = useDispatch();
    const [products,setProducts] = useState(productList);
    const ref = useRef();
    const [productLabels, setProductLabels] = useState([]);
    let i = 0;
    let dimensions;
    useEffect(async ()=>{
        await setProducts(productList);
        let prods = await GetTheseProducts(productList.map(p=>p.productId));
        await setProductLabels(prev => ([...productList.map(p=> prods.find(x => x.id === p.productId))]));  
        dimensions = GetBulkMedLabelDimensions(productList.length);
    }, [productList]);

    const bulkPrintProducts = async() =>{
        var myWindow = window.open("http://localhost:3000/printComponent", "MsgWindow", `width=${600}mm,height=${600}mm`);
        setTimeout(()=>{
            myWindow.document.write(ref.current.innerHTML);
            myWindow.document.body.style.marginTop=0; 
            myWindow.print() }, 500); 
        
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
   
    //clear button was broken--- fix later
    return (
        <div className="bulk-print-list" >
           <h3> Bulk Print List {products.length}</h3>            
            <button className="btn btn-primary" onClick={bulkPrintProducts}>bulk print</button>
            <button className= "btn btn-secondary" onClick={clearBulkPrintList} hidden> clear</button>
            <br/>
            <br/>
            <div className="printables"style={{position:"relative", left:"60px"}}>
                <div ref={ref} style={{...dimensions}}>
                    {productLabels.map(p => {                        
                        return <div key={`product-barcode-bulk-print-${i++}`}>                        
                            {p && <ProductLabel product={p} />}
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