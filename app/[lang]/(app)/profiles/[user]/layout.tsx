import React, { Suspense } from "react";
import UserProfileHeader from "./_component/user-profile-header";

export default function UserProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-8 ">
        <Suspense fallback={"loading"}>
            <UserProfileHeader userWallet={params.user} />
        </Suspense>
      <div className="flex flex-col gap-4 md:gap-8 ">
        <div className="flex flex-col gap-4 md:gap-8 ">{children}</div>
      </div>
    </div>
  );
}
