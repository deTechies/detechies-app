"use client";
import { useEffect, useState } from "react";

import { Club } from "@/lib/interfaces";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

import GroupCheckboxListItem from "./group-checkbox-list-item";

export default function SelectGroupInScope({
  lang,
  myGroups,
  selectedGroup,
  onSelectGroup,
  loading,
}: {
  lang: any;
  myGroups: Club[];
  selectedGroup: Club[];
  onSelectGroup: Function;
  loading: boolean;
}) {
  const [selectedTempGroup, setSelectedTempGroup] = useState<Club[]>([]);

  useEffect(() => {
    setSelectedTempGroup([...selectedGroup]);
  }, [selectedGroup]);

  const onClickSelectGroup = () => {
    onSelectGroup([...selectedTempGroup]);
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

  return (
    <div>
      <h3 className="mb-4 text-subhead_s">
        {lang.project.list.create_project.select_group.title}
      </h3>

      <div className="mb-6 text-body_m">
        {lang.project.list.create_project.select_group.desc}
      </div>

      <div className="h-[232px] mb-6 overflow-auto">
        {loading && (
          <div className="py-5 text-center text-text-secondary">loading...</div>
        )}

        {myGroups &&
          myGroups.length > 0 &&
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

        {!loading && myGroups?.length < 1 && <div>가입된 그룹이 없습니다.</div>}
      </div>

      <div className="flex justify-center gap-2">
        <DialogClose className="max-w-[212px] w-full">
          <Button size="lg" variant="secondary">
            {lang.project.list.create_project.select_group.back}
          </Button>
        </DialogClose>

        <DialogClose className="max-w-[212px] w-full">
          <Button size="lg" variant="primary" onClick={onClickSelectGroup}>
            {lang.project.list.create_project.select_group.select_group}
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
