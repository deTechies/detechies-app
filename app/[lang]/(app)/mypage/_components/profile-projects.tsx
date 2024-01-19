"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
// import Image from "next/image";
import Image from "@/components/ui/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ProfileProjects({
  projects,
  text,
  visiting=false,
}: {
  projects: any;
  text: any;
  visiting?:boolean;
}) {
  //get all the projects the user the user is part of
  const router = useRouter();
  
  return (
    <div className="flex flex-col gap-3">
      <Card className="flex flex-row items-center justify-between">
        <h5 className="text-subhead_s">{text?.projects}</h5>
        {
          !visiting &&
          <Button size="sm" variant="secondary" onClick={()=>{
            router.push("/project/create")
          }}>
            {text?.new_project}{" "}
            <PlusIcon size="16" className="ml-2 text-text-secondary" />
          </Button>
        }
       
      </Card>
        
      {projects &&
        projects.map((project: any, index:number) => {
          return (
            <Link
            href={`/project/${project.project.id}`}
            key={index}
            >
              <Card key={index} className="flex flex-row">
                  {/* Image on the left */}
                  <div className="relative h-[100px] w-[100px] aspect-square rounded-md ">
                    <Image
                      src={`https://cloudflare-ipfs.com/ipfs/${project.project.image}`}
                      alt="project image"
                      width={100}
                      height={100}
                      className="rounded-sm"
                    />
                  </div>
                  {/* Text on the right */}
                  <div className="flex flex-col items-start gap-4  grow w-full">
                    {/* <header className="flex items-center gap-2 bg-orange-100">
                      
                      <span className="text-text-secondary text-label_m ">
                        {project.project.type}|{" "}
                        {formatDate(project.project.begin_date)} ~{" "}
                        {project.project.end_date
                          ? formatDate(project.project.end_date)
                          : text?.present}{" "}
                      </span>
                      <Badge>{text?.evaluation} (0)</Badge>
                    </header> */}
                    <div className="flex items-start gap-4 self-stretch">
                      <div className="flex flex-col gap-4 grow items-start">
                        <h5 className="text-subhead_s">{project.project.name}</h5>
                        <div className="flex md:flex-row flex-col h-12 gap-2 w-full items-start">
                          <div className="flex flex-col max-w-[240px] flex-wrap gap-[8px] items-start">
                            <div className="flex flex-col gap-2 flex-wrap w-full shrink-0 items-start">
                              <span className="text-text-secondary text-sm">{project.project.type}</span>
                              <span className="text-text-secondary text-sm">| {formatDate(project.project.begin_date)} ~ {project.project.end_date
                          ? formatDate(project.project.end_date)
                          : text?.present}{" "}</span>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                              {project.works.map((work: any, index: number)=>{
                                return(
                                  <div className="flex flex-row gap-2 self-stretch w-full items-start" key={index}>
                                    <span className="text-text-secondary text-sm">{work.name}</span>
                                    <span className="text-text-secondary text-sm">{"| "} {work.percentage} %</span>
                                  </div>
                                )

                              })}
                            </div>
                          </div>
                          <span className="self-stretch flex grow text-text-secondary text-sm">{project.project.description}</span>
                        </div>
                      </div>
                      <div className="inline-flex gap-3 self-stretch flex-[0_0_auto] items-start">
                        <Badge className="!px-3 !py-2">{text?.evaluation} {project.level}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-3 ">
                      {project.project?.tags && project.project?.tags.map((tag: string, index: number)=>{
                        return(
                          <div className="inline-flex  h-8 max-w-8 overflow-ellipse py-2 px-2.5 justify-center items-center rounded-[20px] border border-border-div" key={index}>
                            <span className="text-text-secondary">{tag}</span>
                          </div>
                        )
                      })}
                      {/* {project.works && (
                        <ProjectWorkDetail data={project.works[0]} />
                      )} */}
                    </div>
                  </div>
              </Card>
            </Link>
          );
        })}
    </div>
  );
}
