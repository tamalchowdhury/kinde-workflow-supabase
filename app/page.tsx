import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getAccessToken } = getKindeServerSession();
  const token = await getAccessToken();
  return (
    <div className="p-10">
      <div className="space-x-2 mb-4">
        <LoginLink>Sign in</LoginLink>
        <RegisterLink>Sign up</RegisterLink>
        <LogoutLink>Sign out</LogoutLink>
      </div>

      <pre className="p-4 rounded-lg bg-slate-900 text-lime-200">
        <code>{JSON.stringify(token, null, 2)}</code>
      </pre>
    </div>
  );
}
