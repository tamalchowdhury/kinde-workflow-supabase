import {
  createKindeAPI,
  denyAccess,
  onUserTokenGeneratedEvent,
  WorkflowSettings,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "postAUthentication",
  name: "Post-authentication",
  failurePolicy: {
    action: "stop",
  },
  trigger: "user:post_authentication",
  bindings: {
    "kinde.accessToken": {},
    "kinde.localization": {},
    "kinde.fetch": {},
    "kinde.env": {},
    "kinde.auth": {},
    "kinde.idToken": {},
    "kinde.m2mToken": {},
    url: {},
  },
};

export default async function EmailFilerWorkflow(
  event: onUserTokenGeneratedEvent
) {
  console.log(event);
  const api = await createKindeAPI(event, {
    clientId: "070e091120b841d38ba2785df755b91a",
    clientSecret: "mz3652i0elbQtNBPQHGm5OYyTAQXrQJxxlddOe4EYFuzXtnkqYuG",
  });
  const { data } = await api.get({
    endpoint: `/user?id=${event.context.user.id}`,
  });

  console.log(data);

  if (
    event.context.organization.code === "org_4e477d346b73" &&
    data.preferred_email === "peter@kinde.com"
  ) {
    denyAccess("You are not allowed to access this organization");
  }
  // const SUPABASE_ANON_KEY = getEnvironmentVariable("SUPABASE_ANON_KEY")?.value;
  // const accessToken = accessTokenCustomClaims<{
  //   isSubscribed: boolean;
  // }>();

  // const response = await fetch(
  //   "https://xvyhaoxzkelgkbpeeqbp.supabase.co/rest/v1/profiles?kinde_id=eq." +
  //     event.context.user.id,
  //   {
  //     method: "GET",
  //     headers: {
  //       apikey: SUPABASE_ANON_KEY,
  //       Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  // if (response.data.length > 0) {
  //   const profile = response.data[0];
  //   accessToken.isSubscribed =
  //     profile?.is_on_monthly_subscription ||
  //     profile?.paid_one_time_subscription;
  // }
}
