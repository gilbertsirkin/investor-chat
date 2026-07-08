// WolvChat Agent PWA service worker.
// - Enables install (required for iOS notifications).
// - Handles notification click: focus/open dashboard, jump to conversation.
// - Handles push (server → device) if you wire VAPID later. Safe no-op today.

const CACHE = "wolvchat-shell-v1";
const SHELL = ["/", "/dashboard", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for navigations so the dashboard is always fresh; cache fallback if offline.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match(req).then((r) => r || caches.match("/dashboard")))
    );
  }
});

self.addEventListener("push", (event) => {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } catch { payload = { title: "New message", body: event.data ? event.data.text() : "" }; }
  const title = payload.title || "WolvChat";
  const opts = {
    body: payload.body || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: payload.tag || "wolvchat",
    data: { url: payload.url || "/dashboard", conversation_id: payload.conversation_id || null },
    requireInteraction: false,
    vibrate: [80, 40, 80],
  };
  event.waitUntil(self.registration.showNotification(title, opts));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  const target = data.url || "/dashboard";
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of all) {
      if (c.url.includes("/dashboard")) {
        c.focus();
        if (data.conversation_id) c.postMessage({ type: "open_conversation", id: data.conversation_id });
        return;
      }
    }
    await self.clients.openWindow(target);
  })());
});

// Allow the page to trigger notifications through the SW (works on lock screen / iOS PWA).
self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "notify") {
    self.registration.showNotification(data.title || "WolvChat", {
      body: data.body || "",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: data.tag || "wolvchat",
      data: { url: data.url || "/dashboard", conversation_id: data.conversation_id || null },
      vibrate: [80, 40, 80],
    });
  }
});
