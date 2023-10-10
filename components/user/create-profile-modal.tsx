"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import ModalLayout from "./modal-layout";

const jobs = [
  "Accounting",
  "Administrative",
  "Advertising",
  "Software Engineer",
];

export default function ProfileModal() {
  //after connecting you should be able to create a profile.
  const [formData, setFormData] = useState({
    address: "",
    name: "",
    username: "",
    firstname: "",
    lastname: "",
    description: "",
    email: "",
    job: "",
  });
  const {toast} = useToast();
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [open, setOpen] = useState<boolean>(false);
  const { address } = useAccount();
  if(address){
    console.log(address)
  }
  useEffect(() => {
    const checkAccount = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
        const result = await fetch(`${url}/polybase/${address}`).then((res) =>
          res.json()
        );

        if (result.statusCode == 404) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (address) {
      if (address) {
        checkAccount();
      }
    }
  }, [address]);

  const setJobSelect = (job: string) => {
    setFormData({ ...formData, job: job });
  };

  const saveProfile = () => {
    //@ts-ignore
    formData.address = address;
    formData.name = `${formData.firstname} ${formData.lastname}`;
    const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
    fetch(`${url}/polybase/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          console.log("Profile created successfully.");
          toast({
            title: "Profile created successfully.",
            description: "Please go to your profile to create your new profile",
          })
          setOpen(false);
        } else {
          console.error("Error creating profile:", data.message);
        }
      });
  };

  if (!open) {
    return null;
  }
  return (
    <ModalLayout title="Personal Info">
      <span>
        Please enter your real name, email and nickname these are necessary for
        creating Career NFT profile.
      </span>
      <div className="flex flex-col space-y-4 my-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          <Input
            label="Last name"
            placeholder="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <Input
          label="Display Name"
          placeholder="First Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          label="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div>
          <Label>Job</Label>
          <Select
            onValueChange={(value: any) => {
              console.log(value);
              setJobSelect(value);
            }}
          >
            <SelectTrigger className="w-full rounded-sm px-4">
              <SelectValue placeholder="Select your mint" />
            </SelectTrigger>
            <SelectContent>
              {jobs.map((job, index) => (
                <SelectItem value={job} key={index}>
                  {job}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Textarea
          label="Description"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            onClick={() => saveProfile()}
            disabled={
              !formData.username ||
              !formData.firstname ||
              !formData.email ||
              !formData.description
            }
          >
            Continue
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
