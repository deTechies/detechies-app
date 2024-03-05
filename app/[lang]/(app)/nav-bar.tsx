"use client";

import Login from "@/components/user/login";
import { Disclosure } from "@headlessui/react";
import { BellRing, Menu, MessageCircle, X } from "lucide-react";

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
    <Disclosure as="nav" className="z-10 mx-auto bg-background-layer-1">
      {({ open }) => (
        <>
          <div className="px-6 lg:px-8 max-w-[1920px] mx-auto relative">
            <div className="flex justify-between items-center py-5  px-2 md:px-4 lg:px-10">
              <div className="flex gap-4 items-center">
                <div className="flex flex-shrink-0 items-center h-[32px] w-[32px] relative flex-wrap cursor-pointer my-auto">
                  <Image
                    className="block object-contain "
                    src="/images/detechies.png"
                    alt="Connectfast"
                    width={32}
                    height={32}
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    priority={true}
                  />
                </div>

                <div className="gap-2 absolute hidden ml-10 sm:flex sm:gap-4 md:gap-2 ">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {links.map((link: any, index: number) => (
                    <Link
                      key={index}
                      href={link.href}
                      aria-disabled={link?.disabled}
                      className={`flex items-center text-sm font-medium py-3 content-center px-5
                      ${
                        pathname.includes(link.href)
                          ? "bg-background-layer-2 rounded-[6px]"
                          : "text-text-secondary hover:text-text-primary"
                      }  
                      `}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
              <section className="flex gap-10">
                <div className="hidden sm:ml-8 sm:flex sm:items-center sm:gap-[14px]">
                  {/* Profile dropdown */}
                  <div className="mx-3">
                    <MessageCircle className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div className="mx-3">
                    <BellRing className="w-5 h-5 cursor-pointer text-text-secondary hover:text-text-primary" />
                  </div>
                </div>
                <div className="relative ml-3 cursor-pointer">
                  <Login lang={lang.my_account} />
                </div>
              </section>
              <div className="flex items-center -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-accent-primary">
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
                <Login lang={lang.my_account} />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
