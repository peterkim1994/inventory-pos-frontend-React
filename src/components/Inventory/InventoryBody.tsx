import InventoryTable from './InventoryTable';
import InventorySearchPanel from './inventorySearchV2';
import { FC, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { PageSelector } from '../Shared/pageSelector';
import '../../assets/inventory/inventory.scss'
import { GetInventoryProducts } from '../../services/inventory';
import { Product } from '../../types/product/product';
import { InventoryCatalogRequestModel } from '../../types/product/productQueryModel';

const ITEMS_PER_PAGE = 200;
const PAGE_LOAD_BUFFER = 3;

const InventoryBody : FC = () => {

    const dispatch = useDispatch();
    const [inventoryProducts, setInventoryProducts] = useState<Product[]>([]);

    const [pageSelection, setPageSelection] = useState(1);
    const [productsToDisplay, setProductsToDisplay] = useState<Product[] | null>(inventoryProducts?.slice(0, ITEMS_PER_PAGE));
    const [numPages, setNumPages] = useState(0);
    
    let pagesLoaded = Math.ceil(inventoryProducts.length / ITEMS_PER_PAGE) || 1;

    const updatePageSelection  = async (pageNum : number) : Promise<void> => {
        setPageSelection(pageNum);

        if(pageNum >= pagesLoaded){
            const productQuery : InventoryCatalogRequestModel = {
                startPage : pagesLoaded,
                endPage: PAGE_LOAD_BUFFER + pageNum,
                numItemsPerPage : ITEMS_PER_PAGE
                };

            let {products, availablePages} = await GetInventoryProducts(dispatch, productQuery);
            let newProducts = products.filter(prod => !inventoryProducts.some(p => p.id === prod.id));
            setInventoryProducts(prevState => [...prevState, ...newProducts]);
            setNumPages(availablePages);
        }
    }

    const handleSearchResults = (searchedProducts : Product[]) =>{
        setInventoryProducts(searchedProducts);
        setNumPages(Math.ceil(searchedProducts.length / ITEMS_PER_PAGE));
    }

    useEffect(()=>{
        if(inventoryProducts.length === 0){
            updatePageSelection(1);          
        }
        else{
            setProductsToDisplay(inventoryProducts.slice((pageSelection-1) * ITEMS_PER_PAGE, pageSelection * ITEMS_PER_PAGE));
            pagesLoaded = Math.ceil(inventoryProducts.length / ITEMS_PER_PAGE);
        }

    },[inventoryProducts, pageSelection]);

    return (
        <div >     
            <InventorySearchPanel searchResultHandler={handleSearchResults}/>      
            <div className="inventory-table-body">     
                {productsToDisplay.length && <InventoryTable inventoryProducts={productsToDisplay}/>}
            </div>
            <PageSelector 
                numPages={numPages}  
                pageSelectionHandler={updatePageSelection}
            />
        </div>
    );
}

export default InventoryBody