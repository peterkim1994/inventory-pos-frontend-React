import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from '../redux/InventoryReducer';
import { GetInventory } from '../services/Inventory';
import { Button } from 'react-bootstrap';
import EditProductModal from './EditProductModal';


const InventoryTable = () => {

    const products = useSelector(state => state.inventoryReducer.products);
    const dispatch = useDispatch();
    console.log(products);
    useEffect(() => {
        GetInventory(dispatch);
    }, [])

    return (
        <div className="inventory-table-body">
            <table className='table inventory-table'>
                <thead>
                    <th className="table-col"> Brand </th>
                    <th className="table-col"> Category </th>
                    <th className="table-col"> Colour </th>
                    <th className="table-col"> Size </th>
                    <th className="table-col"> Description </th>
                    <th className="table-col"> Price </th>
                    <th className="table-col"> Quantity</th>
                </thead>
                <tbody >
                    {
                        products.map(pr =>
                            <tr>
                                <td className="table-col"> {pr.brandValue} </td>
                                <td className="table-col"> {pr.itemCategoryValue} </td>
                                <td className="table-col"> {pr.colourValue} </td>
                                <td className="table-col"> {pr.sizeValue} </td>
                                <td className="table-col"> {pr.description} </td>
                                <td className="table-col"> {pr.price} </td>
                                <td className="table-col"> {pr.qty} </td>
                                <td className="table-col">
                                 <EditProductModal className="btn" />
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