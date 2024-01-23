"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import MediaUploader from "@/components/extra/media-uploader";
import { ABI } from "@/lib/constants";
import { uploadAchievement } from "@/lib/data/achievements";
import {
  AVATAR_TYPE,
  Club,
  NFT_IMAGE_TYPE,
  NFT_TYPE,
  SBT_TYPE,
} from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Address, useContractWrite } from "wagmi";
import CompletedSuccess from "./completed-success";

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

export function CreateNFTForm({ group, lang }: { group: Club; lang: any }) {
  const {
    form,
    setUploadedImage,
    setUploadedAvatar,
    uploadedImage,
    uploadedAvatar,
    isLoading,
    completed,
    onSubmit,
  } = useCreateNFTForm(group.id, group);

  const router = useRouter();

  if (completed) return <CompletedSuccess groupId={group.id} lang={lang} />;

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

  const text = lang.group.details.manage.nft.create
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
                <h2 className="mb-3 text-heading_s">
                  {lang.group.details.profile_card.create_nft.title}
                </h2>

                <span className="mb-1 text-body_s text-state-error">
                  {lang.group.details.profile_card.create_nft.required_text}
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="nft_type"
                render={({ field }) => (
                  <FormInlineItem>
                    <FormInlineLabel>
                      {lang.group.details.profile_card.create_nft.nft_type}
                      <span className="ml-1 text-state-error">*</span>
                    </FormInlineLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row flex-wrap space-x-1"
                    >
                      {Object.values(NFT_TYPE).map((type) => (
                        <FormItem
                          key={type}
                          className="flex flex-wrap items-center space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="font-normal uppercase">
                            {lang.interface.nft_type[type]}
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
                  <FormInlineItem>
                    <FormInlineLabel>
                      {lang.group.details.profile_card.create_nft.nft_prop}
                      <span className="ml-1 text-state-error">*</span>
                    </FormInlineLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row flex-wrap space-x-1"
                    >
                      {Object.values(NFT_IMAGE_TYPE).map((type) => (
                        <FormItem
                          key={type}
                          className="flex flex-wrap items-center space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            {lang.interface.nft_image_type[type]}
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
                {lang.interface.nft_type[form.watch("nft_type")]} NFT
              </h2>
              <span className="mb-1 text-body_s text-state-error">
                {lang.group.details.profile_card.create_nft.required_text}
              </span>
            </div>

            <div className="flex flex-col gap-8">
              {form.watch("nft_type") == "sbt" && (
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormInlineItem>
                      <FormInlineLabel>
                        {lang.group.details.profile_card.create_nft.sbt_type}
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
                            className="flex flex-wrap items-center space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={type} />
                            </FormControl>
                            <FormLabel className="font-normal uppercase">
                              {lang.interface.sbt_type[type]}
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
                      {lang.group.details.profile_card.create_nft.sbt_name}
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
                      {lang.group.details.profile_card.create_nft.sbt_desc}
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
                      <FormInlineItem>
                        <FormInlineLabel>
                          {
                            lang.group.details.profile_card.create_nft
                              .avatar_type
                          }
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
                              className="flex flex-wrap items-center space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={type} />
                              </FormControl>
                              <FormLabel className="font-normal uppercase">
                                {lang.interface.avatar_type[type]}
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
                      {lang.group.details.profile_card.create_nft.avatar_image}
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
                          {
                            lang.group.details.profile_card.create_nft
                              .guide_title
                          }
                        </div>

                        <li className="mb-1 text-text-placeholder text-label_s">
                          {lang.group.details.profile_card.create_nft.guide1}
                        </li>

                        <li className="mb-1 text-text-placeholder text-label_s">
                        {lang.group.details.profile_card.create_nft.guide2}
                        </li>

                        <li className="mb-1 text-text-placeholder text-label_s">
                        {lang.group.details.profile_card.create_nft.guide3}
                        </li>
                      </div>
                    </MediaUploader>
                  </FormInlineItem>
                </>
              )}
              {form.watch("image_type") != "avatar" && (
                <FormInlineItem className="items-start">
                  <FormInlineLabel>
                    {lang.group.details.profile_card.create_nft.sbt_image}
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
                        {lang.group.details.profile_card.create_nft.guide_title}
                      </div>

                      <li className="mb-1 text-text-placeholder text-label_s">
                        {lang.group.details.profile_card.create_nft.guide3}
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
                {lang.group.details.profile_card.create_nft.back}
              </Button>

              <Button
                type="submit"
                loading={isLoading}
                size="lg"
                disabled={createDisabled() || isLoading}
              >
                {lang.group.details.profile_card.create_nft.back}
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </main>
  );
}

const useCreateNFTForm = (groupId: string, group: Club) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { write, error } = useContractWrite({
    address: group.contract as Address,
    abi: ABI.group,
    functionName: "addAchievement",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
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

    //upload nft data
    let metadataUpdate = {
      image: "https://ipfs.io/ipfs/" + uploadData.image,
      name: uploadData.name,
      description: uploadData.description,
      attributes: {
        type: uploadData.type,
        avatar_type: uploadData.avatar_type,
        image_type: uploadData.image_type,
        nft_type: uploadData.nft_type,
      },
      avatar: "",
    };

    if (uploadData.image_type == NFT_IMAGE_TYPE.AVATAR) {
      metadataUpdate.image = "https://ipfs.io/ipfs/" + uploadData.avatar;
    }

    if (uploadData.image_type == NFT_IMAGE_TYPE.IMAGE_AND_AVATAR) {
      metadataUpdate.image = "https://ipfs.io/ipfs/" + uploadData.image;
      metadataUpdate.avatar = "https://ipfs.io/ipfs/" + uploadData.avatar;
    }
    const metadata = await uploadContent(JSON.stringify(metadataUpdate));

    const tradeable = NFT_TYPE.SBT == uploadData.nft_type ? false : true;

    if (!metadata) {
      toast({
        title: "Error",
        description: "Failed to upload metadata",
      });

      setIsLoading(false);
      return;
    }

    await write({
      args: [metadata, tradeable],
    });

    const result = await uploadAchievement(uploadData);

    toast({
      title: "Congratulations on your first nft!",
      description: "Succesfully create an nft. ",
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
