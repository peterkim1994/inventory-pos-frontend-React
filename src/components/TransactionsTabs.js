import { Tabs, Tab } from 'react-bootstrap';
import TransactionsTable from './TransactionsTable';
import ProductsSoldTable from './SoldProductsTable';
import { useSelector } from 'react-redux';

const TransactionsTabs = () => {

    const transactions = useSelector(state => state.transactionsReducer.transactions);
    console.log(transactions);


    return (
        <div>
            <Tabs defaultActiveKey="salesTable" id="sales-table">
                <Tab eventKey="salesTable" title="sales">
                    <div className="sales-table">
                        <TransactionsTable transactions = {transactions}/>
                    </div>
                </Tab>
                <Tab eventKey="productsSold" title="Products Sold" >
                    <div className="tabbed-panel">
                        <ProductsSoldTable/>
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
export default TransactionsTabs;