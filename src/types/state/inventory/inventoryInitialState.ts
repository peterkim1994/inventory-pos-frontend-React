import { Product } from "../../product/prouduct";
import { ProductAttribute } from "../../product/productAttribute";

export interface InitialState{
    products : Product[],
    colours : ProductAttribute[],
    sizes: ProductAttribute[],
    categories: ProductAttribute[],
    brands: ProductAttribute[]
}