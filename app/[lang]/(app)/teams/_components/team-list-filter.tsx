"use client";



import Searchbar from "@/components/extra/search-bar";

export default function TeamListFilter({ lang }: { lang: any }) {


  return (
    <div className="flex flex-col justify-between gap-4 py-2 mx-auto w-full max-w-2xl rounded-[30px] bg-gray-300 items-center">
      <div className="flex flex-col  w-full">
        <div className="flex flex-col md:flex-row w-full items-center gap-4 px-8">
          <div className="grow">
            <Searchbar placeholder={lang.project.list.search} size="md" />
          </div>

        </div>
      </div>
    </div>
  );
}
