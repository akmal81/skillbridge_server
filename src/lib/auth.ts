import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins: [
        process.env.APP_URL!,
        process.env.PROD_APP_URL!,
        "https://skillbridge-client-jy8514m9q-akmal-hossains-projects.vercel.app",
        "https://skillbridge-client-rouge.vercel.app/"
    ],
    cookie: {
        crossSite: true, 
        sameSite: "none",
        secure: true, 
        httpOnly: true,
    },
    advanced: {
       useSecureCookies: true, 
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "student",
                required: true
            },
            isBan: {
                type: "boolean",
                defaultValue: false,
                required: false
            }
        }
    },

    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            accessType: "offline",
            prompt: "select_account consent",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});