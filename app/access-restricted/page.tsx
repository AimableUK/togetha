import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const ALLOWED_EMAILS =
    process.env.ALLOWED_EMAILS?.split(",").map(e => e.trim()) ?? [];

export default async function AccessRestricted() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const email = user?.email;

    if (email && ALLOWED_EMAILS.includes(email)) {
        redirect("/dashboard");
    }

    const firstName = user?.given_name || user?.email?.split('@')[0] || 'User';

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="bg-card border rounded-3xl p-8 md:p-12 shadow-lg">
                    {/* Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-primary/10 p-6 rounded-2xl">
                            <Lock className="w-12 h-12 text-primary" />
                        </div>
                    </div>

                    {/* Personalized Greeting */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                            Hi {firstName},
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            You're not allowed to use Togetha
                        </p>
                    </div>

                    {/* Message */}
                    <div className="space-y-6 mb-10">
                        <div className="bg-muted/50 border rounded-2xl p-6">
                            <p className="text-center text-muted-foreground leading-relaxed">
                                Togetha is no longer a free service. Access to the dashboard and workspace is now limited to Premium users only.
                            </p>
                        </div>

                        <p className="text-center text-muted-foreground">
                            If you believe you should have access or would like to inquire about availability, please contact us.
                        </p>
                    </div>

                    {/* Contact CTA */}
                    <div className="space-y-4">
                        <a
                            href="mailto:ukobizaba.aimable@a2sv.org"
                            className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 rounded-xl font-semibold text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <Mail className="w-5 h-5" />
                            <span>Contact for More Information</span>
                        </a>

                        <p className="text-center text-sm text-muted-foreground">
                            ukobizaba.aimable@a2sv.org
                        </p>
                    </div>

                    {/* Additional info */}
                    <div className="mt-10 pt-8 border-t">
                        <p className="text-center text-sm text-muted-foreground">
                            Thank you for your interest in Togetha. We appreciate your understanding.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}