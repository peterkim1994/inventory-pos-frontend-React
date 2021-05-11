export default class ProductFilter {
    constructor() {
        this.sizeParam = null;
        this.colourParam = null;
        this.categoryParam = null;
        this.brandParam = null;
        this.filterBrand = this.filterBrand.bind(this);
    }
    filterSize = (item) => {
        if (this.sizeParam === null) {
            return true;
        }
        return item.sizeId === this.sizeParam;
    }
    filterColour = (item) => {
        if (this.colourParam === null) {
            return true;
        }
        return item.colourId === this.colourParam;
    }
    filterCategory = (item) => {
        if (this.categoryParam === null) {
            return true;
        }      
        return item.itemCategoryId === this.categoryParam;        
    }

    filterBrand = (item) => {
        console.log("filter debug");
        console.log(item.brandId);
        console.log(this.brandParam);
        if (this.brandParam === null) {
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