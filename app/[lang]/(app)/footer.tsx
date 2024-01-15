import Image from "next/image";
import Link from "next/link";

export default async function Footer({ lang }: { lang: any }) {
  //const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-full my-[32px] gap-8 ">
      <Image
        src={`/images/careerzen.png`}
        className="dark:hidden"
        width={360}
        height={60}
        alt={"Logo"}
      />
      <Image
        src={`/images/logo-invert.png`}
        className="hidden dark:block"
        width={360}
        height={60}
        alt={"Logo"}
      />
      <div className="flex gap-4 text-title_m text-text-secondary">
        <Link href="#" className=" hover:text-accent-primary">
          {lang.footer.terms_and_conditions}
        </Link>
        <Link href="#" className=" hover:text-accent-primary">
          {lang.footer.faq}
        </Link>
        <Link href="#" className=" hover:text-accent-primary">
          {lang.footer.privacy_policy}
        </Link>
        <Link href="#" className=" hover:text-accent-primary">
          {lang.footer.whitepaper}
        </Link>
        <Link href="#" className=" hover:text-accent-primary">
          {lang.footer.contact_us}
        </Link>
      </div>
      <div className="grid place-content-center justify-center justify-items-center gap-8">
        <div className="flex gap-8">
          <Link href="#" passHref>
            <Image
              src={`/icons/discord.png`}
              height={24}
              width={24}
              alt={"Discord"}
            />
          </Link>
          <Link href="#" passHref>
            <Image
              src={`/icons/telegram.png`}
              
              height={24}
              width={24}
              alt={"Discord"}
            />
          </Link>
          <Link href="#" passHref>
            <Image
              src={`/icons/x.png`}
              className="dark:invert"
              height={24}
              width={24}
              alt={"Discord"}
            />
          </Link>
        </div>
      </div>
      <p className="text-text-secondary text-body_m">
        Copyright © 2023. Careerzen. All rights reserved.
      </p>
    </div>
  );
}
