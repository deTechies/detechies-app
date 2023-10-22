"use client"
import Loading from "@/components/loading";
import Error from "@/components/screens/error";
import { Card, CardContent } from "@/components/ui/card";
import Connections from "./connections";

export default function ProfileDetails({ profile, loading, error }: { profile: any, loading: boolean, error: any }) {

  if(loading) return (
    <Card>
      <Loading />
    </Card>
  )
  if(error) return <Error message={"error while oading profile"} />

  console.log(profile)
  return (
    <Card>
      <CardContent className="flex flex-col gap-8">
        {profile?.description && (
          <section className="border border-border-div rounded-sm flex flex-col px-4 py-3 gap-3">
            <h5 className="text-normal text-text-primary font-medium">Description</h5>

            <p>{profile?.description}</p>
          </section>
        )}
       <Connections github={profile.message.github} address={profile.message.id}/>
      </CardContent>
    </Card>
  );
}
