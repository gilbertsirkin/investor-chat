import { o as __toESM } from "../_runtime.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { a as respondToConversation } from "./ai.functions-Dhe57SJr.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DstgQAKV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D91hZ-9O.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Capital Chat is a branded, dark-themed chat widget and agent dashboard for wolvcapital.com."
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Capital Chat is a branded, dark-themed chat widget and agent dashboard for wolvcapital.com."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			},
			{
				name: "twitter:title",
				content: "Lovable App"
			},
			{
				name: "twitter:description",
				content: "Capital Chat is a branded, dark-themed chat widget and agent dashboard for wolvcapital.com."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9b5734ab-a76f-4053-88d0-49f35ec1f139/id-preview-60c180a2--709a74e6-c0f8-48c6-8734-0dde68a7ad34.lovable.app-1781706682379.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9b5734ab-a76f-4053-88d0-49f35ec1f139/id-preview-60c180a2--709a74e6-c0f8-48c6-8734-0dde68a7ad34.lovable.app-1781706682379.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/icon-192.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var cors$2 = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Cache-Control": "public, max-age=300",
	"Content-Type": "application/javascript; charset=utf-8"
};
function buildWidgetSource$1(apiBase) {
	return `(function(){
  if (window.__wolvChat) return;
  window.__wolvChat = true;
  var API = ${JSON.stringify(apiBase)};
  var SCRIPT = document.currentScript || (function(){ var s=document.getElementsByTagName('script'); for (var i=s.length-1;i>=0;i--){ if ((s[i].src||'').indexOf('/widget.js')>-1) return s[i]; } return null; })();
  var SITE = (SCRIPT && (SCRIPT.getAttribute('data-site') || SCRIPT.getAttribute('data-site-id'))) || (window.__wolvChatSite) || '';
  var SS_KEY = 'wolv_session_id_' + (SITE || 'default');
  var sid = localStorage.getItem(SS_KEY);
  if (!sid) { sid = 'wv_' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem(SS_KEY, sid); }

  var host = document.createElement('div');
  host.id = 'wolv-chat-root';
  host.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:2147483647;';
  document.body.appendChild(host);
  var root = host.attachShadow({ mode: 'open' });

  var css = \`
    *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
    .bubble{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#0a1628,#1e3a5f);border:2px solid #d4af37;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,.4);transition:transform .2s}
    .bubble:hover{transform:scale(1.06)}
    .bubble svg{width:28px;height:28px;fill:#d4af37}
    .panel{position:absolute;bottom:80px;right:0;width:380px;max-width:calc(100vw - 40px);height:560px;max-height:calc(100vh - 120px);background:#0a1628;border:1px solid #1e3a5f;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden;color:#e5e7eb}
    .panel.open{display:flex}
    .hdr{padding:16px 18px;background:linear-gradient(135deg,#0a1628,#162846);border-bottom:1px solid #1e3a5f;display:flex;align-items:center;gap:12px}
    .hdr .logo{width:36px;height:36px;border-radius:8px;background:#d4af37;display:flex;align-items:center;justify-content:center;font-weight:700;color:#0a1628}
    .hdr .meta{flex:1}
    .hdr .name{font-weight:600;font-size:14px;color:#fff}
    .hdr .sub{font-size:11px;color:#8aa0c0;display:flex;align-items:center;gap:6px}
    .hdr .dot{width:6px;height:6px;border-radius:50%;background:#10b981}
    .hdr .close{background:transparent;border:0;color:#8aa0c0;cursor:pointer;font-size:20px;padding:4px}
    .msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#06101f}
    .msgs::-webkit-scrollbar{width:6px}.msgs::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:3px}
    .m{max-width:80%;padding:10px 14px;border-radius:14px;font-size:13.5px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
    .m.visitor{align-self:flex-end;background:#d4af37;color:#0a1628;border-bottom-right-radius:4px}
    .m.ai,.m.agent{align-self:flex-start;background:#162846;color:#e5e7eb;border-bottom-left-radius:4px;border:1px solid #1e3a5f}
    .m.agent{border-color:#d4af37}
    .m.system{align-self:center;font-size:11px;color:#6b7d99;background:transparent;text-align:center;padding:4px 8px}
    .typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:#162846;border-radius:14px;border:1px solid #1e3a5f}
    .typing span{width:6px;height:6px;border-radius:50%;background:#8aa0c0;animation:tp 1.2s infinite}
    .typing span:nth-child(2){animation-delay:.2s}.typing span:nth-child(3){animation-delay:.4s}
    @keyframes tp{0%,60%,100%{opacity:.3}30%{opacity:1}}
    .frm{padding:12px;border-top:1px solid #1e3a5f;background:#0a1628}
    .row{display:flex;gap:8px}
    .ipt{flex:1;background:#162846;border:1px solid #1e3a5f;border-radius:10px;padding:10px 12px;color:#fff;font-size:13px;outline:none;font-family:inherit;resize:none;max-height:100px}
    .ipt:focus{border-color:#d4af37}
    .btn{background:#d4af37;color:#0a1628;border:0;border-radius:10px;padding:0 14px;font-weight:600;cursor:pointer;font-size:13px}
    .btn:disabled{opacity:.5;cursor:not-allowed}
    .attach{background:#162846;border:1px solid #1e3a5f;color:#d4af37;border-radius:10px;width:38px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center}
    .attach:disabled{opacity:.5;cursor:wait}
    .m img{max-width:100%;border-radius:8px;margin-top:4px;display:block}
    .m a{color:inherit;text-decoration:underline;word-break:break-all}
    .actions{display:flex;justify-content:center;padding:8px 0 0}
    .lnk{background:transparent;border:0;color:#8aa0c0;font-size:11px;cursor:pointer;text-decoration:underline}
    .intro{padding:24px;text-align:center;color:#8aa0c0;font-size:13px}
    .intro h3{color:#d4af37;margin:0 0 8px;font-size:16px}
    .field{display:block;margin-top:8px;width:100%;background:#162846;border:1px solid #1e3a5f;border-radius:8px;padding:8px 10px;color:#fff;font-size:13px;outline:none}
  \`;
  var style = document.createElement('style'); style.textContent = css; root.appendChild(style);

  var html = '<button class="bubble" id="bub" aria-label="Open chat"><svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></button>'
    + '<div class="panel" id="pnl">'
    + '<div class="hdr"><div class="logo">W</div><div class="meta"><div class="name">WolvCapital Support</div><div class="sub"><span class="dot"></span>Typically replies instantly</div></div><button class="close" id="cls">×</button></div>'
    + '<div class="msgs" id="msgs"></div>'
    + '<div class="frm">'
    + '<div class="row"><button class="attach" id="atc" title="Attach a file" aria-label="Attach">📎</button><input type="file" id="fi" style="display:none" accept="image/*,application/pdf,.doc,.docx,.txt,.csv,.xlsx" /><textarea class="ipt" id="ipt" rows="1" placeholder="Ask about investments, fees, returns..."></textarea><button class="btn" id="snd">Send</button></div>'
    + '<div class="actions"><button class="lnk" id="hum">Talk to a human</button></div>'
    + '</div></div>';

  var wrap = document.createElement('div'); wrap.innerHTML = html; root.appendChild(wrap);

  var bub = root.getElementById('bub'), pnl = root.getElementById('pnl'), cls = root.getElementById('cls');
  var msgs = root.getElementById('msgs'), ipt = root.getElementById('ipt'), snd = root.getElementById('snd'), hum = root.getElementById('hum');
  var atc = root.getElementById('atc'), fi = root.getElementById('fi');

  var state = { visitor: null, conversation: null, sb: null, channel: null, opened: false };

  // Very small markdown-ish renderer for image/link syntax; escapes everything else.
  function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function renderContent(text){
    // ![alt](url) or [label](url) — only http(s) urls
    var out = esc(text);
    out = out.replace(/!\\[([^\\]]*)\\]\\((https?:[^)\\s]+)\\)/g, function(_,a,u){ return '<img alt="'+esc(a)+'" src="'+esc(u)+'"/>'; });
    out = out.replace(/\\[([^\\]]+)\\]\\((https?:[^)\\s]+)\\)/g, function(_,l,u){ return '<a href="'+esc(u)+'" target="_blank" rel="noopener">'+esc(l)+'</a>'; });
    return out.replace(/\\n/g,'<br>');
  }
  function el(role, content, id) {
    var d = document.createElement('div');
    d.className = 'm ' + role;
    if (id) d.dataset.id = id;
    d.dataset.sig = role + '|' + content;
    d.innerHTML = renderContent(content);
    return d;
  }
  function render(list) {
    msgs.innerHTML = '';
    list.forEach(function(m){ msgs.appendChild(el(m.role, m.content, m.id)); });
    msgs.scrollTop = msgs.scrollHeight;
  }
  function append(m) {
    var isTmp = typeof m.id === 'string' && m.id.indexOf('tmp_') === 0;
    // Dedup 1: same real id already rendered.
    if (!isTmp) {
      var byId = msgs.querySelector('.m[data-id="' + String(m.id).replace(/"/g,'\\"') + '"]');
      if (byId) return;
    }
    // Dedup 2: incoming real row replaces our optimistic tmp with same role+content.
    if (!isTmp) {
      var sig = m.role + '|' + m.content;
      var tmp = Array.from(msgs.querySelectorAll('.m[data-id^="tmp_"]')).find(function(n){ return n.dataset.sig === sig; });
      if (tmp) {
        tmp.dataset.id = m.id;
        return;
      }
    }
    msgs.appendChild(el(m.role, m.content, m.id));
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping(on){
    var t = root.getElementById('typing');
    if (on && !t){
      t = document.createElement('div'); t.id='typing'; t.className='typing';
      t.innerHTML = '<span style="font-size:11px;color:#8aa0c0;margin-right:6px">Sarah is typing</span><span></span><span></span><span></span>';
      msgs.appendChild(t); msgs.scrollTop=msgs.scrollHeight;
    } else if (!on && t) t.remove();
  }

  function renderChips(items){
    var old = root.getElementById('chips'); if (old) old.remove();
    var c = document.createElement('div'); c.id='chips';
    c.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;padding:8px 4px 4px';
    items.forEach(function(label){
      var b = document.createElement('button');
      b.type='button';
      b.style.cssText = 'background:#162846;border:1px solid #1e3a5f;color:#d4af37;font-size:12px;padding:6px 12px;border-radius:14px;cursor:pointer;font-family:inherit';
      b.textContent = label;
      b.addEventListener('click', function(){ c.remove(); if (label === 'Talk to a human') { hum.click(); } else { ipt.value = label; send(); } });
      c.appendChild(b);
    });
    msgs.appendChild(c);
    msgs.scrollTop = msgs.scrollHeight;
  }

  async function api(payload) {
    var r = await fetch(API + '/api/public/widget', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload) });
    return r.json();
  }

  async function init() {
    var res = await api({ action:'init', session_id: sid, site: SITE, current_page: location.href, referrer: document.referrer });
    if (res && res.conversation) {
      state.visitor = res.visitor; state.conversation = res.conversation;
      var h = await api({ action:'history', conversation_id: res.conversation.id });
      render(h.messages || []);
      if (!h.messages || h.messages.length === 0) {
        append({ id:'welcome', role:'ai', content:"Hi 👋 I'm Sarah from WolvCapital Support. I can help you with our investment strategies, minimums, fees, or getting started — what's on your mind?" });
        renderChips(['How do I get started?','What are your fees?','Minimum investment?','Talk to a human']);
      }
      subscribeRealtime(res.supabase, res.conversation.id);
    }
  }


  function subscribeRealtime(cfg, convId) {
    // Production-grade Supabase realtime channel:
    //  - exponential backoff (1s → 30s) with jitter
    //  - heartbeat timeout detection (server pong within 30s or we reconnect)
    //  - resume on tab focus / network online
    //  - replay message history after every reconnect so nothing is lost
    var wsUrl = cfg.url.replace(/^https/, 'wss') + '/realtime/v1/websocket?apikey=' + encodeURIComponent(cfg.anon) + '&vsn=1.0.0';
    var attempts = 0, ws = null, hbTimer = null, hbWatchdog = null, closed = false, ref = 0, lastMsgId = null;

    function scheduleReconnect(){
      if (closed) return;
      cleanup();
      attempts = Math.min(attempts + 1, 6);
      var base = Math.min(30000, 1000 * Math.pow(2, attempts - 1));
      var delay = base * (0.5 + Math.random() * 0.5); // 50-100% jitter
      setTimeout(connect, delay);
    }
    function cleanup(){
      if (hbTimer) { clearInterval(hbTimer); hbTimer = null; }
      if (hbWatchdog) { clearTimeout(hbWatchdog); hbWatchdog = null; }
      if (ws) { try { ws.onclose = null; ws.close(); } catch(e){} ws = null; }
    }
    function armWatchdog(){
      if (hbWatchdog) clearTimeout(hbWatchdog);
      hbWatchdog = setTimeout(function(){ try{ ws && ws.close(); }catch(e){} scheduleReconnect(); }, 30000);
    }
    async function replayHistory(){
      if (!state.conversation) return;
      try {
        var h = await api({ action:'history', conversation_id: state.conversation.id });
        (h.messages || []).forEach(function(m){
          if (lastMsgId && m.id <= lastMsgId) return;
          append({ id: m.id, role: m.role, content: m.content });
        });
        var msgs = (h.messages || []);
        if (msgs.length) lastMsgId = msgs[msgs.length - 1].id;
      } catch(e){}
    }
    function connect(){
      if (closed) return;
      try { ws = new WebSocket(wsUrl); } catch(e){ return scheduleReconnect(); }
      ws.onopen = function(){
        attempts = 0;
        ws.send(JSON.stringify({
          topic: 'realtime:public:messages:conversation_id=eq.' + convId,
          event: 'phx_join',
          payload: { config: { postgres_changes: [{ event: 'INSERT', schema:'public', table:'messages', filter:'conversation_id=eq.'+convId }] } },
          ref: String(++ref)
        }));
        armWatchdog();
        hbTimer = setInterval(function(){
          try { ws.send(JSON.stringify({ topic:'phoenix', event:'heartbeat', payload:{}, ref:String(++ref)})); } catch(e){}
        }, 25000);
        replayHistory();
      };
      ws.onmessage = function(ev){
        armWatchdog();
        try {
          var data = JSON.parse(ev.data);
          if (data.event === 'postgres_changes' && data.payload && data.payload.data && data.payload.data.record) {
            var rec = data.payload.data.record;
            lastMsgId = rec.id;
            showTyping(false);
            append({ id: rec.id, role: rec.role, content: rec.content });
          }
        } catch(e){}
      };
      ws.onerror = function(){ /* onclose will fire next */ };
      ws.onclose = function(){ scheduleReconnect(); };
    }
    function resume(){ if (!ws || ws.readyState > 1) { attempts = 0; scheduleReconnect(); } else { replayHistory(); } }
    document.addEventListener('visibilitychange', function(){ if (document.visibilityState === 'visible') resume(); });
    window.addEventListener('online', resume);
    window.addEventListener('beforeunload', function(){ closed = true; cleanup(); });
    connect();
    state.rt = { close: function(){ closed = true; cleanup(); } };
  }


  async function send() {
    var v = ipt.value.trim(); if (!v || !state.conversation) return;
    ipt.value = ''; ipt.style.height='auto';
    append({ id: 'tmp_'+Date.now(), role:'visitor', content: v });
    showTyping(true);
    await api({ action:'send', conversation_id: state.conversation.id, content: v });
  }

  bub.addEventListener('click', function(){
    pnl.classList.add('open');
    if (!state.opened) { state.opened = true; init(); }
    setTimeout(function(){ ipt.focus(); }, 100);
  });
  cls.addEventListener('click', function(){ pnl.classList.remove('open'); });
  snd.addEventListener('click', send);
  ipt.addEventListener('keydown', function(e){ if (e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); }});
  ipt.addEventListener('input', function(){ ipt.style.height='auto'; ipt.style.height=Math.min(ipt.scrollHeight,100)+'px'; });
  hum.addEventListener('click', async function(){
    if (!state.conversation) return;
    await api({ action:'human', conversation_id: state.conversation.id });
  });
  atc.addEventListener('click', function(){ if (state.conversation) fi.click(); });
  fi.addEventListener('change', async function(){
    var f = fi.files && fi.files[0]; fi.value = '';
    if (!f || !state.conversation) return;
    if (f.size > 10 * 1024 * 1024) { append({ id:'err_'+Date.now(), role:'system', content:'File too large (10MB max)' }); return; }
    atc.disabled = true;
    try {
      var sig = await api({ action:'sign_upload', conversation_id: state.conversation.id, filename: f.name, content_type: f.type, size: f.size });
      if (!sig || !sig.upload_url) throw new Error(sig && sig.error || 'sign failed');
      var up = await fetch(sig.upload_url, { method:'PUT', headers:{ 'content-type': f.type || 'application/octet-stream' }, body: f });
      if (!up.ok) throw new Error('upload failed');
      var isImg = /^image\\//.test(f.type);
      var md = (isImg ? '!' : '') + '[' + f.name + '](' + sig.read_url + ')';
      append({ id: 'tmp_'+Date.now(), role:'visitor', content: md });
      await api({ action:'send', conversation_id: state.conversation.id, content: md });
    } catch(e){
      append({ id:'err_'+Date.now(), role:'system', content:'Upload failed: ' + (e && e.message || e) });
    } finally { atc.disabled = false; }
  });


  // Page tracking on SPA navigation
  var lastUrl = location.href;
  function track(){
    if (location.href === lastUrl) return;
    lastUrl = location.href;
    api({ action:'track', session_id: sid, current_page: location.href, title: document.title, referrer: document.referrer });
  }
  var _ps = history.pushState, _rs = history.replaceState;
  history.pushState = function(){ _ps.apply(this, arguments); setTimeout(track, 50); };
  history.replaceState = function(){ _rs.apply(this, arguments); setTimeout(track, 50); };
  window.addEventListener('popstate', track);
  // Initial fire-and-forget so visitor is registered before opening
  api({ action:'init', session_id: sid, site: SITE, current_page: location.href, referrer: document.referrer });
})();`;
}
var Route$6 = createFileRoute("/widget.js")({ server: { handlers: {
	OPTIONS: async () => new Response(null, {
		status: 204,
		headers: cors$2
	}),
	GET: async ({ request }) => {
		const origin = new URL(request.url).origin;
		return new Response(buildWidgetSource$1(origin), { headers: cors$2 });
	}
} } });
var $$splitComponentImporter$3 = () => import("./knowledge-DUcja-LM.mjs");
var Route$5 = createFileRoute("/knowledge")({
	head: () => ({ meta: [{ title: "Knowledge Base — WolvCapital" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./dashboard-D_Lc3vDi.mjs");
var Route$4 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Agent Dashboard — WolvCapital" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./auth-BOTneQDb.mjs");
var Route$3 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Agent Sign In — WolvCapital Chat" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-CXLlCrdY.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "WolvCapital Live Chat — Branded AI chat widget for wolvcapital.com" }, {
		name: "description",
		content: "Dark-themed AI chat widget with agent dashboard, realtime visitor tracking, and investor Q&A for WolvCapital."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var cors$1 = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "content-type, authorization",
	"Access-Control-Max-Age": "86400",
	"Cache-Control": "public, max-age=300",
	"Content-Type": "application/javascript; charset=utf-8"
};
function buildWidgetSource(apiBase) {
	return `(function(){
  if (window.__wolvChat) return;
  window.__wolvChat = true;
  var API = ${JSON.stringify(apiBase)};
  var SCRIPT = document.currentScript || (function(){ var s=document.getElementsByTagName('script'); for (var i=s.length-1;i>=0;i--){ if ((s[i].src||'').indexOf('/widget.js')>-1) return s[i]; } return null; })();
  var SITE = (SCRIPT && (SCRIPT.getAttribute('data-site') || SCRIPT.getAttribute('data-site-id'))) || (window.__wolvChatSite) || '';
  var SS_KEY = 'wolv_session_id_' + (SITE || 'default');
  var sid = localStorage.getItem(SS_KEY);
  if (!sid) { sid = 'wv_' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem(SS_KEY, sid); }

  var host = document.createElement('div');
  host.id = 'wolv-chat-root';
  host.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:2147483647;';
  document.body.appendChild(host);
  var root = host.attachShadow({ mode: 'open' });

  var css = \`
    *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
    .bubble{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#0a1628,#1e3a5f);border:2px solid #d4af37;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,.4);transition:transform .2s}
    .bubble:hover{transform:scale(1.06)}
    .bubble svg{width:28px;height:28px;fill:#d4af37}
    .panel{position:absolute;bottom:80px;right:0;width:380px;max-width:calc(100vw - 40px);height:560px;max-height:calc(100vh - 120px);background:#0a1628;border:1px solid #1e3a5f;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden;color:#e5e7eb}
    .panel.open{display:flex}
    .hdr{padding:16px 18px;background:linear-gradient(135deg,#0a1628,#162846);border-bottom:1px solid #1e3a5f;display:flex;align-items:center;gap:12px}
    .hdr .logo{width:36px;height:36px;border-radius:8px;background:#d4af37;display:flex;align-items:center;justify-content:center;font-weight:700;color:#0a1628}
    .hdr .meta{flex:1}
    .hdr .name{font-weight:600;font-size:14px;color:#fff}
    .hdr .sub{font-size:11px;color:#8aa0c0;display:flex;align-items:center;gap:6px}
    .hdr .dot{width:6px;height:6px;border-radius:50%;background:#10b981}
    .hdr .close{background:transparent;border:0;color:#8aa0c0;cursor:pointer;font-size:20px;padding:4px}
    .msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#06101f}
    .msgs::-webkit-scrollbar{width:6px}.msgs::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:3px}
    .m{max-width:80%;padding:10px 14px;border-radius:14px;font-size:13.5px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
    .m.visitor{align-self:flex-end;background:#d4af37;color:#0a1628;border-bottom-right-radius:4px}
    .m.ai,.m.agent{align-self:flex-start;background:#162846;color:#e5e7eb;border-bottom-left-radius:4px;border:1px solid #1e3a5f}
    .m.agent{border-color:#d4af37}
    .m.system{align-self:center;font-size:11px;color:#6b7d99;background:transparent;text-align:center;padding:4px 8px}
    .typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:#162846;border-radius:14px;border:1px solid #1e3a5f}
    .typing span{width:6px;height:6px;border-radius:50%;background:#8aa0c0;animation:tp 1.2s infinite}
    .typing span:nth-child(2){animation-delay:.2s}.typing span:nth-child(3){animation-delay:.4s}
    @keyframes tp{0%,60%,100%{opacity:.3}30%{opacity:1}}
    .frm{padding:12px;border-top:1px solid #1e3a5f;background:#0a1628}
    .row{display:flex;gap:8px}
    .ipt{flex:1;background:#162846;border:1px solid #1e3a5f;border-radius:10px;padding:10px 12px;color:#fff;font-size:13px;outline:none;font-family:inherit;resize:none;max-height:100px}
    .ipt:focus{border-color:#d4af37}
    .btn{background:#d4af37;color:#0a1628;border:0;border-radius:10px;padding:0 14px;font-weight:600;cursor:pointer;font-size:13px}
    .btn:disabled{opacity:.5;cursor:not-allowed}
    .attach{background:#162846;border:1px solid #1e3a5f;color:#d4af37;border-radius:10px;width:38px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center}
    .attach:disabled{opacity:.5;cursor:wait}
    .m img{max-width:100%;border-radius:8px;margin-top:4px;display:block}
    .m a{color:inherit;text-decoration:underline;word-break:break-all}
    .actions{display:flex;justify-content:center;padding:8px 0 0}
    .lnk{background:transparent;border:0;color:#8aa0c0;font-size:11px;cursor:pointer;text-decoration:underline}
    .intro{padding:24px;text-align:center;color:#8aa0c0;font-size:13px}
    .intro h3{color:#d4af37;margin:0 0 8px;font-size:16px}
    .field{display:block;margin-top:8px;width:100%;background:#162846;border:1px solid #1e3a5f;border-radius:8px;padding:8px 10px;color:#fff;font-size:13px;outline:none}
  \`;
  var style = document.createElement('style'); style.textContent = css; root.appendChild(style);

  var html = '<button class="bubble" id="bub" aria-label="Open chat"><svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></button>'
    + '<div class="panel" id="pnl">'
    + '<div class="hdr"><div class="logo">W</div><div class="meta"><div class="name">WolvCapital Support</div><div class="sub"><span class="dot"></span>Typically replies instantly</div></div><button class="close" id="cls">×</button></div>'
    + '<div class="msgs" id="msgs"></div>'
    + '<div class="frm">'
    + '<div class="row"><button class="attach" id="atc" title="Attach a file" aria-label="Attach">📎</button><input type="file" id="fi" style="display:none" accept="image/*,application/pdf,.doc,.docx,.txt,.csv,.xlsx" /><textarea class="ipt" id="ipt" rows="1" placeholder="Ask about investments, fees, returns..."></textarea><button class="btn" id="snd">Send</button></div>'
    + '<div class="actions"><button class="lnk" id="hum">Talk to a human</button></div>'
    + '</div></div>';

  var wrap = document.createElement('div'); wrap.innerHTML = html; root.appendChild(wrap);

  var bub = root.getElementById('bub'), pnl = root.getElementById('pnl'), cls = root.getElementById('cls');
  var msgs = root.getElementById('msgs'), ipt = root.getElementById('ipt'), snd = root.getElementById('snd'), hum = root.getElementById('hum');
  var atc = root.getElementById('atc'), fi = root.getElementById('fi');

  var state = { visitor: null, conversation: null, sb: null, channel: null, opened: false };

  // Very small markdown-ish renderer for image/link syntax; escapes everything else.
  function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function renderContent(text){
    // ![alt](url) or [label](url) — only http(s) urls
    var out = esc(text);
    out = out.replace(/!\\[([^\\]]*)\\]\\((https?:[^)\\s]+)\\)/g, function(_,a,u){ return '<img alt="'+esc(a)+'" src="'+esc(u)+'"/>'; });
    out = out.replace(/\\[([^\\]]+)\\]\\((https?:[^)\\s]+)\\)/g, function(_,l,u){ return '<a href="'+esc(u)+'" target="_blank" rel="noopener">'+esc(l)+'</a>'; });
    return out.replace(/\\n/g,'<br>');
  }
  function el(role, content) {
    var d = document.createElement('div');
    d.className = 'm ' + role;
    d.innerHTML = renderContent(content);
    return d;
  }
  function render(list) {
    msgs.innerHTML = '';
    list.forEach(function(m){ msgs.appendChild(el(m.role, m.content)); });
    msgs.scrollTop = msgs.scrollHeight;
  }
  function append(m) {
    var existing = Array.from(msgs.querySelectorAll('.m')).find(function(n){ return n.dataset && n.dataset.id === m.id; });
    if (existing) return;
    var d = el(m.role, m.content);
    d.dataset.id = m.id;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping(on){
    var t = root.getElementById('typing');
    if (on && !t){ t = document.createElement('div'); t.id='typing'; t.className='typing'; t.innerHTML='<span></span><span></span><span></span>'; msgs.appendChild(t); msgs.scrollTop=msgs.scrollHeight; }
    else if (!on && t) t.remove();
  }

  async function api(payload) {
    var r = await fetch(API + '/api/public/widget', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload) });
    return r.json();
  }

  async function init() {
    var res = await api({ action:'init', session_id: sid, site: SITE, current_page: location.href, referrer: document.referrer });
    if (res && res.conversation) {
      state.visitor = res.visitor; state.conversation = res.conversation;
      var h = await api({ action:'history', conversation_id: res.conversation.id });
      render(h.messages || []);
      if (!h.messages || h.messages.length === 0) {
        append({ id:'welcome', role:'ai', content:"Welcome to WolvCapital. I'm your AI assistant — ask me anything about our investment strategies, fees, or how to get started." });
      }
      subscribeRealtime(res.supabase, res.conversation.id);
    }
  }

  function subscribeRealtime(cfg, convId) {
    // Production-grade Supabase realtime channel:
    //  - exponential backoff (1s → 30s) with jitter
    //  - heartbeat timeout detection (server pong within 30s or we reconnect)
    //  - resume on tab focus / network online
    //  - replay message history after every reconnect so nothing is lost
    var wsUrl = cfg.url.replace(/^https/, 'wss') + '/realtime/v1/websocket?apikey=' + encodeURIComponent(cfg.anon) + '&vsn=1.0.0';
    var attempts = 0, ws = null, hbTimer = null, hbWatchdog = null, closed = false, ref = 0, lastMsgId = null;

    function scheduleReconnect(){
      if (closed) return;
      cleanup();
      attempts = Math.min(attempts + 1, 6);
      var base = Math.min(30000, 1000 * Math.pow(2, attempts - 1));
      var delay = base * (0.5 + Math.random() * 0.5); // 50-100% jitter
      setTimeout(connect, delay);
    }
    function cleanup(){
      if (hbTimer) { clearInterval(hbTimer); hbTimer = null; }
      if (hbWatchdog) { clearTimeout(hbWatchdog); hbWatchdog = null; }
      if (ws) { try { ws.onclose = null; ws.close(); } catch(e){} ws = null; }
    }
    function armWatchdog(){
      if (hbWatchdog) clearTimeout(hbWatchdog);
      hbWatchdog = setTimeout(function(){ try{ ws && ws.close(); }catch(e){} scheduleReconnect(); }, 30000);
    }
    async function replayHistory(){
      if (!state.conversation) return;
      try {
        var h = await api({ action:'history', conversation_id: state.conversation.id });
        (h.messages || []).forEach(function(m){
          if (lastMsgId && m.id <= lastMsgId) return;
          append({ id: m.id, role: m.role, content: m.content });
        });
        var msgs = (h.messages || []);
        if (msgs.length) lastMsgId = msgs[msgs.length - 1].id;
      } catch(e){}
    }
    function connect(){
      if (closed) return;
      try { ws = new WebSocket(wsUrl); } catch(e){ return scheduleReconnect(); }
      ws.onopen = function(){
        attempts = 0;
        ws.send(JSON.stringify({
          topic: 'realtime:public:messages:conversation_id=eq.' + convId,
          event: 'phx_join',
          payload: { config: { postgres_changes: [{ event: 'INSERT', schema:'public', table:'messages', filter:'conversation_id=eq.'+convId }] } },
          ref: String(++ref)
        }));
        armWatchdog();
        hbTimer = setInterval(function(){
          try { ws.send(JSON.stringify({ topic:'phoenix', event:'heartbeat', payload:{}, ref:String(++ref)})); } catch(e){}
        }, 25000);
        replayHistory();
      };
      ws.onmessage = function(ev){
        armWatchdog();
        try {
          var data = JSON.parse(ev.data);
          if (data.event === 'postgres_changes' && data.payload && data.payload.data && data.payload.data.record) {
            var rec = data.payload.data.record;
            lastMsgId = rec.id;
            showTyping(false);
            append({ id: rec.id, role: rec.role, content: rec.content });
          }
        } catch(e){}
      };
      ws.onerror = function(){ /* onclose will fire next */ };
      ws.onclose = function(){ scheduleReconnect(); };
    }
    function resume(){ if (!ws || ws.readyState > 1) { attempts = 0; scheduleReconnect(); } else { replayHistory(); } }
    document.addEventListener('visibilitychange', function(){ if (document.visibilityState === 'visible') resume(); });
    window.addEventListener('online', resume);
    window.addEventListener('beforeunload', function(){ closed = true; cleanup(); });
    connect();
    state.rt = { close: function(){ closed = true; cleanup(); } };
  }


  async function send() {
    var v = ipt.value.trim(); if (!v || !state.conversation || state.sending) return;
    state.sending = true;
    snd.disabled = true;
    ipt.value = ''; ipt.style.height='auto';
    append({ id: 'tmp_'+Date.now(), role:'visitor', content: v });
    showTyping(true);
    try { await api({ action:'send', conversation_id: state.conversation.id, content: v }); }
    finally { state.sending = false; snd.disabled = false; }
  }

  bub.addEventListener('click', function(){
    pnl.classList.add('open');
    if (!state.opened) { state.opened = true; init(); }
    setTimeout(function(){ ipt.focus(); }, 100);
  });
  cls.addEventListener('click', function(){ pnl.classList.remove('open'); });
  snd.addEventListener('click', send);
  ipt.addEventListener('keydown', function(e){ if (e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); }});
  ipt.addEventListener('input', function(){ ipt.style.height='auto'; ipt.style.height=Math.min(ipt.scrollHeight,100)+'px'; });
  hum.addEventListener('click', async function(){
    if (!state.conversation) return;
    await api({ action:'human', conversation_id: state.conversation.id });
  });
  atc.addEventListener('click', function(){ if (state.conversation) fi.click(); });
  fi.addEventListener('change', async function(){
    var f = fi.files && fi.files[0]; fi.value = '';
    if (!f || !state.conversation) return;
    if (f.size > 10 * 1024 * 1024) { append({ id:'err_'+Date.now(), role:'system', content:'File too large (10MB max)' }); return; }
    atc.disabled = true;
    try {
      var sig = await api({ action:'sign_upload', conversation_id: state.conversation.id, filename: f.name, content_type: f.type, size: f.size });
      if (!sig || !sig.upload_url) throw new Error(sig && sig.error || 'sign failed');
      var up = await fetch(sig.upload_url, { method:'PUT', headers:{ 'content-type': f.type || 'application/octet-stream' }, body: f });
      if (!up.ok) throw new Error('upload failed');
      var isImg = /^image\\//.test(f.type);
      var md = (isImg ? '!' : '') + '[' + f.name + '](' + sig.read_url + ')';
      append({ id: 'tmp_'+Date.now(), role:'visitor', content: md });
      await api({ action:'send', conversation_id: state.conversation.id, content: md });
    } catch(e){
      append({ id:'err_'+Date.now(), role:'system', content:'Upload failed: ' + (e && e.message || e) });
    } finally { atc.disabled = false; }
  });


  // Page tracking on SPA navigation
  var lastUrl = location.href;
  function track(){
    if (location.href === lastUrl) return;
    lastUrl = location.href;
    api({ action:'track', session_id: sid, current_page: location.href, title: document.title, referrer: document.referrer });
  }
  var _ps = history.pushState, _rs = history.replaceState;
  history.pushState = function(){ _ps.apply(this, arguments); setTimeout(track, 50); };
  history.replaceState = function(){ _rs.apply(this, arguments); setTimeout(track, 50); };
  window.addEventListener('popstate', track);
  // Initial fire-and-forget so visitor is registered before opening
  api({ action:'init', session_id: sid, site: SITE, current_page: location.href, referrer: document.referrer });
})();`;
}
var Route$1 = createFileRoute("/api/public/widget")({ server: { handlers: {
	OPTIONS: async () => new Response(null, {
		status: 204,
		headers: cors$1
	}),
	GET: async ({ request }) => {
		const origin = new URL(request.url).origin;
		return new Response(buildWidgetSource(origin), { headers: cors$1 });
	}
} } });
var cors = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "content-type"
};
var Route = createFileRoute("/api/public/respond")({ server: { handlers: {
	OPTIONS: async () => new Response(null, {
		status: 204,
		headers: cors
	}),
	POST: async ({ request }) => {
		try {
			const { conversation_id } = await request.json();
			const r = await respondToConversation({ data: { conversation_id } });
			return Response.json(r, { headers: cors });
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			console.error("respond error", msg);
			return Response.json({ error: msg }, {
				status: 500,
				headers: cors
			});
		}
	}
} } });
var WidgetDotjsRoute = Route$6.update({
	id: "/widget.js",
	path: "/widget.js",
	getParentRoute: () => Route$7
});
var KnowledgeRoute = Route$5.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => Route$7
});
var DashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$7
});
var AuthRoute = Route$3.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$7
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var ApiPublicWidgetRoute = Route$1.update({
	id: "/api/public/widget",
	path: "/api/public/widget",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute,
	AuthRoute,
	DashboardRoute,
	KnowledgeRoute,
	WidgetDotjsRoute,
	ApiPublicRespondRoute: Route.update({
		id: "/api/public/respond",
		path: "/api/public/respond",
		getParentRoute: () => Route$7
	}),
	ApiPublicWidgetRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
