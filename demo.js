const STORAGE_KEY = "bookmyclass-static-demo-v1";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

function mondayOfCurrentWeek() {
  const date = new Date();
  const offset = date.getDay() === 0 ? -6 : 1 - date.getDay();
  date.setDate(date.getDate() + offset);
  date.setHours(0, 0, 0, 0);
  return date;
}

function initialState() {
  return {
    nextId: 8,
    credits: 7,
    attended: 18,
    classes: [
      { id: 1, name: "Sunrise Surf", day: 0, hour: 8, coach: "Maya", capacity: 8, booked: 6, janeBooked: true },
      { id: 2, name: "Beginner Surf", day: 0, hour: 11, coach: "John", capacity: 10, booked: 7, janeBooked: false },
      { id: 3, name: "Ocean Fitness", day: 1, hour: 9, coach: "Leo", capacity: 12, booked: 9, janeBooked: false },
      { id: 4, name: "Intermediate Surf", day: 2, hour: 14, coach: "Maya", capacity: 8, booked: 8, janeBooked: false },
      { id: 5, name: "Sunset Surf", day: 3, hour: 17, coach: "John", capacity: 10, booked: 5, janeBooked: true },
      { id: 6, name: "Kids Surf Club", day: 4, hour: 10, coach: "Leo", capacity: 8, booked: 4, janeBooked: false },
      { id: 7, name: "Weekend Waves", day: 5, hour: 9, coach: "Maya", capacity: 12, booked: 10, janeBooked: false }
    ]
  };
}

function loadState() {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || initialState(); }
  catch { return initialState(); }
}

let state = loadState();
let view = "admin";
let toastTimer;

function save() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function mondayDate(dayIndex) {
  const date = mondayOfCurrentWeek();
  date.setDate(date.getDate() + dayIndex);
  return date;
}

function weekText() {
  const start = mondayDate(0).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const end = mondayDate(6).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return `${start} – ${end}`;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function stat(label, value) {
  return `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`;
}

function card(item, clientMode) {
  const full = item.booked >= item.capacity;
  const status = item.janeBooked ? "✓ Booked" : full ? "Class full" : `${item.capacity - item.booked} spots left`;
  return `<article class="class-card ${clientMode ? "client-card" : ""} ${item.janeBooked ? "booked" : ""}" data-id="${item.id}" ${clientMode ? "role=button tabindex=0" : "draggable=true"}>
    <strong>${escapeHtml(item.name)}</strong><span>${String(item.hour).padStart(2, "0")}:00 · ${escapeHtml(item.coach)}</span><span>${clientMode ? status : `${item.booked}/${item.capacity} booked`}</span>
  </article>`;
}

function escapeHtml(value) {
  const node = document.createElement("div");
  node.textContent = String(value);
  return node.innerHTML;
}

function renderSchedule(target, clientMode = false) {
  const el = document.querySelector(target);
  let html = `<div class="grid-cell grid-head"></div>`;
  days.forEach((day, index) => {
    const date = mondayDate(index).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    html += `<div class="grid-cell grid-head">${day.slice(0, 3)}<small>${date}</small></div>`;
  });
  hours.forEach((hour) => {
    html += `<div class="grid-cell time-cell">${String(hour).padStart(2, "0")}:00</div>`;
    days.forEach((_, day) => {
      const classes = state.classes.filter((item) => item.day === day && item.hour === hour);
      html += `<div class="grid-cell slot" data-day="${day}" data-hour="${hour}">${classes.map((item) => card(item, clientMode)).join("")}</div>`;
    });
  });
  el.innerHTML = html;
  clientMode ? bindClientCards(el) : bindDragging(el);
}

function bindDragging(root) {
  root.querySelectorAll(".class-card").forEach((item) => item.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", item.dataset.id);
  }));
  root.querySelectorAll(".slot").forEach((slot) => {
    slot.addEventListener("dragover", (event) => { event.preventDefault(); slot.classList.add("drag-over"); });
    slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));
    slot.addEventListener("drop", (event) => {
      event.preventDefault();
      const item = state.classes.find((entry) => entry.id === Number(event.dataTransfer.getData("text/plain")));
      if (!item) return;
      item.day = Number(slot.dataset.day);
      item.hour = Number(slot.dataset.hour);
      save(); render(); showToast(`${item.name} moved to ${days[item.day]} at ${item.hour}:00`);
    });
  });
}

function bindClientCards(root) {
  const toggle = (element) => {
    const item = state.classes.find((entry) => entry.id === Number(element.dataset.id));
    if (!item) return;
    if (!item.janeBooked && item.booked >= item.capacity) return showToast("This class is full");
    if (!item.janeBooked && state.credits < 1) return showToast("No credits remaining");
    item.janeBooked = !item.janeBooked;
    item.booked += item.janeBooked ? 1 : -1;
    state.credits += item.janeBooked ? -1 : 1;
    save(); render(); showToast(item.janeBooked ? `${item.name} booked` : `${item.name} cancelled`);
  };
  root.querySelectorAll(".client-card").forEach((item) => {
    item.addEventListener("click", () => toggle(item));
    item.addEventListener("keydown", (event) => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); toggle(item); } });
  });
}

function render() {
  const bookings = state.classes.reduce((sum, item) => sum + item.booked, 0);
  const janeBookings = state.classes.filter((item) => item.janeBooked).length;
  document.querySelector("#admin-stats").innerHTML = stat("Classes this week", state.classes.length) + stat("Total bookings", bookings) + stat("Active clients", 42) + stat("Occupancy", `${Math.round(bookings / state.classes.reduce((sum, item) => sum + item.capacity, 0) * 100)}%`);
  document.querySelector("#client-stats").innerHTML = stat("Remaining classes", state.credits) + stat("Upcoming bookings", janeBookings) + stat("Classes attended", state.attended) + stat("Member since", "Mar 2025");
  document.querySelector("#credit-pill").textContent = `${state.credits} class credits`;
  document.querySelector("#week-label").textContent = weekText();
  renderSchedule("#admin-schedule");
  renderSchedule("#client-schedule", true);
}

function switchView(nextView) {
  view = nextView;
  document.querySelector("#admin-view").hidden = view !== "admin";
  document.querySelector("#client-view").hidden = view !== "client";
  document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  document.querySelector("#persona-name").textContent = view === "admin" ? "John Doe" : "Jane Doe";
  document.querySelector("#persona-role").textContent = view === "admin" ? "Business owner" : "Surf school client";
  document.querySelector("#avatar").textContent = view === "admin" ? "JD" : "JD";
}

document.querySelectorAll(".nav-button").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
document.querySelector("#reset-button").addEventListener("click", () => { state = initialState(); save(); render(); showToast("Demo restored to its starting point"); });
document.querySelector("#open-create-button").addEventListener("click", () => document.querySelector("#create-dialog").showModal());

const daySelect = document.querySelector("#day-select");
days.forEach((day, index) => daySelect.add(new Option(day, index)));
const hourSelect = document.querySelector("#hour-select");
hours.forEach((hour) => hourSelect.add(new Option(`${String(hour).padStart(2, "0")}:00`, hour)));

document.querySelector("#create-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  state.classes.push({ id: state.nextId++, name: String(data.get("name")), day: Number(data.get("day")), hour: Number(data.get("hour")), coach: String(data.get("coach")), capacity: Number(data.get("capacity")), booked: 0, janeBooked: false });
  save(); render(); document.querySelector("#create-dialog").close(); showToast("Class created");
});

save();
render();
