import { Button } from "@/components/ui/button";
import { formatDateToTimeAgo } from "@/lib/utils";
import Link from "next/link";

// Individual Notification component
export default function NotificationItem({
  notification,
}: {
  notification: {
    template_code: string;
    sender: string;
    receiver: string;
    category: string;
    contents: any;
    created_at: string;
    updated_at: string;
    state: any;
  };
}) {
  switch (notification.template_code) {
    //request to join project.
    case "5":
      return (
        <div className="flex flex-col">
          <span className="text-sm ">
            <b>You</b> have joined the{" "}
            <Link
              href={`/project/${notification.contents.project_id}`}
              className="text-accent-primary"
            >
              {notification.contents.project_name}
            </Link>{" "}
            as a {notification.contents.project_role}{" "}
          </span>
          <small className="text-text-secondary text-xs">
            {formatDateToTimeAgo(notification.created_at)}
          </small>
        </div>
      );
    //request to join club
    case "11":
      return (
        <div className="grow flex flex-col gap-[14px]">
          <div className="flex flex-col gap-[7px]">
            <span className="text-sm">
              <b>{notification.contents.userName}</b> requested to join{" "}
              {notification.contents.clubName}
            </span>

            <small className="text-text-secondary text-xs">
              {formatDateToTimeAgo(notification.created_at)}{" "}
            </small>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                window.alert(notification.contents.clubId);
              }}
              variant={"secondary"}
              size="sm"
            >
              Decline
            </Button>
            <Button
            onClick={() => {
                window.alert(notification.contents.clubId);
              }}
            size="sm"
            >Accept</Button>
          </div>
        </div>
      );
    default:
      return (
        <div className="notification-item">Unknown notification type.</div>
      );
  }
}
