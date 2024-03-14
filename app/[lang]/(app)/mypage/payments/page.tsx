import PageHeader from "@/components/metronic/header/page-header";
import PaymentList from "./_components/payment-list";

export default function MyPayments() {
  return (
    <div>
        <PageHeader 
            title="Payments"
            subtitle="View your payment history"
        />
        
        <div>
            <PaymentList />
        </div>
    </div>
  )
}
