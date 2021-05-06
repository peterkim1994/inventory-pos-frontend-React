import { Tabs, Tab } from 'react-bootstrap';
import {NewProduct} from './NewProduct';
import InventoryBody from './InventoryBody';


const InventoryTabs = () => {
    return (
        <div>
            <Tabs defaultActiveKey="AddProduct" id="uncontrolled-tab-example">
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
                <Tab eventKey="contact" title="Contact" disabled>

                </Tab>
            </Tabs>
        </div>
    )
}
export default InventoryTabs;