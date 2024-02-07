import { serverApi } from "@/lib/data/general";

export default async function ListEvaluationHistory() {
    
    const result = await serverApi(`/survey-access/history`);
    
    if(result.status != 200) {
        return <pre>
            {JSON.stringify(result, null, 2)}
        </pre>
    }
  return (
    <div>
        {JSON.stringify(result.data, null, 2)}
    </div>
  )
}
