import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CXLlCrdY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	const [origin, setOrigin] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setOrigin(window.location.origin);
	}, []);
	const snippet = `<script src="${origin}/widget.js" async><\/script>`;
	(0, import_react.useEffect)(() => {
		if (!origin) return;
		if (document.getElementById("wolv-widget-demo")) return;
		const s = document.createElement("script");
		s.id = "wolv-widget-demo";
		s.src = `${origin}/widget.js`;
		s.async = true;
		document.body.appendChild(s);
	}, [origin]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#06101f] text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-[#1e3a5f]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2 sm:gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-9 h-9 shrink-0 rounded-lg bg-[#d4af37] text-[#0a1628] font-bold flex items-center justify-center",
							children: "W"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-sm sm:text-base truncate",
								children: "WolvCapital Chat"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-[#8aa0c0] truncate",
								children: "AI + Live Agent Platform"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-2 sm:gap-4 text-xs sm:text-sm shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/auth",
							className: "text-[#8aa0c0] hover:text-[#d4af37] hidden sm:inline",
							children: "Agent sign in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/dashboard",
							className: "bg-[#d4af37] text-[#0a1628] font-medium px-3 sm:px-4 py-1.5 rounded-lg",
							children: "Dashboard"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "text-center mb-12 sm:mb-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-block text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d4af37] mb-3 sm:mb-4",
								children: "Investor Relations · Live Chat"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-3xl sm:text-5xl font-bold leading-tight mb-4 sm:mb-6",
								children: [
									"Replace Tawk.to with a ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[#d4af37]",
										children: "branded AI assistant"
									}),
									" built for WolvCapital investors"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[#8aa0c0] text-sm sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-10",
								children: "Dark-themed chat widget · GPT-grade AI auto-responder · Real-time agent dashboard with visitor location, browser, and live page navigation tracking."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row gap-3 sm:justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/dashboard",
									className: "bg-[#d4af37] text-[#0a1628] font-semibold px-6 py-3 rounded-lg text-center",
									children: "Open dashboard"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#install",
									className: "border border-[#1e3a5f] px-6 py-3 rounded-lg text-[#8aa0c0] hover:text-[#d4af37] text-center",
									children: "Install snippet"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 text-xs text-[#6b7d99]",
								children: "↘ The chat bubble in the bottom-right is the live widget."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-20",
						children: [
							{
								t: "Branded Widget",
								d: "Dark navy + gold, Shadow DOM isolated, drop-in script tag. No iframe required."
							},
							{
								t: "AI Auto-Responder",
								d: "Gemini 3 Flash with RAG over your knowledge base. Auto-escalates to humans when needed."
							},
							{
								t: "Live Visitor Tracking",
								d: "IP geolocation, browser, OS, real-time page navigation timeline — all in the agent inspector."
							},
							{
								t: "Realtime Inbox",
								d: "Supabase Realtime WebSockets. New messages and visitors appear instantly."
							},
							{
								t: "Seamless Handoff",
								d: "Agents take over any conversation with one click. AI pauses, human takes the wheel."
							},
							{
								t: "Full History",
								d: "Every message timestamped, every conversation searchable, every visitor traceable."
							}
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-4 sm:p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[#d4af37] font-semibold mb-2 text-sm sm:text-base",
								children: f.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs sm:text-sm text-[#8aa0c0]",
								children: f.d
							})]
						}, f.t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "install",
						className: "bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-5 sm:p-8 mb-12 sm:mb-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl sm:text-2xl font-semibold mb-3",
								children: "Install on wolvcapital.com"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs sm:text-sm text-[#8aa0c0] mb-4",
								children: [
									"Paste this one line before ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "text-[#d4af37]",
										children: "</body>"
									}),
									" on every page. Replace your current Tawk.to snippet."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "bg-[#06101f] border border-[#1e3a5f] rounded-lg p-3 sm:p-4 text-[11px] sm:text-xs overflow-x-auto text-[#d4af37] whitespace-pre",
								children: snippet
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[#6b7d99] mt-3",
								children: "Self-contained (Shadow DOM), respects CORS from any origin, persists sessions in localStorage."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid sm:grid-cols-2 gap-3 sm:gap-4 mb-12 sm:mb-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/dashboard",
							className: "bg-gradient-to-br from-[#0a1628] to-[#162846] border border-[#1e3a5f] rounded-xl p-5 sm:p-6 hover:border-[#d4af37]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[#d4af37] font-semibold mb-2",
								children: "→ Agent Dashboard"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-[#8aa0c0]",
								children: "View all conversations, take over from AI, inspect visitor details."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/knowledge",
							className: "bg-gradient-to-br from-[#0a1628] to-[#162846] border border-[#1e3a5f] rounded-xl p-5 sm:p-6 hover:border-[#d4af37]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[#d4af37] font-semibold mb-2",
								children: "→ Knowledge Base"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-[#8aa0c0]",
								children: "Add WolvCapital content the AI will use to answer investor questions."
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-[#1e3a5f] text-center py-6 px-4 text-xs text-[#6b7d99]",
				children: "WolvCapital Live Chat · Powered by Lovable Cloud"
			})
		]
	});
}
//#endregion
export { Landing as component };
