import { ProductAttribute } from './productAttribute';

export interface SearchQuery {
    brand: ProductAttribute | null;
    colour: ProductAttribute | null;
    size: ProductAttribute | null;
    category: ProductAttribute | null;
    searchString: string | null;
}

export const defaultSearchCriteria: SearchQuery = {
    brand: null,
    category: null,
    size: null,
    colour: null,
    searchString: null
}