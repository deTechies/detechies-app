

import ProfileDetails from "../../profile/profile-details";
import ProfileItems from "../../profile/profile-items";


//categories 


export default function ProfileMe({params}: {params: {id: string}}) {

  return (
          <>
            <ProfileDetails />
            <ProfileItems  address={params.id} />
          </>
  );
}
 