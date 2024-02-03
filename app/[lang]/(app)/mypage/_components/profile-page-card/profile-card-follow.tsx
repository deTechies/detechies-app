
export default function ProfileCardFollow({
    dictionary
}: {
    dictionary: any;
}) {
  return (
    <div className="grid pt-3 pb-4 px-5  border rounded-sm border-border-div">
    <div className="flex">
      <div className="basis-1/2 gap-2 flex flex-col">
        <p className="text-title_l font-semibold">0</p>
        <p className="text-title_s text-text-secondary capitalize">
          {dictionary.mypage.profile?.following}
        </p>
      </div>
      <div className="basis-1/2 flex flex-col gap-2">
        <p className="text-title_l font-semibold">0</p>
        <p className="text-title_s text-text-secondary capitalize">
          {dictionary.mypage.profile?.followers}
        </p>
      </div>
    </div>
  </div>
  )
}
