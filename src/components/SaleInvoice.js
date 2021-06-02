import { useSelector } from 'react-redux';


const SaleInvoice = () => {
    const sale = useSelector(state => state.saleReducer.sale);
    const business = useSelector(state => state.SaleReducer.bussinessDetails);

    return (
        <div className="invoice-body">
            <div className="invoice-header">
                <h4>{business.storeName}</h4>
                <p>{business.address}</p>
                <p>{business.gstNum}</p>
                <p>{business.contact}</p>
            </div>
            <div>
                <h4>Invoice Number: {sale.invoiceNumber}</h4>
                <p>{sale.date}</p>
                <ul>
                    {sale.products.map(pr => {
                        if (pr.promotionApplied = true) {
                            let promo = pr.promotionName;
                        }
                        return (
                            <li>
                                <span>{pr.product}</span>
                                <span>{pr.promotionName}</span>
                            </li>
                        )
                    })}
                </ul>
                <h3>total: {sale.total}</h3>
            </div>
        </div>
    )
}
export default SaleInvoice