import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { GetPromotions } from '../services/Promotions';



const PromotionsTable = ({ promotions }) => {

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
                </thead>
                <tbody>
                    {promotions.map(promo =>
                        <tr key={promo.id}>
                            <td>{promo.promotionName}</td>
                            <td>{promo.start}</td>
                            <td>{promo.end}</td>
                            <td>
                                <Button>Edit</Button>
                            </td>
                            <td>
                                <Button>Edit Promotion Products</Button>
                            </td>
                        </tr>

                    )}
                </tbody>

            </table>
        </div>
    )
}