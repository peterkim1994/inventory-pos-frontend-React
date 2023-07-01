import { Tabs, Tab } from 'react-bootstrap';
import PosBody from './PointOfSalesBody';
import PromotionManagement from './Promotions/PromotionManagement';
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
                    <div className="tabbed-panel2">
                        <RefundUI />
                    </div>
                </Tab>
                <Tab eventKey="promotions" title="Manage Promotions">
                    <div >
                        <PromotionManagement />
                    </div>
                </Tab>            
            </Tabs>
        </div>
    )
}
export default PosTabs;