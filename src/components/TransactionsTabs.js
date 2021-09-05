import { Tabs, Tab } from 'react-bootstrap';
import PosBody from './PointOfSalesBody';
import TransactionsTable from './TransactionsTable';

const TransactionsTabs = (transactions) => {
    return (
        <div>
            <Tabs defaultActiveKey="sales" id="sales-table">
                <Tab eventKey="salesTable" title="sales">
                    <div className="sales-table">
                        <TransactionsTable transactions = {transactions}/>
                    </div>
                </Tab>
                <Tab eventKey="productsSold" title="Products Sold" >
                    <div className="tabbed-panel">
                        coming soon
                    </div>
                </Tab>
                <Tab eventKey="refundsTable" title="Refunds">
                    <div >
                    coming soon
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
export default PosTabs;