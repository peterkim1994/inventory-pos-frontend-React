import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PromotionProductsModal from './PromotionProductsModal';
import { GetPromotionsProducts } from '../services/Promotions';

const PromotionsTable = ({ promotions }) => {
    const dispatch = useDispatch();

    const [showPromotion, setShow ] = useState(0);
    const handleClose = () => setShow(0);
 //   const handleClose = () => setShow(false);

    const showPromotionProducts = async (promo) => {     
      await GetPromotionsProducts(dispatch, promo.id);
      setShow(promo.id);
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
                                <Button variant="warning" >Edit</Button>
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