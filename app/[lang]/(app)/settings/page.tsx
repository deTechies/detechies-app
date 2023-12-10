import GithubSignIn from "@/components/connections/github/github-signin";
import LinkedinLogin from "@/components/connections/linkedin/linkedin-login";
import TwitterLogin from "@/components/connections/twitter/twitter-login";
import { API_URL } from "@/lib/constants";
import { getSessionToken } from "@/lib/data/project";
import UpdateProfile from "./update-profile";

export default async function SettingsPAge() {
  const session = await getSessionToken();

  const moreDAta = await fetch(`${API_URL}/${session?.web3.address}`, {
    headers: {
      Authorization: `Bearer ${session?.web3.accessToken}`,
    },
  });
  
  const connections = [
    {
      name: "Github",
      component: <GithubSignIn />,
      connected: false,
    },
    {
      name: "Twitter",
      component: <TwitterLogin />,
      connected: false,
    },
    {
      name: "Linkedin",
      component: <LinkedinLogin />,
      connected: false,
    },
  ]

  return (
    <main>
      <div className="flex p-4 flex-wrap">
        {
          connections.map((connection, key) => {
            return (
              <div key={key} className='bg-background-layer-1 border border-border-div p-2 m-4 ounded-sm flex flex-col gap-2 max-w-xs'>
                <h5 className='text-title_m'>{connection.name}</h5>
                {connection.component}
                
              </div>
            )
          })
        }

      </div>
     
      <div className="">
        <UpdateProfile />
      </div>
      
    </main>
  );
}
