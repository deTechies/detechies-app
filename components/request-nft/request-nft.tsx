"use client";
import { useEffect, useRef, useState } from "react";
// import { RequestNftForm } from "@/components/form/request-nft-form";

import { useParams, useSearchParams } from "next/navigation";
import RequestGroupListItem from "./request-group-list-item";
import RequestNftListItem from "./request-nft-list-item";

import Search from "@/components/extra/search";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  getGroupAchievementsClient,
  requestAchievement,
} from "@/lib/data/achievements";
import { Achievement, Club } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "../ui/use-toast";

export default function RequestNFTModal({
  groups,
  lang,
}: {
  groups: Club[];
  lang: any;
}) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const params = useParams();

  const FormSchema = z.object({
    message: z.string().max(100, {
      message: "Message must not be longer than 100 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  let filteredData = groups?.filter((item: any) => {
    if (!search) return true;

    return item.name?.toLowerCase().includes(search.toLowerCase());
  });

  const [selectedGroup, setSelectedGroup] = useState<Club | null>(null);
  const [groupAchievements, setGroupAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const onClickGroupItem = (_group: any) => {
    setSelectedGroup(_group);
  };

  const onClickNftItem = (_nft: any) => {
    setSelectedAchievement(_nft);
  };

  useEffect(() => {
    const getAchievements = async () => {
      if (!selectedGroup) return;
      const {data: fetchedGroupAchievement} = await getGroupAchievementsClient(
        selectedGroup.id
      );
      setGroupAchievements(fetchedGroupAchievement);
    };
    if (selectedGroup) {
      setSelectedAchievement;
      getAchievements();
    }
  }, [selectedGroup]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const result = await requestAchievement(
      selectedAchievement.id,
      params.address.toString(),
      data.message
    );

    if (result) {
      toast({
        title: "Successfully requested to nft",
        description: "The group leader will review your request",
      });
      setSelectedGroup(null);
      setSelectedAchievement(null);
      
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="ml-auto">
        <Button size="sm" variant="secondary">
          {lang.project.details.evalu.request}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[500px] gap-0">
        <h3 className="mb-4 text-subhead_s">
          {lang.project.details.evalu.request_title}
        </h3>

        <div className="mb-4 text-body_m">
          {lang.project.details.evalu.request_desc}
        </div>

        {/* Select Group */}
        {!selectedGroup && (
          <>
            <div className="mb-3">
              <Search
                placeholder={lang.project.details.evalu.search_placeholder}
              ></Search>
            </div>

            <div className="max-h-[287px] overflow-y-auto mb-6">
              {filteredData.length > 0 &&
                filteredData.map((_group: any, _index: number) => {
                  return (
                    <RequestGroupListItem
                      _group={_group}
                      key={_index}
                      type="click"
                      onClick={() => onClickGroupItem(_group)}
                    ></RequestGroupListItem>
                  );
                })}

              {filteredData.length < 1 && (
                <div>{lang.project.details.evalu.no_search_result}</div>
              )}
            </div>

            <DialogClose className="flex" asChild>
              <Button size="lg" variant="secondary" className="max-w-full" ref={closeButtonRef}>
                {lang.project.details.evalu.later}
              </Button>
            </DialogClose>
          </>
        )}

        {/* Select Achievement */}
        {selectedGroup && !selectedAchievement && (
          <>
            <div className="mb-3 text-title_s">
              {lang.project.details.evalu.request_group}
            </div>

            <div className="mb-5">
              <RequestGroupListItem _group={selectedGroup}></RequestGroupListItem>
            </div>

            <div className="mb-3 text-title_s">
              {lang.project.details.evalu.request_nft}
            </div>

            <div className="mb-6 max-h-[287px] overflow-y-auto ">
              {groupAchievements.length > 0 &&
                groupAchievements.map((nft: any, _index: number) => {
                  return (
                    <RequestNftListItem
                      achievement={nft}
                      key={_index}
                      type="click"
                      onClick={() => onClickNftItem(nft)}
                    ></RequestNftListItem>
                  );
                })}

              {groupAchievements.length < 1 && (
                <div>{lang.project.details.evalu.no_search_result}</div>
              )}
            </div>

            <Button
              size="lg"
              variant="secondary"
              className="max-w-full"
              onClick={() => {
                setSelectedAchievement(null);
                setSelectedGroup(null);
              }}
            >
              {lang.project.details.evalu.back}
            </Button>
          </>
        )}

        {/* Send request */}

        {selectedGroup && selectedAchievement && (
          <div>
            <div className="mb-3 text-title_s">
            {lang.project.details.evalu.request_group}
            </div>

            <div className="mb-5">
              <RequestGroupListItem _group={selectedGroup}></RequestGroupListItem>
            </div>

            <div className="mb-3 text-title_s">
            {lang.project.details.evalu.request_nft}
            </div>

            <div className="mb-5">
              <RequestNftListItem achievement={selectedAchievement}></RequestNftListItem>
            </div>

            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex-col items-center justify-center w-full space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-3">
                        {lang.project.details.evalu.message}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none"
                            placeholder={lang.project.details.evalu.message_placeholder}
                            {...field}
                          ></Textarea>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center gap-4">
                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={() => setSelectedAchievement(null)}
                    >
                      {lang.project.details.evalu.back}
                    </Button>

                    <Button
                      type="submit"
                      className="max-w-[212px] grow px-0"
                      disabled={loading}
                      loading={loading}
                    >
                      {lang.project.details.evalu.request}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
