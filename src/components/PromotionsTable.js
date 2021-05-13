import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { GetPromotions } from '../services/Promotions';
import PromotionProductsModal from './PromotionProductsModal';
import { useState } from 'react';

const PromotionsTable = ({ promotions }) => {

    const [promotion, setPromotion] = useState();

    const showPromotionProducts = (promo) => {
        console.log(promotion);
        if (promotion === undefined)
            setPromotion(promo);
        //  return (<PromotionProductsModal promotion={promotion} />);
    }

    const handleClose = () => setPromotion();

    return (
        <div>
            <table className="table">
                <thead>
                    <th>
                        Promotion Name
                    </th>
                    <th>
                        Start
                    </th>
                    <th>
                        End
                    </th>
                    <th> </th>    
                    <th> </th>

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
                            {promotion && promotion.id === promo.id && <PromotionProductsModal promotion={promo} handleClose={handleClose} className="promotional-inventory-modal" />}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PromotionsTable