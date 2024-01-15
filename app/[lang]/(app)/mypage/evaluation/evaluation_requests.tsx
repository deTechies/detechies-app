import { serverApi } from "@/lib/data/general";
import { SurveyResponse } from "@/lib/interfaces";

export default async function EvaluationRequests() {
    //retrieve all the valuation requests here. 
    const queries = {
        status: "requested"
    }
    const filters = new URLSearchParams(queries).toString();
    const {data} = await serverApi(`/survey-response/filtered?${filters}`) as SurveyResponse[];
    
  return (
    <div>
        EvaluationRequests    
    </div>
  )
}
