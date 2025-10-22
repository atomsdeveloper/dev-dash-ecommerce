// Auth Client
import { createAuthClient } from "better-auth/react";

// === CREATE CLIENT ===
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  fetchOptions: {
    credentials: "include", // garante cookies/session entre frontend e backend
  },
});

// === GOOGLE LOGIN ===
export const signInGoogle = () => {
  return authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
};

// === LOGOUT ===
export const signOutUser = async () => {
  try {
    await authClient.signOut({
      fetchOptions: { credentials: "include" },
    });
    // Redireciona para página de login após sair
    window.location.href = "/sign-in";
  } catch (error) {
    console.error("Erro ao sair:", error);
    throw error;
  }
};
