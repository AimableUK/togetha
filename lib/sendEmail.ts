// import { resend } from './resend';
// import { WelcomeEmail } from '@/emails';

// interface SendEmailParams {
//     to: string;
//     firstName: string;
// }

// export async function sendWelcomeEmail({ to, firstName }: SendEmailParams) {
//     try {
//         const data = await resend.emails.send({
//             from: 'aimableukobizaba@gmail.com',
//             to,
//             subject: 'Welcome to Togetha!',
//             react: WelcomeEmail({ firstName, email: to }),
//         });

//         return { success: true, data };
//     } catch (error) {
//         console.error('Failed to send email:', error);
//         return { success: false, error };
//     }
// }
