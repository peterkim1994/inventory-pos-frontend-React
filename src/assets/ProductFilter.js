export default class ProductFilter {
    constructor() {
        this.sizeParam = "-";
        this.colourParam = "-";
        this.categoryParam = "-";
        this.brandParam = "-";
        this.filterBrand = this.filterBrand.bind(this);
    }

    filterSize = (item) => {
        return (this.sizeParam === "-" || item.sizeId === this.sizeParam )
    }

    filterColour = (item) => {
        if (this.colourParam === "-") {
            return true;
        }
        return item.colourId === this.colourParam;
    }

    filterCategory = (item) => {
        if (this.categoryParam === "-") {
            return true;
        }      
        return item.itemCategoryId === this.categoryParam;        
    }

    filterBrand = (item) => {
        if (this.brandParam === "-") {
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