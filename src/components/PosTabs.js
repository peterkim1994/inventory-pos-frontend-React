import { Tabs, Tab } from 'react-bootstrap';
import InventorySettings from './InventorySettings';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetProductAttributes } from '../services/Inventory';
import {GetCurrentPromotions} from '../services/Promotions';
import PosBody from './PointOfSalesBody';
import PromotionManagement from './PromotionManagement';

const PosTabs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        GetProductAttributes(dispatch);
        GetCurrentPromotions(dispatch);
    }, []);

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
                        <InventorySettings />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
export default PosTabs;