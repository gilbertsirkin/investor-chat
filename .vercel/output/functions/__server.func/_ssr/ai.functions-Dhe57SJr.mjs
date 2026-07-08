import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dpn8S0gM.mjs";
import { $ as boolean, J as _enum, Q as array, ot as number, st as object, ut as string } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-Bmkg9_S9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.functions-Dhe57SJr.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var respondToConversation = createServerFn({ method: "POST" }).inputValidator((d) => object({ conversation_id: string().uuid() }).parse(d)).handler(createSsrRpc("f8b64b6969ef1f5565e2adfd8471f8750925f62c842558eeca81d2006f283d4a"));
var SeedInput = object({
	site: string().optional(),
	entries: array(object({
		url: string(),
		title: string().optional(),
		content: string().min(20)
	})).min(1)
});
var seedKnowledge = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => SeedInput.parse(d)).handler(createSsrRpc("a0213a582d3b3cdecd783d13d24115a8853bb0e1ecfbae0e6e08461fc9e1488f"));
var clearKnowledge = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => object({ site: string().optional() }).optional().parse(d)).handler(createSsrRpc("5b4308a5ca6ebff7f9aa3e3ff58814a4697feee481218a8c7b8f4b39d03bccb6"));
var CrawlInput = object({
	url: string().url(),
	site: string().optional(),
	limit: number().int().min(1).max(200).default(50),
	replace: boolean().default(false)
});
var crawlSite = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => CrawlInput.parse(d)).handler(createSsrRpc("9c0f96a3d615f6cdcbf993812f85acac0db5efc2a7ed549ef5a94d9e1adc0ff7"));
var UpsertSiteInput = object({
	slug: string().min(1).max(64).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, dashes"),
	name: string().min(1),
	domain: string().optional()
});
var upsertSite = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => UpsertSiteInput.parse(d)).handler(createSsrRpc("35a5bc0f2fb0b62bb4e7734a2bfb6824a9ea87547393c3a37fd46785ef539297"));
var agentReply = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => object({
	conversation_id: string().uuid(),
	content: string().min(1)
}).parse(d)).handler(createSsrRpc("9b99c27c74f40973c6b26afb4cdde82bfec35e994786d479c0986d49e3f22c70"));
var setConversationStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => object({
	conversation_id: string().uuid(),
	status: _enum([
		"ai",
		"human",
		"closed"
	])
}).parse(d)).handler(createSsrRpc("65b27419863734f2d8f17ee397b474f63821e645166b0adc2f027641c6e8207b"));
var markConversationRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => object({ conversation_id: string().uuid() }).parse(d)).handler(createSsrRpc("b0a248148db69b512d4d0cb439ebcec59e67ec3efb77fb5f14d4e5f49773f739"));
//#endregion
export { respondToConversation as a, upsertSite as c, markConversationRead as i, clearKnowledge as n, seedKnowledge as o, crawlSite as r, setConversationStatus as s, agentReply as t };
