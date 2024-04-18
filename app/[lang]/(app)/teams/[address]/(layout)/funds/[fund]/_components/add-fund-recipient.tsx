"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serverApi } from "@/lib/data/general";
import { Project } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export default function AddFundRecipient({ poolId }: { poolId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  
  //we can also add in a call for all my projects 
  useEffect(() => {
    // fetch all my projects
    async function fetchProjects() {
      const getProjects = await serverApi('/projects/me')
      setProjects(getProjects.data.data)
    }
    fetchProjects()
  }, []);
  
  
  return (
    <div className="flex flex-col gap-10">
      <p>
       Register your project to .
      </p>
      <Select>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select project" />
        </SelectTrigger>
        <SelectContent>
          {
            projects && projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>

      <Button
      >Register project</Button>
    </div>
  );
}
