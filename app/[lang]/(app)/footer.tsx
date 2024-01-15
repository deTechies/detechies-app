import Image from "next/image";
import Link from "next/link";

export default async function Footer({
  lang
}: {
  lang: any
}){
  
  //const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-full my-[32px] gap-8 ">
      <Image
        src={`/images/careerzen.png`}
        width={360}
        height={60}
        alt={"Logo"}
      />
      <div className="flex text-title_m text-text-secondary my-5">
        <Link href="#" className=" hover:text-accent-primary px-4 ">{lang.footer.terms_and_conditions}</Link>
        <Link href="#" className=" hover:text-accent-primary px-4 ">{lang.footer.faq}</Link>
        <Link href="#" className=" hover:text-accent-primary px-4 ">{lang.footer.privacy_policy}</Link>
        <Link href="#" className=" hover:text-accent-primary px-4 ">{lang.footer.whitepaper}</Link>
        <Link href="#" className=" hover:text-accent-primary px-4 ">{lang.footer.contact_us}</Link>
        <Link href="#" className=" hover:text-accent-primary px-4 ">{lang.footer.user_guide}</Link>
      </div>
      <div className="grid place-content-center justify-center justify-items-center gap-8">
        <div className="flex gap-4">
        <Link href="https://open.kakao.com/o/gGdZ76If" target="_blank" passHref>
            <Image
              src={`/images/socials/color/kakao.png`}
              height={24}
              width={24}
              alt={"Discord"}
            />
          </Link>
          <Link href="https://t.me/Careerzen_org/1" target="_blank" passHref>
          <Image
            src={`/icons/telegram.png`}
            height={24}
            width={24}
            alt={"Discord"}
          />
          </Link>
          <Link href="https://x.com/careerzen" target="_blank" passHref>
          <Image src={`/icons/x.png`} height={24} width={24} alt={"Discord"} />
          </Link>
        </div>
       
      </div>
      <p className="text-text-secondary text-body_m">
         {lang.footer.copywrite}
        </p>
    </div>
  );
};