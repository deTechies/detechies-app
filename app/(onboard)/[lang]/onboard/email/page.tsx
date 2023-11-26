
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { EmailVerification } from "./email-verify";

export default async function EmailVerify({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  //reda here the lang and the dictionary
  const dictionary = await getDictionary(lang);
  const text = dictionary.onboard.verify_email

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-4xl font-medium mb-6 text-primary">{text.title}</h1>
        <h4 className="text-text-secondary">
          {text.body}
        </h4>
      </section>
      <section className="my-2">
        <EmailVerification emailText={text.email} verifyEmail={text.email_verify} />
      </section>
      <Alert variant={"info"} className="my-8">
        <AlertTitle className="text-state-info">
            {text.alert_title}
        </AlertTitle>
        <AlertDescription>
            {text.alert_body}
        </AlertDescription>
      </Alert>
    </div>
  );
}

