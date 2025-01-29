import {
  onUserTokenGeneratedEvent,
  accessTokenCustomClaims,
  WorkflowSettings,
  WorkflowTrigger,
  fetch,
  getEnvironmentVariable,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
    "kinde.localization": {},
    "kinde.fetch": {},
    "kinde.env": {},
    url: {},
  },
};

export default async function TestWorkflow(event: onUserTokenGeneratedEvent) {
  const SUPABASE_ANON_KEY = getEnvironmentVariable("SUPABASE_ANON_KEY")?.value;
  const accessToken = accessTokenCustomClaims<{
    hello: string;
    ipAddress: string;
    isSubscribed: boolean;
  }>();

  const response = await fetch(
    "https://xvyhaoxzkelgkbpeeqbp.supabase.co/rest/v1/profiles",
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const profile = response.data.find(
    (p: { kinde_id: string }) => p.kinde_id === event.context.user.id
  );

  accessToken.isSubscribed =
    profile?.is_on_monthly_subscription || profile?.paid_one_time_subscription;
}
