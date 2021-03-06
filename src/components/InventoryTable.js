import React from 'react';
import EditProductModal from './EditProductModal';

const InventoryTable = ({ products, selectEnabled, handleSelect, actionBtn }) => {
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
                        <th className="table-col"> ID: </th>
                        <th className="table-col"> </th>
                    </tr>
                </thead>
                <tbody >
                    {
                      products.map(pr =>
                            <tr key={pr.id} id={`product-row-${pr.id}`} style={{height:"50%"}}>                                
                                <td className="table-col"> {pr.brandValue} </td>
                                <td className="table-col"> {pr.itemCategoryValue} </td>
                                <td className="table-col"> {pr.colourValue} </td>
                                <td className="table-col"> {pr.sizeValue} </td>
                                <td className="table-col" style={{minWidth:"30%",fontSize:"0.9em"}}> {pr.description} </td>
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