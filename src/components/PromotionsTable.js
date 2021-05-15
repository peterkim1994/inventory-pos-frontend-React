import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PromotionFormModal from './PromotionFormModal';
import PromotionProductsModal from './PromotionProductsModal';
import { GetPromotionsProducts, EditPromotion } from '../services/Promotions';


const PromotionsTable = ({ promotions }) => {
    const dispatch = useDispatch();

    const [showPromotion, setShowPromotion ] = useState(0);
    const handleClose = () => setShowPromotion(0);

    const showPromotionProducts = async (promo) => {     
        await GetPromotionsProducts(dispatch, promo.id);
        setShowPromotion(promo.id);
    }

    const editPromotion = (promotion) =>{
        EditPromotion(dispatch, promotion);
    }

    return (
        <div>
            <table className="table promotions-table">
                <thead>
                    <tr>
                    <th> Promotion Name </th>
                    <th> Start Date </th>
                    <th> End Date </th>
                    <th> </th>
                    <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.map(promo =>
                        <tr key={promo.id}>
                            <td>{promo.promotionName}</td>
                            <td>{promo.start}</td>
                            <td>{promo.end}</td>
                            <td>
                               <PromotionFormModal promotion={promo} handleSubmit={editPromotion} />
                            </td>
                            <td>
                                <Button onClick={() => showPromotionProducts(promo)}>Edit Promotions Products</Button>
                            </td>
                            {showPromotion === promo.id && <PromotionProductsModal promotion={promo} handleClose={handleClose} className="promotional-inventory-modal" />}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PromotionsTable