"use client";
import { useSession } from "next-auth/react";


export default function SettingsPAge() {

    const { data: session } = useSession();
  return (
    <div>{
        JSON.stringify(
            session
        )}</div>
  )
}
