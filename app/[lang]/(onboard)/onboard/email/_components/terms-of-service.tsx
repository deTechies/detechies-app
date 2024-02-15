"use client";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService({
  lang,
  onClickAgree,
}: {
  lang: any;
  onClickAgree: Function;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <ChevronRight className="w-6 h-6 cursor-pointer text-text-secondary hover:text-accent-primary" />
      </DialogTrigger>

      <DialogContent className="max-w-[500px] gap-6 px-8">
        <h3 className="text-subhead_s">
          {lang.onboard.verify_email.accordion.terms_of_services}
        </h3>

        <div className="max-h-[calc(90vh-182px)] overflow-y-auto pretty-scroll">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga repudiandae numquam pariatur temporibus dolores, rerum, hic quas laborum cum tempore laboriosam odit accusamus suscipit beatae ipsa est adipisci! Tempore, error in. Fugit veniam earum expedita itaque numquam nobis eos deleniti, voluptate deserunt perferendis voluptatibus fuga tempore quidem necessitatibus aliquid iste magnam nam? Tempora eligendi incidunt fuga quod harum corrupti voluptatibus ullam inventore, dolores placeat vitae libero, debitis fugiat cumque laudantium minima eos! Nobis magnam molestiae, vitae itaque nulla voluptatum facere animi perferendis voluptatibus doloremque doloribus provident officiis laboriosam cumque excepturi, vero molestias aliquam totam. Voluptates iure natus accusamus, inventore id quis soluta dolorem voluptatem temporibus aut? Eius hic, qui totam placeat saepe debitis ex ea dignissimos explicabo tempore autem cupiditate non modi dolorem expedita eligendi quo eum a maxime vel suscipit laudantium! Ipsum tempore enim asperiores possimus atque, sint id a eos quaerat corrupti perspiciatis, esse, dignissimos repudiandae recusandae odit ex? Eaque veniam doloremque quos vero vel architecto reiciendis neque debitis, rerum fugiat eveniet doloribus illum pariatur laborum. Pariatur voluptatibus delectus, possimus alias fuga, accusantium magni nesciunt aliquid nam ex culpa fugit ipsum expedita repudiandae dicta beatae odit amet esse consequatur repellendus laboriosam quo! Enim, velit. Alias, voluptatum deleniti neque a tempore, cumque id cupiditate quis at laboriosam culpa nostrum veritatis quam architecto, dolores doloremque odio beatae dolorum blanditiis? Fugiat aut saepe reiciendis corrupti quo totam, quam animi quia. Repellendus tenetur hic molestiae sed blanditiis repudiandae. Saepe doloribus dolorem eum, sunt voluptas beatae dolores amet eos aliquid maxime voluptatibus excepturi iste dignissimos error, quia ab veniam. Corrupti qui veritatis error? Tempore libero harum pariatur sed culpa repellat nesciunt impedit consectetur maxime! Perspiciatis, commodi atque ducimus quidem, ut dicta sunt expedita similique cupiditate aliquid hic nemo minus illum beatae error rem. Repudiandae voluptatibus reprehenderit aliquam, totam sapiente nulla ut aut sint perferendis ad veniam voluptas dolor numquam ipsam at dicta ipsa fugiat. Hic accusantium ducimus quibusdam, a ipsum veniam enim aspernatur quaerat officia mollitia impedit dolores nam provident! Impedit, nobis obcaecati ducimus alias laudantium, excepturi nemo ipsa esse quam dolores minus quod reiciendis vitae distinctio nesciunt eligendi eos magni ad, doloribus odio cum ullam odit neque! Deserunt natus illo deleniti aut alias enim quo voluptas est, sunt sed, voluptatem eum magnam quia aliquam sit. Culpa, quod quisquam distinctio ipsam eius ab! Fugit nihil sunt ea, doloremque consequuntur beatae magni, voluptatem, blanditiis repellendus aspernatur quasi reiciendis totam temporibus sint itaque laborum deleniti iusto accusamus obcaecati! Accusantium vero at assumenda dolor quis, perferendis a impedit possimus, tenetur eum quos consectetur dolorum nam magnam dolorem exercitationem earum sit. Quasi mollitia, reiciendis debitis exercitationem quod itaque ipsa maxime est culpa nam omnis dolorum odio odit minus, voluptate labore corrupti hic doloribus cumque. Accusamus fuga ipsam esse tempora consequatur totam ut ad suscipit. Amet magni dicta voluptatum necessitatibus, voluptate vitae, doloremque dolores quidem autem, quaerat eum nobis sapiente possimus deleniti harum incidunt sequi? Sed quibusdam totam temporibus fuga reiciendis obcaecati veniam odit eum ex quia tempora aliquid aspernatur, excepturi debitis quo rem harum esse itaque maxime.</div>

        <div className="flex gap-2">
          <DialogClose className="max-w-[212px] w-full">
            <Button size="lg" variant="secondary">
              {lang.onboard.verify_email.accordion.back}
            </Button>
          </DialogClose>

          <DialogClose className="max-w-[212px] w-full">
            <Button size="lg" onClick={() => onClickAgree()}>
              {lang.onboard.verify_email.accordion.agree}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
