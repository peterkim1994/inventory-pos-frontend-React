import { Tabs, Tab } from 'react-bootstrap';
import { NewProduct } from './NewProduct';
import InventoryBody from './InventoryBody';
import InventorySettings from './InventorySettings';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetProductAttributes } from '../services/Inventory';


const InventoryTabs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        GetProductAttributes(dispatch);
    }, []);
    return (
        <div>
            <Tabs defaultActiveKey="SeeInventory" id="uncontrolled-tab-example">
                <Tab eventKey="SeeInventory" title="Inventory">
                    <div className="tabbed-panel inventory-body">
                        <InventoryBody />
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