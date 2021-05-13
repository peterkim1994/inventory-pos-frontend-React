import InventoryTable from './InventoryTable';
import InventorySearchPanel from './InventorySearchPanel';
import React, { useState, useRef } from 'react';
import ProductFilter from '../assets/ProductFilter';
import AttributeSelector from './AttributeSelector';
import { Button, Form, Row, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';


export default function InventoryBody() {

    const products = useSelector( state => state.inventoryReducer.products );
    console.log("inventory body mounted");
    console.log(products)
    const [filteredProducts, setFilteredProducts] = useState(products);//initial state set to all products

    const searchPanelRef = useRef();
    return (
        <div >     
            <InventorySearchPanel setResults={setFilteredProducts}/>      
            <div className="inventory-table-body">           
        
                <InventoryTable products={filteredProducts} className="inventory-table-body" />
            </div>
        </div>
    );
}