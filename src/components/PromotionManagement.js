import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import InventorySearchPanel from './InventorySearchPanel';
import InventoryTable from './InventoryTable';
import PromotionForm from './PromotionForm';
import PromotionsTable from './PromotionsTable';
import PromotionProductsModal from './PromotionProductsModal';
import { AddPromotion, GetCurrentPromotions } from '../services/Promotions';
import PromotionFormModal from './PromotionFormModal';

export default function PromotionManagement() {


    const dispatch = useDispatch();

    const allPromotions = useSelector(state => state.promotionsReducer.promotions);

    const defaultPromotion = {
        promotionName: "New Promotion",
        quantity: 0,
        promotionPrice: 0.00,
        start: Date.now(),
        end: new Date(Date.now() + 604800000), //initial end date is 1 week from current
        products: [],
    };

    const [promotion, setPromotion] = useState(defaultPromotion);
   

    const AddNewPromotion = async (promo) => {
        await AddPromotion(dispatch, promo);
        await GetCurrentPromotions(dispatch);
        setPromotion(defaultPromotion);
        allPromotions.push(promo);
    }

    return (
        <div className="promotional-management">
            <div className="promotional-ui">
              <PromotionFormModal promotion={promotion} label="New Promotion" handleSubmit={AddNewPromotion} />
              
              
            </div>
                <PromotionsTable promotions={allPromotions} />
        </div>
    );
//  <PromotionForm promotion={promotion} handleSubmit={AddNewPromotion} />
}
