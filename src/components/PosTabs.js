import { Tabs, Tab } from 'react-bootstrap';
import PosBody from './PointOfSalesBody';
import PromotionManagement from './PromotionManagement';
import RefundUI from './RefundUI';


const PosTabs = () => {

    return (
        <div>
            <Tabs defaultActiveKey="Pos" id="uncontrolled-tab-example">
                <Tab eventKey="Pos" title="POS">
                    <div className="pos-body">
                        <PosBody />
                    </div>
                </Tab>
                <Tab eventKey="Process Refund" title="Process Refund" >
                    <div className="tabbed-panel">
                        <RefundUI />
                    </div>
                </Tab>
                <Tab eventKey="promotions" title="Manage Promotions">
                    <div >
                        <PromotionManagement />
                    </div>
                </Tab>
                <Tab eventKey="Transaction History" title="Transaction History" >
                    <div className="tabbed-panel">
                        <h2>coming soon </h2>
                    </div>
                </Tab>

            </Tabs>
        </div>
    )
}
export default PosTabs;