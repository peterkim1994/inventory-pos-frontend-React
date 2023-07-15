export interface Products {
    id: number;
    barcode?: number;
    manufactureCode?: string;
    description?: string;
    brandId?: number;
    brandValue?: string;
    colourId?: number;
    colourValue?: string;
    itemCategoryId?: number;
    itemCategoryValue?: string;
    sizeId?: number;
    sizeValue?: string;
    price?: number;
    qty?: number;
    active?: boolean;
  }