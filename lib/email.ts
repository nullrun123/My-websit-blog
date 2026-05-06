import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_EMAIL);

interface SendEmailProps {
    to:string,
    subject:string,
    html:string
}

export async function  sendEmail({to,subject,html}:SendEmailProps){
  await  resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to,
    subject,
    html,
});
}