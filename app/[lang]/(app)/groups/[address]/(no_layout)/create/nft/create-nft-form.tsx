"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import MediaUploader from "@/components/extra/media-uploader";
import { uploadAchievement } from "@/lib/data/achievements";
import {
  AVATAR_TYPE,
  NFT_IMAGE_TYPE,
  NFT_TYPE,
  SBT_TYPE,
} from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { useState } from "react";
import CompletedSuccess from "./completed-success";
import { useRouter } from "next/navigation";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Please choose a name that is at least 2 characters.",
    })
    .max(20, {
      message: "The name must not be longer than 20 characters.",
    }),
  type: z.nativeEnum(SBT_TYPE).optional(),
  nft_type: z.nativeEnum(NFT_TYPE),
  avatar_type: z.nativeEnum(AVATAR_TYPE).optional(),
  image_type: z.nativeEnum(NFT_IMAGE_TYPE),
  description: z.string().max(4000).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  nft_type: NFT_TYPE.SBT,
  image_type: NFT_IMAGE_TYPE.AVATAR,
  type: SBT_TYPE.EDU,
  avatar_type: AVATAR_TYPE.CLOTHES,
};

export function CreateNFTForm({ groupId }: { groupId: string }) {
  const {
    form,
    setUploadedImage,
    setUploadedAvatar,
    uploadedImage,
    uploadedAvatar,
    isLoading,
    completed,
    onSubmit,
  } = useCreateNFTForm(groupId);

  const router = useRouter();

  if (completed) return <CompletedSuccess />;

  const onClickCancel = () => {
    router.back();
  };

  const createDisabled = (): boolean => {
    if (!form.watch("name") || !form.watch("description")) {
      return true;
    }

    if (form.watch("image_type") == NFT_IMAGE_TYPE.AVATAR) {
      return !uploadedAvatar;
    }

    if (form.watch("image_type") == NFT_IMAGE_TYPE.IMAGE) {
      return !uploadedImage;
    }

    if (form.watch("image_type") == NFT_IMAGE_TYPE.IMAGE_AND_AVATAR) {
      return !uploadedImage || !uploadedAvatar;
    }

    return false;
  };

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center space-y-8 "
        >
          <Card className="gap-6 py-10 px-14">
            <CardHeader>
              <div>
                <h2 className="mb-3 text-heading_s">새로운 NFT 생성하기</h2>

                <span className="mb-1 text-body_s text-state-error">
                  *는 필수입력 사항입니다.
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="nft_type"
                render={({ field }) => (
                  <FormInlineItem className="h-12">
                    <FormInlineLabel>
                      NFT 유형 <span className="ml-1 text-state-error">*</span>
                    </FormInlineLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row flex-wrap space-x-1"
                    >
                      {Object.values(NFT_TYPE).map((type) => (
                        <FormItem
                          key={type}
                          className="flex flex-wrap items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="font-normal uppercase">
                            {type}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>

                    <FormMessage />
                  </FormInlineItem>
                )}
              />
              <FormField
                control={form.control}
                name="image_type"
                render={({ field }) => (
                  <FormInlineItem className="h-12">
                    <FormInlineLabel>
                      NFT 속성 <span className="ml-1 text-state-error">*</span>
                    </FormInlineLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row flex-wrap space-x-1"
                    >
                      {Object.values(NFT_IMAGE_TYPE).map((type) => (
                        <FormItem
                          key={type}
                          className="flex flex-wrap items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            {type}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormInlineItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="gap-6 py-10 px-14">
            <div>
              <h2 className="mb-3 text-subhead_m">
                {form.watch("nft_type") == "sbt" ? "커리어 NFT" : "한정판 NFT"}
              </h2>
              <span className="mb-1 text-body_s text-state-error">
                *는 필수입력 사항입니다.
              </span>
            </div>

            <div className="flex flex-col gap-8">
              {form.watch("nft_type") == "sbt" && (
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormInlineItem className="h-12">
                      <FormInlineLabel>
                        {/* Type */}
                        증명서 타입
                        <span className="ml-1 text-state-error">*</span>
                      </FormInlineLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row flex-wrap space-x-1"
                      >
                        {Object.values(SBT_TYPE).map((type) => (
                          <FormItem
                            key={type}
                            className="flex flex-wrap items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={type} />
                            </FormControl>
                            <FormLabel className="font-normal uppercase">
                              {type}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>

                      <FormMessage />
                    </FormInlineItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormInlineItem className="items-start">
                    <FormInlineLabel className="mt-5">
                      {/* Name */}
                      증명서 이름
                      <span className="ml-1 text-state-error">*</span>
                    </FormInlineLabel>
                    
                    <div className="grow">
                      <FormControl className="mb-2">
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormInlineItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormInlineItem className="items-start">
                    <FormInlineLabel>
                      {/* Description */}
                      증명서 설명
                      <span className="ml-1 text-state-error">*</span>
                    </FormInlineLabel>
                    <FormControl>
                      <div className="flex flex-col w-full gap-2">
                        <Textarea
                          placeholder="Tell us a little bit about your group here"
                          className="resize-none"
                          {...field}
                        />
                        <FormMessage className="block" />
                      </div>
                    </FormControl>
                  </FormInlineItem>
                )}
              />

              {form.watch("image_type") != "image" && (
                <>
                  <FormField
                    control={form.control}
                    name="avatar_type"
                    render={({ field }) => (
                      <FormInlineItem className="h-12">
                        <FormInlineLabel>
                          {/* Avatar Type */}
                          아바타 타입
                          <span className="ml-1 text-state-error">*</span>
                        </FormInlineLabel>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row flex-wrap space-x-1"
                        >
                          {Object.values(AVATAR_TYPE).map((type) => (
                            <FormItem
                              key={type}
                              className="flex flex-wrap items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={type} />
                              </FormControl>
                              <FormLabel className="font-normal uppercase">
                                {type}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>

                        <FormMessage />
                      </FormInlineItem>
                    )}
                  />
                  <FormInlineItem className="items-start">
                    <FormInlineLabel>
                      {/* Avatar */}
                      아바타 이미지
                      <span className="ml-1 text-state-error">*</span>
                    </FormInlineLabel>
                    <MediaUploader
                      key="unique_avatar"
                      onFileSelected={setUploadedAvatar}
                      width={192}
                      height={192}
                    >
                      <div>
                        <div className="mb-1 text-title_s text-text-secondary">
                          이미지 가이드
                        </div>

                        <li className="mb-1 text-text-placeholder text-label_s">
                          1:1 비율 권장
                        </li>

                        <li className="mb-1 text-text-placeholder text-label_s">
                          배경이 없는 PNG 형식의 이미지 권장
                        </li>

                        <li className="mb-1 text-text-placeholder text-label_s">
                          NFT 증명서 페이지에서 확인 가능합니다.
                        </li>
                      </div>
                    </MediaUploader>
                  </FormInlineItem>
                </>
              )}
              {form.watch("image_type") != "avatar" && (
                <FormInlineItem className="items-start">
                  <FormInlineLabel>
                    {/* Image */}
                    증명서 이미지
                    <span className="ml-1 text-state-error">*</span>
                  </FormInlineLabel>
                  <MediaUploader
                    key="unique_cover"
                    onFileSelected={setUploadedImage}
                    width={192}
                    height={192}
                  >
                    <div>
                      <div className="mb-1 text-title_s text-text-secondary">
                        이미지 가이드
                      </div>

                      <li className="mb-1 text-text-placeholder text-label_s">
                        NFT 증명서 페이지에서 확인 가능합니다.
                      </li>
                    </div>
                  </MediaUploader>
                </FormInlineItem>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 mt-4">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onClickCancel}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                loading={isLoading}
                size="lg"
                disabled={createDisabled()}
              >
                Create NFT
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </main>
  );
}

const useCreateNFTForm = (groupId: string) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    //const image = await uploadContent(icon);
    //console.log(image);
    let avatar = null;
    let image = null;

    if (
      data.image_type == NFT_IMAGE_TYPE.AVATAR ||
      data.image_type == NFT_IMAGE_TYPE.IMAGE_AND_AVATAR
    ) {
      if (!uploadedAvatar) {
        setIsLoading(false);
        toast({
          title: "No avatar uplaoded",
          description:
            "When selecting the image type avatar or image and avatar you need to choose an image",
        });
        return;
      }

      avatar = await uploadContent(uploadedAvatar);
    }

    if (
      data.image_type == NFT_IMAGE_TYPE.IMAGE ||
      data.image_type == NFT_IMAGE_TYPE.IMAGE_AND_AVATAR
    ) {
      if (!uploadedImage) {
        setIsLoading(false);
        toast({
          title: "No avatar uplaoded",
          description:
            "When selecting the image type avatar or image and avatar you need to choose an image",
        });
        return;
      }

      image = await uploadContent(uploadedImage);
    }

    const uploadData = { ...data, avatar, image, clubId: groupId };
    toast({
      title: "You are uploading this..:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(uploadData, null, 2)}
          </code>
        </pre>
      ),
    });

    const result = await uploadAchievement(uploadData);

    console.log(result);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(result, null, 2)}</code>
        </pre>
      ),
    });

    if (result) {
      setCompleted(true);
    }
    setIsLoading(false);
  }

  return {
    form,
    uploadedImage,
    setUploadedImage,
    uploadedAvatar,
    setUploadedAvatar,
    isLoading,
    completed,
    onSubmit,
  };
};
