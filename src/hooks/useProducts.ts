import { useState } from "react";
import { Product } from "../types/product/product";

export const useProducts = (initialProducts: Product[]): [Product[], (product: Product[]) => void, (product: Product) => void] => {

    const [products, setProducts] = useState<Product[]>(initialProducts);

    const updateProduct = (updatedProduct: Product) => {
        const updatedProductList = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        setProducts(updatedProductList);
    }

    return [products, setProducts, updateProduct]
}