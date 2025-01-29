import {
  onUserTokenGeneratedEvent,
  accessTokenCustomClaims,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2eWhhb3h6a2VsZ2ticGVlcWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MDkxODUsImV4cCI6MjA0OTk4NTE4NX0.7olGhmxP_QX2Tc9GnWroGuR-Zyj4MFUTTOKwXfnQyEA";

export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
    "kinde.localization": {},
    "kinde.fetch": {},
    url: {},
  },
};

export default async function (event: onUserTokenGeneratedEvent) {
  const accessToken = accessTokenCustomClaims<{
    hello: string;
    ipAddress: string;
    data: any;
  }>();

  const response = await kinde.fetch(
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
  const data = await response.json();
  console.log(data);
  accessToken.data = data;

  accessToken.hello = "Hello there!";
  accessToken.ipAddress = event.request.ip;
}
