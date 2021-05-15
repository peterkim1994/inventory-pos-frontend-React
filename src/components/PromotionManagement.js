import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import InventorySearchPanel from './InventorySearchPanel';
import InventoryTable from './InventoryTable';
import PromotionForm from './PromotionForm';
import PromotionsTable from './PromotionsTable';
import PromotionProductsModal from './PromotionProductsModal';
import {AddPromotion, GetCurrentPromotions} from '../services/Promotions';

export default function PromotionManagement() {
   

    const dispatch = useDispatch();    
    const promotions = useSelector(state=> state.promotionsReducer.promotions);

    const AddNewPromotion = (promo) =>{     
        AddPromotion(dispatch, promo);
    }

    const defaultPromotion = {
        promotionName: "",
        quantity: 0,
        promotionPrice: 0.00,
        start: Date.now(),
        end: new Date(Date.now() + 604800000), //initial end date is 1 week from current
        products: [],
    } 

    const [promotion, setPromotion] = useState(defaultPromotion);

    return (
        <div className="promotional-management">
            <PromotionsTable promotions={promotions} />
            <div className="promotional-ui">
                <PromotionForm promotion={promotion} handleSubmit={AddNewPromotion} />
            </div>
        </div>
    );

}
