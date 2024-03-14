import Image from "next/image";
import Link from "next/link";

export default function CustomLink({ link }: { link: string }) {
  //if we want to use the link we should do something

  let domain = link.split("/")[2];
  //i just want twitter and github and linkedin to have their own icons not with.com

  //take the string part between // and . and that is the domain
  domain = domain.split(".")[0];

  let domainIcon = `/icons/link.png`;

  if (domain === "twitter" || domain === "github" || domain === "linkedin") {
    domainIcon = `/icons/${domain}.png`;
  }
  //check if domain contains an icon that we can return

  return (
    <div className="flex flex-row gap-3 items-center">
      {/* icon here  */}
        <div className="relative w-6 h-6">
             <Image src={domainIcon} alt="external link" sizes={"24"} fill />
        </div>
      <Link
        href={link}
        target="_blank"
        className="text-sm font-medium text-text-secondary hover:text-text-primary"
      >
        {link}
      </Link>
    </div>
  );
}
