import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-DwceVwJM.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { c as upsertSite, n as clearKnowledge, o as seedKnowledge, r as crawlSite } from "./ai.functions-Dhe57SJr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-DUcja-LM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KB() {
	const navigate = useNavigate();
	const [authed, setAuthed] = (0, import_react.useState)(false);
	const [sites, setSites] = (0, import_react.useState)([]);
	const [siteSlug, setSiteSlug] = (0, import_react.useState)("wolvcapital");
	const [url, setUrl] = (0, import_react.useState)("https://wolvcapital.com");
	const [title, setTitle] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [count, setCount] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)("");
	const seed = useServerFn(seedKnowledge);
	const clear = useServerFn(clearKnowledge);
	const crawl = useServerFn(crawlSite);
	const saveSite = useServerFn(upsertSite);
	const [crawlUrl, setCrawlUrl] = (0, import_react.useState)("https://wolvcapital.com");
	const [crawlLimit, setCrawlLimit] = (0, import_react.useState)(50);
	const [replace, setReplace] = (0, import_react.useState)(true);
	const [newSlug, setNewSlug] = (0, import_react.useState)("");
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newDomain, setNewDomain] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (!data.session) navigate({ to: "/auth" });
			else setAuthed(true);
		});
	}, [navigate]);
	async function refreshSites() {
		const { data } = await supabase.from("sites").select("id, slug, name, domain").order("created_at", { ascending: true });
		setSites(data ?? []);
	}
	async function refreshCount() {
		const site = sites.find((s) => s.slug === siteSlug);
		const q = supabase.from("kb_chunks").select("*", {
			count: "exact",
			head: true
		});
		const { count: c } = site ? await q.eq("site_id", site.id) : await q;
		setCount(c ?? 0);
	}
	(0, import_react.useEffect)(() => {
		if (authed) refreshSites();
	}, [authed]);
	(0, import_react.useEffect)(() => {
		if (authed && sites.length) refreshCount();
	}, [
		authed,
		sites,
		siteSlug
	]);
	async function add() {
		if (!content.trim()) return;
		setBusy(true);
		setMsg("");
		try {
			const r = await seed({ data: {
				site: siteSlug,
				entries: [{
					url,
					title,
					content
				}]
			} });
			setMsg(`Inserted ${r.inserted} chunk(s) into "${siteSlug}".`);
			setContent("");
			refreshCount();
		} catch (e) {
			setMsg(e instanceof Error ? e.message : "Failed");
		} finally {
			setBusy(false);
		}
	}
	async function wipe() {
		if (!confirm(`Clear knowledge base for site "${siteSlug}"?`)) return;
		await clear({ data: { site: siteSlug } });
		refreshCount();
	}
	async function runCrawl() {
		setBusy(true);
		setMsg(`Crawling for "${siteSlug}" — this can take a few minutes...`);
		try {
			const r = await crawl({ data: {
				url: crawlUrl,
				site: siteSlug,
				limit: crawlLimit,
				replace
			} });
			setMsg(`Crawled ${r.pages} page(s), inserted ${r.inserted} chunk(s) into "${siteSlug}".`);
			refreshCount();
		} catch (e) {
			setMsg(e instanceof Error ? e.message : "Crawl failed");
		} finally {
			setBusy(false);
		}
	}
	async function addSite() {
		if (!newSlug || !newName) return;
		setBusy(true);
		setMsg("");
		try {
			await saveSite({ data: {
				slug: newSlug,
				name: newName,
				domain: newDomain || void 0
			} });
			setNewSlug("");
			setNewName("");
			setNewDomain("");
			await refreshSites();
			setSiteSlug(newSlug);
			setMsg(`Site "${newSlug}" saved.`);
		} catch (e) {
			setMsg(e instanceof Error ? e.message : "Failed");
		} finally {
			setBusy(false);
		}
	}
	if (!authed) return null;
	const currentSite = sites.find((s) => s.slug === siteSlug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#06101f] text-white p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl mx-auto space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-semibold text-[#d4af37]",
						children: "Knowledge Base"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/dashboard",
						className: "text-xs text-[#8aa0c0] hover:text-[#d4af37]",
						children: "← Dashboard"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-[#d4af37] mb-2",
							children: "Site"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[#8aa0c0] mb-3",
							children: [
								"Each site has its own knowledge base. The widget passes its ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "text-[#d4af37]",
									children: "data-site"
								}),
								" slug; the AI only answers from that site's KB."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: siteSlug,
								onChange: (e) => setSiteSlug(e.target.value),
								className: "bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm",
								children: sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: s.slug,
									children: [
										s.name,
										" (",
										s.slug,
										")"
									]
								}, s.id))
							}), currentSite?.domain && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-[#8aa0c0]",
								children: ["domain: ", currentSite.domain]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
									className: "text-xs text-[#8aa0c0] cursor-pointer hover:text-[#d4af37]",
									children: "+ Add new site"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: newSlug,
											onChange: (e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")),
											placeholder: "slug (e.g. acme)",
											className: "bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: newName,
											onChange: (e) => setNewName(e.target.value),
											placeholder: "Display name",
											className: "bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: newDomain,
											onChange: (e) => setNewDomain(e.target.value),
											placeholder: "domain (acme.com)",
											className: "bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: addSite,
									disabled: busy || !newSlug || !newName,
									className: "mt-2 bg-[#d4af37] text-[#0a1628] font-semibold px-3 py-1.5 rounded-lg text-xs disabled:opacity-50",
									children: "Save site"
								})
							]
						}),
						currentSite && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 text-xs text-[#8aa0c0]",
							children: ["Embed snippet:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "mt-1 bg-[#06101f] border border-[#1e3a5f] rounded p-2 overflow-x-auto text-[11px] text-[#e5e7eb]",
								children: `<script src="${typeof window !== "undefined" ? window.location.origin : ""}/widget.js" data-site="${currentSite.slug}" async><\/script>`
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-[#d4af37] mb-2",
							children: "Auto-crawl with Firecrawl"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[#8aa0c0] mb-4",
							children: [
								"Crawl a site, extract main content, embed all pages into ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: siteSlug }),
								"'s knowledge base."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: crawlUrl,
								onChange: (e) => setCrawlUrl(e.target.value),
								placeholder: "https://example.com",
								className: "w-full bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 flex-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-xs text-[#8aa0c0]",
										children: ["Page limit", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											max: 200,
											value: crawlLimit,
											onChange: (e) => setCrawlLimit(parseInt(e.target.value || "50")),
											className: "ml-2 w-20 bg-[#162846] border border-[#1e3a5f] rounded px-2 py-1 text-sm"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-xs text-[#8aa0c0] flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: replace,
											onChange: (e) => setReplace(e.target.checked)
										}), " Replace existing for this site"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: runCrawl,
										disabled: busy,
										className: "ml-auto bg-[#d4af37] text-[#0a1628] font-semibold px-4 py-2 rounded-lg text-sm disabled:opacity-50",
										children: busy ? "Working..." : "Crawl & embed"
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-[#8aa0c0] mb-3",
							children: [
								"Stored chunks for ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-white",
									children: siteSlug
								}),
								": ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-white",
									children: count
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#8aa0c0] mb-4",
							children: "Paste content (FAQs, About, Services, etc.) for this site. The AI uses semantic search over these chunks."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: url,
									onChange: (e) => setUrl(e.target.value),
									placeholder: "Source URL",
									className: "w-full bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: title,
									onChange: (e) => setTitle(e.target.value),
									placeholder: "Title (e.g. 'Fee Structure')",
									className: "w-full bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: content,
									onChange: (e) => setContent(e.target.value),
									placeholder: "Content...",
									rows: 10,
									className: "w-full bg-[#162846] border border-[#1e3a5f] rounded-lg px-3 py-2 text-sm font-mono"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: add,
										disabled: busy,
										className: "bg-[#d4af37] text-[#0a1628] font-semibold px-4 py-2 rounded-lg text-sm disabled:opacity-50",
										children: busy ? "Embedding..." : "Add to KB"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: wipe,
										className: "text-xs text-red-400 hover:text-red-300 px-3",
										children: [
											"Clear \"",
											siteSlug,
											"\""
										]
									})]
								}),
								msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-[#8aa0c0]",
									children: msg
								})
							]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { KB as component };
