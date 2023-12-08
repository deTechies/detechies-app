"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

export default function UpdateProfile() {
  const { data, update } = useSession();

  async function updateProfile() {
    console.log("update profile");
    //here we want to update the profile

    if (!data || !data.web3.user) {
      return;
    }
    await update({
      ...data,
      web3: {
        ...data.web3,
        user: {
          ...data?.web3?.user,
          avatar: "https://avatars.githubusercontent.com/u/36913813?v=4",
        },
      },
    });

    toast({
      title: "Profile updated",
      description: "Your profile has been updated",
    });
  }

  return (
    <div>
      <h1>Update Profiole</h1>
      <Button onClick={updateProfile}>Update Profile</Button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
