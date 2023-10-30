
import Loading from "@/components/loading";

import { getUserProfile } from "@/lib/data/user";
import { Suspense } from "react";
import ProfileDetails from "./profile-details";
import ProfileItems from "./profile-items";
//categories 


export default async function ProfileMe() {  
  const profile = await getUserProfile();


  return (
          <Suspense fallback={<Loading />}>
            <ProfileDetails/>
            <ProfileItems /> 
           
          </Suspense>
  );
}
