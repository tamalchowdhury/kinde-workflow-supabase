import {
  onUserTokenGeneratedEvent,
  WorkflowSettings,
  idTokenCustomClaims,
  createKindeAPI,
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
  const api = await createKindeAPI(event);
  // const user = await api.get({
  //   endpoint: "/user",
  //   params: {
  //     id: event.context.user.id,
  //   },
  // });

  // console.log(user);

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
