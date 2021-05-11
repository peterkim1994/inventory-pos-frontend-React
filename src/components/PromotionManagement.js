import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import InventoryBody from './InventoryBody';

export default function PromotionManagement(){

    return (
        <div  className = "promotional-inventory-panel">
            <h3>Manage Promotions</h3>
            <InventoryBody/>

        </div>
    )
}