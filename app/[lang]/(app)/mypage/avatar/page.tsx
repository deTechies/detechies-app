import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserAchievements } from "@/lib/data/achievements";
import ListAvatars from "./list-avatars";
import { NFT_TYPE } from "@/lib/interfaces";
import { getSession } from "next-auth/react";
import { auth } from "@/lib/helpers/authOptions";

export default async function Avatars({
  params,
}: {
  params: { lang: Locale };
}) {
  //need to get the users received achievements
  const { data: achievements } = await getUserAchievements();
  const session = await auth();
  const lang = await getDictionary(params.lang);

  const userAvatar = session?.web3.user.avatar;

  const filteredAchievements = achievements.filter((achievement: any) => {
    return achievement.achievement.avatar;
  });

  const defaultAvatarInfos = [
    {
      avatar_type: "clothes",
      avatar: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
    },
    {
      avatar_type: "face",
      avatar: "bafkreidlzc4pnszwiyx73yqlbwgkchyuendxkfq63sp54vhnky3ruti5xu",
    },
    {
      avatar_type: "eyes",
      avatar: "bafkreihdqgem6jwebjyiahy6e4mgf5xdrqam3yaxq2ki2ew4hw6tjxq7du",
    },
    {
      avatar_type: "hair",
      avatar: "bafkreigjctpasi7b2ytsn7mx47wjobnqkvioi4vllg7dqwzzvw7u2lijme",
    },
    {
      avatar_type: "mouth",
      avatar: "bafkreif6oi5pwrjzey5q4pmyd3zck6a53uoefozxydapiipgq2flsbldsi",
    },
    {
      avatar_type: "accessory",
      avatar: "bafkreiabd3cfto7a7tjwgr5zikce476jxeeekmeif357t7v3g64uolgose",
    },
    {
      avatar_type: "background",
      avatar: "bafkreibgvactjvhexsx54qcxo32msz6vsimbwimp64sbvlawjol5e27kg4",
    },
  ];

  const defaultAvatars = defaultAvatarInfos.map((avatar) => {
    return {
      status: "granted",
      achievement: {
        name: lang.mypage.edit_avatar.default_avatar[
          avatar.avatar_type as keyof typeof lang.mypage.edit_avatar.default_avatar
        ],
        description:
          lang.mypage.edit_avatar.default_avatar[
            `${avatar.avatar_type}_description` as keyof typeof lang.mypage.edit_avatar.default_avatar
          ],
        avatar: avatar.avatar,
        avatar_type: avatar.avatar_type,
        club: {
          name: "Careerzen",
        },
      },
    };
  });

  return (
    <Tabs defaultValue="all">
      <TabsList className="flex items-start justify-start w-full gap-4">
        <TabsTrigger value="all">{lang.mypage.edit_avatar.tab_all}</TabsTrigger>
        <TabsTrigger value="career">
          {lang.mypage.edit_avatar.tab_career}
        </TabsTrigger>
        <TabsTrigger value="limited">
          {lang.mypage.edit_avatar.tab_limited}
        </TabsTrigger>
        <TabsTrigger value="minting">
          {lang.mypage.edit_avatar.not_approved}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <ListAvatars
          status="granted"
          userAvatar={userAvatar}
          rewards={[...filteredAchievements, ...defaultAvatars]}
          lang={lang}
        />
      </TabsContent>
      <TabsContent value="career">
        <ListAvatars
          status="granted"
          userAvatar={userAvatar}
          nft_type={NFT_TYPE.SBT}
          rewards={filteredAchievements}
          lang={lang}
        />
      </TabsContent>
      <TabsContent value="limited">
        <ListAvatars
          status="granted"
          userAvatar={userAvatar}
          nft_type={NFT_TYPE.ERC721}
          rewards={filteredAchievements}
          lang={lang}
        />
      </TabsContent>
      <TabsContent value="minting">
        <ListAvatars
          status="requested"
          userAvatar={userAvatar}
          rewards={filteredAchievements}
          lang={lang}
        />
      </TabsContent>
    </Tabs>
  );
}
