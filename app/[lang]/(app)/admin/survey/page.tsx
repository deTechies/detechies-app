import { getSurveys } from "@/lib/data/feedback";

export default async function Survey() {
    const surveys = await getSurveys();
  return (

    <pre>
        {JSON.stringify(surveys, null, 2)}
    </pre>
  )
}
