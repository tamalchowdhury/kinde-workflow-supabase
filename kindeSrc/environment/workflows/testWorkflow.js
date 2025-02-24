var a = /* @__PURE__ */ ((e) => (
  (e.UserTokenGeneration = "user:tokens_generation"),
  (e.UserPreMFA = "user:pre_mfa"),
  (e.M2MTokenGeneration = "m2m:token_generation"),
  (e.ExistingPasswordProvided = "user:existing_password_provided"),
  (e.NewPasswordProvided = "user:new_password_provided"),
  e
))(a || {});
const r = {
  get(e, n, t) {
    return Reflect.get(e, n.toString(), t);
  },
  set(e, n, t) {
    return kinde.accessToken.setCustomClaim(n, t), Reflect.set(e, n, t);
  },
};
function d() {
  if (!kinde.accessToken)
    throw new Error(
      "accessToken binding not available, please add to workflow/page settings to enable"
    );
  const e = kinde.accessToken.getCustomClaims();
  return new Proxy(e, r);
}
function c(e) {
  if (!kinde.env)
    throw new Error(
      "env binding not available, please add to workflow/page settings to enable"
    );
  return kinde.env.get(e);
}
async function k(e, n) {
  if (!kinde.fetch) throw new Error("fetch binding not available");
  n.responseFormat || (n.responseFormat = "json");
  const t = await kinde.fetch(e, n);
  return {
    data: n.responseFormat === "json" ? (t == null ? void 0 : t.json) : t.text,
  };
}
const l = {
  id: "addAccessTokenClaim",
  trigger: a.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
    "kinde.localization": {},
    "kinde.fetch": {},
    "kinde.env": {},
    "kinde.mfa": {},
    url: {},
  },
};
async function u(e) {
  var i;
  const n = (i = c("SUPABASE_ANON_KEY")) == null ? void 0 : i.value,
    t = d(),
    s = await k(
      "https://xvyhaoxzkelgkbpeeqbp.supabase.co/rest/v1/profiles?kinde_id=eq." +
        e.context.user.id,
      {
        method: "GET",
        headers: {
          apikey: n,
          Authorization: `Bearer ${n}`,
          "Content-Type": "application/json",
        },
      }
    );
  if (s.data.length > 0) {
    const o = s.data[0];
    t.isSubscribed =
      (o == null ? void 0 : o.is_on_monthly_subscription) ||
      (o == null ? void 0 : o.paid_one_time_subscription);
  }
  t.swag = "🚀";
}
export { u as default, l as workflowSettings };
