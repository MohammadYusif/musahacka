import { Resend } from "resend";

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Wisal Medical <onboarding@resend.dev>";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // silently skip when no key is configured

  const resend = new Resend(apiKey);
  await resend.emails.send({ from: FROM_EMAIL, to: [to], subject, html });
}
