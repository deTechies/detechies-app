"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";


import { LucideGithub } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RepositoriesList } from "./repositories-list";
import { Dependency } from "./types";



const fetchWithAuthorization = async (
  url: string,
  options: RequestInit,
  accessToken: string
) => {
  const headers = new Headers(options.headers);
  headers.set("Authorization", `accessToken ${accessToken}`);

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Fetch error: ${errorData.message || response.statusText}`);
  }

  return response.json();
};

const GithubSignIn = () => {
  const { data: sessionData } = useSession() as any;
  const pathName = usePathname();
  const [repos, setRepos] = useState<any[]>([]);
  const [dependencies, setDependencies] = useState<any[]>([]);
  const [selectedRepoDependencies, setSelectedRepoDependencies] = useState<Dependency[]>([]);


  const githubAccessToken = sessionData?.github?.accessToken;


  const fetchDependencies = async (owner: string, repoName: string) => {
    try {
      const repoDetails = await fetchWithAuthorization(
        `${API_URL}/github/repo-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ owner, repoName }),
        },
        githubAccessToken
      );

      setDependencies(repoDetails);
    } catch (error: any) {
      toast({ title: "Error", description: error.message });
    }
  };

  const showRepositories = async () => {
    if (!sessionData?.github?.accessToken) {
      toast({
        title: "Error",
        description: "Please connect your Github account first",
      });
      return;
    }

    try {
      const repositories = await fetchWithAuthorization(
        `${API_URL}/github/repositories`,
        { method: "GET", headers: { "Content-Type": "application/json" } },
        githubAccessToken
      );

      setRepos(repositories);
    } catch (error: any) {
      toast({ title: "Error", description: error.message });
    }
  };



  if (githubAccessToken) {
    return (
      <Dialog>
        <DialogTrigger>
          <Button className="w-full bg-black text-white" onClick={showRepositories}>
          Show Repositories
        </Button>
        </DialogTrigger>
        <DialogContent>
        {
          repos.length > 0 && (
            <RepositoriesList
              repos={repos}
              onImport={fetchDependencies}
              dependencies={dependencies}
            />
          )
        }
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button
      className="w-full bg-black text-white flex gap-8"
      onClick={() =>
        signIn("github", { callbackUrl: `http://localhost:3000/${pathName}` })
      }
    >
      <LucideGithub />
      Connect with Github
    </Button>
  );
};






export default GithubSignIn;
