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
<<<<<<< HEAD
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
=======

>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import MediaUploader from "@/components/extra/media-uploader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { uploadAchievement } from "@/lib/data/achievements";
import {
    AVATAR_TYPE,
    NFT_IMAGE_TYPE,
    NFT_TYPE,
    SBT_TYPE,
} from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CompletedSuccess from "./completed-success";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Please choose a name that is at least 2 characters.",
    })
    .max(30, {
      message: "The name must not be longer than 30 characters.",
    }),
  type: z.nativeEnum(SBT_TYPE).optional(),
  nft_type: z.nativeEnum(NFT_TYPE),
  avatar_type: z.nativeEnum(AVATAR_TYPE).optional(),
  image_type: z.nativeEnum(NFT_IMAGE_TYPE),
  description: z.string().max(4000).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export function CreateNFTForm({ groupId }: { groupId: string }) {
  const {
    form,
    setUploadedImage,
    setUploadedAvatar,
    isLoading,
    completed,
    onSubmit,
  } = useCreateNFTForm(groupId);

  if (completed) return <CompletedSuccess />;

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center space-y-8 "
        >
          <Card>
            <CardHeader>
              <h2 className="text-heading_s">새로운 NFT 생성하기</h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-8 mt-3">
              <FormField
                control={form.control}
                name="nft_type"
                render={({ field }) => (
                  <FormInlineItem>
                    <FormInlineLabel>NFT 유형 *</FormInlineLabel>
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
                  <FormInlineItem>
                    <FormInlineLabel>NFT 속성 *</FormInlineLabel>
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
          <Card>
            <h2 className="text-subhead_s">한정판 NFT</h2>
            <div className="flex flex-col space-y-8 ">
              {form.watch("nft_type") == "sbt" && (
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormInlineItem>
                      <FormInlineLabel>Type</FormInlineLabel>
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
                  <FormInlineItem>
                    <FormInlineLabel>Name</FormInlineLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormInlineItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormInlineItem>
                    <FormInlineLabel className="items-start">
                      Description
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
                        <FormInlineLabel>Avatar Type</FormInlineLabel>
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
                  <FormInlineItem>
                    <FormInlineLabel className="justify-start">
                      Avatar
                    </FormInlineLabel>
                    <MediaUploader
                      key="unique_avatar"
                      onFileSelected={setUploadedAvatar}
                      width={100}
                      height={100}
                    />
                  </FormInlineItem>
                </>
              )}
              {form.watch("image_type") != "avatar" && (
                <FormInlineItem>
                  <FormInlineLabel className="items-start">
                    Image
                  </FormInlineLabel>
                  <MediaUploader
                    key="unique_cover"
                    onFileSelected={setUploadedImage}
                    width={100}
                    height={100}
                  />
                </FormInlineItem>
              )}
            </div>

            <div className="flex items-center justify-end gap-8 mt-8">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" loading={isLoading} size="lg">
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
<<<<<<< HEAD

=======
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
    
    
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0
    const result = await uploadAchievement(uploadData);

    console.log(result);
    toast({
      title: "Congratulations on your first nft!",
      description: "Succesfully create an nft. ",
    });
    
    if(result){
        setCompleted(true)
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
