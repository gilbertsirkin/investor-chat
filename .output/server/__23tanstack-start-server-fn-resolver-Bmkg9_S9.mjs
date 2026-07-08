//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Bmkg9_S9.js
var manifest = {
	"35a5bc0f2fb0b62bb4e7734a2bfb6824a9ea87547393c3a37fd46785ef539297": {
		functionName: "upsertSite_createServerFn_handler",
		importer: () => import("./_ssr/ai.functions-eq5mIbCr.mjs")
	},
	"5b4308a5ca6ebff7f9aa3e3ff58814a4697feee481218a8c7b8f4b39d03bccb6": {
		functionName: "clearKnowledge_createServerFn_handler",
		importer: () => import("./_ssr/ai.functions-eq5mIbCr.mjs")
	},
	"65b27419863734f2d8f17ee397b474f63821e645166b0adc2f027641c6e8207b": {
		functionName: "setConversationStatus_createServerFn_handler",
		importer: () => import("./_ssr/ai.functions-eq5mIbCr.mjs")
	},
	"9b99c27c74f40973c6b26afb4cdde82bfec35e994786d479c0986d49e3f22c70": {
		functionName: "agentReply_createServerFn_handler",
		importer: () => import("./_ssr/ai.functions-eq5mIbCr.mjs")
	},
	"9c0f96a3d615f6cdcbf993812f85acac0db5efc2a7ed549ef5a94d9e1adc0ff7": {
		functionName: "crawlSite_createServerFn_handler",
		importer: () => import("./_ssr/ai.functions-eq5mIbCr.mjs")
	},
	"a0213a582d3b3cdecd783d13d24115a8853bb0e1ecfbae0e6e08461fc9e1488f": {
		functionName: "seedKnowledge_createServerFn_handler",
		importer: () => import("./_ssr/ai.functions-eq5mIbCr.mjs")
	},
	"b0a248148db69b512d4d0cb439ebcec59e67ec3efb77fb5f14d4e5f49773f739": {
		functionName: "markConversationRead_createServerFn_handler",
		importer: () => import("./_ssr/ai.functions-eq5mIbCr.mjs")
	},
	"f8b64b6969ef1f5565e2adfd8471f8750925f62c842558eeca81d2006f283d4a": {
		functionName: "respondToConversation_createServerFn_handler",
		importer: () => import("./_ssr/ai.functions-eq5mIbCr.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
