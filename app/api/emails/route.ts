import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/sendEmail';

export async function POST(req: NextRequest) {
    try {
        const { email, firstName } = await req.json();

        if (!email || !firstName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const result = await sendWelcomeEmail({
            to: email,
            firstName,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(result.data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}