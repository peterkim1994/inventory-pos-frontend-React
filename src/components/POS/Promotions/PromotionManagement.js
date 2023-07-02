import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import PromotionsTable from './PromotionsTable';
import { AddPromotion, GetCurrentPromotions } from '../../../services/Promotions';
import PromotionFormModal from './PromotionFormModal';

export default function PromotionManagement() {

    const dispatch = useDispatch();
    const allPromotions = useSelector(state => state.promotionsReducer.promotions);

    useEffect(()=>{
        GetCurrentPromotions(dispatch);
    },[]);


    const defaultPromotion = {
        promotionName: "New Promotion",
        quantity: 1,
        promotionPrice: 0.01,
        start: new Date().toISOString().slice(0, 10),
        end: new Date(Date.now() + (4*604800000)).toISOString().slice(0, 10), //initial end date is 1 month from current
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
}