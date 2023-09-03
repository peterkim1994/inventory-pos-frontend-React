import * as React from 'react';
import EditProductModal from './Product/EditProductModal';
import { FC } from 'react';

import {Product} from '../../types/product/prouduct';

const InventoryTable : FC<any> = ({products, selectEnabled, handleSelect, actionBtn }) => {

    //just use products, when file is refactored to actually be type safe
    const prods : Product[] = products; 

    //select enabled is for promotions product table
    return (
        <div >
            <table className='table table-striped table-hover inventory-table'>
                <thead>
                    <tr>
                        <th className="table-col"> Brand </th>
                        <th className="table-col"> Category </th>
                        <th className="table-col"> Colour </th>
                        <th className="table-col"> Size </th>
                        <th className="table-col"> Description </th>
                        <th className="table-col"> Price </th>
                        <th className="table-col"> Quantity</th>
                        <th className="table-col"> IDs: </th>
                        <th className="table-col"> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                      prods.map(pr =>
                            <tr key={pr.id} id={`product-row-${pr.id}`} style={{height:"50%"}}>                                
                                <td className="table-col"> {pr.brandValue} </td>
                                <td className="table-col"> {pr.itemCategoryValue} </td>
                                <td className="table-col"> {pr.colourValue} </td>
                                <td className="table-col"> {pr.sizeValue} </td>
                                <td className="table-col" style={{minWidth:"30%", fontSize:"0.9em"}}> {pr.description} </td>
                                <td className="table-col"> {pr.price} </td>
                                <td className="table-col"> {pr.qty} </td>
                                <td className="table-col"> {pr.id} </td>
                                <td className="table-col">
                                    {!selectEnabled && <EditProductModal product={pr} />}
                                    {selectEnabled &&  pr.id}
                                </td>        
                                { actionBtn && actionBtn(pr) }                            
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default InventoryTable;