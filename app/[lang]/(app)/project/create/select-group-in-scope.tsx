// "use client";
import { useEffect, useState } from "react";

import { useParams, useSearchParams } from "next/navigation";

import Search from "@/components/extra/search";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Achievement, Club } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { getUserProfile } from "@/lib/data/user";
import { getGroups } from "@/lib/data/groups";
import useFetchData from "@/lib/useFetchData";

export default function SelectGroupInScope({ lang }: { lang: any }) {
  const [Selecting, setSelecting] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const { data: members, loading: fetchLoading, error } = useFetchData<any[]>("/users");

  const onClickSelectGroup = async () => {
    setLoading(true);
    const groups = await getGroups();
    console.log(groups);
    setSelecting(true);
  };
  


  // const onClickGroupItem = (_group: any) => {
  //   setSelectedGroup(_group);
  // };

  // useEffect(() => {
  //   const getAchievements = async () => {
  //     if (!selectedGroup) return;
  //     const { data: fetchedGroupAchievement } =
  //       await getGroupAchievementsClient(selectedGroup.id);
  //     setGroupAchievements(fetchedGroupAchievement);
  //   };
  //   if (selectedGroup) {
  //     setSelectedAchievement;
  //     getAchievements();
  //   }
  // }, [selectedGroup]);

  // const onSubmit = async (data: z.infer<typeof FormSchema>) => {
  //   setLoading(true);

  //   const result = await requestAchievement(
  //     selectedAchievement.id,
  //     params.address.toString(),
  //     data.message
  //   );

  //   if (result) {
  //     toast({
  //       title: "Successfully requested to nft",
  //       description: "The group leader will review your request",
  //     });
  //   }

  //   setLoading(false);
  // };

  return (
    <Dialog>
      <DialogTrigger className="ml-auto">
        <Badge className="cursor-pointer">공개그룹 선택</Badge>
      </DialogTrigger>

      <DialogContent className="max-w-[720px] gap-0 px-8">
        {!Selecting ? (
          <>
            <h3 className="mb-4 text-subhead_s">공개할 그룹을 선택해 주세요</h3>

            <div className="mb-6 text-body_m">
              공개할 그룹을 선택하지 않았어요. 프로젝트를 공개할 그룹을
              적용하면, 적용된 그룹 멤버만 프로젝트를 볼 수 있어요.
            </div>

            <div className="flex gap-2 justify-center">
              <DialogClose className="flex max-w-[212px] w-full">
                <Button
                  size="lg"
                  variant="secondary"
                  className="max-w-full"
                >
                  닫기
                </Button>
              </DialogClose>

              <Button
                size="lg"
                variant="primary"
                onClick={onClickSelectGroup}
                loading={loading}
                disabled={loading}
              >
                그룹 선택하기
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <h3 className="mb-4 text-subhead_s">공개할 그룹 선택하기</h3>

              <div className="mb-6 text-body_m">
                내가 참여중인 그룹을 선택하면, 해당 그룹 멤버만 이 프로젝트를 볼
                수 있어요.
              </div>

              <div className="h-[232px] mb-6">Hi!</div>

              <div className="flex gap-2 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => setSelecting(false)}
                >
                  뒤로가기
                </Button>

                <Button size="lg" variant="primary">
                  그룹 선택하기
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
