import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-DwceVwJM.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BOTneQDb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: "/dashboard" });
		});
	}, [navigate]);
	async function submit(e) {
		e.preventDefault();
		setErr(null);
		setLoading(true);
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						data: { display_name: name },
						emailRedirectTo: window.location.origin + "/dashboard"
					}
				});
				if (error) throw error;
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
			}
			navigate({ to: "/dashboard" });
		} catch (e) {
			setErr(e instanceof Error ? e.message : "Auth failed");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-[#06101f] text-white p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-8 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 rounded-lg bg-[#d4af37] flex items-center justify-center text-[#0a1628] font-bold text-lg",
						children: "W"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-semibold",
						children: "WolvCapital Chat"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[#8aa0c0]",
						children: "Agent dashboard"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-3",
					children: [
						mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "w-full bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm",
							placeholder: "Display name",
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							className: "w-full bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm",
							placeholder: "Email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							className: "w-full bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm",
							placeholder: "Password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true,
							minLength: 8
						}),
						err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-red-400",
							children: err
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: loading,
							className: "w-full bg-[#d4af37] text-[#0a1628] font-semibold rounded-lg py-2 text-sm disabled:opacity-50",
							children: loading ? "..." : mode === "signin" ? "Sign in" : "Create agent account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
					className: "mt-4 text-xs text-[#8aa0c0] hover:text-[#d4af37] underline w-full text-center",
					children: mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-[#6b7d99] text-center mt-4",
					children: "First user becomes admin. Subsequent users are agents."
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
