"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { uploadContent } from "@/lib/upload";
import { createProject } from "@/lib/data/project";
import { serverApi } from "@/lib/data/general";

import { Club, PRIVACY_TYPE, ProjectType } from "@/lib/interfaces";

import NoticeGroupSelect from "./notice-group-select";
import SelectGroupInScope from "./select-group-in-scope";
import MediaUploader from "@/components/extra/media-uploader";
import ProfessionTagType from "./profession-tag-type";

import Image from "@/components/ui/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormInlineItem,
  FormInlineLabel,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AlertCircle, X } from "lucide-react";

const projectFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, {
        message: "Enter project name.", // 필수 필드에 대한 사용자 정의 메시지
      })
      .min(2, {
        message: "Your group's name must be at least 2 characters.",
      })
      .max(30, {
        message: "Your group's name must not be longer than 30 characters.",
      })
      .refine(
        (val) => {
          const trimmed = val.replace(/\s+/g, " ");
          return trimmed.length >= 2 && trimmed.length <= 30;
        },
        {
          message:
            "Your group's name must be between 2 and 30 characters, consecutive spaces are counted as one.",
        }
      ),
    begin_date: z.string(),
    end_date: z.string(),
    description: z
      .string()
      .trim()
      .min(10, {
        message: "Your groups description must be at least 10 characters.",
      })
      .max(1000, {
        message:
          "Your groups description must not be longer than 1000 characters.",
      }),
    tags: z
      .array(z.string())
      .min(1, {
        message: "At least one tag is required.",
      })
      .max(5, {
        message: "No more than 5 tags are allowed.",
      }),
    scope: z.string(),
    image: z.string().optional(),
    type: z.nativeEnum(ProjectType, {
      required_error: "You need to select a type.",
    }),
  });

type CreateProjectFormValues = z.infer<typeof projectFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CreateProjectFormValues> = {
  scope: PRIVACY_TYPE.PUBLIC,
};

export default function CreateProjectForm({ lang }: { lang: any }) {
  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag

  const [selectGroupDialog, setSelectGroupDialog] = useState<boolean>(false);
  const [myGroups, setMyGroups] = useState<Club[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Club[]>([]);
  const [noticeGroupSelectOpen, setNoticeGroupSelectOpen] =
    useState<boolean>(false);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault();
      const currentTags = form.getValues("tags") || [];
      !currentTags.includes(newTag.trim()) &&
        form.setValue("tags", [...currentTags, newTag.trim()], {
          shouldValidate: true,
        });
      setNewTag(""); // Clear the input field for new tag
    }
  };

  const clickTagsBadge = (_job_item: string) => {
    const currentTags = form.getValues("tags") || [];
    !currentTags.includes(_job_item.trim()) &&
      form.setValue("tags", [...currentTags, _job_item.trim()], {
        shouldValidate: true,
      });
    setNewTag(""); // Clear the input field for new tag
  };

  const handleNewTagChange = (e: any) => {
    setNewTag(e.target.value);
  };

  async function onSubmit(data: CreateProjectFormValues) {
    if (
      form.getValues("scope") === PRIVACY_TYPE.GROUP &&
      selectedGroup.length < 1
    ) {
      setNoticeGroupSelectOpen(true);
      return;
    }

    setLoading(true);

    if (file) {
      const uploadedImage = await uploadContent(file);
      data.image = uploadedImage ?? "";
    }

    if (present) {
      data.end_date = "";
    }

    const computedName = data.name.replace(/\s+/g, " ").trim();

    const result = await createProject({
      image: data.image,
      name: computedName,
      description: data.description,
      begin_date: data.begin_date,
      end_date: data.end_date,
      tags: data.tags,
      scope: data.scope,
      type: data.type,
    });

    if (result.status === "success") {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      router.push(`/project/${result.data.id}`);
    } else {
      setLoading(false);
    }
  }

  const selectFile = (file: any) => {
    setFile(file);
  };

  // Select Group
  const onSelectGroup = (_groups: Club[]) => {
    setSelectedGroup(_groups);
  };

  const onClickDeleteClub = (clickedGroup: Club) => {
    setSelectedGroup(
      selectedGroup.filter((_group) => {
        return _group.id !== clickedGroup.id;
      })
    );
  };

  useEffect(() => {
    const fetchMyGroupsData = async () => {
      if (selectGroupDialog && myGroups.length < 1) {
        const result = await serverApi(`/clubs/my`);

        if (result.status === "success") {
          setMyGroups(result.data);
        }
      }
    };

    fetchMyGroupsData();
  }, [selectGroupDialog, myGroups.length]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
                {lang.project.list.create_project.name}
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl>
                  <Input
                    placeholder={lang.project.list.create_project.name_dsc}
                    {...field}
                    {...form.register("name")}
                  />
                </FormControl>

                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
                {lang.project.list.create_project.type}
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="max-w-[300px]">
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          lang.project.list.create_project.type_placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ProjectType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {lang.interface.project_type[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <FormInlineItem className="relative items-start">
          <FormInlineLabel className="mt-5">
            {lang.project.list.create_project.period}
            <span className="ml-1 text-state-error">*</span>
          </FormInlineLabel>
          <div className="flex flex-row flex-wrap items-center w-full gap-2 sm:flex-nowrap">
            <FormField
              control={form.control}
              name="begin_date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Input type="date" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <span>~</span>
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem
                  className={`w-full relative ${
                    present && "opacity-40"
                  }`}
                >
                  <Input type="date" {...field} disabled={present} />
                  {present && (
                    <div className="absolute inset-0 px-4 py-5 rounded-sm text-title_m text-text-placeholder bg-background-layer-2">
                      {lang.project.list.create_project.in_progress}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="absolute right-0 flex justify-end gap-1 pb-2 bottom-full">
            <Checkbox
              id="present"
              onCheckedChange={(_value: boolean) => {
                if (_value) {
                  form.setValue("end_date", "2099-12-31");
                } else {
                  form.setValue("end_date", "");
                }

                setPresent(!present);
              }}
            />
            <Label htmlFor="present">
              {lang.project.list.create_project.in_progress}
            </Label>
          </div>
        </FormInlineItem>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel>
                {lang.project.list.create_project.describe}
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl>
                  <Textarea
                    placeholder={
                      lang.project.list.create_project.describe_placeholder
                    }
                    className="p-4 resize-none min-h-[132px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <FormInlineItem className="items-start">
          <FormInlineLabel className="items-start">
            {lang.group.create.form.cover_image}
          </FormInlineLabel>

          <MediaUploader
            key="image"
            onFileSelected={selectFile}
            width={140}
            height={140}
          >
            <div>
              <div className="mb-1 text-title_s text-text-secondary">
                {lang.group.create.form.image_guide}
              </div>

              <li className="text-text-placeholder text-label_s">
                {lang.project.list.create_project.image_guide1}
              </li>

              <li className="text-text-placeholder text-label_s">
                {lang.project.list.create_project.image_guide2}
              </li>
            </div>
          </MediaUploader>
        </FormInlineItem>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
                {lang.project.list.create_project.category}
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl>
                  <div>
                    <Input
                      placeholder={
                        lang.project.list.create_project.category_dsc
                      }
                      value={newTag}
                      onChange={handleNewTagChange}
                      onKeyDown={handleKeyDown}
                      disabled={
                        form.getValues("tags") &&
                        form.getValues("tags").length > 4
                      }
                    />

                    {newTag && (
                      <ProfessionTagType
                        newTag={newTag}
                        onClickJobBadge={clickTagsBadge}
                      ></ProfessionTagType>
                    )}
                    <FormMessage />
                  </div>
                </FormControl>

                <div className="flex flex-wrap items-start gap-2 mt-3">
                  {form.getValues("tags") &&
                    form.getValues("tags")?.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="accent"
                        shape="md"
                        className="flex items-center gap-1.5 max-w-[200px]"
                      >
                        <div className="w-full truncate">{tag}</div>
                        <X
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => {
                            const currentTags = form.getValues("tags") || [];
                            const newTags = currentTags.filter(
                              (t) => t !== tag
                            );
                            form.setValue("tags", newTags, {
                              shouldValidate: true,
                            });
                          }}
                        ></X>
                      </Badge>
                    ))}
                </div>
              </div>
            </FormInlineItem>
          )}
        />

        <FormField
          control={form.control}
          name="scope"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="flex items-center h-10">
                {lang.project.list.create_project.scope}
                <span className="ml-1 text-state-error">*</span>

                <Popover>
                  <PopoverTrigger className="ml-2">
                    <AlertCircle className="w-4 h-4"></AlertCircle>
                  </PopoverTrigger>

                  <PopoverContent className="max-w-full p-0">
                    {/* plan to make variant */}
                    <Card className="max-w-[500px] bg-background-tooltip rounded-sm p-4 ">
                      <ul className="space-y-2 text-body_m text-accent-on-primary">
                        {Object.values(PRIVACY_TYPE).map((type, index) => (
                          <li key={index}>
                            {lang.interface.privacy_type[type]}:{" "}
                            {
                              lang.project.list.create_project[
                                `tooltip_${type}`
                              ]
                            }
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </PopoverContent>
                </Popover>
              </FormInlineLabel>

              <div>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row flex-wrap items-center gap-6"
                >
                  {Object.values(PRIVACY_TYPE).map((type) => (
                    <FormItem
                      key={type}
                      className="flex flex-wrap items-center space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>

                      <FormLabel className="font-normal capitalize">
                        {lang.interface.privacy_type[type]}
                      </FormLabel>
                    </FormItem>
                  ))}

                  {form.getValues("scope") == PRIVACY_TYPE.GROUP && (
                    <>
                      <Dialog
                        open={selectGroupDialog}
                        onOpenChange={setSelectGroupDialog}
                      >
                        <DialogTrigger>
                          <Badge className="cursor-pointer">
                            {
                              lang.project.list.create_project.select_group
                                .button
                            }
                          </Badge>
                        </DialogTrigger>

                        <DialogContent className="max-w-[720px] gap-0 px-8">
                          <SelectGroupInScope
                            lang={lang}
                            myGroups={myGroups}
                            selectedGroup={selectedGroup}
                            onSelectGroup={onSelectGroup}
                          ></SelectGroupInScope>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </RadioGroup>

                {form.getValues("scope") == PRIVACY_TYPE.GROUP && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedGroup.length > 0 &&
                      selectedGroup.map((group: Club, index: number) => {
                        return (
                          <Badge
                            shape="outline"
                            className="gap-2 my-1.5"
                            key={index}
                          >
                            <div className="w-5 h-5 overflow-hidden rounded-full shrink-0">
                              <Image
                                src={`https://ipfs.io/ipfs/${group.image}`}
                                alt={group.name}
                                width="20"
                                height="20"
                              ></Image>
                            </div>

                            <div className="text-label_m max-w-[120px] truncate">
                              {group.name}
                            </div>

                            <X
                              className="w-5 h-5 cursor-pointer shrink-0 text-text-secondary"
                              onClick={() => onClickDeleteClub(group)}
                            ></X>
                          </Badge>
                        );
                      })}
                  </div>
                )}

                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <NoticeGroupSelect
          lang={lang}
          open={noticeGroupSelectOpen}
          onOpenChange={setNoticeGroupSelectOpen}
          onClickSelectGroup={() => {
            setNoticeGroupSelectOpen(false);
            setSelectGroupDialog(true);
          }}
        ></NoticeGroupSelect>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            size="lg"
            onClick={() => {
              router.back();
            }}
          >
            {lang.project.list.create_project.back}
          </Button>

          <Button type="submit" size="lg" disabled={loading} loading={loading}>
            {/* || !form.formState.isValid */}
            {lang.project.list.create_project.make}
          </Button>
        </div>
      </form>
    </Form>
  );
}
