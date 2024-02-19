"use client";
import React from "react";

import ProfileCard from "@/components/card/profile-card";
import { serverApi } from "@/lib/data/general";
import { Profile, ProfileDetails, User } from "@/lib/interfaces";
import ShowMoreButton from "@/components/extra/show-more-button";
import { Button } from "@/components/ui/button";
import InviteExperts from "./invite-experts";
import { useEffect, useState } from "react";
import ProfilesLoading from "./profiles-loading";

const ListProfiles = React.memo(
  ({
    lang,
    searchParams,
  }: {
    lang: any;
    searchParams: { [key: string]: string | undefined };
  }) => {
    const newUrl = new URLSearchParams();

    const [userProfiles, setUserProfiles] = useState<Profile[]>([]);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    // Loop through searchParams and set them in newUrl
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        const paramName = key === "search" ? "display_name" : key;
        newUrl.set(paramName, value);
      }
    });

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        let urlString = newUrl.toString();
        if (!urlString) {
          urlString = `?limit=${limit}`;
        } else {
          urlString += `&limit=${limit}`;
        }
        const { data: users } = await serverApi(`/users`, urlString);

        const sorted = (users as Profile[]).sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        // console.log(sorted);
    
        setUserProfiles(sorted);
        setLoading(false);
      };
      fetchData();
    }, [limit, newUrl.toString()]);

    return (
      <>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 ">
          {userProfiles?.length > 0 &&
            userProfiles.map((profile: User, index: number) => (
              <ProfileCard key={index} profile={profile} lang={lang} />
            ))}
        </div>

        {loading && <ProfilesLoading />}

        {!loading && userProfiles?.length < 1 && (
          <div className="py-24 text-center text-text-secondary text-subhead_s">
            {lang.group.details.manage.member.no_result}
          </div>
        )}

        {userProfiles?.length > 0 && userProfiles.length >= limit && (
          <Button
            className="w-full"
            variant={"secondary"}
            onClick={() => setLimit(limit + 10)}
          >
            {lang.achievement.display_nft.show_more}
          </Button>
        )}

        <div className="px-10 py-10 mt-10 max-w-[1028px] w-full min-h-[199px] rounded-md bg-no-repeat bg-cover flex mx-auto bg-[url('/images/banner-invite-user.png')]">
          <div className="max-w-[430px] mx-auto text-center">
            <div className="mb-1 text-subhead_m text-accent-primary">
              {lang.profile.list.banner}
            </div>

            <div className="mb-5 text-subhead_m text-text-fixed">
              {lang.profile.list.banner2}
            </div>

            <InviteExperts lang={lang}>
              <Button
                size="lg"
                variant="primary"
                className="flex items-center w-full gap-1 text-title_m"
              >
                {lang.profile.list.banner3}
              </Button>
            </InviteExperts>
          </div>
        </div>
      </>
    );
  }
);

ListProfiles.displayName = "ListProfiles";

export default ListProfiles;
