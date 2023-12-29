
export default function GroupDetails({ details }: { details: any }) {
  return (
    <div className="mb-20">
     
      <p
        dangerouslySetInnerHTML={{
          __html: details.description ? details.description : "No description",
        }}
      ></p>
    </div>
  );
}
