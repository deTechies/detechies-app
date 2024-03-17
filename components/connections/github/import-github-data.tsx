"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";
import { patchServer } from "@/lib/data/postRequest";
import { fetchWithAuthorization } from "@/lib/utils";
import { Import } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ImportGithubData({
  sourceId,
  repoName,
}: {
  sourceId: string;
  repoName: any;
}) {
  const { data: sessionData } = useSession() as any;
  const githubAccessToken = sessionData?.github?.accessToken;
  const [repoData, setRepoData] = useState<any>();

  const fetchDependencies = async () => {
    if (repoName.startsWith("/")) {
      //then remove the first character from the string

      repoName = repoName.substring(1);
    }
    const owner = repoName.split("/")[0];
    const repo = repoName.split("/")[1];
    try {
      const repoDetails = await fetchWithAuthorization(
        `${API_URL}/github/repo-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ owner, repoName: repo }),
        },
        githubAccessToken,
        sessionData.web3.accessToken
      );

      if (!repoDetails.data) {
        toast({ title: "Error", description: "No dependencies found" });
        return;
      }

      setRepoData(repoDetails.data);
    } catch (error: any) {
      toast({ title: "Error", description: error.message });
    }
  };

  const updateProjectSource = async () => {
    const submittingData = JSON.stringify({
      packages: repoData.packages,
      languages: repoData.languages,
      contributors: repoData.contributors,
    });
    await patchServer(`/project-sources/${sourceId}`, submittingData);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm">
          <Import className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <h1>Importing {repoName}</h1>
        </DialogHeader>
        {repoData ? (
          <div>
            <h1>Repo Data</h1>
            <pre>{JSON.stringify(repoData, null, 2)}</pre>
            <Button onClick={updateProjectSource}>Update Source</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <span className="text-sm text-text-secondary">
              Please select the data you want to import from the repository, we
              currently supporting the following:
            </span>
            <div className="flex flex-row gap-4">
              <Checkbox />
              <Label>Packages (node.js only)</Label>
            </div>
            <div className="flex flex-row gap-4">
              <Checkbox />
              <Label>Contributors</Label>
            </div>
            <div className="flex flex-row gap-4">
              <Checkbox />
              <Label>Languages</Label>
            </div>
            <div>
              <Button onClick={fetchDependencies}>Import data.</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
