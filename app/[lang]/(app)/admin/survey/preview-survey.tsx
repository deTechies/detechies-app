
export default function PreviewSurvey({survey}: any) {
  return (
    <div>
        <pre>
            {JSON.stringify(survey, null, 2)}
        </pre>
    </div>
  )
}
