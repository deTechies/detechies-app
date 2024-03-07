import { Locale } from "@/i18n.config";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";
import LoginButtons from "./login-buttons";

export default async function OnboardPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <main className="flex flex-col gap-12 items-center w-full md:w-[1/2] mx-auto">
      <div className="flex flex-col gap-8 w-full text-center">
        <div className="flex flex-row gap-4 items-center mx-auto">
          <div className="relative h-24 w-24">
            <Image
              className="block object-contain h-24 animate-pulse "
              src="/images/detechies.png"
              alt="deTechies"
              fill={true}
              priority={true}
            />
          </div>
        </div>
        <div>
          <h1 className="flex flex-col gap-1 mb-2 text-xl font-medium">
            Welcome Techie
          </h1>
          <p>Choose your preferred way of signing in.</p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 space-y-1">
        <Suspense
          fallback={
            <div className="h-[100px]">
              <Skeleton className="h-24 grow shrink animate-pulse bg-background-layer-1" />
            </div>
          }
        >
          <LoginButtons />
        </Suspense>
      </div>
    </main>
  );
}
