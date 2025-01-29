import {
  onUserTokenGeneratedEvent,
  accessTokenCustomClaims,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
    "kinde.localization": {},
    "kinde.fetch": {},
  },
};

export default async function (event: onUserTokenGeneratedEvent) {
  const accessToken = accessTokenCustomClaims<{
    hello: string;
    ipAddress: string;
    data: any;
  }>();

  const response = await fetch(
    "https://xvyhaoxzkelgkbpeeqbp.supabase.co/rest/v1/profiles",
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  accessToken.data = data;

  accessToken.hello = "Hello there!";
  accessToken.ipAddress = event.request.ip;
}
