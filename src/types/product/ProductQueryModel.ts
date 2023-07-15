class AllProductQueryModel {
    pageNum: number;
    storeId: number;
    numItemsPerPage: number;

    constructor(pageNum: number, storeId: number, numItemsPerPage: number) {
        this.pageNum = pageNum;
        this.storeId = storeId;
        this.numItemsPerPage = numItemsPerPage;
    }
}