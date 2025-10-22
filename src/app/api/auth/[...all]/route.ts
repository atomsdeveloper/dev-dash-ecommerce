// Auth
import { auth } from "../../../../lib/auth";

// Handlers
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
