import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ProjectDetailProps } from "./page";

export default function ProjectDetail({
  details,
}: {
  details: ProjectDetailProps;
}) {
  return (
    <Card className="w-full">
      <header className="flex gap-8 items-center">
        <Image
          src={`${details.image ? details.image : "/images/no-item.png"}`}
          width={100}
          height={100}
          className="rounded-[6px] bg-accent-secondary"
          alt="project_image_holder"
        />
        <div className="prose">
          <h3>{details.name}</h3>
          <Link href={details.url ? details.url : "https://careerzen.org"}>
            {details.url ? details.url : "https://careerzen.org"}
          </Link>
        </div>
      </header>
      <div className="prose mt-4 w-full">
        <h5>Project Details</h5>
        <p className="leading-6 tracking-wider w-full">
          The problem Careerzen solves Problem There is 2 problems in job market
          such as Linkedin. The first problem is career information such as
          resume, experience and job description. Many recruiter have said they
          have had experiences cancelling recruit after onboarding because many
          job seekers exaggerate their experience on their resume. Companies
          have waste much cost and time in the process that recruit and onboard
          workers who arent a good fit for them. Secondly, junior job seekers
          domt have enough career that has been authenticated from an external
          objectively.they always try to get experiences related on their job
          like bootcamp, but as a company, this is not enough. Because It cannot
          improve skill level of juniors. They need reference such as project
          performance certifications or referrals. Solution Users can own career
          NFTs in there account and show profile image combining metadata about
          certificated career to other users who are company, headhunter and
          other buliders etc. User can network anonimously and with career
          authenticated. If other users like company request to view career
          details to the user, They can check his privacy and details of career
          NFT by approved from the user. This feature is very useful in Asia job
          market, because Asian people dont like reveal their privacy profile
          on bussiness sns. Companies dont have to waste time verifying the
          authenticity of work history of job seeker because they can check job
          seekers pre-verified career history. Job seekers like junior or
          students can appeal career history authenticated by external such as
          Mentors, other builders, hackathon or instructors. they will get more
          job opportunity from companies that is good fit with them. Challenges
          we ran into One of the major hurdles we faced was the failure of our
          backend to successfully relay the users signature to the contract.We
          were planning to make users sign on their transaction and let our
          backed server pay the gas fee, butdespite our team members prior
          experience, there might have been unique intricacies in the contract
          or the transaction flow that we did not anticipate.The contracts
          ecrecover opcode was not returning oringinal signers address. Given
          the technical challenges we faced during the hackathon in implementing
          gasless transactions, we have temporarily set this issue aside and are
          currently allowing users to cover the gas fees for their transactions.
        </p>
      </div>
    </Card>
  );
}
