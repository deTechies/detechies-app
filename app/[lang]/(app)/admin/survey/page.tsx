import { getSurveys } from "@/lib/data/feedback";
import ListSurveys from "./list-surveys";

export default async function Survey() {
    const {data:surveys} = await getSurveys();
    
    console.log(surveys)
  return (
      <ListSurveys  survey={surveys}/>
  )
}
