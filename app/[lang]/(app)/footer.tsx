import Image from "next/image";
import Link from "next/link";
import PrivacyPolicy from "../(onboard)/onboard/email/_components/privacy-policy";

export default async function Footer({ lang }: { lang: any }) {
  //const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-full py-[52px] gap-8 px-4 border-t border-border-input">
      <Image
        src={`/images/connectfast.png`}
        className="dark:hidden max-w-[360px] w-full"
        width={360}
        height={60}
        alt={"Logo"}
      />
      <Image
        src={`/images/logo-invert.png`}
        className="hidden dark:block max-w-[360px] w-full"
        width={360}
        height={60}
        alt={"Logo"}
      />
      <div className="flex flex-wrap items-center justify-center text-title_m text-text-secondary">
        <Link href="#" className="px-4 my-5 hover:text-accent-primary">
          {lang.footer.terms_and_conditions}
        </Link>
        <Link href="#" className="px-4 my-5 hover:text-accent-primary">
          {lang.footer.faq}
        </Link>
        <PrivacyPolicy lang={lang}>
          <div className="px-4 my-5 hover:text-accent-primary">{lang.footer.privacy_policy}</div>
        </PrivacyPolicy>
        {/* <Link href="#" className="px-4 my-5 hover:text-accent-primary">
          {lang.footer.privacy_policy}
        </Link> */}
        <Link href="#" className="px-4 my-5 hover:text-accent-primary">
          {lang.footer.whitepaper}
        </Link>
        <Link
          href="https://t.me/Careerzen_org"
          target="_blank"
          className="px-4 my-5 hover:text-accent-primary"
        >
          {lang.footer.contact_us}
        </Link>
        <Link
          href="https://tall-hound-177.notion.site/a57f5354c57e4d07bc4d6750e7902d4b"
          target="_blank"
          className="px-4 my-5 hover:text-accent-primary"
        >
          {lang.footer.user_guide}
        </Link>
      </div>
      <div className="grid justify-center gap-8 place-content-center justify-items-center">
        <div className="flex gap-4">
          <Link
            href="https://open.kakao.com/o/gGdZ76If"
            target="_blank"
            passHref
          >
            <Image
              src={`/images/socials/color/kakao.png`}
              height={24}
              width={24}
              alt={"Kakao"}
            />
          </Link>
          <Link href="https://t.me/Careerzen_org/1" target="_blank" passHref>
            <Image
              src={`/icons/telegram.png`}
              height={24}
              width={24}
              alt={"Telegram"}
            />
          </Link>
          <Link href="https://x.com/careerzen" target="_blank" passHref>
            <Image
              src={`/icons/x.png`}
              className="dark:invert"
              height={24}
              width={24}
              alt={"Twitter/X"}
            />
          </Link>
        </div>
      </div>
      <p className="text-center text-text-secondary text-body_m">
        {lang.footer.copywrite}
      </p>
    </div>
  );
}
