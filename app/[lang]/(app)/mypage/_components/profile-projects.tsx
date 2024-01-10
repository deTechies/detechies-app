"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ProfileProjects({
  projects,
  text,
}: {
  projects: any;
  text: any;
}) {
  //get all the projects the user the user is part of
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      <Card className="flex flex-row justify-between items-center">
        <h5 className="text-subhead_s">{text?.projects}</h5>
        <Button size="sm" variant="secondary" onClick={()=>{
          router.push("/project/create")
        }}>
          {text?.new_project}{" "}
          <PlusIcon size="16" className="text-text-secondary ml-2" />
        </Button>
      </Card>
        
      {projects &&
        projects.map((project: any, index:number) => {

          return (
            <Link
            href={`/project/${project.project.id}`}
            key={index}
            >
              <Card key={project.id} className="flex flex-row">
                  {/* Image on the left */}
                  <div className="w-[100px] h-[100px] relative aspect-square rounded-[12px] overflow-hidden">
                    <Image
                      src={`https://cloudflare-ipfs.com/ipfs/${project.project.image}`}
                      alt="project image"
                      width={68}
                      height={68}
                      className="rounded-sm"
                    />
                  </div>
                  {/* Text on the right */}
                  <div className="flex flex-col items-start gap-[16px] relative flex-1 self-stretch grow w-full">
                    {/* <header className="flex gap-2 items-center bg-orange-100">
                      
                      <span className="text-text-secondary text-label_m ">
                        {project.project.type}|{" "}
                        {formatDate(project.project.begin_date)} ~{" "}
                        {project.project.end_date
                          ? formatDate(project.project.end_date)
                          : text?.present}{" "}
                      </span>
                      <Badge>{text?.evaluation} (0)</Badge>
                    </header> */}
                    <div className="flex items-start gap-[16px] relative self-stretch">
                      <div className="flex flex-col gap-[16px] flex-1 grow items-start relative">
                        <h5 className="text-subhead_s">{project.project.name}</h5>
                        <div className="flex h-[48px] gap-[8px] self-stretch w-full items-start relative">
                          <div className="flex flex-col w-[240px] gap-[8px] items-start relative">
                            <div className="flex gap-[8px] self-stretch w-full flex-[0_0_auto] items-start relative">
                              <span className="text-[#6B7684] text-sm">{project.project.type}</span>
                              <span className="text-[#6B7684] text-sm">| {formatDate(project.project.begin_date)} ~ {project.project.end_date
                          ? formatDate(project.project.end_date)
                          : text?.present}{" "}</span>
                            </div>
                            <div className="flex gap-[8px] self-stretch w-full flex[0_0_auto] items-start relative">
                              {project.works.map((work: any)=>{
                                return(
                                  <>
                                    <span className="text-[#6B7684] text-sm">{work.name}</span>
                                    <span className="text-[#6B7684] text-sm">{"| "} {work.percentage} %</span>
                                  </>
                                )

                              })}
                            </div>
                          </div>
                          <span className="self-stretch flex-1 flex grow text-[#6B7684] text-sm">{project.project.description}</span>
                        </div>
                      </div>
                      <div className="inline-flex gap-[12px] self-stretch flex-[0_0_auto] items-start relative">
                        <Badge className="!flex-[0_0_auto] !px-[10px] !py-[8px]">{text?.evaluation} {project.level}</Badge>
                      </div>
                    </div>
                    <div className="inline-flex items-start gap-[12px] relative">
                      {project.project?.tags && project.project?.tags.map((tag: string, index: number)=>{
                        return(
                          <div className="inline-flex relative h-[32px] py-[8px] px-[10px] justify-center items-center rounded-[20px] border-[1px] border-[#BEC3CA]" key={index}>
                            <span className="text-[#A2A9B3] text-[12px]">{tag}</span>
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
