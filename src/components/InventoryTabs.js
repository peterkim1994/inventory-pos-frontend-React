import { Tabs, Tab } from 'react-bootstrap';
import { NewProduct } from './NewProduct';
import InventoryBody from './InventoryBody';
import InventorySettings from './InventorySettings';

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
                    <div className="tabbed-panel new-product-page new-product-form">
                        <NewProduct />
                    </div>
                </Tab>
                <Tab eventKey="InventorySettings" title="Product Attributes" >
                    <div className="tabbed-panel inventory-body InventorySettings">
                        <InventorySettings />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
export default InventoryTabs;