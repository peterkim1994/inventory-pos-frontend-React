import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import InventorySearchPanel from './InventorySearchPanel';
import InventoryTable from './InventoryTable';
import PromotionForm from './PromotionForm';
import {AddPromotion} from '../services/Promotions';



export default function PromotionProductsModal({products}) {

    const products = useSelector(state => state.inventoryReducer.products);
    const [filteredProducts, setFilteredProducts] = useState(products);//initial state set to all products

    const [selectedProducts, setSelectedProducts] = useState([]); //products checked/selected

    const defaultPromotion = {
        promotionName: "",
        quantity: 0,
        promotionPrice: 0.00,
        start: Date.now(),
        end: new Date(Date.now() + 604800000), //initial end date is 1 week from current
        products: [],
    } 

    const [promotion, setPromotion] = useState(defaultPromotion);

    const dispatch = useDispatch();

    const AddNewPromotion = (promo) =>{     
        AddPromotion(dispatch, promo);
    }

    const handleSelect = (event) => {
        const selectedItemId = parseInt(event.target.value);
        if (event.target.checked) {
            const selectedProductId = selectedItemId;
            setSelectedProducts({ ...selectedProducts, selectedProductId });
        } else {
            let updatedSelection = selectedProducts.filter((item) => item.id !== selectedItemId);
            setSelectedProducts(updatedSelection);
        }
    }

    return (
        <div className="promotional-management">
            <div className="promotional-inventory-panel" style={{ textAlign: "left" }}>
                <InventorySearchPanel setResults={setFilteredProducts} />
                <InventoryTable products={filteredProducts} selectEnabled={true} handleSelect={handleSelect} />
            </div>
            <div className="promotional-ui">
                <PromotionForm promotion={promotion} handleSubmit={AddNewPromotion} />
            </div>
        </div>
    );
    // handleChange={setPromotion} 
}

export default PromotionProductsModal