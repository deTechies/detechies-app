"use client";



import Searchbar from "@/components/extra/search-bar";
import { Button } from "@/components/ui/button";

export default function TeamListFilter({ lang }: { lang: any }) {


  return (
    <div className="flex flex-col justify-between gap-4 py-2 mx-auto w-full rounded-md bg-background-layer-1 items-center">
      <div className="flex flex-col  w-full">
        <div className="flex flex-col md:flex-row w-full items-center gap-4 px-8">
          <div className="grow">
            <Searchbar placeholder={lang.project.list.search} size="md" />
          </div>

          <Button
            variant="ghost"
            className="text-accent-primary"
          >
            Joined (soon)
          </Button>
        </div>
      </div>
    </div>
  );
}
