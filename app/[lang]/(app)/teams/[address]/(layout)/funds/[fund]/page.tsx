
export default function FundDetails({
  params,
}: {
  params: { lang: any; app: any; address: any; layout: any; fund: any };
}) {
  return (
    <div>
      {params.fund}
    </div>
  )
}
