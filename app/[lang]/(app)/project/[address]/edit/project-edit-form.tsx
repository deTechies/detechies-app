"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { updateProject } from "@/lib/data/project";
import { Club, PRIVACY_TYPE, ProjectType } from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";

import MediaUploader from "@/components/extra/media-uploader";
import ProfessionTagType from "@/components/extra/profession-tag-type";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import Image from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { serverApi } from "@/lib/data/general";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, X } from "lucide-react";
import * as z from "zod";
import SelectGroupInScope from "../../create/select-group-in-scope";

const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your project's name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your project's name must not be longer than 30 characters.",
    }),
  begin_date: z.string(),
  end_date: z.string(),
  description: z.string().max(5000).min(4),
  tags: z.array(z.string()),
  scope: z.string(),
  image: z.string().optional(),
  type: z.nativeEnum(ProjectType, {
    required_error: "You need to select a type.",
  }),
  id: z.string(),
});

type ProfileFormValues = z.infer<typeof projectFormSchema>;

export default function ProjectEditForm({
  defaultValues,
  lang,
}: {
  defaultValues?: Partial<ProfileFormValues>;
  lang: any;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag
  
  const [createObjectURL, setCreateObjectURL] = useState(null);
  
  const [selectGroupDialog, setSelectGroupDialog] = useState<boolean>(false);
  const [myGroups, setMyGroups] = useState<Club[]>([]);
  const [myGroupsLoading, setMyGroupsLoading] = useState<boolean>(false);
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

  const handleNewTagChange = (e: any) => {
    setNewTag(e.target.value);
  };

  const clickTagsBadge = (_job_item: string) => {
    const currentTags = form.getValues("tags") || [];
    !currentTags.includes(_job_item.trim()) &&
      form.setValue("tags", [...currentTags, _job_item.trim()], {
        shouldValidate: true,
      });
    setNewTag(""); // Clear the input field for new tag
  };

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);

    if (file) {
      const uploadedImage = await uploadContent(file);
      data.image = uploadedImage ?? "";
    }

    if (present) {
      data.end_date = "";
    }

    const result = await updateProject({
      image: data.image,
      name: data.name,
      description: data.description,
      begin_date: data.begin_date,
      end_date: data.end_date,
      tags: data.tags,
      scope: data.scope,
      type: data.type,
      id: data.id,
    });

    if (result.status === "success") {
      toast({
        title: "Success",
        description: "Project Edit successfully",
      });
      router.push(`/project/${data.id}`);
    } else {
      setLoading(false);
    }
  }

  const selectFile = (file: File | null, base64: string | null) => {
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
        setMyGroupsLoading(true);
        const result = await serverApi(`/clubs/my`);

        if (result.status === "success") {
          setMyGroups(result.data);
        }
        setMyGroupsLoading(false);
      }
    };

    fetchMyGroupsData();
  }, [selectGroupDialog, myGroups.length]);

  useEffect(() => {
    if (defaultValues?.end_date) {
      setPresent(false);
    } else {
      setPresent(true);
    }
  }, [defaultValues]);

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
                <FormControl className="mb-2">
                  <Input
                    placeholder={
                      lang.project.list.create_project.name_placeholder
                    }
                    {...field}
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
                  className={`w-full relative space-y-0 ${
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

          <div className="absolute right-0 flex justify-end gap-1 pb-3 bottom-full">
            <Checkbox
              id="present"
              checked={present}
              onCheckedChange={(_value: boolean) => {
                form.setValue("end_date", "");
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
                <FormControl className="mb-1">
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
                <FormControl className="mb-2">
                  <Input
                    placeholder={lang.project.list.create_project.category_dsc}
                    value={newTag}
                    onChange={handleNewTagChange}
                    onKeyDown={handleKeyDown}
                    disabled={
                      form.getValues("tags") &&
                      form.getValues("tags").length > 4
                    }
                  />
                </FormControl>

                {newTag && (
                  <ProfessionTagType
                    newTag={newTag}
                    onClickJobBadge={clickTagsBadge}
                    category="project"
                  ></ProfessionTagType>
                )}

                <div className="flex flex-wrap items-start gap-2 mt-3">
                  {form.getValues("tags") &&
                    form.getValues("tags")?.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        shape="md"
                        className="flex items-center gap-1.5 max-w-[200px]"
                      >
                        <div className="flex">
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
                        </div>
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
                  className="flex flex-row flex-wrap gap-6"
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
                            loading={myGroupsLoading}
                          />
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
                            <div className="flex gap-2">
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
                            </div>
                          </Badge>
                        );
                      })}
                  </div>
                )}
              </div>

              <FormMessage />
            </FormInlineItem>
          )}
        />

        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/project/${defaultValues?.id}`}
            className="w-full max-w-[212px]"
          >
            <Button variant="secondary" type="reset" size="lg">
              {lang.project.list.create_project.back}
            </Button>
          </Link>
          <Button
            type="submit"
            size="lg"
            disabled={loading || !form.formState.isValid}
            loading={loading}
          >
            {lang.project.list.edit}
          </Button>
        </div>
      </form>
    </Form>
  );
}
