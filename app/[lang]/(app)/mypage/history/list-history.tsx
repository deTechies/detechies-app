import { serverApi } from "@/lib/data/general";
import PendingReputation from "./pending-reputation";

export default async function ListEvaluationHistory() {
  const result = await serverApi(`/survey-access/history`);

  if (result.status !== 'success') {
    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  }
  return (
    <div>
      {result.data.map((item: any) => <PendingReputation key={item.id} item={item} />)}
      {JSON.stringify(result.data, null, 2)}
    </div>
  );
}
