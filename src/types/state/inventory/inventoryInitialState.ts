import { Product } from "../../product/product";
import { ProductAttribute } from "../../product/productAttribute";

export interface InitialState{
    products : Product[],
    colours : ProductAttribute[],
    sizes: ProductAttribute[],
    categories: ProductAttribute[],
    brands: ProductAttribute[]
}