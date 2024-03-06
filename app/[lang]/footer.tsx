"use client"

import Link from "next/link";


export default function Footer({links}: {links: any}) {
  

  return (
    <main className="flex mt-24 mb-4 justify-center">
      <div className="flex flex-col gap-12">
        
            <div className="flex gap-6 justify-center">
              {links.map((link:any, index: number) => (
                <Link
                  href={link.href}
                  className="text-text-secondary hover:text-green-medium text-md"
                  key={index}
                >
                  {link.name}
                </Link>
              ))}
            </div>
         
      <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-2">

          </div>
        <span className="text-text-secondary text-center">
          Copyright © 2024. deTechies. All rights reserved.
        </span>
      </div>
      </div>
    </main>
  );
}