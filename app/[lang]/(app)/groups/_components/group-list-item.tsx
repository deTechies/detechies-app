import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Club } from "@/lib/interfaces";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GroupListItem = React.memo(
  ({
    details,
    lang,
    isPending,
  }: {
    details: Club;
    lang: any;
    isPending?: boolean;
    // The group on Pending is only visiable for owner (not implemented yet)
  }) => {
    
    const renderCardContent = () => (
      <Card className="flex flex-col items-center bg-black-700 text-accent-on-primary pt-[46px] h-full pb-6 px-6 gap-0">
        <section className="flex flex-col items-center justify-center w-full max-w-full text-center">
          <Avatar className="w-24 h-24 mb-2">
            <AvatarImage
              src={`https://ipfs.io/ipfs/${details.image}`}
              alt={details.name}
              className="rounded-full"
            />

            <AvatarFallback className="relative">
              <Image
                src="/images/connectfast.png"
                alt="no-item"
                fill={true}
                className="object-contain bg-no-repeat"
              />
            </AvatarFallback>
          </Avatar>

          <h5 className="max-w-full mb-1 truncate text-heading_s">
            {details.name}
          </h5>

          {isPending ? (
            <Badge shape="loading" variant="opacity" className="mb-4">
              <div className="flex items-center gap-2">
                <Loader className="w-5 h-5 animate-[spin_5s_linear_infinite]"></Loader>
                <span>{lang.group.create.form.wait_for_auth}</span>
              </div>
            </Badge>
          ) : (
            <div className="text-title_m mb-[46px] flex items-center gap-1">
              {details.type != "community" && (
                <Image
                  height={20}
                  width={20}
                  alt="certified"
                  src={`/icons/certified_${details.type}.png`}
                ></Image>
              )}

              {lang.group.list[details.type]}

              {/* {lang.interface.group_type[details.type] || details.type} */}
            </div>
          )}

          {isPending ? (
            <Link
              href="https://t.me/Careerzen_org"
              target="_blank"
              passHref
              className="max-w-[212px] w-full"
            >
              <Button size="lg">{lang.group.create.form.contact}</Button>
            </Link>
          ) : (
            <div className="flex divide-x">
              <div className="px-4">
                <div className="mb-1 text-label_s">
                  {lang.group.list.members}
                </div>
                <div className="text-title_m">{details.members?.length}</div>
              </div>

              <div className="px-4 text-center">
                <div className="mb-1 text-label_s">{lang.group.list.nfts}</div>

                <div className="text-title_m">
                  {details.achievements?.length}
                </div>
              </div>
            </div>
          )}
        </section>
      </Card>
    );

    return isPending ? (
      <div className="truncate">{renderCardContent()}</div>
    ) : (
      <Link href={`groups/${details.id}`} className="truncate">
        {renderCardContent()}
      </Link>
    );
  }
);

GroupListItem.displayName = "GroupListItem";

export default GroupListItem;
