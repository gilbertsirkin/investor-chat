import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dpn8S0gM.mjs";
import { $ as boolean, J as _enum, Q as array, ot as number, st as object, ut as string } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
import { t as generateText } from "../_libs/ai.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.functions-eq5mIbCr.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* AI Gateway — Groq (primary chat) + Ollama (embeddings)
* Env vars:
*   GROQ_API_KEY        — from console.groq.com (free)
*   GROQ_MODEL          — default: llama-3.1-8b-instant
*   OLLAMA_BASE_URL     — e.g. https://ollama.wolvcapital.com
*   OLLAMA_EMBED_MODEL  — default: nomic-embed-text
*/
function groqProvider() {
	const key = processModule.env.GROQ_API_KEY;
	if (!key) throw new Error("Missing GROQ_API_KEY — get one free at console.groq.com");
	return createOpenAICompatible({
		name: "groq",
		baseURL: "https://api.groq.com/openai/v1",
		headers: { Authorization: `Bearer ${key}` }
	});
}
async function chatCompletion({ system, messages }) {
	const { text } = await generateText({
		model: groqProvider()(processModule.env.GROQ_MODEL || "llama-3.1-8b-instant"),
		system,
		messages
	});
	return text;
}
async function embedText(text) {
	const base = processModule.env.OLLAMA_BASE_URL;
	const embedModel = processModule.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";
	if (!base) {
		console.warn("[Embed] OLLAMA_BASE_URL not set — skipping embeddings");
		return [];
	}
	try {
		const res = await fetch(`${base}/api/embed`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"ngrok-skip-browser-warning": "true"
			},
			body: JSON.stringify({
				model: embedModel,
				input: text
			}),
			signal: AbortSignal.timeout(15e3)
		});
		if (!res.ok) throw new Error(`Ollama embed failed: ${res.status}`);
		const j = await res.json();
		const embedding = j.embeddings?.[0] ?? j.embedding;
		if (!embedding) throw new Error("No embedding in response");
		return embedding;
	} catch (e) {
		console.error("[Embed] failed:", e instanceof Error ? e.message : String(e));
		return [];
	}
}
function sb() {
	return createClient(processModule.env.SUPABASE_URL, processModule.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
function buildSystemPrompt(siteName, siteDomain) {
	return `You are the ${siteName} assistant on ${siteDomain ? `${siteName} on ${siteDomain}` : siteName}.

Tone: professional, warm, concise. Never give specific financial advice or guarantee returns.

Rules:
- Answer questions about ${siteName} using only the provided KNOWLEDGE BASE snippets. Cite naturally.
- If the answer isn't in the knowledge base, say so briefly and offer to connect them with a human agent.
- If the user expresses frustration, asks for a human, mentions a complaint, account issue, compliance, legal, or any specific account/transaction matter, end your reply with the token [ESCALATE] on its own line.
- Never invent product details, fees, returns, or contact info. If unknown, say so.
- Keep replies under 4 short paragraphs. Use markdown for structure when helpful.`;
}
var respondToConversation_createServerFn_handler = createServerRpc({
	id: "f8b64b6969ef1f5565e2adfd8471f8750925f62c842558eeca81d2006f283d4a",
	name: "respondToConversation",
	filename: "src/lib/ai.functions.ts"
}, (opts) => respondToConversation.__executeServer(opts));
var respondToConversation = createServerFn({ method: "POST" }).inputValidator((d) => object({ conversation_id: string().uuid() }).parse(d)).handler(respondToConversation_createServerFn_handler, async ({ data }) => {
	const key = processModule.env.LOVABLE_API_KEY;
	const ollama = processModule.env.OLLAMA_BASE_URL;
	if (!key && !ollama) throw new Error("No AI backend configured (set OLLAMA_BASE_URL or LOVABLE_API_KEY)");
	const supa = sb();
	const { data: conv } = await supa.from("conversations").select("*").eq("id", data.conversation_id).single();
	if (!conv) throw new Error("Conversation not found");
	if (conv.status !== "ai") return {
		skipped: true,
		reason: "not_ai"
	};
	let siteName = "WolvCapital";
	let siteDomain = "wolvcapital.com";
	if (conv.site_id) {
		const { data: site } = await supa.from("sites").select("name, domain").eq("id", conv.site_id).maybeSingle();
		if (site) {
			siteName = site.name;
			siteDomain = site.domain;
		}
	}
	const { data: msgs } = await supa.from("messages").select("role, content, created_at").eq("conversation_id", data.conversation_id).order("created_at", { ascending: true }).limit(30);
	const lastUser = [...msgs ?? []].reverse().find((m) => m.role === "visitor");
	if (!lastUser) return {
		skipped: true,
		reason: "no_user_message"
	};
	let context = "";
	try {
		const queryEmbedding = await embedText(lastUser.content);
		const { data: chunks } = await supa.rpc("match_kb", {
			query_embedding: queryEmbedding,
			match_count: 5,
			_site_id: conv.site_id ?? void 0
		});
		if (chunks && chunks.length) context = chunks.map((c, i) => `[${i + 1}] ${c.title ?? c.url}\n${c.content}`).join("\n\n---\n\n");
	} catch (e) {
		console.error("RAG retrieval failed:", e);
	}
	const chatMessages = (msgs ?? []).map((m) => ({
		role: m.role === "visitor" ? "user" : "assistant",
		content: m.content
	}));
	const SYS = buildSystemPrompt(siteName, siteDomain);
	const system = context ? `${SYS}\n\nKNOWLEDGE BASE:\n${context}` : `${SYS}\n\n(No knowledge base context available for this query.)`;
	try {
		const text = await chatCompletion({
			lovableApiKey: key,
			system,
			messages: chatMessages
		});
		const escalate = /\[ESCALATE\]/i.test(text);
		const clean = text.replace(/\[ESCALATE\]/gi, "").trim();
		await supa.from("messages").insert({
			conversation_id: data.conversation_id,
			role: "ai",
			content: clean || "Let me connect you with an agent."
		});
		if (escalate) {
			await supa.from("conversations").update({ status: "human" }).eq("id", data.conversation_id);
			await supa.from("messages").insert({
				conversation_id: data.conversation_id,
				role: "system",
				content: "Conversation escalated to human agent."
			});
		}
		return {
			ok: true,
			escalated: escalate
		};
	} catch (e) {
		const msg = e instanceof Error ? e.message : String(e);
		console.error("AI error:", msg);
		await supa.from("messages").insert({
			conversation_id: data.conversation_id,
			role: "system",
			content: "AI assistant is temporarily unavailable. An agent will respond shortly."
		});
		await supa.from("conversations").update({ status: "human" }).eq("id", data.conversation_id);
		return {
			ok: false,
			error: msg
		};
	}
});
function chunkText(text, max = 1200) {
	const out = [];
	let i = 0;
	while (i < text.length) {
		out.push(text.slice(i, i + max));
		i += max;
	}
	return out;
}
async function resolveSiteIdBySlug(client, slug) {
	const s = (slug || "wolvcapital").trim();
	return (await client.from("sites").select("id").eq("slug", s).maybeSingle())?.data?.id ?? null;
}
var SeedInput = object({
	site: string().optional(),
	entries: array(object({
		url: string(),
		title: string().optional(),
		content: string().min(20)
	})).min(1)
});
var seedKnowledge_createServerFn_handler = createServerRpc({
	id: "a0213a582d3b3cdecd783d13d24115a8853bb0e1ecfbae0e6e08461fc9e1488f",
	name: "seedKnowledge",
	filename: "src/lib/ai.functions.ts"
}, (opts) => seedKnowledge.__executeServer(opts));
var seedKnowledge = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => SeedInput.parse(d)).handler(seedKnowledge_createServerFn_handler, async ({ data, context }) => {
	if (!processModule.env.OLLAMA_BASE_URL) throw new Error("Missing OLLAMA_BASE_URL — configure Ollama for embeddings");
	const { data: isAdminRow } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	const { data: isAgentRow } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "agent"
	});
	if (!isAdminRow && !isAgentRow) throw new Error("Forbidden");
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const site_id = await resolveSiteIdBySlug(supabaseAdmin, data.site);
	let inserted = 0;
	for (const entry of data.entries) {
		const chunks = chunkText(entry.content);
		for (const chunk of chunks) try {
			const embedding = await embedText(chunk);
			await supabaseAdmin.from("kb_chunks").insert({
				url: entry.url,
				title: entry.title,
				content: chunk,
				embedding,
				site_id
			});
			inserted++;
		} catch (e) {
			console.error("embed/insert failed:", e);
		}
	}
	return { inserted };
});
var clearKnowledge_createServerFn_handler = createServerRpc({
	id: "5b4308a5ca6ebff7f9aa3e3ff58814a4697feee481218a8c7b8f4b39d03bccb6",
	name: "clearKnowledge",
	filename: "src/lib/ai.functions.ts"
}, (opts) => clearKnowledge.__executeServer(opts));
var clearKnowledge = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => object({ site: string().optional() }).optional().parse(d)).handler(clearKnowledge_createServerFn_handler, async ({ data, context }) => {
	const { data: isAdminRow } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (!isAdminRow) throw new Error("Admin only");
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	if (data?.site) {
		const site_id = await resolveSiteIdBySlug(supabaseAdmin, data.site);
		if (site_id) await supabaseAdmin.from("kb_chunks").delete().eq("site_id", site_id);
	} else await supabaseAdmin.from("kb_chunks").delete().neq("id", "00000000-0000-0000-0000-000000000000");
	return { ok: true };
});
var CrawlInput = object({
	url: string().url(),
	site: string().optional(),
	limit: number().int().min(1).max(200).default(50),
	replace: boolean().default(false)
});
var crawlSite_createServerFn_handler = createServerRpc({
	id: "9c0f96a3d615f6cdcbf993812f85acac0db5efc2a7ed549ef5a94d9e1adc0ff7",
	name: "crawlSite",
	filename: "src/lib/ai.functions.ts"
}, (opts) => crawlSite.__executeServer(opts));
var crawlSite = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => CrawlInput.parse(d)).handler(crawlSite_createServerFn_handler, async ({ data, context }) => {
	const fcKey = processModule.env.FIRECRAWL_API_KEY;
	if (!processModule.env.OLLAMA_BASE_URL) throw new Error("Missing OLLAMA_BASE_URL — configure Ollama for embeddings");
	if (!fcKey) throw new Error("Missing FIRECRAWL_API_KEY — add your Firecrawl key");
	const { data: isAdminRow } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	const { data: isAgentRow } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "agent"
	});
	if (!isAdminRow && !isAgentRow) throw new Error("Forbidden");
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const Firecrawl = (await import("../_libs/@mendable/firecrawl-js+[...].mjs").then((n) => n.t)).default;
	const fc = new Firecrawl({ apiKey: fcKey });
	const site_id = await resolveSiteIdBySlug(supabaseAdmin, data.site);
	if (!site_id) throw new Error(`Site not found: ${data.site || "wolvcapital"}. Create it first.`);
	if (data.replace) await supabaseAdmin.from("kb_chunks").delete().eq("site_id", site_id);
	const docs = (await fc.crawl(data.url, {
		limit: data.limit,
		scrapeOptions: {
			formats: ["markdown"],
			onlyMainContent: true
		},
		pollInterval: 2,
		timeout: 300
	})).data ?? [];
	let pages = 0;
	let inserted = 0;
	for (const doc of docs) {
		const md = doc.markdown?.trim();
		if (!md || md.length < 40) continue;
		const url = doc.metadata?.sourceURL ?? doc.metadata?.url ?? data.url;
		const title = doc.metadata?.title;
		pages++;
		for (const chunk of chunkText(md)) try {
			const embedding = await embedText(chunk);
			await supabaseAdmin.from("kb_chunks").insert({
				url,
				title,
				content: chunk,
				embedding,
				site_id
			});
			inserted++;
		} catch (e) {
			console.error("embed/insert failed:", e);
		}
	}
	return {
		pages,
		inserted
	};
});
var UpsertSiteInput = object({
	slug: string().min(1).max(64).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, dashes"),
	name: string().min(1),
	domain: string().optional()
});
var upsertSite_createServerFn_handler = createServerRpc({
	id: "35a5bc0f2fb0b62bb4e7734a2bfb6824a9ea87547393c3a37fd46785ef539297",
	name: "upsertSite",
	filename: "src/lib/ai.functions.ts"
}, (opts) => upsertSite.__executeServer(opts));
var upsertSite = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => UpsertSiteInput.parse(d)).handler(upsertSite_createServerFn_handler, async ({ data, context }) => {
	const { data: isAg } = await context.supabase.rpc("is_agent", { _user_id: context.userId });
	if (!isAg) throw new Error("Forbidden");
	const { error, data: row } = await context.supabase.from("sites").upsert({
		slug: data.slug,
		name: data.name,
		domain: data.domain || null
	}, { onConflict: "slug" }).select().single();
	if (error) throw new Error(error.message);
	return { site: row };
});
var agentReply_createServerFn_handler = createServerRpc({
	id: "9b99c27c74f40973c6b26afb4cdde82bfec35e994786d479c0986d49e3f22c70",
	name: "agentReply",
	filename: "src/lib/ai.functions.ts"
}, (opts) => agentReply.__executeServer(opts));
var agentReply = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => object({
	conversation_id: string().uuid(),
	content: string().min(1)
}).parse(d)).handler(agentReply_createServerFn_handler, async ({ data, context }) => {
	const { data: isAg } = await context.supabase.rpc("is_agent", { _user_id: context.userId });
	if (!isAg) throw new Error("Forbidden");
	const { error } = await context.supabase.from("messages").insert({
		conversation_id: data.conversation_id,
		role: "agent",
		agent_id: context.userId,
		content: data.content
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
var setConversationStatus_createServerFn_handler = createServerRpc({
	id: "65b27419863734f2d8f17ee397b474f63821e645166b0adc2f027641c6e8207b",
	name: "setConversationStatus",
	filename: "src/lib/ai.functions.ts"
}, (opts) => setConversationStatus.__executeServer(opts));
var setConversationStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => object({
	conversation_id: string().uuid(),
	status: _enum([
		"ai",
		"human",
		"closed"
	])
}).parse(d)).handler(setConversationStatus_createServerFn_handler, async ({ data, context }) => {
	const { data: isAg } = await context.supabase.rpc("is_agent", { _user_id: context.userId });
	if (!isAg) throw new Error("Forbidden");
	const patch = { status: data.status };
	if (data.status === "human") patch.assigned_agent_id = context.userId;
	if (data.status === "ai") patch.assigned_agent_id = null;
	await context.supabase.from("conversations").update(patch).eq("id", data.conversation_id);
	await context.supabase.from("messages").insert({
		conversation_id: data.conversation_id,
		role: "system",
		content: data.status === "human" ? "An agent has joined the conversation." : data.status === "ai" ? "Handed back to AI assistant." : "Conversation closed."
	});
	return { ok: true };
});
var markConversationRead_createServerFn_handler = createServerRpc({
	id: "b0a248148db69b512d4d0cb439ebcec59e67ec3efb77fb5f14d4e5f49773f739",
	name: "markConversationRead",
	filename: "src/lib/ai.functions.ts"
}, (opts) => markConversationRead.__executeServer(opts));
var markConversationRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => object({ conversation_id: string().uuid() }).parse(d)).handler(markConversationRead_createServerFn_handler, async ({ data, context }) => {
	const { data: isAg } = await context.supabase.rpc("is_agent", { _user_id: context.userId });
	if (!isAg) throw new Error("Forbidden");
	await context.supabase.from("conversations").update({ unread_agent_count: 0 }).eq("id", data.conversation_id);
	return { ok: true };
});
//#endregion
export { agentReply_createServerFn_handler, clearKnowledge_createServerFn_handler, crawlSite_createServerFn_handler, markConversationRead_createServerFn_handler, respondToConversation_createServerFn_handler, seedKnowledge_createServerFn_handler, setConversationStatus_createServerFn_handler, upsertSite_createServerFn_handler };
