import InventoryTable from './InventoryTable';
import InventorySearchPanel from './InventorySearchPanel';
import { FC, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { PageSelector } from '../Shared/pageSelector';
import '../../assets/inventory/inventory.scss'
import { GetInventoryProducts } from '../../services/inventory';
import { Product } from '../../types/product/prouduct';
import { AllProductQueryModel } from '../../types/product/productQueryModel';

const  InventoryBody : FC  = () => {

    const storeId : number = useSelector<any>(state=> state.userReducer.storeId ) as number;
    const numProductsToDiplay = 150;
    const dispatch = useDispatch;
    //GetInventoryProducts(dispatch, new AllProductQueryModel(1, storeId, numProductsToDiplay));

    const products : Product[] = useSelector<any>(state=> state.inventoryReducer.products ) as Product[]; //tidy later

    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);//initial state set to all products
    const [pageSelection, setPageSelection] = useState<number>(1);
    const [productsToDisplay, setProductsToDisplay] = useState<Product[] | null>(products.slice(0, numProductsToDiplay));
    const [numPages, setNumPages] = useState<number>(Math.ceil(filteredProducts.length / numProductsToDiplay));

    const updateProductsToDiplay = (pageNum : number) : void => {
        setProductsToDisplay(filteredProducts.slice((pageNum-1) * numProductsToDiplay, pageNum * numProductsToDiplay));
        setPageSelection(pageNum);
        setNumPages(Math.ceil(filteredProducts.length / numProductsToDiplay));
    }

    useEffect(()=>{
        const initProductQuery = async () => {
            await GetInventoryProducts(dispatch, new AllProductQueryModel(pageSelection, storeId, numProductsToDiplay));
            updateProductsToDiplay(pageSelection);
        };
        if(products.length === 0){
            initProductQuery();
        }
    },[]);

    return (
        <div >     
            <InventorySearchPanel setResults={setFilteredProducts}/>      
            <div className="inventory-table-body">     
                <InventoryTable products={productsToDisplay} className="inventory-table-body" />
            </div>
            <PageSelector 
                numPages={numPages} 
                pageNumber={pageSelection} 
                pageSelectionHandler={updateProductsToDiplay}
            />
        </div>
    );
}

export default InventoryBody