const KEY = "tidelab-real-ui-demo-v2";

function demoSmileyLogo() {
  const smileys = ["😀", "😎", "😊", "🙂", "🤩", "😁"];
  let smiley = sessionStorage.getItem("tidelab.demo.smiley");
  if (!smileys.includes(smiley)) {
    smiley = smileys[Math.floor(Math.random() * smileys.length)];
    sessionStorage.setItem("tidelab.demo.smiley", smiley);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="50" fill="#f5f2e8"/><text x="50" y="54" text-anchor="middle" dominant-baseline="middle" font-size="64">${smiley}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

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
    business: { id: "ocean-waves", name: "Ocean Waves Surf School", slogan: "Ride more. Live more.", description: "Friendly surf coaching for every level in Ericeira.", logoDataUrl: demoSmileyLogo(), subscription: { plan: "pro", status: "active" } },
    member: { id: "john", userId: "demo-john", name: "John Doe", email: "john.doe@tidelab.demo", role: "owner", status: "active" },
    clients: [
      ["jane","Jane","Doe","jane.doe@example.com","+351 910 234 561","PT"], ["emma","Emma","Smith","emma@example.com","+351 912 331 883","GB"], ["lucas","Lucas","Martin","lucas@example.com","+33 612 887 321","FR"], ["sofia","Sofia","Costa","sofia@example.com","+351 934 118 492","PT"], ["noah","Noah","Williams","noah@example.com","+44 7700 900321","GB"], ["mia","Mia","Muller","mia@example.com","+49 151 234 881","DE"], ["oliver","Oliver","Brown","oliver@example.com","+353 851 208 773","IE"], ["ines","Ines","Silva","ines@example.com","+351 962 114 037","PT"], ["hugo","Hugo","Bernard","hugo@example.com","+33 625 440 192","FR"], ["clara","Clara","Garcia","clara@example.com","+34 612 309 824","ES"], ["liam","Liam","Taylor","liam@example.com","+44 7700 812 443","GB"], ["anna","Anna","Meier","anna@example.com","+41 791 229 085","CH"]
    ].map(([id, firstName, lastName, email, phone, country]) => ({ id, firstName, lastName, fullName: `${firstName} ${lastName}`, email, phone, country, canBook: true, status: "active", createdAt: new Date(Date.now() - 86400000 * 80).toISOString() })),
    packs: [
      { id: "pack-5", name: "Discovery Pack", type: "credits", classCount: 5, price: 95, details: "Five group classes", status: "active" },
      { id: "pack-10", name: "Wave Rider 10", type: "credits", classCount: 10, price: 175, details: "Ten flexible group classes", status: "active" },
      { id: "monthly", name: "Unlimited Month", type: "monthly", classCount: 30, price: 249, details: "Unlimited surfing for one month", status: "active" }
    ],
    clientPacks: [
      ["jane","Jane Doe","pack-10","Wave Rider 10","credits",175,10,4,6,3], ["emma","Emma Smith","monthly","Unlimited Month","monthly",249,30,11,19,6], ["lucas","Lucas Martin","pack-5","Discovery Pack","credits",95,5,2,3,9], ["sofia","Sofia Costa","pack-10","Wave Rider 10","credits",175,10,6,4,13], ["noah","Noah Williams","monthly","Unlimited Month","monthly",249,30,8,22,18], ["mia","Mia Muller","pack-10","Wave Rider 10","credits",175,10,3,7,25], ["oliver","Oliver Brown","pack-5","Discovery Pack","credits",95,5,1,4,34], ["ines","Ines Silva","pack-10","Wave Rider 10","credits",175,10,5,5,43], ["hugo","Hugo Bernard","monthly","Unlimited Month","monthly",249,30,14,16,67]
    ].map(([clientId, clientName, packTemplateId, packTemplateName, type, price, totalClasses, usedClasses, remainingClasses, daysAgo]) => ({ id: `cp-${clientId}`, clientId, clientName, packTemplateId, packTemplateName, type, price, totalClasses, usedClasses, remainingClasses, status: "active", purchasedAt: new Date(Date.now() - 86400000 * daysAgo).toISOString() }))
    ,
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
  try {
    const stored = JSON.parse(sessionStorage.getItem(KEY)) || defaultState();
    stored.business.logoDataUrl = demoSmileyLogo();
    return stored;
  } catch { return defaultState(); }
}

let state = load();
const save = () => sessionStorage.setItem(KEY, JSON.stringify(state));

function weekItems(weekId) {
  if (!state.weeks[weekId]) {
    const specs = [
      [0,8,"Sunrise Session","Maya",10,8,"#ff5e32"], [0,11,"Beginner Surf","John",8,6,"#1f8f46"], [0,17,"Sunset Flow","Leo",12,9,"#d946ef"],
      [1,7,"Dawn Patrol","Leo",8,5,"#260e8d"], [1,10,"Kids Surf Club","Maya",10,7,"#2f80ed"], [1,15,"Open Surf","John",12,10,"#1f8f46"],
      [2,9,"Beginner Surf","John",8,7,"#1f8f46"], [2,13,"Intermediate Surf","Leo",8,6,"#2f80ed"], [2,17,"Sunset Flow","Maya",12,8,"#d946ef"],
      [3,8,"Ocean Fitness","Maya",10,6,"#ff5e32"], [3,11,"Beginner Surf","John",8,5,"#1f8f46"], [3,16,"Advanced Turns","Leo",6,5,"#260e8d"],
      [4,7,"Dawn Patrol","Leo",8,7,"#260e8d"], [4,10,"Intermediate Surf","Maya",8,6,"#2f80ed"], [4,14,"Open Surf","John",12,9,"#1f8f46"], [4,17,"Sunset Flow","Maya",12,11,"#d946ef"],
      [5,9,"Weekend Waves","Leo",10,9,"#d946ef"], [5,12,"Family Surf","John",12,8,"#ff5e32"], [5,16,"Open Surf","Maya",12,10,"#1f8f46"],
      [6,10,"Sunday Social","John",14,11,"#2f80ed"], [6,15,"Beginner Surf","Maya",8,6,"#1f8f46"]
    ];
    state.weeks[weekId] = specs.map(([day,hour,className,coachName,capacity,bookedCount,color], index) => {
      const start = dateInWeek(weekId, day, hour);
      const end = new Date(start.getTime() + 90 * 60000);
      return { id: `${weekId}-${index}`, weekId, className, coachName, startAt: start.toISOString(), endAt: end.toISOString(), capacity, bookedCount, status: "scheduled", color, visibility: "public", isRecurring: false, recurringId: "" };
    });
    save();
  }
  return state.weeks[weekId];
}

function ensureBookings(items) {
  items.forEach((schedule, scheduleIndex) => {
    if (state.bookings.some((booking) => booking.scheduleId === schedule.id)) return;
    for (let index = 0; index < schedule.bookedCount; index += 1) {
      const client = state.clients[(scheduleIndex * 3 + index) % state.clients.length];
      const clientPack = state.clientPacks.find((pack) => pack.clientId === client.id) || state.clientPacks[index % state.clientPacks.length];
      state.bookings.push({ id: `booking-${schedule.id}-${index}`, clientId: client.id, clientName: client.fullName, clientPackId: clientPack.id, scheduleId: schedule.id, weekId: schedule.weekId, className: schedule.className, startAt: schedule.startAt, endAt: schedule.endAt, createdAt: new Date(new Date(schedule.startAt).getTime() - 86400000 * (2 + index)).toISOString(), status: "booked" });
    }
  });
  save();
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
  const url = new URL(String(input), window.location.href);
  const path = url.pathname;
  const method = String(init.method || "GET").toUpperCase();
  const payload = bodyOf(init);

  if (path.endsWith("/api/dashboard")) {
    const weekIds = (url.searchParams.get("weekIds") || "").split(",").filter(Boolean);
    const scheduleWeeks = weekIds.map((weekId) => ({ week: { weekId, status: "published", publishedAt: new Date().toISOString() }, items: weekItems(weekId) }));
    ensureBookings(scheduleWeeks.flatMap((week) => week.items));
    return response({ user: { uid: "demo-john", email: state.member.email }, member: state.member, business: state.business, clients: state.clients, packs: state.packs, clientPacks: state.clientPacks, bookings: state.bookings, scheduleWeeks });
  }
  if (path.endsWith("/api/me")) return response({ user: { uid: "demo-john", email: state.member.email }, member: state.member, business: state.business });
  if (path.endsWith("/api/session/resolve")) return response({ role: sessionStorage.getItem("tidelab.demo.persona") === "client" ? "client" : "admin" });
  if (path.endsWith("/api/schedule-week") && method === "GET") { const weekId = url.searchParams.get("weekId"); const items = weekItems(weekId); ensureBookings(items); return response({ week: { weekId, status: "published" }, items }); }
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
