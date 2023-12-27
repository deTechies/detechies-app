
export default function GroupDetails({ details }: { details: any }) {
  return (
    <div className="mb-20">
      <pre>
        {JSON.stringify(details, null, 2)}
      </pre>
      <p
        dangerouslySetInnerHTML={{
          __html: details.description ? details.description : "No description",
        }}
      ></p>
    </div>
  );
}
