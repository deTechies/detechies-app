"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";

import { updateProject } from "@/lib/data/project";
import { LucideGithub } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RepositoriesList } from "./repositories-list";

const fetchWithAuthorization = async (
  url: string,
  options: RequestInit,
  githubAccess: string,
  accessToken: string
) => {
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);
  headers.set("x-additional-token", `${githubAccess}`);
  headers.set("x-api-key", "API_KEY");

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Fetch error: ${errorData.message || response.statusText}`);
  }

  return response.json();
};

const GithubDependencies = ({projectId}: {projectId:string}) => {
  const { data: sessionData } = useSession() as any;
  const pathName = usePathname();
  //need to collect the full current url 
  const [repos, setRepos] = useState<any[]>([]);
  const [dependencies, setDependencies] = useState({
    packages: [],
    languages: [],
  });
  
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
        githubAccessToken,
        sessionData.web3.accessToken
      );

      if (!repoDetails.data) {
        toast({ title: "Error", description: "No dependencies found" });
        return;
      }
      console.log(repoDetails);

      setDependencies(repoDetails.data);
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
        githubAccessToken,
        sessionData.web3.accessToken
      );

      setRepos(repositories.data);
    } catch (error: any) {
      toast({ title: "Error", description: error.message });
    }
  };
  
  const saveGithubDependencies = async () => {
    updateProject({
      id: projectId, 
      packages: dependencies.packages,
      languages: dependencies.languages
    })
  }

  if (githubAccessToken) {
    if (repos.length > 0) {
      return (
        <>
          
          <RepositoriesList
            repos={repos}
            onImport={fetchDependencies}
            data={dependencies}
          />
          <div className="grid grid-cols-2 gap-2">
          <Button
            variant={"secondary"}
            onClick={() => {
              setDependencies({
                packages: [],
                languages: [],
              });
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              saveGithubDependencies();
            }}
          >
            Save
          </Button>
          </div>
        </>
      );
    }
    return (
      <Button className="w-full bg-black text-white" onClick={showRepositories}>
        Show Repositories
      </Button>
    );
  }
  const fullURL = window.location.href;


  return (
    <Button
      className="w-full bg-black text-white flex gap-8"
      onClick={() =>
        signIn("github", { callbackUrl: `${fullURL}` })
      }
    >
      <LucideGithub />
      Connect with Github
    </Button>
  );
};

export default GithubDependencies;
