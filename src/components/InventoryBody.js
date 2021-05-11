import InventoryTable from './InventoryTable';
import InventorySearchPanel from './InventorySearchPanel';
import React, { useState } from 'react';
import ProductFilter from '../assets/ProductFilter';

export default function InventoryBody({ products }) {

    const [productSearch, setProductSearch] = useState(products);
    const productFilterObj = new ProductFilter();
    const [productFilter, setProductFilter] = useState(productFilterObj);

    return (
        <div>
            <InventorySearchPanel />
            <InventoryTable products={productSearch} />
        </div>
    );
}