import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const SaleProductList = ({ products, handleRemove, removeBtnSetting }) => {

    const pad = (txt, len = 20) => {     
        return txt.padEnd(len, '-');
    }
    let keyId = 0;
    return (
        <div className="sales-list-body">
            <ul className="sale-list list-group" >
                {
                    products.map(pr => {
                        return (
                            <li className="sale-list-row list-group-item" key={`sale-item-no-${keyId++}`}>
                                <div className="sale-list-left" >
                                    <span className="product-attribute">{pr.brandValue}</span>
                                    <span className="product-attribute">{pr.itemCategoryValue}</span>
                                    <span className="product-attribute">{pr.sizeValue} </span>
                                    <span className="product-attribute">{pr.colourValue} </span>
                                    <span className="product-attribute">{pr.price} </span>
                                </div>
                                <span className="sale-list-right">
                                    <button className="btn btn-secondary pos-remove-btn"
                                        onClick={() => handleRemove(pr)}
                                        disabled={removeBtnSetting}>
                                        remove
                                    </button>
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SaleProductList