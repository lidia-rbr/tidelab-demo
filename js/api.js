const KEY = "tidelab-real-ui-demo-v1";

function isoWeekStart(weekId) {
  const [, yearText, weekText] = String(weekId).match(/^(\d{4})-W(\d{2})$/) || [];
  const year = Number(yearText) || new Date().getFullYear();
  const week = Number(weekText) || 1;
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() + 1 - (jan4.getUTCDay() || 7) + (week - 1) * 7);
  monday.setUTCHours(0, 0, 0, 0);
  return monday;
}

function dateInWeek(weekId, day, hour, minute = 0) {
  const date = isoWeekStart(weekId);
  date.setUTCDate(date.getUTCDate() + day);
  date.setUTCHours(hour, minute, 0, 0);
  return date;
}

function defaultState() {
  return {
    business: { id: "ocean-waves", name: "Ocean Waves Surf School", slogan: "Ride more. Live more.", description: "Friendly surf coaching for every level in Ericeira.", logoDataUrl: "", subscription: { plan: "pro", status: "active" } },
    member: { id: "john", userId: "demo-john", name: "John Doe", email: "john.doe@tidelab.demo", role: "owner", status: "active" },
    clients: [
      ["jane","Jane","Doe","jane.doe@example.com","+351 910 234 561","PT"], ["emma","Emma","Smith","emma@example.com","+351 912 331 883","GB"], ["lucas","Lucas","Martin","lucas@example.com","+33 612 887 321","FR"], ["sofia","Sofia","Costa","sofia@example.com","+351 934 118 492","PT"], ["noah","Noah","Williams","noah@example.com","+44 7700 900321","GB"], ["mia","Mia","Muller","mia@example.com","+49 151 234 881","DE"]
    ].map(([id, firstName, lastName, email, phone, country]) => ({ id, firstName, lastName, fullName: `${firstName} ${lastName}`, email, phone, country, canBook: true, status: "active", createdAt: new Date(Date.now() - 86400000 * 80).toISOString() })),
    packs: [
      { id: "pack-5", name: "Discovery Pack", type: "credits", classCount: 5, price: 95, details: "Five group classes", status: "active" },
      { id: "pack-10", name: "Wave Rider 10", type: "credits", classCount: 10, price: 175, details: "Ten flexible group classes", status: "active" },
      { id: "monthly", name: "Unlimited Month", type: "monthly", classCount: 30, price: 249, details: "Unlimited surfing for one month", status: "active" }
    ],
    clientPacks: [
      { id: "cp-jane", clientId: "jane", clientName: "Jane Doe", packTemplateId: "pack-10", packTemplateName: "Wave Rider 10", type: "credits", price: 175, totalClasses: 10, usedClasses: 4, remainingClasses: 6, status: "active", purchasedAt: new Date(Date.now() - 86400000 * 30).toISOString() },
      { id: "cp-emma", clientId: "emma", clientName: "Emma Smith", packTemplateId: "monthly", packTemplateName: "Unlimited Month", type: "monthly", price: 249, totalClasses: 30, usedClasses: 11, remainingClasses: 19, status: "active", purchasedAt: new Date(Date.now() - 86400000 * 18).toISOString() }
    ],
    bookings: [],
    weeks: {},
    classTemplates: [
      { id: "beginner", name: "Beginner Surf", coachName: "John", language: "EN", durationMinutes: 90, capacity: 8, color: "#1f8f46", status: "active" },
      { id: "sunrise", name: "Sunrise Session", coachName: "Maya", language: "EN", durationMinutes: 60, capacity: 10, color: "#ff5e32", status: "active" },
      { id: "intermediate", name: "Intermediate Surf", coachName: "Leo", language: "PT", durationMinutes: 90, capacity: 8, color: "#2f80ed", status: "active" }
    ]
  };
}

function load() {
  try { return JSON.parse(sessionStorage.getItem(KEY)) || defaultState(); } catch { return defaultState(); }
}

let state = load();
const save = () => sessionStorage.setItem(KEY, JSON.stringify(state));

function weekItems(weekId) {
  if (!state.weeks[weekId]) {
    const specs = [[0,9,"Beginner Surf","John",8,5,"#1f8f46"],[1,8,"Sunrise Session","Maya",10,7,"#ff5e32"],[2,14,"Intermediate Surf","Leo",8,6,"#2f80ed"],[3,10,"Beginner Surf","John",8,4,"#1f8f46"],[4,16,"Open Surf","Maya",12,9,"#260e8d"],[5,9,"Weekend Waves","Leo",10,8,"#d946ef"]];
    state.weeks[weekId] = specs.map(([day,hour,className,coachName,capacity,bookedCount,color], index) => {
      const start = dateInWeek(weekId, day, hour);
      const end = new Date(start.getTime() + 90 * 60000);
      return { id: `${weekId}-${index}`, weekId, className, coachName, startAt: start.toISOString(), endAt: end.toISOString(), capacity, bookedCount, status: "scheduled", color, visibility: "public", isRecurring: false, recurringId: "" };
    });
    save();
  }
  return state.weeks[weekId];
}

function response(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function bodyOf(init) {
  try { return JSON.parse(init?.body || "{}"); } catch { return {}; }
}

function upsert(collection, item) {
  const index = collection.findIndex((entry) => entry.id === item.id);
  if (index >= 0) collection[index] = item; else collection.push(item);
  save(); return item;
}

export async function apiFetch(input, init = {}) {
  document.documentElement.dataset.demoApi = String(input);
  const url = new URL(String(input), window.location.href);
  const path = url.pathname;
  const method = String(init.method || "GET").toUpperCase();
  const payload = bodyOf(init);

  if (path.endsWith("/api/dashboard")) {
    const weekIds = (url.searchParams.get("weekIds") || "").split(",").filter(Boolean);
    return response({ user: { uid: "demo-john", email: state.member.email }, member: state.member, business: state.business, clients: state.clients, packs: state.packs, clientPacks: state.clientPacks, bookings: state.bookings, scheduleWeeks: weekIds.map((weekId) => ({ week: { weekId, status: "published", publishedAt: new Date().toISOString() }, items: weekItems(weekId) })) });
  }
  if (path.endsWith("/api/me")) return response({ user: { uid: "demo-john", email: state.member.email }, member: state.member, business: state.business });
  if (path.endsWith("/api/session/resolve")) return response({ role: sessionStorage.getItem("tidelab.demo.persona") === "client" ? "client" : "admin" });
  if (path.endsWith("/api/schedule-week") && method === "GET") { const weekId = url.searchParams.get("weekId"); return response({ week: { weekId, status: "published" }, items: weekItems(weekId) }); }
  if (path.endsWith("/api/schedule-week/save")) { state.weeks[payload.weekId] = payload.items || []; save(); return response({ ok: true }); }
  if (path.endsWith("/api/schedule-week/publish")) return response({ ok: true });
  if (path.endsWith("/api/clients") && method === "GET") return response({ items: state.clients });
  if (path.endsWith("/api/packs") && method === "GET") return response({ items: state.packs });
  if (path.endsWith("/api/client-packs") && method === "GET") return response({ items: state.clientPacks });
  if (path.endsWith("/api/bookings") && method === "GET") return response({ items: state.bookings });
  if (path.endsWith("/api/class-templates") && method === "GET") return response({ items: state.classTemplates });
  if (path.endsWith("/api/business/members")) return response({ items: [state.member] });
  if (path.endsWith("/api/business") && method === "PUT") { state.business = { ...state.business, ...payload }; save(); return response({ item: state.business }); }
  if (path.endsWith("/api/clients") && method === "POST") { const item = { id: `client-${Date.now()}`, ...payload, fullName: `${payload.firstName || ""} ${payload.lastName || ""}`.trim(), status: "active", createdAt: new Date().toISOString() }; return response({ item: upsert(state.clients, item) }); }
  if (/\/api\/clients\/[^/]+$/.test(path)) { const id = decodeURIComponent(path.split("/").pop()); if (method === "DELETE") { state.clients = state.clients.filter((item) => item.id !== id); save(); return response({ ok: true }); } const item = { ...(state.clients.find((entry) => entry.id === id) || {}), ...payload, id, fullName: `${payload.firstName || ""} ${payload.lastName || ""}`.trim() }; return response({ item: upsert(state.clients, item) }); }
  if (path.endsWith("/api/packs") && method === "POST") { const item = { id: `pack-${Date.now()}`, status: "active", ...payload }; return response({ item: upsert(state.packs, item) }); }
  if (/\/api\/packs\/[^/]+$/.test(path)) { const id = decodeURIComponent(path.split("/").pop()); if (method === "DELETE") { state.packs = state.packs.filter((item) => item.id !== id); save(); return response({ ok: true }); } return response({ item: upsert(state.packs, { ...(state.packs.find((entry) => entry.id === id) || {}), ...payload, id }) }); }
  if (path.endsWith("/api/client-packs") && method === "POST") { const client = state.clients.find((item) => item.id === payload.clientId); const pack = state.packs.find((item) => item.id === payload.packTemplateId); const item = { id: `cp-${Date.now()}`, clientId: client?.id, clientName: client?.fullName, packTemplateId: pack?.id, packTemplateName: pack?.name, type: pack?.type, price: pack?.price, totalClasses: pack?.classCount, usedClasses: 0, remainingClasses: pack?.classCount, status: "active", purchasedAt: new Date().toISOString() }; return response({ item: upsert(state.clientPacks, item) }); }
  if (/\/api\/client-packs\/[^/]+$/.test(path)) { const id = decodeURIComponent(path.split("/").pop()); return response({ item: upsert(state.clientPacks, { ...(state.clientPacks.find((entry) => entry.id === id) || {}), ...payload, id }) }); }
  if (path.endsWith("/api/class-templates") && method === "POST") { const item = { id: `template-${Date.now()}`, status: "active", ...payload }; return response({ item: upsert(state.classTemplates, item) }); }
  if (/\/api\/class-templates\/[^/]+$/.test(path)) { const id = decodeURIComponent(path.split("/").pop()); if (method === "DELETE") { state.classTemplates = state.classTemplates.filter((item) => item.id !== id); save(); return response({ ok: true }); } return response({ item: upsert(state.classTemplates, { ...(state.classTemplates.find((entry) => entry.id === id) || {}), ...payload, id }) }); }
  if (path.endsWith("/api/client/me")) { const jane = state.clients.find((item) => item.id === "jane"); return response({ business: state.business, client: jane, availablePacks: state.packs, activePacks: state.clientPacks.filter((item) => item.clientId === "jane"), upcomingBookings: state.bookings.filter((item) => item.clientId === "jane"), attendedClasses: 12 }); }
  if (path.endsWith("/api/client/schedule")) { const weekId = url.searchParams.get("weekId"); return response({ items: weekItems(weekId).map((item) => ({ ...item, remainingSpots: Math.max(0, item.capacity - item.bookedCount), isBooked: state.bookings.some((booking) => booking.clientId === "jane" && booking.scheduleId === item.id), isFull: item.bookedCount >= item.capacity })) }); }
  return response({ item: payload, items: [], ok: true });
}
