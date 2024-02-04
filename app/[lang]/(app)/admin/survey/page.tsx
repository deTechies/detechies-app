import { getSurveys } from "@/lib/data/feedback";
import ListSurveys from "./list-surveys";

export default async function Survey() {
    const {data:surveys} = await getSurveys();
    
  return (
      <ListSurveys  survey={surveys}/>
  )
}
