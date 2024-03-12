"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";
import { postServer } from "@/lib/data/postRequest";
import { formatDateToTimeAgo } from "@/lib/utils";

import { EyeIcon, LucideGithub, Trash } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

const AddGithubRepo = ({ projectId }: { projectId: string }) => {
  const { data: sessionData } = useSession() as any;
  const pathName = usePathname();
  //need to collect the full current url
  const [repos, setRepos] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<any>();

  const githubAccessToken = sessionData?.github?.accessToken;

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

  async function connectProjectSource() {
    //this will connect the project to a source code repository
    const submittingData = JSON.stringify({
      projectId: projectId,
      name: selectedRepo.name,
      source_update: selectedRepo.updatedAt,
      platform_id: selectedRepo.owner.login + "/" + selectedRepo.name,
      platform: "github",
      public: true,
    });
    await postServer("/project-sources", submittingData);
  }

  if (selectedRepo) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-1">
            <span>
              {selectedRepo.owner.login}/{selectedRepo.name}
            </span>
            <span className="text-sm text-text-secondary">
              updated at: {formatDateToTimeAgo(selectedRepo.updatedAt)}
            </span>
          </div>
          <div className="flex gap-2">
            <Link passHref href={selectedRepo.url} target="_blank">
              <Button variant={"secondary"}>
                <EyeIcon />
              </Button>
            </Link>
            <Button onClick={() => setSelectedRepo(null)}>
                <Trash />
            </Button>
          </div>
        </div>
        <Button onClick={connectProjectSource}>Connect to project</Button>
      </div>
    );
  }
  if (githubAccessToken) {
    if (repos.length > 0) {
      return (
        <div>
          {repos.map((repo: any, index: number) => (
            <div
              key={index}
              className="py-2 px-4 rounded-t-sm cursor-pointer  flex flex-row gap-4 border-b border-border-div justify-between hover:bg-accent-secondary"
              onClick={() => {
                setSelectedRepo(repo);
              }}
            >
              <div className="flex flex-col gap-1">
                <span>
                  {repo.owner.login}/{repo.name}
                </span>
                <span className="text-sm text-text-secondary">
                  updated at: {formatDateToTimeAgo(repo.updatedAt)}
                </span>
              </div>
              <div>
                <Link passHref href={repo.url} target="_blank">
                  <Button variant={"secondary"}>View Repository</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
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
      onClick={() => signIn("github", { callbackUrl: `${fullURL}` })}
    >
      <LucideGithub />
      Connect with Github
    </Button>
  );
};

export default AddGithubRepo;
