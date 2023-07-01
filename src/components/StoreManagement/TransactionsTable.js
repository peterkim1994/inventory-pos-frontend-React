import React from "react";
import Helper from "../util/Helper";
import SaleInvoiceModal from "./POS/SaleInvoiceModal";

const TransactionsTable = ({ transactions }) => {

    const getPaymentType = (s, paymentType) => {
        return s.paymentMethodId == paymentType;
    }

    console.log("transactions table");
    console.log(transactions);

    const sumPayments = (payments) =>{
        return payments.reduce((a,b)=> a + b, 0);
    }

    return (
        <div className="transactions-table">
            <table className='table table-striped table-hover'>
                <thead>
                    <tr key={"transactions-header-row"}>
                        <th className="table-col"> SaleInvoice Number </th>
                        <th className="table-col"> Date </th>
                        <th className="table-col"> Time </th>
                        <th className="table-col"> Cash Amount </th>
                        <th className="table-col"> Efpos Amount </th>
                        <th className="table-col"> AfterPay Amount</th>
                        <th className="table-col"> Store Credit Amount</th>
                        <th className="table-col"> total: </th>
                        <th className="table-col">  </th>
                    </tr>
                </thead>
                <tbody >
                    {
                        transactions && transactions.map(sale =>
                            <tr key={sale.id} id={`sale-transaction-row-${sale.id}`} style={{ height: "50%" }}>
                                <td className="table-col"> {sale.invoiceNumber} </td>
                                <td className="table-col"> {Helper.getDate(sale.dateTime)}</td>
                                <td className="table-col"> {Helper.getTime(sale.dateTime)} </td>
                                <td className="table-col"> {sale.payments.filter(s => s.paymentMethodId == 1).map(s => s.amount)} </td>
                                <td className="table-col"> {sale.payments.filter(s => s.paymentMethodId == 2).map(s => s.amount)} </td>
                                <td className="table-col"> {sale.payments.filter(s => s.paymentMethodId == 3).map(s => s.amount)} </td>
                                <td className="table-col"> {sale.payments.filter(s => s.paymentMethodId == 4).map(s => s.amount)} </td>
                                <td className="table-col"> {sumPayments(sale.payments.map(p=>p.amount))} </td>
                                <td className="table-col"> <SaleInvoiceModal invoice={sale}/> </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TransactionsTable;