export default TransactionsTable = (transactions) => {
    return(
        <div >
        <table className='table table-striped table-hover inventory-table'>
            <thead>
                <tr>     
                    <th className="table-col"> SaleInvoice Number </th>                   
                    <th className="table-col"> Date </th>
                    <th className="table-col"> Time </th>                    
                    <th className="table-col"> Cash Amount </th>
                    <th className="table-col"> Efpos Amount </th>
                    <th className="table-col"> Store Credit Amount</th>
                    <th className="table-col"> total: </th>
                    <th className="table-col">  </th>
                </tr>
            </thead>
            <tbody >
                {
                    transactions.map(sale =>
                        <tr key={sale.id} id={`sale-row-${sale.id}`} style={{height:"50%"}}>                                
                            <td className="table-col"> {sale.DateTime} </td>
                            <td className="table-col"> {sale.DateTime} </td>
                            <td className="table-col"> {sale.payments.filter(s=> s.paymentMethodId == 1).map(s.payments.amount)} </td>
                            <td className="table-col"> {sale.payments.filter(s=> s.paymentMethodId == 2).map(s.payments.amount)} </td>
                            <td className="table-col"> {sale.payments.filter(s=> s.paymentMethodId == 3).map(s.payments.amount)} </td>
                            <td className="table-col"> {pr.Amount} </td>                                                                              
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
    )    
}