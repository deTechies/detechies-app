"use client"

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";


export default function Footer({links}: {links: any}) {
  const { setTheme } = useTheme()

  return (
    <main className="flex mt-24 mb-4 justify-center">
      <div className="flex flex-col gap-12">
          <div className="h-[40px] w-auto relative">
            <Image
              src="/landing/careerzen-footer.png"
              alt="Careerzen"
              className="object-scale-down fill-current block dark:hidden"
              fill={true}
            />
                <Image
              src="/landing/logo-invert.png"
              alt="Careerzen"
              className="object-scale-down fill-current hidden dark:block"
              fill={true}
            />
          </div>
        
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
          Copyright © 2023. Careerzen. All rights reserved.
        </span>
      </div>
      </div>
    </main>
  );
}