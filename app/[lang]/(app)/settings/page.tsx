import GithubSignIn from "@/components/connections/github/github-signin";
import LinkedinLogin from "@/components/connections/linkedin/linkedin-login";
import TwitterLogin from "@/components/connections/twitter/twitter-login";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ];

  return (
    <main>
      <div className="flex p-4 flex-wrap">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
        {connections.map((connection, key) => {
          return (
            <Card key={key}>

              <span className="text-label_s">:able s</span>
              <h5 className="text-title_l">{connection.name}</h5>
              {connection.component}
            </Card>
          );
        })}
      </div>

      <div className="">
        <UpdateProfile />
      </div>
    </main>
  );
}
