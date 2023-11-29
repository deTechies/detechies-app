"use client";


import Login from "@/components/user/login";
import { Disclosure } from "@headlessui/react";
import { BellIcon, Menu, MessageSquareIcon, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({lang}: {lang: any}) {
  //check if the current one is active
  const pathname = usePathname();
  
  const links = [
    {
      name: lang.profiles,
      href: "/profiles",
    },
    {
      name: lang.groups,
      href: "/groups",
    },
    {
      name: lang.projects,
      href: "/project",
    }

  ];
  
  //here we can check if the user is onboarded or not if not, we redirect it to the onboarding page.

  return (
    <Disclosure as="nav" className="bg-background-layer-1 z-10">
      {({ open }) => (
        <>
          <div className="px-6 lg:px-8 bg-background-layer-1 shadow-sm">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center w-[150px] relative flex-wrap cursor-pointer">

                  <Image
                    className="block h-12 object-contain "
                    src="/images/careerzen.png"
                    alt="Careerzen"
                    fill={true}
                    onClick={() => {window.location.href = "/profiles"}}
                    priority={true}
                  />

                </div>
              </div>

                <div className="hidden sm:ml-6 md:ml-24 sm:flex sm:space-x-8 ">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {links.map((link: any, index: number) => (
                    <Link
                      key={index}
                      href={link.href}
                      aria-disabled={link?.disabled}
                      className={`inline-flex items-center border-b-2 capitalize 
                      ${
                        pathname.endsWith(link.href)
                          ? "border-accent-primary text-accent-primary"
                          : "border-transparent text-text-secondary hover:text-text-primary"
                      }  
                      px-1 pt-1 text-md  text-primary`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              <div className="hidden sm:ml-8  sm:flex sm:items-center">
                {/* Profile dropdown */}
                <div className="mx-3">
                  <MessageSquareIcon className="h-5 w-5 text-text-secondary" />
                </div>
                <div className="mx-3">
                  <BellIcon className="h-5 w-5 text-text-secondary cursor-pointer hover:text-text-primary" />
                </div>
                <div className="relative ml-3 text-text-secondary hover:text-text-primary cursor-pointer">
                  <Login />
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md p-2
                 text-primary hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-accent-primary"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2 z-10">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              {links.map((link: any, index: number) => (
                <Disclosure.Button
                  key={index}
                  as="a"
                  href={link.href}
                  className={`block border-l-4  bg-background-layer-2 text-primary py-2 pl-3 pr-4 text-base font 
                ${
                  pathname.includes(link.href)
                    ? "border-accent-primary text-accent-primary"
                    : "border-transparent text-primary hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                }  
                `}
                >
                  {link.name}
                </Disclosure.Button>
              ))}
              <div className="mt-6 w-full flex justify-center">
                <Login />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
