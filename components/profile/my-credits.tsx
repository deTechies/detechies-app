import TopUpTrigger from "./topup/topup-trigger";

export default function MyCredits({
  credits,
  dictionary,
}: {
  credits: number;
  dictionary: any;
}) {
  return (
    <div className="grid border rounded-sm border-border-div">
      <div className="flex justify-between px-5 py-7 items-center gap-4">
        <div className="flex items-center text-nowrap text-title_m">
          My Points
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-title_m">{credits.toLocaleString()} P</span>
          <TopUpTrigger credits={credits} />
        </div>
      </div>
    </div>
  );
}
