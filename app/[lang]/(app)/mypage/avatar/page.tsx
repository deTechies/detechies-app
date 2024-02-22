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

  const defaultAvatars = [
    {
      status: "granted",
      achievement: {
        contract: null,
        name: "두꺼운 솜이불",
        description: "아직 침대에서 막 나온 듯, 연하늘색 솜이불을 몸에 둘러맸습니다. 편안함을 주긴 하지만, 분명 모험을 떠날 준비는 아직 안 된 모습이죠.",
        nft_type: "",
        image: null,
        avatar: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
        avatar_type: "clothes",
        club: {
          name: "Careerzen",
        },
      },
    },
    {
      status: "granted",
      achievement: {
        contract: null,
        name: "동그란 얼굴",
        description: "친근감을 주는 동그란 얼굴이지만, 조금은 표정이 없어 보입니다. 어떤 표정을 지을지는 당신에게 달렸어요.",
        nft_type: "",
        image: null,
        avatar: "bafkreidlzc4pnszwiyx73yqlbwgkchyuendxkfq63sp54vhnky3ruti5xu",
        avatar_type: "face",
        club: {
          name: "Careerzen",
        },
      },
    },
    {
      status: "granted",
      achievement: {
        contract: null,
        name: "반쯤 감긴 눈",
        description: "아직 잠에서 깨어나지 못한 듯, 눈을 반쯤 감고 있습니다. 좀 더 생기 있는 눈빛을 원하신다면 바꿔보세요.",
        nft_type: "",
        image: null,
        avatar: "bafkreihdqgem6jwebjyiahy6e4mgf5xdrqam3yaxq2ki2ew4hw6tjxq7du",
        avatar_type: "head",
        club: {
          name: "Careerzen",
        },
      },
    },
    {
      status: "granted",
      achievement: {
        contract: null,
        name: "부스스한 머리",
        description: "자다 막 일어난 듯한 머리입니다. 하루를 시작하기 전 빗질은 필수일 것 같네요.",
        nft_type: "",
        image: null,
        avatar: "bafkreigjctpasi7b2ytsn7mx47wjobnqkvioi4vllg7dqwzzvw7u2lijme",
        avatar_type: "hair",
        club: {
          name: "Careerzen",
        },
      },
    },
    {
      status: "granted",
      achievement: {
        contract: null,
        name: "앙 다문 입",
        description: "아무 말도 하지 않는, 앙다문 입. 오늘의 기분을 어떻게 표현할지는 선택에 달려 있습니다.",
        nft_type: "",
        image: null,
        avatar: "bafkreif6oi5pwrjzey5q4pmyd3zck6a53uoefozxydapiipgq2flsbldsi",
        avatar_type: "mouth",
        club: {
          name: "Careerzen",
        },
      },
    },
    {
      status: "granted",
      achievement: {
        contract: null,
        name: "수면 안대",
        description: "깊은 잠을 방해받지 않으려는 듯, 수면안대를 착용하고 있네요. 하지만 이제 일어날 시간입니다, 뭐라도 시작해볼까요?",
        nft_type: "",
        image: null,
        avatar: "bafkreiabd3cfto7a7tjwgr5zikce476jxeeekmeif357t7v3g64uolgose",
        avatar_type: "accessory",
        club: {
          name: "Careerzen",
        },
      },
    },
    {
      status: "granted",
      achievement: {
        contract: null,
        name: "빈 배경",
        description: "아무것도 없는 빈 배경입니다. 여러분만의 이야기로 채워볼 수 있는 공간이죠.",
        nft_type: "",
        image: null,
        avatar: "bafkreibgvactjvhexsx54qcxo32msz6vsimbwimp64sbvlawjol5e27kg4",
        avatar_type: "background",
        club: {
          name: "Careerzen",
        },
      },
    },
  ] as any;

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
