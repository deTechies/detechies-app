"use client";
import { useEffect, useState } from "react";

import { Club } from "@/lib/interfaces";
import { serverApi } from "@/lib/data/general";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import GroupCheckboxListItem from "./group-checkbox-list-item";

export default function SelectGroupInScope({
  lang,
  selectedGroup,
  setSelectedGroup,
}: {
  lang: any;
  selectedGroup: Club[]; 
  setSelectedGroup: Function;
}) {
  const [Selecting, setSelecting] = useState<boolean>(false);
  const [myGroups, setMyGroups] = useState<Club[]>([]);
  const [selectedTempGroup, setSelectedTempGroup] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setSelectedTempGroup([...selectedGroup]);
  }, [selectedGroup])

  const onClickGoSelectGroup = async () => {
    if (myGroups.length === 0) {
      setLoading(true);
      const result = await serverApi(`/clubs/my`);

      if (result.status === "success") {
        setSelecting(true);
        setMyGroups(result.data);
      } else {
        // error
      }
      setLoading(false);
    } else {
      setSelecting(true);
    }
  };

  const onClickSelectGroup = () => {
    setSelectedGroup([...selectedTempGroup]);
    setSelecting(false);
  };

  const onClickGroupListItem = (_group: Club) => {
    setSelectedTempGroup((prevSelected) => {
      if (prevSelected.includes(_group)) {
        // 이미 선택된 경우, 해당 ID 제거
        return prevSelected.filter((_prev_group) => _prev_group !== _group);
      } else {
        // 선택되지 않은 경우, ID 추가
        return [...prevSelected, _group];
      }
    });
  };

  const onClickBack = () => {
    setSelectedTempGroup([...selectedGroup]);
    setSelecting(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
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
                <Button size="lg" variant="secondary" className="max-w-full">
                  닫기
                </Button>
              </DialogClose>

              <Button
                size="lg"
                variant="primary"
                onClick={onClickGoSelectGroup}
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

              <div className="h-[232px] mb-6 overflow-auto">
                {myGroups.length > 0 &&
                  myGroups.map((_group: Club) => {
                    return (
                      <GroupCheckboxListItem
                        group={_group}
                        isChecked={selectedTempGroup.includes(_group)}
                        onClick={() => onClickGroupListItem(_group)}
                        key={_group.id}
                      ></GroupCheckboxListItem>
                    );
                  })}
              </div>

              <div className="flex gap-2 justify-center">
                <Button size="lg" variant="secondary" onClick={onClickBack}>
                  뒤로가기
                </Button>

                <DialogClose className="max-w-[212px] w-full">
                  <Button
                    size="lg"
                    variant="primary"
                    onClick={onClickSelectGroup}
                  >
                    그룹 선택하기
                  </Button>
                </DialogClose>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
