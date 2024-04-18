import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTableland, tables } from "@/lib/tableland";
import AddFundRecipient from "./_components/add-fund-recipient";

export default async function FundDetails({
  params,
}: {
  params: { lang: any; app: any; address: any; layout: any; fund: any };
}) {

  const allocations = await getTableland(`SELECT * FROM ${tables.pools_allocations}`);
  const distributions = await getTableland(`SELECT * FROM ${tables.pools_distributions}`);
  const contracts = await getTableland(`SELECT * FROM ${tables.pools_maci_contracts}`);
  const reviews = await getTableland(`SELECT * FROM ${tables.pools_reviews}`);
  return (
    <main className="grid grid-cols-2 gap-10">
      <Card>
        <CardHeader>
          Register Recipient
        </CardHeader>
        <CardContent>
          <span>
            Please add in the addresses of projects that are registered in our registry.
          </span>
          <AddFundRecipient poolId={params.fund} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Allocations</CardHeader>
        <CardContent>{JSON.stringify(allocations, null, 2)}</CardContent>
      </Card>
      <Card>
        <CardHeader>Distributions</CardHeader>
        <CardContent>{JSON.stringify(distributions, null, 2)}</CardContent>
      </Card>
      <Card>
        <CardHeader>Contracts</CardHeader>
        <CardContent>{JSON.stringify(contracts, null, 2)}</CardContent>
      </Card>
      <Card>
        <CardHeader>Reviews</CardHeader>
        <CardContent>{JSON.stringify(reviews, null, 2)}</CardContent>
      </Card>
    </main>
  )
}
