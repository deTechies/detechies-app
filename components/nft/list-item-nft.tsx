"use client";


import { Achievement } from "@/lib/interfaces";


export default function ListItemNFT({details}: {details: Achievement}) {
  return (
    <pre>
      {JSON.stringify(details, null, 2)}
    </pre>
  )
}
