import { useSelector } from "react-redux";

const RefundList = ()=>{
    const refunds = useSelector(state => state.transactionsReducer.transactions.flatMap(t=> t.refunds));
    let keyCounter = 0;

    return (
        <div>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr key={"refund-list-header-row"}>
                        <th className="table-col"> Sale Invoice Number </th>
                        <th className="table-col"> Date</th>
                        <th className="table-col"> Reason </th>
                        <th className="table-col"> Amount </th>
                    </tr>
                </thead>
                <tbody >
                    {refunds.length > 0 &&
                        refunds.map(refund =>  
                            <tr key={"refund-" + keyCounter++} id={`refund-row-${refund.id}`} style={{ height: "50%" }}>
                                <td className="table-col"> {refund.saleInvoiceId} </td>
                                <td className="table-col"> {refund.refundDate} </td>
                                <td className="table-col"> {refund.reason} </td>
                                <td className="table-col"> {refund.amount}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default RefundList