import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import EditProductModal from './EditProductModal';


const InventoryTable = ({ products, selectEnabled }) => {

    // const products = useSelector( state => state.inventoryReducer.products );
    // const dispatch = useDispatch();    
    // useEffect(() => {
    //     GetInventory(dispatch);
    //     console.log(products);
    // }, [])
 

    //class name for root dive has typo
    return (
        <div className="inventory-table-bodys">
            <table className='table table-striped table-hover inventory-table'>
                <thead>
                    <tr>
                        {selectEnabled && <th className="table-col"> </th>}
                        <th className="table-col"> Brand </th>
                        <th className="table-col"> Category </th>
                        <th className="table-col"> Colour </th>
                        <th className="table-col"> Size </th>
                        <th className="table-col"> Description </th>
                        <th className="table-col"> Price </th>
                        <th className="table-col"> Quantity</th>
                        <th className="table-col"> </th>
                    </tr>
                </thead>
                <tbody >
                    {
                        products.map(pr =>
                            <tr key={pr.id}>
                                {
                                    selectEnabled &&
                                    <td className="table-col">
                                        <input type="checkbox" value={pr.id} />
                                    </td>
                                }
                                <td className="table-col"> {pr.brandValue} </td>
                                <td className="table-col"> {pr.itemCategoryValue} </td>
                                <td className="table-col"> {pr.colourValue} </td>
                                <td className="table-col"> {pr.sizeValue} </td>
                                <td className="table-col"> {pr.description} </td>
                                <td className="table-col"> {pr.price} </td>
                                <td className="table-col"> {pr.qty} </td>
                                <td className="table-col">
                                    <EditProductModal product={pr} />

                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default InventoryTable;