"use client";

import { signOut, useSession } from "next-auth/react";

import { DEFAULT_AVATAR_LINK } from "@/lib/constants";
import { addURL, truncateMiddle } from "@/lib/utils";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import {
  Copy,
  Github,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Moon,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Wallet
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { ThemeToggle } from "../extra/theme-toggle";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "../ui/use-toast";
import AccountSettings from "./account-settings";

interface ILoginProps {
  lang: any;
}

export default function Login({ lang }: ILoginProps) {
  const { connect, connectors } = useConnect();
  const {
    address,
    status,
    isConnected,
    isConnecting,
    isReconnecting,
    isDisconnected,
  } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain, chains } = useNetwork();
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession() as any;
  const router = useRouter();

  // Eager connection
  useEffect(() => {
    if (!isDisconnected) return;
    const wagmiConnected = localStorage.getItem("wagmi.connected");
    const isWagmiConnected = wagmiConnected
      ? JSON.parse(wagmiConnected)
      : false;

    if (!isWagmiConnected) return;

    const str_wallet = localStorage.getItem("wagmi.wallet");
    const wallet_name = str_wallet && str_wallet.replace(/^"|"$/g, "");
    connect({
      connector: connectors.find((connector) => connector.id === wallet_name),
    });
  }, [connect, connectors, isDisconnected]);

  if (isConnecting || isReconnecting) {
    return (
      <Avatar
        className="animate-pulse bg-accent-primary"
        onClick={() => {
          disconnect();
          signOut();
        }}
      >
        <AvatarFallback />
      </Avatar>
    );
  }

  async function copyAddress() {
    navigator.clipboard.writeText(session?.web3.user.wallet);
    toast({ title: "Copied to clipboard" });
  }

  if (session?.web3?.address != address && isConnected) {
    //sign message
    return (
      <div className="flex items-center gap-2 rounded-md">
        <Button size="sm" variant={"primary"} onClick={() => signOut()}>
          {lang.sign_in}
        </Button>
        {showModal && (
          <AccountSettings showModal={showModal} text_my_account={lang} />
        )}
      </div>
    );
  }

  if (!isConnecting && address && address == session?.web3?.address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2 rounded-md hover:scale-105	">
            <section className="flex flex-col gap-1 text-right text-xs font-semibold  my-1">
              <span className="text-text-secondary">
                {session.web3.user.display_name}
              </span>
              <span className="text-text-primary">
                {truncateMiddle(session.web3.user.wallet, 10)}
              </span>
            </section>
            <button
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src={
                    session.web3.user.avatar_link
                      ? addURL(session.web3.user.avatar_link)
                      : DEFAULT_AVATAR_LINK
                  }
                  alt="user"
                  fill
                  className="rounded-[6px] bg-background-layer-2"
                />
              </div>
            </button>

            {showModal && (
              <AccountSettings showModal={showModal} text_my_account={lang} />
            )}

            {chain?.id != 314159 && chain?.id != 80001 && (
              <Button
                variant={"destructive"}
                size="sm"
                onClick={() => setShowModal(!showModal)}
              >
                Change Chain
              </Button>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[250px]">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="group"
              onClick={(event) => {
                event.preventDefault();
                copyAddress();
              }}
            >
              <Wallet className="mr-2 h-4 w-4 " />
              <span className="text-sm">{truncateMiddle(session.web3.user.wallet, 18)}</span>
              <DropdownMenuShortcut>
                <Copy className="h-4 w-4 group-hover:text-accent-primary" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <Link href={`/profiles/${session.web3.user.wallet}`} passHref>
              <DropdownMenuItem className="group">
                <User className="mr-2 h-4 w-4 group-hover:text-accent-primary" />
                <span>Public Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/mypage" passHref>
              <DropdownMenuItem className="group">
                <LayoutDashboard className="mr-2 h-4 w-4 group-hover:text-accent-primary" />
                <span>My Page</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/mypage/edit" passHref>
              <DropdownMenuItem className="group">
                <Settings className="mr-2 h-4 w-4 group-hover:text-accent-primary" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="group">
              <Users className="mr-2 h-4 w-4 group-hover:text-accent-primary" />
              <span>Profiles</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4 group-hover:text-accent-primary" />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="group">
                    <Mail className="mr-2 h-4 w-4 group-hover:text-accent-primary" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="group">
                    <MessageSquare className="mr-2 h-4 w-4 group-hover:text-accent-primary" />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="group">
                    <PlusCircle className="mr-2 h-4 w-4 group-hover:text-accent-primary" />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group">
            <Github className="mr-2 h-4 w-4 group-hover:text-black-900" />
            {session.web3?.github ? (
              <span>{session.web3.github.user.display_name}</span>
            ) : (
              <span>GitHub</span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem className="group">
            <LifeBuoy className="mr-2 h-4 w-4 group-hover:text-accent-primary" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="group"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark mode</span>
            <DropdownMenuShortcut>
              <ThemeToggle />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="group"
            onClick={() => {
              disconnect();
              signOut();
              router.push("/onboard");
            }}
          >
            <LogOut className="mr-2 h-4 w-4 group-hover:text-state-error" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        size="md"
        variant="success"
        onClick={() => {
          router.push("/onboard");
        }}
      >
        {lang.sign_up}
      </Button>
    </div>
  );
}
