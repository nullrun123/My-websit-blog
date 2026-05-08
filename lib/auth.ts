import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { sendEmail } from "./email";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: { 
        enabled: true, 
        requireEmailVerification: true,
    }, 
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    emailVerification: {
        // sendOnSignUp:true,
        // autoSignInAfterVerification:true,
		 sendVerificationEmail: async ({ user, url, token }, request) => {
            void sendEmail({
                to:user.email,
                subject:"Verify your email",
                html:`<p>Click <a href='${url}'>here</a> to verify your email.</p>`
            })
        },
        callbackURL: "/email-verified",
		expiresIn: 3600 // 1 hour
	},
    user:{
        additionalFields:{
            role:{
                type:"string",
                input:false,
            }
        }
    }
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;