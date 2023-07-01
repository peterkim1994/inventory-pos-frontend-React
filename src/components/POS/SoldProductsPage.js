import { BulkPrintList } from "./BulkPrintList";
import ProductsSoldTable from "./SoldProductsTable";

export const SoldProductsPage = () =>{
    return(
        <div className="sold-products-page">
            <div className="sold-products-page-sold-table">
                <ProductsSoldTable />
            </div>
            <div className="sold-products-page-bulk-list">
                <BulkPrintList />
            </div>        
        </div>
    )
}
