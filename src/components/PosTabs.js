import { Tabs, Tab } from 'react-bootstrap';
import PosBody from './PointOfSalesBody';
import PromotionManagement from './PromotionManagement';

const PosTabs = () => {

    return (
        <div>
            <Tabs defaultActiveKey="Pos" id="uncontrolled-tab-example">
                <Tab eventKey="Pos" title="POS">
                    <div className="tabbed-panel pos-body">
                        <PosBody/>
                    </div>
                </Tab>
                <Tab eventKey="promotions" title="Manage Promotions">
                    <div >
                        <PromotionManagement />
                    </div>
                </Tab>
                <Tab eventKey="InventorySettings" title="Transaction History" >
                    <div className="tabbed-panel inventory-body">
                        <h2>coming soon </h2>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
export default PosTabs;