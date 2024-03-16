"use client"
import { Popover, Transition } from "@headlessui/react";
import { MessageCircle } from "lucide-react";
import { Fragment } from "react";

export default function ChatBubble() {
  return (
    <div className="w-full justify-end max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'text-white' : 'text-white/90'}
                group inline-flex items-center rounded-full bg-accent-primary px-3 py-2  hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <MessageCircle
                className={`${open ? 'text-orange-300' : 'text-orange-300/70'}
                   h-8 w-8 transition duration-150 ease-in-out group-hover:text-orange-300/80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-1" // Adjusted for upward movement
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-1" // Adjusted for upward movement
            >
              <Popover.Panel className="absolute bottom-full right-[0px] z-10 mb-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"> {/* Adjusted positioning */}
                <div className="bg-background-layer-1 rounded-sm p-md">
                  <ul>
                    <li>
                      Mesage 1
                    </li>
                    <li>
                      Mesage 1
                    </li>

                    <li>
                      Mesage 1
                    </li>
                  </ul>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
