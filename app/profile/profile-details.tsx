import { Card, CardContent } from "@/components/ui/card";
import { getUserProfile } from "@/lib/data/user";
import Connections from "./connections";

export default async function ProfileDetails() {

  const profile = await getUserProfile();
  return (
    <Card>
      <CardContent className="flex flex-col gap-8">
        {profile?.description && (
          <section className="border border-border-div rounded-sm flex flex-col px-4 py-3 gap-3">
            <h5 className="text-normal text-text-primary font-medium">Description</h5>

            <p>{profile?.description}</p>
          </section>
        )}
       <Connections github={profile?.github} address={profile?.id}/>
      </CardContent>
    </Card>
  );
}
