import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-DwceVwJM.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { i as markConversationRead, s as setConversationStatus, t as agentReply } from "./ai.functions-Dhe57SJr.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-D_Lc3vDi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const navigate = useNavigate();
	const [authed, setAuthed] = (0, import_react.useState)(null);
	const [convs, setConvs] = (0, import_react.useState)([]);
	const [visitors, setVisitors] = (0, import_react.useState)({});
	const [active, setActive] = (0, import_react.useState)(null);
	const [msgs, setMsgs] = (0, import_react.useState)([]);
	const [pageViews, setPageViews] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [mobilePane, setMobilePane] = (0, import_react.useState)("inbox");
	const msgsRef = (0, import_react.useRef)(null);
	const pageViewsRef = (0, import_react.useRef)(null);
	const notifsRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const activeRef = (0, import_react.useRef)(null);
	const reply = useServerFn(agentReply);
	const setStatus = useServerFn(setConversationStatus);
	const markRead = useServerFn(markConversationRead);
	(0, import_react.useEffect)(() => {
		activeRef.current = active;
	}, [active]);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (!data.session) navigate({ to: "/auth" });
			else setAuthed(true);
		});
	}, [navigate]);
	const loadAll = (0, import_react.useCallback)(async () => {
		const { data: c } = await supabase.from("conversations").select("*").order("last_message_at", { ascending: false }).limit(100);
		setConvs(c ?? []);
		if (c && c.length) {
			const ids = [...new Set(c.map((x) => x.visitor_id))];
			const { data: vs } = await supabase.from("visitors").select("*").in("id", ids);
			const map = {};
			vs?.forEach((v) => {
				map[v.id] = v;
			});
			setVisitors(map);
		}
	}, []);
	const [installPrompt, setInstallPrompt] = (0, import_react.useState)(null);
	const [isInstalled, setIsInstalled] = (0, import_react.useState)(false);
	const [notifPerm, setNotifPerm] = (0, import_react.useState)(typeof Notification !== "undefined" ? Notification.permission : "unsupported");
	const swRegRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!authed || typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
		navigator.serviceWorker.register("/sw.js").then((reg) => {
			swRegRef.current = reg;
		}).catch(() => {});
		const onMsg = (ev) => {
			const d = ev.data || {};
			if (d.type === "open_conversation" && d.id) {
				setActive(d.id);
				setMobilePane("thread");
				window.focus();
			}
		};
		navigator.serviceWorker.addEventListener("message", onMsg);
		return () => navigator.serviceWorker.removeEventListener("message", onMsg);
	}, [authed]);
	(0, import_react.useEffect)(() => {
		const onBip = (e) => {
			e.preventDefault();
			setInstallPrompt(e);
		};
		const onInstalled = () => {
			setIsInstalled(true);
			setInstallPrompt(null);
		};
		window.addEventListener("beforeinstallprompt", onBip);
		window.addEventListener("appinstalled", onInstalled);
		if (window.matchMedia?.("(display-mode: standalone)").matches || navigator.standalone) setIsInstalled(true);
		return () => {
			window.removeEventListener("beforeinstallprompt", onBip);
			window.removeEventListener("appinstalled", onInstalled);
		};
	}, []);
	async function enableNotifications() {
		if (typeof Notification === "undefined") return;
		try {
			const p = await Notification.requestPermission();
			setNotifPerm(p);
		} catch {}
	}
	async function installApp() {
		if (!installPrompt) {
			alert("On iPhone/iPad: tap the Share icon → Add to Home Screen. Then open WolvChat from your home screen to enable notifications.");
			return;
		}
		try {
			await installPrompt.prompt();
			await installPrompt.userChoice;
			setInstallPrompt(null);
		} catch {}
	}
	const notify = (0, import_react.useCallback)((convId, title, body) => {
		if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
		if (activeRef.current === convId && document.hasFocus()) return;
		const reg = swRegRef.current;
		if (reg && reg.showNotification) {
			reg.showNotification(title, {
				body,
				tag: convId,
				icon: "/icon-192.png",
				badge: "/icon-192.png",
				data: {
					url: "/dashboard",
					conversation_id: convId
				},
				vibrate: [
					80,
					40,
					80
				]
			}).catch(() => {});
			return;
		}
		try {
			const n = new Notification(title, {
				body,
				tag: convId,
				icon: "/icon-192.png"
			});
			const arr = notifsRef.current.get(convId) ?? [];
			arr.push(n);
			notifsRef.current.set(convId, arr);
			n.onclick = () => {
				window.focus();
				setActive(convId);
				setMobilePane("thread");
				n.close();
			};
			setTimeout(() => {
				try {
					n.close();
				} catch {}
			}, 15e3);
		} catch {}
	}, []);
	const dismissNotifs = (0, import_react.useCallback)((convId) => {
		const arr = notifsRef.current.get(convId);
		if (!arr) return;
		arr.forEach((n) => {
			try {
				n.close();
			} catch {}
		});
		notifsRef.current.delete(convId);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!authed) return;
		loadAll();
		const ch = supabase.channel("dash").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "conversations"
		}, loadAll).on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "messages"
		}, (p) => {
			const m = p.new;
			if (activeRef.current && m && m.conversation_id === activeRef.current) setMsgs((prev) => prev.some((x) => x.id === m.id) ? prev : [...prev, m]);
			else if (m && m.role === "visitor") notify(m.conversation_id, "New visitor message", m.content.slice(0, 120));
			loadAll();
		}).on("postgres_changes", {
			event: "UPDATE",
			schema: "public",
			table: "messages"
		}, loadAll).on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "visitors"
		}, (p) => {
			const v = p.new;
			const where = [v.city, v.country].filter(Boolean).join(", ") || "unknown";
			notify("visitor_" + v.id, "🟢 Visitor on site", `${where} · ${v.current_page ?? "/"}`);
			loadAll();
		}).on("postgres_changes", {
			event: "UPDATE",
			schema: "public",
			table: "visitors"
		}, loadAll).on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "page_views"
		}, (p) => {
			const pv = p.new;
			const conv = convs.find((c) => c.id === activeRef.current);
			if (conv && conv.visitor_id === pv.visitor_id) setPageViews((prev) => [pv, ...prev].slice(0, 30));
		}).subscribe();
		return () => {
			supabase.removeChannel(ch);
		};
	}, [
		authed,
		loadAll,
		notify,
		convs
	]);
	(0, import_react.useEffect)(() => {
		if (!active) {
			setMsgs([]);
			setPageViews([]);
			return;
		}
		dismissNotifs(active);
		supabase.from("messages").select("*").eq("conversation_id", active).order("created_at").then(({ data }) => setMsgs(data ?? []));
		const conv = convs.find((c) => c.id === active);
		if (conv) {
			dismissNotifs("visitor_" + conv.visitor_id);
			supabase.from("page_views").select("*").eq("visitor_id", conv.visitor_id).order("viewed_at", { ascending: false }).limit(30).then(({ data }) => setPageViews(data ?? []));
			if (conv.unread_agent_count > 0) markRead({ data: { conversation_id: active } });
		}
	}, [
		active,
		convs,
		markRead,
		dismissNotifs
	]);
	(0, import_react.useEffect)(() => {
		msgsRef.current?.scrollTo({ top: msgsRef.current.scrollHeight });
	}, [msgs]);
	(0, import_react.useEffect)(() => {
		pageViewsRef.current?.scrollTo({ top: 0 });
	}, [pageViews]);
	async function send() {
		if (!input.trim() || !active) return;
		const text = input;
		setInput("");
		await reply({ data: {
			conversation_id: active,
			content: text
		} });
	}
	async function signOut() {
		await supabase.auth.signOut();
		navigate({ to: "/auth" });
	}
	if (!authed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#06101f] text-white flex items-center justify-center",
		children: "Loading..."
	});
	const activeConv = convs.find((c) => c.id === active);
	const activeVisitor = activeConv ? visitors[activeConv.visitor_id] : null;
	function openConv(id) {
		setActive(id);
		setMobilePane("thread");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-[100dvh] flex flex-col bg-[#06101f] text-white text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "flex items-center gap-1 px-3 py-2 border-b border-[#1e3a5f] bg-[#0a1628] shrink-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-7 h-7 rounded bg-[#d4af37] text-[#0a1628] font-bold flex items-center justify-center text-xs mr-2",
					children: "W"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavTab, {
					to: "/dashboard",
					label: "Inbox",
					badge: convs.reduce((a, c) => a + (c.unread_agent_count || 0), 0),
					active: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavTab, {
					to: "/knowledge",
					label: "Knowledge"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2 text-[10px] text-[#8aa0c0]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden sm:inline",
							children: [
								convs.length,
								" chats · ",
								Object.keys(visitors).length,
								" visitors"
							]
						}),
						notifPerm !== "granted" && notifPerm !== "unsupported" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: enableNotifications,
							className: "px-2 py-1 rounded bg-[#d4af37] text-[#0a1628] font-semibold hover:opacity-90",
							title: "Get instant alerts on new messages",
							children: "🔔 Enable alerts"
						}),
						!isInstalled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: installApp,
							className: "px-2 py-1 rounded border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a1628] transition-colors",
							title: "Install as app for lock-screen notifications",
							children: "📲 Install app"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: signOut,
							className: "hover:text-[#d4af37]",
							children: "Sign out"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col md:flex-row flex-1 min-h-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: `${mobilePane === "inbox" ? "flex" : "hidden"} md:flex w-full md:w-80 border-r border-[#1e3a5f] flex-col flex-1 md:flex-none min-h-0`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-2 border-b border-[#1e3a5f] text-[10px] text-[#8aa0c0] uppercase tracking-wide",
						children: ["Inbox · ", convs.length]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto",
						children: [convs.map((c) => {
							const v = visitors[c.visitor_id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => openConv(c.id),
								className: `w-full text-left p-3 border-b border-[#0f2138] hover:bg-[#0a1628] ${c.id === active ? "bg-[#0a1628]" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-xs truncate min-w-0",
											children: v?.name || v?.email || (v?.session_id?.slice(0, 12) ?? "Visitor")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 shrink-0",
											children: [
												c.status === "human" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[9px] bg-[#d4af37] text-[#0a1628] px-1.5 rounded",
													children: "HUMAN"
												}),
												c.status === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[9px] bg-[#1e3a5f] text-[#8aa0c0] px-1.5 rounded",
													children: "AI"
												}),
												c.unread_agent_count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[9px] bg-red-500 text-white px-1.5 rounded-full",
													children: c.unread_agent_count
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-[#8aa0c0] truncate",
										children: c.last_message_preview || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-[#6b7d99] mt-0.5 truncate",
										children: v?.country ? `${v.city ?? ""} ${v.country}` : v?.ip ?? ""
									})
								]
							}, c.id);
						}), !convs.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-6 text-center text-xs text-[#6b7d99]",
							children: "No conversations yet."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: `${mobilePane === "thread" ? "flex" : "hidden"} md:flex flex-1 flex-col min-h-0 min-w-0`,
					children: [!active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 hidden md:flex items-center justify-center text-[#6b7d99]",
						children: "Select a conversation"
					}), active && activeConv && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 sm:p-4 border-b border-[#1e3a5f] grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setMobilePane("inbox"),
									className: "md:hidden text-[#8aa0c0] hover:text-[#d4af37] text-lg leading-none px-1",
									"aria-label": "Back",
									children: "←"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold truncate text-sm sm:text-base",
										children: activeVisitor?.name || activeVisitor?.email || "Anonymous visitor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] text-[#8aa0c0]",
										children: ["Status: ", activeConv.status]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setMobilePane("info"),
									className: "md:hidden text-[10px] text-[#8aa0c0] hover:text-[#d4af37] border border-[#1e3a5f] px-2 py-1 rounded",
									children: "Info"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-3 sm:px-4 pt-2 pb-3 border-b border-[#1e3a5f] flex flex-wrap gap-2",
							children: [
								activeConv.status === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStatus({ data: {
										conversation_id: active,
										status: "human"
									} }),
									className: "text-xs bg-[#d4af37] text-[#0a1628] px-3 py-1.5 rounded font-medium",
									children: "Take over"
								}),
								activeConv.status === "human" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStatus({ data: {
										conversation_id: active,
										status: "ai"
									} }),
									className: "text-xs bg-[#162846] border border-[#1e3a5f] px-3 py-1.5 rounded",
									children: "Hand back to AI"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStatus({ data: {
										conversation_id: active,
										status: "closed"
									} }),
									className: "text-xs text-[#8aa0c0] hover:text-red-400 px-3 py-1.5",
									children: "Close"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: msgsRef,
							className: "flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 flex flex-col",
							children: msgs.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `max-w-[85%] sm:max-w-[70%] ${m.role === "visitor" ? "self-end" : "self-start"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `text-[10px] mb-1 text-[#8aa0c0] ${m.role === "visitor" ? "text-right" : ""}`,
									children: [
										m.role === "visitor" ? "Visitor" : m.role === "ai" ? "AI Assistant" : m.role === "agent" ? "You" : "System",
										" · ",
										new Date(m.created_at).toLocaleTimeString()
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 break-words ${m.role === "visitor" ? "bg-[#162846] border border-[#1e3a5f]" : m.role === "agent" ? "bg-[#d4af37] text-[#0a1628]" : m.role === "ai" ? "bg-[#0a1628] border border-[#1e3a5f]" : "bg-transparent text-[10px] text-[#6b7d99] text-center"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "prose prose-sm prose-invert max-w-none [&_p]:my-1 [&_pre]:overflow-x-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { children: m.content })
									})
								})]
							}, m.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 sm:p-4 border-t border-[#1e3a5f]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: input,
									onChange: (e) => setInput(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											send();
										}
									},
									placeholder: activeConv.status === "ai" ? "AI is handling — take over to reply" : "Reply as agent...",
									className: "flex-1 min-w-0 bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm resize-none",
									rows: 2
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: send,
									disabled: !input.trim(),
									className: "bg-[#d4af37] text-[#0a1628] font-semibold px-4 rounded-lg disabled:opacity-40 shrink-0",
									children: "Send"
								})]
							})
						})
					] })]
				}),
				activeVisitor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: `${mobilePane === "info" ? "flex" : "hidden"} md:flex w-full md:w-80 border-l border-[#1e3a5f] overflow-y-auto p-4 flex-col gap-4 flex-1 md:flex-none min-h-0`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex md:hidden items-center justify-between -mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMobilePane("thread"),
								className: "text-[#8aa0c0] hover:text-[#d4af37] text-sm",
								children: "← Back to chat"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-[#d4af37] text-xs uppercase tracking-wide mb-2",
							children: "Visitor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Name",
									v: activeVisitor.name || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Email",
									v: activeVisitor.email || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "IP",
									v: activeVisitor.ip || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Location",
									v: [activeVisitor.city, activeVisitor.country].filter(Boolean).join(", ") || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Browser",
									v: `${activeVisitor.browser ?? "?"} / ${activeVisitor.os ?? "?"}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "First seen",
									v: new Date(activeVisitor.first_seen).toLocaleString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Last seen",
									v: new Date(activeVisitor.last_seen).toLocaleString()
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-[#d4af37] text-xs uppercase tracking-wide mb-2",
							children: "Current page"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-[#8aa0c0] break-all",
							children: activeVisitor.current_page || "—"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col min-h-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-[#d4af37] text-xs uppercase tracking-wide mb-2",
								children: "Page history"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								ref: pageViewsRef,
								className: "overflow-y-auto max-h-56 space-y-0.5",
								children: [pageViews.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] leading-snug px-2 py-1.5 rounded bg-[#0a1628] border border-[#0f2138]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#e5e7eb] truncate font-medium",
											children: p.title || p.url
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-[#6b7d99] shrink-0",
											children: new Date(p.viewed_at).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
												second: "2-digit"
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-[#6b7d99] truncate mt-0.5",
										children: p.url
									})]
								}, p.id)), !pageViews.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-[#6b7d99] py-2",
									children: "No tracked pages yet"
								})]
							})]
						})
					]
				})
			]
		})]
	});
}
function NavTab({ to, label, badge, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: `text-xs px-3 py-1.5 rounded-md flex items-center gap-2 ${active ? "bg-[#162846] text-[#d4af37]" : "text-[#8aa0c0] hover:text-white"}`,
		children: [label, badge && badge > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[9px] bg-red-500 text-white px-1.5 rounded-full",
			children: badge
		}) : null]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[#6b7d99] shrink-0",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[#e5e7eb] text-right break-all",
			children: v
		})]
	});
}
//#endregion
export { Dashboard as component };
