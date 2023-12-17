"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { updateUserProfile } from "@/lib/data/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "Your first name must be at least 2 characters.",
    })
    .optional(),
  last_name: z
    .string()
    .min(2, {
      message: "Your last name must be at least 2 characters.",
    })
    .optional(),
  profession: z.string().optional(),
  description: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};


interface EditProfileProps {
    text: any;
    currentValues: Partial<ProfileFormValues>;
    username: string;
    }

export default function EditProfile({text, username, currentValues}: EditProfileProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: currentValues,
    mode: "onChange",
  });
  const {push} = useRouter()

  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);


    //@ts-ignore
    const result =await updateUserProfile(data)
    toast({
      title: "Creating profile...",
      description: <pre>
        {JSON.stringify(result, null, 2)}
        </pre>,
    });
     
    push("/mypage");

    setLoading(false);
  }
  
    
  const handleKeyDown = (e:any) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault();
      const currentTags = form.getValues("skills") || [];
      form.setValue("skills", [...currentTags, newTag.trim()], { shouldValidate: true });
      setNewTag(""); // Clear the input field for new tag
    }
  };

  const handleNewTagChange = (e:any) => {
    setNewTag(e.target.value);
  };

  return (
    <>
      <Card className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className="mb-8">
              <h1 className="mb-6 text-primary text-subhead_m capitalize">
                {text.edit_profile}
              </h1>
            </section>
            <section className="my-2">
              <div className="flex flex-col gap-10">

                  <div className="w-full">
                    <Label className="">{text?.full_name}</Label>
                    <div className="flex gap-2 items-center mt-2">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder={text?.first_name} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder={text?.last_name} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
               

                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                  <Label className="">{text?.profession}</Label>
                      <FormField
                        control={form.control}
                        name="profession"
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <FormControl>
                              <Input placeholder={text?.profession} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                  </div>
                  <div className="">
                    <Label className="mb-2">{text?.username}</Label>
                    <Input placeholder={username} value={username} disabled className="mt-2"/>
                   
                  </div>
                </div>
              </div>
            </section>
            <section className="my-10">
              <div>
              <FormItem>
            <FormLabel>Skills</FormLabel>
            <FormControl>
              <Input
                placeholder="Type and press enter"
                value={newTag}
                onChange={handleNewTagChange}
                onKeyDown={handleKeyDown}
              />
            </FormControl>
            <div>
              {form.watch("skills")?.map((tag, index) => (
                <Badge 
                key={index} 
                className="bg-background-layer-1 border border-accent-primary px-3 py-2 rounded-full text-xs mr-2"
                onClick={() => {
                  const currentTags = form.getValues("skills") || [];
                  const newTags = currentTags.filter((t) => t !== tag);
                  form.setValue("skills", newTags, { shouldValidate: true });
                }}
                >
                  
                  {tag}
                </Badge>
              ))}
            </div>
          </FormItem>
              </div>
            </section>
            <section className="my-10">
              <div>
                <Label>{text?.profile_description}</Label>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="익명으로 나를 소개할 정보를 입력해주세요. (이름, 연락처) 등의 개인정보를 입력할 경우, 강제 삭제될 수 있습니다."
                            style={{ height: "200px" }}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
              </div>
            </section>
          

            <div className="flex items-center w-full mt-10">
              <Button
                className="w-full  text-1xl"
                type="submit"
                loading={loading}
              >
                {text?.save_changes}
              </Button>
            </div>
          </form>
        </Form>
      </Card>

  
    </>
  );
}
