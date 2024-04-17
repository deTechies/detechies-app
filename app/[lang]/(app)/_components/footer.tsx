import Link from "next/link";
import PrivacyPolicy from "../../(onboard)/onboard/email/_components/privacy-policy";

export default async function Footer({ lang }: { lang: any }) {
  //const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mx-auto w-full gap-8 md:px-10 mt-20 ">
       <p className="text-center text-gray-900 text-xs">
        {lang.footer.copywrite}
      </p>

      <div className="flex flex-wrap items-center justify-center text-xs text-gray-600 gap-5">
        <Link href="#" className="hover:text-primary">
          {lang.footer.terms_and_conditions}
        </Link>
        <Link href="#" className="hover:text-primary">
          {lang.footer.faq}
        </Link>
        <PrivacyPolicy lang={lang}>
          <div className="hover:text-primary">{lang.footer.privacy_policy}</div>
        </PrivacyPolicy>
        {/* <Link href="#" className="px-4 my-5 hover:text-primary">
          {lang.footer.privacy_policy} 
        </Link> */}
        <Link href="#" className="hover:text-primary">
          {lang.footer.whitepaper}
        </Link>
        <Link
          href="https://t.me/+ortpABZX8vYwM2Fk"
          target="_blank"
          className="px-4 my-5 hover:text-primary text-primary"
        >
          {lang.footer.contact_us}
        </Link>
      </div>
     
     
    </div>
  );
}
