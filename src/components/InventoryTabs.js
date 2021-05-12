import { Tabs, Tab } from 'react-bootstrap';
import { NewProduct } from './NewProduct';
import InventoryBody from './InventoryBody';
import InventorySettings from './InventorySettings';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductAttributes, GetInventory } from '../services/Inventory';


const InventoryTabs = () => {
    return (
        <div>
            <Tabs defaultActiveKey = "SeeInventory">
                <Tab eventKey="SeeInventory" title="Inventory">
                    <div className="tabbed-panel inventory-body">
                        <InventoryBody/>                 
                    </div>
                </Tab>
                <Tab eventKey="AddProduct" title="Add New Product">
                    <div className="tabbed-panel new-product-page">
                        <NewProduct />
                    </div>
                </Tab>
                <Tab eventKey="InventorySettings" title="Settings" >
                    <div className="tabbed-panel inventory-body">
                        <InventorySettings />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
export default InventoryTabs;