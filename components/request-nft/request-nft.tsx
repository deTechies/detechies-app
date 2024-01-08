"use client";
import { useState } from "react";
// import { RequestNftForm } from "@/components/form/request-nft-form";

import { useSearchParams } from "next/navigation";
import GroupListItem from "./group-list-item";
import NftListItem from "./nft-list-item";

import { Achievement } from "@/lib/interfaces";
import { getGroupAchievements } from "@/lib/data/achievements";

import Search from "@/components/extra/search";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default async function RequestNFTModal({ groups }: { groups: any[] }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

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

  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);


  const onClickGroupItem = (_group: any) => {
    // console.log(_group);
    setSelectedGroup(_group);
  };

  const onClickNftItem = (_nft: any) => {
    console.log(_nft);
    setSelectedAchievement(_nft);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    // const result = await ------({
    //   group: selectedGroup,
    //   achievement: selectedAchievement,
    //   message: data.message,
    // });

    // if (result) {
    //   toast({
    //     title: "Successfully requested to nft",
    //     description: "The group leader will review your request",
    //   });
    // }

    setLoading(false);
  };

  const dummy_nfts = [
    {
      id: "314fec38-e683-44e7-af35-a5cd82130ea2",
      contract: null,
      name: "JiyongNFT",
      description: "내가 하사하는 NFT이니 영광으로 아시오",
      nft_type: "sbt",
      image: "bafybeiakpczli6q36a2dcx3euxyq4zxdwlv5yviumby35pbjj7yzauilty",
      avatar: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
      avatar_type: "clothes",
      type: "awards",
      onchain: false,
      created_at: "2023-12-30T22:32:41.165Z",
    },
    {
      id: "734dd6ae-c5d6-4273-8174-c998bc29ad91",
      contract: null,
      name: "AvatarImage",
      description: "AvatarImage test",
      nft_type: "erc721",
      image: "bafybeiakpczli6q36a2dcx3euxyq4zxdwlv5yviumby35pbjj7yzauilty",
      avatar: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
      avatar_type: "clothes",
      type: null,
      onchain: false,
      created_at: "2024-01-02T00:03:47.120Z",
    },
    {
      id: "0dcd09a0-dbb4-4ecd-80f0-93c70daa52d2",
      contract: null,
      name: "test",
      description: "test",
      nft_type: "erc721",
      image: "bafkreiexoszjqguxd3azoasc37gfgermejm54erpo7u4qj6wcpymhwoe4m",
      avatar: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
      avatar_type: "clothes",
      type: null,
      onchain: false,
      created_at: "2024-01-02T00:10:47.462Z",
    },
    {
      id: "58ea62eb-e84b-431f-b18c-2a4d952a359a",
      contract: null,
      name: "nft_avatar_test",
      description: "nft_avatar_test",
      nft_type: "erc721",
      image: null,
      avatar: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
      avatar_type: "clothes",
      type: "awards",
      onchain: false,
      created_at: "2024-01-02T00:13:53.667Z",
    },
    {
      id: "7dfa0afa-0c84-4bac-82ce-0ff5fd1a6864",
      contract: null,
      name: "nft_image_test",
      description: "image_test",
      nft_type: "erc721",
      image: "bafkreiexoszjqguxd3azoasc37gfgermejm54erpo7u4qj6wcpymhwoe4m",
      avatar: null,
      avatar_type: null,
      type: null,
      onchain: false,
      created_at: "2024-01-02T00:16:28.153Z",
    },
    {
      id: "702704b3-1e15-4d62-bcbe-cb7cf7c3652d",
      contract: null,
      name: "testtesttesttest",
      description: "2342342",
      nft_type: "sbt",
      image: "bafkreih5rkiqwfp5hka56idutmgim3gq7ncijjhurxnmfpvvsmnkepm7au",
      avatar: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
      avatar_type: "clothes",
      type: "edu",
      onchain: false,
      created_at: "2024-01-04T23:19:13.868Z",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger>
        <Badge variant="accent">Add</Badge>
      </DialogTrigger>

      <DialogContent className="max-w-[500px] gap-0">
        <h3 className="mb-4 text-subhead_s">그룹에게 NFT 수상 요청하기</h3>

        <div className="mb-4 text-body_m">
          공신력있는 그룹을 선택하고, 해당 그룹이 발행 가능한 NFT 상장을
          요청해보세요.
        </div>

        {/* Select Group */}
        {!selectedGroup && (
          <>
            <div className="mb-3">
              <Search placeholder="그룹 이름을 검색해보세요"></Search>
            </div>

            <div className="max-h-[287px] overflow-y-auto mb-6">
              {filteredData.length > 0 &&
                filteredData.map((_group: any, _index: number) => {
                  return (
                    <GroupListItem
                      _group={_group}
                      key={_index}
                      type="click"
                      onClick={() => onClickGroupItem(_group)}
                    ></GroupListItem>
                  );
                })}

              {filteredData.length < 1 && <div>No Group Data</div>}
            </div>

            <DialogClose className="flex">
              <Button size="lg" variant="secondary" className="max-w-full">
                다음에 할게요
              </Button>
            </DialogClose>
          </>
        )}

        {/* Select Achievement */}
        {selectedGroup && !selectedAchievement && (
          <>
            <div className="mb-3 text-title_s">요청하려는 그룹</div>

            <div className="mb-5">
              <GroupListItem _group={selectedGroup}></GroupListItem>
            </div>

            <div className="mb-3 text-title_s">발행 가능한 NFT</div>

            <div className="mb-6 max-h-[287px] overflow-y-auto ">
              {dummy_nfts.length > 0 &&
                dummy_nfts.map((nft: any, _index: number) => {
                  return (
                    <NftListItem
                      achievement={nft}
                      key={_index}
                      type="click"
                      onClick={() => onClickNftItem(nft)}
                    ></NftListItem>
                  );
                })}

              {dummy_nfts.length < 1 && <div>No Group Data</div>}
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
              뒤로 가기
            </Button>
          </>
        )}

        {/* Send request */}

        {selectedGroup && selectedAchievement && (
          <div>
            <div className="mb-3 text-title_s">요청하려는 그룹</div>

            <div className="mb-5">
              <GroupListItem _group={selectedGroup}></GroupListItem>
            </div>

            <div className="mb-3 text-title_s">요청하려는 NFT</div>

            <div className="mb-5">
              <NftListItem achievement={selectedAchievement}></NftListItem>
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
                        <FormLabel className="mb-3">요청 메세지</FormLabel>
                        <FormControl>
                        <Textarea
                          className="resize-none"
                          placeholder="안녕하세요. 우리의 혁신적인 프로젝트를 지원해주세요."
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
                      뒤로가기
                    </Button>

                    <Button
                      type="submit"
                      className="max-w-[212px] grow px-0"
                      disabled={loading}
                      loading={loading}
                    >
                      요청하기
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
