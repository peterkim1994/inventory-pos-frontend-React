export interface PaginationProps { 
    pageNumber: number, 
    numPages: number,
    pageSelectionHandler : (pageNum : number) => void 
}