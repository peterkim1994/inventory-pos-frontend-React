import InventoryTable from './InventoryTable';
import InventorySearchPanel from './InventorySearchPanel';
import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';


export default function InventoryBody() {

    const products = useSelector( state => state.inventoryReducer.products );
    const [filteredProducts, setFilteredProducts] = useState(products);//initial state set to all products

   // useEffect(()=>{
   //     setFilteredProducts(products);
  //  },[products]);

    return (
        <div >     
            <InventorySearchPanel setResults={setFilteredProducts}/>      
            <div className="inventory-table-body">     
                <InventoryTable products={filteredProducts} className="inventory-table-body" />
            </div>
        </div>
    );
}