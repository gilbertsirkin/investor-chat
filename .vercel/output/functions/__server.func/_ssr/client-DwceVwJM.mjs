import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-DwceVwJM.js
function createSupabaseClient() {
	return createClient("https://wjakfxtggekvpuhwwuis.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqYWtmeHRnZ2VrdnB1aHd3dWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzODE4ODgsImV4cCI6MjA5ODk1Nzg4OH0.WIaZrzHZhtp9kpL1C2zDMQvOLXCQXutx7ZMcmSdifis", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
