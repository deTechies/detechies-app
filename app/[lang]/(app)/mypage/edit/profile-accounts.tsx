"use client";

import { Card } from "@/components/ui/card";
import { useDictionary } from "@/lib/dictionaryProvider";
import ConnectionCard from "../_components/connections-card";
import { Profile } from "@/lib/interfaces";

interface IProfileAccountsProps {
  profile: Profile;
}

export default function ProfileAccounts({profile}:IProfileAccountsProps) {
  const dictionary = useDictionary();

  const darkLogos = [
    { name:"google", src: "/images/socials/dark/google.png", alt: "google unverified", text: dictionary.mypage.edit_profile.social_networks.google },
    { name:"bitcoin", src: "/images/socials/dark/bitcoin.png", alt: "bitcoin unverified", text: dictionary.mypage.edit_profile.social_networks.web3_wallet },
    { name:"email", src: "/images/socials/dark/email.png", alt: "email unverified", text: dictionary.mypage.edit_profile.social_networks.email },
    { name:"figma", src: "/images/socials/dark/figma.png", alt: "figma unverified", text: dictionary.mypage.edit_profile.social_networks.figma },
    { name:"facebook",
      src: "/images/socials/dark/facebook.png",
      alt: "facebook unverified",
      text: dictionary.mypage.edit_profile.social_networks.facebook,
    },
    { name:"github", src: "/images/socials/dark/github.png", alt: "github unverified", text: dictionary.mypage.edit_profile.social_networks.github },
    { name:"linkedin", src: "/images/socials/dark/linkedin.png", alt: "linkedin unverified", text: dictionary.mypage.edit_profile.social_networks.linkedin },
    { name:"phone", src: "/images/socials/dark/phone.png", alt: "phone unverified", text: dictionary.mypage.edit_profile.social_networks.phone_number },
    { name:"pinterest", src: "/images/socials/dark/pinterest.png", alt: "pinterest unverified", text: dictionary.mypage.edit_profile.social_networks.pinterest },
    { name:"reddit", src: "/images/socials/dark/reddit.png", alt: "reddit unverified", text: dictionary.mypage.edit_profile.social_networks.reddit },
    { name:"telegram", src: "/images/socials/dark/telegram.png", alt: "telegram unverified", text: dictionary.mypage.edit_profile.social_networks.telegram },
    { name:"youtube", src: "/images/socials/dark/youtube.png", alt: "youtube unverified", text: dictionary.mypage.edit_profile.social_networks.youtube },
    { name:"kakao", src: "/images/socials/dark/kakao.png", alt: "kakao unverified", text: dictionary.mypage.edit_profile.social_networks.kakao },
    { name:"twitter", src: "/images/socials/dark/twitter.png", alt: "twitter unverified", text: dictionary.mypage.edit_profile.social_networks.twitter },

  ];

  const logos = [
    {name: "google", src: "/images/socials/color/google.png", alt: "google verified", text: dictionary.mypage.edit_profile.social_networks.google },
    {name: "bitcoin", src: "/images/socials/color/bitcoin.png", alt: "bitcoin verified", text: dictionary.mypage.edit_profile.social_networks.web3_wallet },
    {name: "email", src: "/images/socials/color/email.png", alt: "email verified", text: dictionary.mypage.edit_profile.social_networks.email },
    {name: "figma", src: "/images/socials/color/figma.png", alt: "figma verified", text: dictionary.mypage.edit_profile.social_networks.figma },
    {name: "facebook",
      src: "/images/socials/color/facebook.png",
      alt: "facebook verified",
      text: dictionary.mypage.edit_profile.social_networks.facebook,
    },
    {name: "github", src: "/images/socials/color/github.png", alt: "github verified", text: dictionary.mypage.edit_profile.social_networks.github },
    {name: "linkedin", src: "/images/socials/color/linkedin.png", alt: "linkedin verified", text: dictionary.mypage.edit_profile.social_networks.linkedin },
    {name: "phone", src: "/images/socials/color/phone.png", alt: "phone verified", text: dictionary.mypage.edit_profile.social_networks.phone_number },
    {name: "pinterest", src: "/images/socials/color/pinterest.png", alt: "pinterest verified", text: dictionary.mypage.edit_profile.social_networks.pinterest },
    {name: "reddit", src: "/images/socials/color/reddit.png", alt: "reddit verified", text: dictionary.mypage.edit_profile.social_networks.reddit },
    {name: "telegram", src: "/images/socials/color/telegram.png", alt: "telegram verified", text: dictionary.mypage.edit_profile.social_networks.telegram },
    {name: "youtube", src: "/images/socials/color/youtube.png", alt: "youtube verified", text: dictionary.mypage.edit_profile.social_networks.youtube },
    // { name:"kakao", src: "/images/socials/color/kakao.png", alt: "kakao verified", text: dictionary.mypage.edit_profile.social_networks.kakao },
    // { name:"twitter", src: "/images/socials/color/twitter.png", alt: "twitter verified", text: dictionary.mypage.edit_profile.social_networks.twitter },
  ];

  return (
    <Card className="my-8 w-full">
      <h1 className="text-subhead_m font-medium mb-6 text-primary ">
        {dictionary.mypage.edit_profile.identity_authentication}
      </h1>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 flex-wrap gap-2">
        {logos.map((logo, i) => {

          let verified = logo.name in profile;

          return(
          <ConnectionCard 
            key={i} 
            logoSrc={verified ? logos[i].src : darkLogos[i].src} 
            logoAlt={verified ? logos[i].alt : darkLogos[i].alt} 
            label={verified ? logos[i].text : darkLogos[i].text}
            sublabel={verified? profile[logo.name as keyof Profile] as string: dictionary.mypage.edit_profile.verify}
            />
          )
      })}
      </div>
  </Card>
  )
}
