import GroupApi from "./group-api";

export default function GroupSettings() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3">
        <GroupApi />
      </div>
    </div>
  )
}
