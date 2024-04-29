"use client";

import Searchbar from "@/components/extra/search-bar";
import { Card, CardContent } from "@/components/metronic/card/card";
import PageHeader from "@/components/metronic/header/page-header";
import { useDictionary } from "@/lib/dictionaryProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateProjectForm from "./create-project";
export default function ProjectCreatePage({ params }: { params: any }) {
  //first get the whole project form.
  const dictionary = useDictionary();
  const searchParams = useSearchParams();
  const [prefilled, setPreFilled] = useState<any>({
    name: "",
    description: "",
    github: "",
    tags: [],
    image: "",
  });

  useEffect(() => {
    const search = searchParams.get("search");
    
    const findGithubDetails = async (github: string) => {
      const response = await fetch(`https://api.github.com/repos${github}`);
      const data = await response.json();
      setPreFilled({
        ...prefilled,
        name: data.name,
        description: data.description,
        tags: data.topics,
        image: data.owner.avatar_url,
        begin_date: data.created_at, 
        end_date: data.updated_at,
      });
    }
    if (search) {
      //check if the search is an github link
      if (search.includes("github.com")) {
        //if it is a github link then set the addManual to false
        
        //now get everything after the github.com
        const github = search.split("github.com")[1];
        findGithubDetails(github);
        //setPreFilled({ ...prefilled, github: search });
      }else{
        //if it is not a github link then set the addManual to true
        setPreFilled({ ...prefilled, github: search });
      }
    }
  }, [searchParams]);
  return (
    <main className="w-full max-w-[60rem] mx-auto m-10 flex flex-col gap-10 ">
      <PageHeader
        title="Create Project"
        subtitle="If you have public github link you can easily share it by copy pasting the link"
      />

      <div className="min-w-full max-w-2xl rounded-[30px] bg-gray-300 px-4 py-1">
        <Searchbar placeholder="enter github link" className="w-full" />
      </div>

      <Card>
        <CardContent>
          
          <CreateProjectForm lang={dictionary} prefilled={prefilled} />
        </CardContent>
      </Card>
    </main>
  );
}
