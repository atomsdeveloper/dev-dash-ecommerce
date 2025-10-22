// Auth
import { betterAuth } from "better-auth";

// Database
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db as prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  events: {
    async afterSignIn(ctx: { user: { email: string } }) {
      const allowedEmail = process.env.BETTER_AUTH_ALLOWED_EMAIL;

      if (allowedEmail && ctx.user.email !== allowedEmail) {
        console.warn(
          `[BetterAuth] Bloqueado: ${ctx.user.email} não é permitido`
        );

        return {
          ok: false,
          error: {
            code: "UNAUTHORIZED_EMAIL",
            message: "Acesso não autorizado.",
          },
        };
      }

      return {
        ok: true,
        error: {
          code: "AUTHORIZED",
          message: "Login realizado com sucesso.",
        },
      };
    },
  },
});
