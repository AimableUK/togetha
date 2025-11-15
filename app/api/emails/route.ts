import Welcome from '@/emails/Welcome';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const { email, firstName } = await request.json()

    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Welcome to Togetha!",
            react: Welcome({ firstName }),
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { success: false, error },
            { status: 500 }
        );
    }
}