import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DEFAULT_AVATAR_LINK } from "@/lib/constants";
import { serverApi } from "@/lib/data/general";
import { BellRing, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationItem from "./notification-type";

export default function NotificationPopover() {
  const [notifications, setNotifications] = useState<any>(null);
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data: notificationFetch } = await serverApi("/notify/all");
      if (notificationFetch) {
        setNotifications(notificationFetch);
      }
    };
    fetchNotifications();
  }, []);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <BellRing className="w-5 h-5 cursor-pointer text-text-secondary hover:text-text-primary" />
      </PopoverTrigger>
      <PopoverContent className="w-[460px]  border border-border-div mt-2 shadow p-0 rounded-md">
        <header className="flex justify-between border-b border-border-div p-5 items-center">
          <span className="text-title_m">Notifications</span>
          <RefreshCcw className="w-4 h-4 cursor-pointer text-text-secondary hover:text-accent-primary" />
        </header>
        <div className="h-[60vh] overflow-scroll">
          {notifications?.length > 0 &&
            notifications?.map((notification: any, key: string) => {
              return (
                <div
                  key={key}
                  className="border-b border-border-div p-5 flex flex-row gap-5 last:border-none"
                >
                  <Avatar>
                    <AvatarImage
                      src={DEFAULT_AVATAR_LINK}
                      className="w-10 h-10 rounded-full"
                    />
                  </Avatar>
                  <NotificationItem notification={notification} />
                </div>
              );
            })}
        </div>

        {notifications?.length === 0 && (
          <div className="flex justify-center items-center h-[60vh]">
            <span className="text-text-secondary">No notifications</span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
