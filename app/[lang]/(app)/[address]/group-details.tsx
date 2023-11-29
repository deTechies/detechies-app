
import Links from "@/app/[lang]/(app)/project/[address]/links";
import { Card } from "@/components/ui/card";


export default function GroupDetails({ details }: { details: any }) {
  return (
    <Card>
      <section className="w-full border rounded-sm flex flex-col gap-2 p-4">
        <h4 className="font-medium">Description</h4>
        <p className="text-text-secondary tracking-tight">
          {details.introduction ? details.introduction : "No description"}
        </p>
      </section>
      <section className="w-full border rounded-sm flex flex-col gap-2 p-4">
        <h4 className="font-medium">Links</h4>
        <Links links={details?.urls} />
      </section>
    </Card>
  );
}
