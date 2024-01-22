"use client";

import Login from "@/components/user/login";
import { Disclosure } from "@headlessui/react";
import { BellRing, Globe, Menu, Send, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";


export default function Navbar({ lang }: { lang: any }) {
  //check if the current one is active
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const links = [
    {
      name: lang.my_profile,
      href: `/${params.lang}/mypage`,
    },
    {
      name: lang.project,
      href: `/${params.lang}/project`,
    },
    {
      name: lang.groups,
      href: `/${params.lang}/groups`,
    },
    {
      name: lang.find_expert,
      href: `/${params.lang}/profiles`,
    },
  ];
  
  function changeLanguage() {
    const value = params.lang === "en" ? "ko" : "en";
    //change the value in the path name
    const segments = pathname.split("/").filter(Boolean);
    const newPath = "/" + value + "/" + segments.slice(1).join("/");
    router.replace(newPath);
  }

  //here we can check if the user is onboarded or not if not, we redirect it to the onboarding page.

  return (
    <Disclosure as="nav" className="z-10 mx-auto bg-background-layer-1 ">
      {({ open }) => (
        <>
          <div className="px-6 lg:px-8 bg-background-layer-1 max-w-[1920px] mx-auto ">
            <div className="flex justify-between h-16">

              <div className="flex">
                <div className="flex flex-shrink-0 items-center w-[150px] relative flex-wrap cursor-pointer">
   
                  <Image
                    className="block object-contain h-12 dark:hidden"
                    src="/images/careerzen.png"
                    alt="Careerzen"
                    width={150}
                    height={48}
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    priority={true}
                  />
                     <Image
                    className="hidden object-contain h-12 dark:block"
                    src="/images/logo-invert.png"
                    alt="Careerzen"
                    width={150}
                    height={48}
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    priority={true}
                  />
                </div>
              </div>

              <div className="hidden sm:ml-6 md:ml-24 sm:flex sm:space-x-8 text-title_m">
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                {links.map((link: any, index: number) => (
                  <Link
                    key={index}
                    href={link.href}
                    aria-disabled={link?.disabled}
                    className={`inline-flex items-center border-b-[3px] capitalize 
                      ${
                        pathname.includes(link.href)
                          ? "border-accent-primary text-text-primary"
                          : "border-transparent text-text-placeholder hover:text-text-primary"
                      }  
                      px-1 pt-1 text-md`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:items-center">
                {/* Profile dropdown */}
                <div className="mx-3">
                  <Send className="w-5 h-5 text-text-secondary" />
                </div>
                <div className="mx-3">
                  <BellRing className="w-5 h-5 cursor-pointer text-text-secondary hover:text-text-primary" />
                </div>
                <div className="mx-3">
                  <Globe className="w-5 h-5 cursor-pointer text-text-secondary hover:text-text-primary" onClick={changeLanguage} />
                </div>
                <div className="relative ml-3 cursor-pointer text-text-secondary hover:text-text-primary">
                  <Login lang={lang.my_account}/>
                </div>
              </div>
              <div className="flex items-center -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-accent-primary"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="z-10 pt-2 pb-3 space-y-1">
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
              <div className="flex justify-center w-full mt-6">
                <Login lang={lang.my_account}/>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
