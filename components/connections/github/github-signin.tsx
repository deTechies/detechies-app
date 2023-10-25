"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";
import { LucideGithub } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const GithubSignIn = () => {
  const { data } = useSession();
  const pathName = usePathname();

  const [repos, setRepos] = useState<any[]>([]);
  const [dependencies, setDependencies] = useState<any[]>([]);

  console.log(data);

  const collectRepoInfo = async (owner: string, repoName: string) => {
    console.log(owner, repoName);
    const response = await fetch(`${API_URL}/github/repo-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "accessToken " + data?.accessToken,
      },
      body: JSON.stringify({
        owner: owner,
        repoName: repoName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error fetching repo details: ${errorData.message || "Unknown error"}`
      );
    }

    const dataReponse = await response.json();

    setDependencies(dataReponse);
    return dataReponse;
  };

  const collectRepositories = async () => {
    if (!data?.user?.name) {
      toast({
        title: "Error",
        description: "Please connect your Github account first",
      });
    }
    const response = await fetch(`${API_URL}/github/repositories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "accessToken " + data?.accessToken,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .catch((err) => console.log(err));

    setRepos(response);
  };

  if (data?.accessToken && repos.length > 0) {
    return (
      <div className="max-w-xl p-2">
        <h1 className="font-medium">Repository</h1>

        <div className="flex flex-col gap-4 bg-background-layer-1 border rounded-sm w-full  text-text-primary max-h-[200px] overflow-auto ">
          {repos.map((repo: any) => {
            return (
              <div
                className="p-2 flex flex-col hover:bg-black-200 items-center justify-center "
                key={repo.name}
              >
                <p className="font-medium text-text-primary tracking-wider uppercase">
                  {repo.name}
                </p>
                <p className="text-text-secondary tracking-wide">
                  {repo.description}
                </p>
                <p className="text-text-secondary text-sm font-light">
                  {repo.updatedAt}
                </p>
                <Button
                  onClick={() => collectRepoInfo(repo.owner.login, repo.name)}
                >
                  Import
                </Button>
              </div>
            );
          })}
        </div>

        <section className="h-[40vh] overflow-auto py-2">
          <h1>Dependencies total: {dependencies.length}</h1>
          {dependencies.map((dependency: any) => (
            <li className="my-2 bg-background-layer-1 py-2 rounded-[6px]" key={dependency}>{dependency}</li>
          ))}
        </section>
      </div>
    );
  }

  if (data?.accessToken) {
    return (
      <Button
        className="w-full bg-black text-white flex gap-8"
        onClick={() => collectRepositories()}
      >
        Show Repositories
      </Button>
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
