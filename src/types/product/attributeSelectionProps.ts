import { ProductAttribute } from "./productAttribute";

export interface AttributeSelectionProps {
    attributes: ProductAttribute[],
    attributeCategory: string,
    selectEventHandler: (event: any) => void,
    initialAttributeValueId?: number,
}