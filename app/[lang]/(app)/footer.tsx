import Link from "next/link";
import PrivacyPolicy from "../(onboard)/onboard/email/_components/privacy-policy";

export default async function Footer({ lang }: { lang: any }) {
  //const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <div className="flex  justify-between items-center mx-auto w-full gap-8 px-4 ">
       <p className="text-center text-text-secondary text-body_s">
        {lang.footer.copywrite}
      </p>

      <div className="flex flex-wrap items-center justify-center text-label_m text-text-secondary">
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
          href="https://t.me/+ortpABZX8vYwM2Fk"
          target="_blank"
          className="px-4 my-5 hover:text-accent-primary"
        >
          {lang.footer.contact_us}
        </Link>
      </div>
     
     
    </div>
  );
}
