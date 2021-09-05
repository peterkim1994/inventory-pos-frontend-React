export default class ProductFilter {
    constructor() {
        this.sizeParam = -1;
        this.colourParam = -1;
        this.categoryParam = -1;
        this.brandParam = -1;
        this.filterBrand = this.filterBrand.bind(this);
    }

    filterSize = (item) => {
        return (this.sizeParam ===  -1 || item.sizeId === this.sizeParam )
    }

    filterColour = (item) => {
        if (this.colourParam ===  -1) {
            return true;
        }
        return item.colourId === this.colourParam;
    }

    filterCategory = (item) => {
        if (this.categoryParam ===  -1) {
            return true;
        }      
        return item.itemCategoryId === this.categoryParam;        
    }

    filterBrand = (item) => {
        if (this.brandParam === -1) {
            return true;
        }              
        return item.brandId === this.brandParam;        
    }

    filterProducts = (item) => {
        return (
            this.filterSize(item)
            && this.filterColour(item)
            && this.filterCategory(item)
            && this.filterBrand(item)
       )
    }
}