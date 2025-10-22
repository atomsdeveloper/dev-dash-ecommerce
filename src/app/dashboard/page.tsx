// Auth
import { auth } from "../../lib/auth";

// Next
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Components
import Dash from "./Template/dash";

export default async function Dashboard() {
  const headersSession = await headers();
  const session = await auth.api.getSession({ headers: headersSession });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="p-6">
      <Dash />
    </div>
  );
}
