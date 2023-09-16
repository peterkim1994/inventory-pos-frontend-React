export interface InventoryCatalogRequestModel {
    startPage: number;
    endPage: number;
    numItemsPerPage: number;
    storeId?: number;
}