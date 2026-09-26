import { observeAuthState, getIdToken, logoutUser } from "./auth.js";
import { apiFetch } from "./api.js";

const appLoaderEl = document.getElementById("app-loader");
const logoutBtn = document.getElementById("logout-btn");
const adminViewSwitchBtn = document.getElementById("admin-view-switch-btn");
const businessNameEl = document.getElementById("business-name");
const portalNameEl = document.getElementById("client-portal-name");
const portalSubtitleEl = document.getElementById("client-portal-subtitle");
const remainingClassesValueEl = document.getElementById("remaining-classes-value");
const remainingClassesSubEl = document.getElementById("remaining-classes-sub");
const upcomingBookingsValueEl = document.getElementById("upcoming-bookings-value");
const attendedClassesValueEl = document.getElementById("attended-classes-value");
const clientScheduleListEl = document.getElementById("client-schedule-list");
const clientBookingsListEl = document.getElementById("client-bookings-list");
const bookingsCountEl = document.getElementById("bookings-count");
const weekLabelEl = document.getElementById("week-label");
const prevWeekBtn = document.getElementById("prev-week-btn");
const nextWeekBtn = document.getElementById("next-week-btn");
const clientConfirmModalEl = document.getElementById("client-confirm-modal");
const clientConfirmTitleEl = document.getElementById("client-confirm-title");
const clientConfirmMessageEl = document.getElementById("client-confirm-message");
const clientDetailTimeEl = document.getElementById("client-detail-time");
const clientDetailCoachEl = document.getElementById("client-detail-coach");
const clientDetailSpotsEl = document.getElementById("client-detail-spots");
const clientConfirmCancelBtn = document.getElementById("client-confirm-cancel-btn");
const clientConfirmActionBtn = document.getElementById("client-confirm-action-btn");
const clientCancelBookingBtn = document.getElementById("client-cancel-booking-btn");
const portalLogoEl = document.getElementById("portal-logo");
const businessPictureEl = document.getElementById("portal-business-picture");
const businessLogoEl = document.getElementById("portal-business-logo");
const businessInitialEl = document.getElementById("portal-business-initial");
const businessTitleEl = document.getElementById("portal-business-title");
const businessDescriptionEl = document.getElementById("portal-business-description");
const availablePacksEl = document.getElementById("available-packs");
const availablePacksListEl = document.getElementById("available-packs-list");

let clientProfile_ = null;
let business_ = null;
let availablePacks_ = [];
let activePacks_ = [];
let upcomingBookings_ = [];
let scheduleItems_ = [];
let currentWeekStart_ = getStartOfWeek_(new Date());
let currentWeekId_ = getWeekId_(currentWeekStart_);
let attendedClasses_ = 0;
let pendingConfirmResolve_ = null;
let selectedScheduleItem_ = null;
const isAdminPreview_ = new URLSearchParams(window.location.search).get("preview") === "1";

/**
 * Escape dynamic text before inserting it with innerHTML.
 *
 * @param {unknown} value
 * @returns {string}
 */
function escapeHtml_(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Show loader.
 *
 * @returns {void}
 */
function showAppLoader_() {
  if (appLoaderEl) {
    appLoaderEl.classList.remove("hidden");
  }
}

/**
 * Hide loader.
 *
 * @returns {void}
 */
function hideAppLoader_() {
  if (appLoaderEl) {
    appLoaderEl.classList.add("hidden");
  }
}

/**
 * Show class details and return the selected action.
 *
 * @param {Object} item
 * @returns {Promise<string|null>}
 */
function openClassDetails_(item) {
  selectedScheduleItem_ = item;
  const className = item?.className || "this class";
  const startAt = item?.startAt ? new Date(item.startAt) : null;
  const endAt = item?.endAt ? new Date(item.endAt) : null;
  const isPast = (endAt || startAt) ? new Date(endAt || startAt) < new Date() : false;
  const isBookable = !item?.isBooked && !item?.isFull && !isPast;
  const canCancel = item?.isBooked && startAt && startAt > new Date();
  const hasCredits = getRemainingClasses_() > 0;
  const canBookOnline = clientProfile_?.canBook !== false;
  const primaryAction = isBookable && canBookOnline
    ? hasCredits ? "book" : "packs"
    : null;

  if (!clientConfirmModalEl) {
    return Promise.resolve(window.confirm(`Book ${className}?`) ? "book" : null);
  }

  if (clientConfirmTitleEl) {
    clientConfirmTitleEl.textContent = className;
  }

  if (clientConfirmMessageEl) {
    clientConfirmMessageEl.textContent = item?.isBooked
      ? "You are booked on this class."
      : isPast
        ? "This class has already passed."
        : item?.isFull
          ? "This class is full."
          : !canBookOnline
            ? "Online booking is not enabled for your account."
            : hasCredits
              ? "You can book this class."
              : "You have no classes left. Choose an available pack to continue.";
  }

  if (clientDetailTimeEl) {
    clientDetailTimeEl.textContent = startAt
      ? `Time: ${formatDateTime_(item.startAt)}${endAt ? ` - ${endAt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}` : ""}`
      : "";
  }

  if (clientDetailCoachEl) {
    clientDetailCoachEl.textContent = `Coach: ${item?.coachName || "Coach"}`;
  }

  if (clientDetailSpotsEl) {
    clientDetailSpotsEl.textContent = item?.isBooked
      ? "Status: Booked"
      : isPast
        ? ""
        : `Availability: ${Number(item?.remainingSpots || 0)} spots left`;
  }

  if (clientConfirmActionBtn) {
    clientConfirmActionBtn.classList.toggle("hidden", !primaryAction);
    clientConfirmActionBtn.dataset.action = primaryAction || "";
    clientConfirmActionBtn.textContent = primaryAction === "packs" ? "See packs" : "Book class";
  }

  if (clientCancelBookingBtn) {
    clientCancelBookingBtn.classList.toggle("hidden", !canCancel);
  }

  clientConfirmModalEl.classList.remove("hidden");

  return new Promise((resolve) => {
    pendingConfirmResolve_ = resolve;
  });
}

/**
 * Close booking confirmation.
 *
 * @param {string|null} action
 * @returns {void}
 */
function closeClassDetails_(action) {
  if (clientConfirmModalEl) {
    clientConfirmModalEl.classList.add("hidden");
  }

  if (pendingConfirmResolve_) {
    pendingConfirmResolve_(action);
    pendingConfirmResolve_ = null;
  }

  selectedScheduleItem_ = null;
}

/**
 * Fetch current client portal data.
 *
 * @returns {Promise<Object>}
 */
async function fetchClientMe_() {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/client/me", {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });


  return response.json();
}

/**
 * Show a non-blocking status popup.
 *
 * @param {string} message
 * @param {"success"|"error"} type
 */
function showPopup_(message, type = "error") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.append(container);
  }

  const popup = document.createElement("div");
  popup.className = `toast toast-${type}`;
  popup.textContent = message;
  container.append(popup);
  setTimeout(() => {
    popup.classList.add("toast-out");
    setTimeout(() => popup.remove(), 250);
  }, 4200);
}

/**
 * Apply a client portal API response to local state.
 *
 * @param {Object} data
 */
function applyClientPortalData_(data) {
  business_ = data.business || business_;
  availablePacks_ = data.availablePacks || availablePacks_;
  clientProfile_ = data.client;
  activePacks_ = data.activePacks || [];
  upcomingBookings_ = data.upcomingBookings || [];
  attendedClasses_ = Number(data.attendedClasses || 0);
}

/**
 * Return the client's remaining booking credits.
 *
 * @returns {number}
 */
function getRemainingClasses_() {
  return activePacks_.reduce((sum, item) => {
    return sum + Math.max(0, Number(item.remainingClasses || 0));
  }, 0);
}

/**
 * Fetch published client schedule.
 *
 * @param {string} weekId
 * @returns {Promise<Object[]>}
 */
async function fetchClientSchedule_(weekId) {
  const idToken = await getIdToken();
  const endpoint = isAdminPreview_
    ? `/api/schedule-week?weekId=${encodeURIComponent(weekId)}`
    : `/api/client/schedule?weekId=${encodeURIComponent(weekId)}`;

  const response = await apiFetch(endpoint, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });


  const body = await response.json();
  const items = Array.isArray(body.items) ? body.items : [];

  if (!isAdminPreview_) {
    return items;
  }

  if (body.week?.status !== "published") {
    return [];
  }

  return items
    .filter((item) => String(item.visibility || "") === "public")
    .map((item) => {
      const capacity = Number(item.capacity || 0);
      const bookedCount = Number(item.bookedCount || 0);
      return {
        ...item,
        remainingSpots: Math.max(0, capacity - bookedCount),
        isBooked: false,
        isFull: capacity > 0 && bookedCount >= capacity
      };
    });
}

/**
 * Add deterministic client-only state without changing business data.
 *
 * @param {Object[]} items
 * @returns {Object[]}
 */
function buildPreviewSchedule_(items) {
  const firstBookableIndex = items.findIndex((item) => {
    return (
      item.startAt &&
      new Date(item.startAt) >= new Date() &&
      !item.isFull
    );
  });
  const previewItems = items.map((item, index) => ({
    ...item,
    isBooked: index === firstBookableIndex
  }));

  scheduleItems_ = previewItems;
  syncPreviewBookings_();
  return previewItems;
}

/**
 * Keep dummy upcoming bookings consistent with simulated portal actions.
 *
 * @returns {void}
 */
function syncPreviewBookings_() {
  upcomingBookings_ = scheduleItems_
    .filter((item) => {
      return item.isBooked && item.startAt && new Date(item.startAt) >= new Date();
    })
    .map((item) => ({
      id: `preview-booking-${item.id}`,
      scheduleId: item.id,
      className: item.className || "Class",
      coachName: item.coachName || "",
      startAt: item.startAt,
      endAt: item.endAt,
      status: "booked"
    }))
    .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
}

/**
 * Create one client booking.
 *
 * @param {string} scheduleId
 * @returns {Promise<void>}
 */
async function createClientBooking_(scheduleId) {
  if (isAdminPreview_) {
    const item = scheduleItems_.find((entry) => entry.id === scheduleId);
    if (item) {
      item.isBooked = true;
      activePacks_[0].remainingClasses = Math.max(0, Number(activePacks_[0].remainingClasses || 0) - 1);
      syncPreviewBookings_();
    }
    return;
  }

  const idToken = await getIdToken();

  const response = await apiFetch("/api/client/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({ scheduleId })
  });

}

/**
 * Cancel one client booking by schedule id.
 *
 * @param {string} scheduleId
 * @returns {Promise<void>}
 */
async function cancelClientBooking_(scheduleId) {
  if (isAdminPreview_) {
    const item = scheduleItems_.find((entry) => entry.id === scheduleId);
    if (item) {
      item.isBooked = false;
      activePacks_[0].remainingClasses = Number(activePacks_[0].remainingClasses || 0) + 1;
      syncPreviewBookings_();
    }
    return;
  }

  const idToken = await getIdToken();

  const response = await apiFetch("/api/client/bookings/cancel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({ scheduleId })
  });

}

/**
 * Get ISO week id.
 *
 * @param {Date} date
 * @returns {string}
 */
function getWeekId_(date) {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
  return `${utcDate.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

/**
 * Get Monday of current week.
 *
 * @param {Date} date
 * @returns {Date}
 */
function getStartOfWeek_(date) {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() + diff);
  return result;
}

/**
 * Format event date time.
 *
 * @param {string|null} isoDate
 * @returns {string}
 */
function formatDateTime_(isoDate) {
  if (!isoDate) {
    return "";
  }

  return new Date(isoDate).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/**
 * Return a date plus N days.
 *
 * @param {Date} date
 * @param {number} days
 * @returns {Date}
 */
function addDays_(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Return Monday-first day index.
 *
 * @param {Date} date
 * @returns {number}
 */
function getMondayFirstDayIndex_(date) {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

/**
 * Format date for compact UI.
 *
 * @param {Date} date
 * @returns {string}
 */
function formatDate_(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
}

/**
 * Return the event duration in minutes.
 *
 * @param {Object} item
 * @returns {number}
 */
function getScheduleDurationMinutes_(item) {
  if (!item?.startAt || !item?.endAt) {
    return 60;
  }

  const durationMinutes = Math.round((new Date(item.endAt).getTime() - new Date(item.startAt).getTime()) / 60000);
  return Number.isFinite(durationMinutes) && durationMinutes > 0 ? durationMinutes : 60;
}

/**
 * Format displayed week range.
 *
 * @returns {void}
 */
function renderWeekLabel_() {
  if (!weekLabelEl) {
    return;
  }

  weekLabelEl.textContent = `${formatDate_(currentWeekStart_)} -> ${formatDate_(addDays_(currentWeekStart_, 6))}`;
}

/**
 * Render one client schedule event card.
 *
 * @param {Object} item
 * @returns {string}
 */
function renderScheduleEvent_(item) {
  const endAt = item.endAt || item.startAt;
  const isPast = endAt ? new Date(endAt) < new Date() : false;
  const isBookable = !item.isBooked && !item.isFull && !isPast;
  const cardClass = item.isBooked
    ? "is-booked"
    : isBookable
      ? "is-bookable"
      : isPast
        ? "is-past"
        : "is-full";
  const durationMinutes = getScheduleDurationMinutes_(item);
  const eventHeight = Math.max(40, Math.round((durationMinutes / 60) * 50) - 8);
  const spotsHtml = isPast ? "" : `<span>${Number(item.remainingSpots || 0)} spots left</span>`;

  return `
    <div class="portal-event-card ${cardClass}" data-schedule-id="${escapeHtml_(item.id)}" style="height: ${eventHeight}px; min-height: ${eventHeight}px;">
      <div class="portal-event-compact">
        <strong>${escapeHtml_(item.className || "Class")}</strong>
        ${spotsHtml}
      </div>
      <span class="portal-event-check" aria-label="Booked">&#10003;</span>
    </div>
  `;

  /* obsolete compact-card markup removed
  const buttonClass = item.isBooked ? "book-btn booked" : item.isFull || isPast ? "book-btn full" : "book-btn client-book-btn";
  const buttonLabel = item.isBooked ? "✓ Booked" : isPast ? "Past" : item.isFull ? "Full" : "Book";
  const disabledAttr = item.isBooked || item.isFull || isPast ? " disabled" : "";

  return `
    <div class="portal-event-card ${cardClass}" data-schedule-id="${escapeHtml_(item.id)}">
      <div class="portal-event-title">${escapeHtml_(item.className || "Class")}</div>
      <div class="portal-event-meta">${escapeHtml_(item.coachName || "Coach")} · ${Number(item.remainingSpots || 0)} spots</div>
      <button class="${buttonClass}" data-schedule-id="${escapeHtml_(item.id)}" type="button"${disabledAttr}>${buttonLabel}</button>
    </div>
  `;
  */
}

/**
 * Render published schedule in an hourly week grid.
 *
 * @returns {void}
 */
function renderScheduleGrid_() {
  if (!clientScheduleListEl) {
    return;
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 14 }, (_, index) => index + 7);
  const headerHtml = days.map((dayName, dayIndex) => {
    const dayDate = addDays_(currentWeekStart_, dayIndex);

    return `
      <div class="portal-grid-day">
        <strong>${dayName}</strong>
        <span>${formatDate_(dayDate)}</span>
      </div>
    `;
  }).join("");

  const rowsHtml = hours.map((hour) => {
    const cellsHtml = days.map((dayName, dayIndex) => {
      const slotItems = scheduleItems_
        .filter((item) => {
          if (!item.startAt) {
            return false;
          }

          const start = new Date(item.startAt);
          return getMondayFirstDayIndex_(start) === dayIndex && start.getHours() === hour;
        })
        .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));

      return `
        <div class="portal-slot">
          ${slotItems.map(renderScheduleEvent_).join("")}
        </div>
      `;
    }).join("");

    return `
      <div class="portal-time-row">
        <div class="portal-time-label">${String(hour).padStart(2, "0")}:00</div>
        ${cellsHtml}
      </div>
    `;
  }).join("");

  clientScheduleListEl.innerHTML = `
    <div class="portal-schedule-grid">
      <div class="portal-grid-corner">Time</div>
      ${headerHtml}
      ${rowsHtml}
    </div>
  `;
}

/**
 * Refresh portal data after a booking change.
 *
 * @returns {Promise<void>}
 */
async function refreshClientPortalData_() {
  if (isAdminPreview_) {
    syncPreviewBookings_();
    return;
  }

  const me = await fetchClientMe_();
  applyClientPortalData_(me);
  scheduleItems_ = await fetchClientSchedule_(currentWeekId_);
}

/** Show or roll back an immediate booking confirmation on one schedule card. */
function setBookingCardPending_(scheduleId, isPending) {
  const card = [...document.querySelectorAll(".portal-event-card")].find((item) => {
    return item.dataset.scheduleId === scheduleId;
  });

  if (!card) {
    return;
  }

  card.classList.toggle("is-bookable", !isPending);
  card.classList.toggle("is-booked", isPending);
  card.classList.toggle("is-booking-pending", isPending);

  if (isPending) {
    card.setAttribute("aria-busy", "true");
  } else {
    card.removeAttribute("aria-busy");
  }
}

/**
 * Render business information and available pack details.
 */
function renderPortalSides_() {
  const businessName = business_?.name || "BookMyClass";
  const businessLogo = business_?.logoDataUrl || business_?.logoUrl || "";

  if (businessNameEl) {
    businessNameEl.textContent = businessName;
  }
  if (businessTitleEl) {
    businessTitleEl.textContent = businessName;
  }
  if (businessDescriptionEl) {
    businessDescriptionEl.textContent =
      business_?.description || "No business description has been added yet.";
  }

  if (businessInitialEl) {
    businessInitialEl.textContent = businessName.charAt(0).toUpperCase();
    businessInitialEl.classList.toggle("hidden", Boolean(businessLogo));
  }
  if (businessLogoEl) {
    businessLogoEl.alt = `${businessName} logo`;
    businessLogoEl.classList.toggle("hidden", !businessLogo);
    if (businessLogo && businessLogoEl.src !== businessLogo) {
      businessLogoEl.src = businessLogo;
    }
    businessLogoEl.onerror = () => {
      businessLogoEl.classList.add("hidden");
      businessInitialEl?.classList.remove("hidden");
    };
  }
  if (businessPictureEl) {
    businessPictureEl.classList.toggle("has-image", Boolean(businessLogo));
  }
  if (portalLogoEl) {
    portalLogoEl.textContent = businessLogo ? "" : businessName.charAt(0).toUpperCase();
    portalLogoEl.style.backgroundImage = businessLogo ? `url("${businessLogo}")` : "";
    portalLogoEl.style.backgroundPosition = "center";
    portalLogoEl.style.backgroundRepeat = "no-repeat";
    portalLogoEl.style.backgroundSize = "cover";
  }

  if (!availablePacksListEl) {
    return;
  }

  availablePacksListEl.innerHTML = availablePacks_.length
    ? availablePacks_.map((pack) => `
      <button class="portal-pack-option" type="button" aria-expanded="false">
        <span class="portal-pack-option-head">
          <strong>${escapeHtml_(pack.name || "Pack")}</strong>
          <span class="portal-pack-price">${new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "EUR"
          }).format(Number(pack.price || 0))}</span>
        </span>
        <span class="portal-pack-summary">${Number(pack.classCount || 0)} classes · ${escapeHtml_(pack.type || "credits")}</span>
        <span class="portal-pack-details">${escapeHtml_(pack.details || "Contact the business to purchase this pack.")}</span>
      </button>
    `).join("")
    : `<p class="portal-business-description">No packs are currently available.</p>`;

  availablePacksListEl.querySelectorAll(".portal-pack-option").forEach((option) => {
    option.addEventListener("click", () => {
      const expanded = option.getAttribute("aria-expanded") === "true";
      availablePacksListEl.querySelectorAll(".portal-pack-option").forEach((item) => {
        item.setAttribute("aria-expanded", "false");
      });
      option.setAttribute("aria-expanded", String(!expanded));
    });
  });
}

/**
 * Open class details and run the selected booking action.
 *
 * @param {Object} item
 * @param {string} scheduleId
 */
async function handleClassDetails_(item, scheduleId) {
  const action = await openClassDetails_(item);

  if (!action) {
    return;
  }

  if (action === "packs") {
    availablePacksEl?.scrollIntoView({ behavior: "smooth", block: "start" });
    availablePacksEl?.querySelector(".portal-pack-option")?.focus();
    return;
  }

  if (action === "book") {
    setBookingCardPending_(scheduleId, true);
  }

  try {
    if (action === "book") {
      await createClientBooking_(scheduleId);
    } else if (action === "cancel") {
      await cancelClientBooking_(scheduleId);
    }

    await refreshClientPortalData_();
    renderClientPortal_();
    showPopup_(action === "book" ? "Class booked successfully." : "Booking cancelled.", "success");
  } catch (error) {
    if (action === "book") {
      setBookingCardPending_(scheduleId, false);
    }
    showPopup_(error.message, "error");
  }
}

/**
 * Render client portal.
 *
 * @returns {void}
 */
function renderClientPortal_() {
  renderPortalSides_();

  if (portalNameEl) {
    portalNameEl.textContent = `Welcome ${clientProfile_?.firstName || ""}`;
  }

  if (portalSubtitleEl) {
    portalSubtitleEl.textContent = clientProfile_?.email || "Your private booking portal";
  }

  const remainingClasses = getRemainingClasses_();

  if (remainingClassesValueEl) {
    remainingClassesValueEl.textContent = String(remainingClasses);
  }

  if (remainingClassesSubEl) {
    remainingClassesSubEl.innerHTML = activePacks_.length
      ? `
        <span>Across active packs</span>
        <div class="pack-list-mini">
          ${activePacks_.map((pack) => `
            <p>
              <span>${escapeHtml_(pack.packTemplateName || "Pack")}</span>
              <strong>${Number(pack.remainingClasses || 0)}/${Number(pack.totalClasses || 0)}</strong>
            </p>
          `).join("")}
        </div>
      `
      : "No active pack";
  }

  if (upcomingBookingsValueEl) {
    upcomingBookingsValueEl.textContent = String(upcomingBookings_.length);
  }

  if (attendedClassesValueEl) {
    attendedClassesValueEl.textContent = String(attendedClasses_);
  }

  renderWeekLabel_();
  renderScheduleGrid_();

  if (clientBookingsListEl) {
    clientBookingsListEl.innerHTML = upcomingBookings_.length
      ? upcomingBookings_.map((item) => `
        <button
          class="portal-upcoming-item"
          type="button"
          data-schedule-id="${escapeHtml_(item.scheduleId || "")}"
          data-booking-id="${escapeHtml_(item.id || "")}"
        >
          <span class="portal-upcoming-avatar">${escapeHtml_((item.className || "B").charAt(0).toUpperCase())}</span>
          <span class="portal-upcoming-copy">
            <strong>${escapeHtml_(item.className || "Class")}</strong>
            <span>${escapeHtml_(formatDateTime_(item.startAt))}</span>
            <span>Status: ${escapeHtml_(item.status || "booked")}</span>
          </span>
        </button>
      `).join("")
      : `<div class="empty-state small">No upcoming bookings.</div>`;
  }

  if (bookingsCountEl) {
    bookingsCountEl.textContent = String(upcomingBookings_.length);
  }

  document.querySelectorAll(".portal-upcoming-item").forEach((button) => {
    button.addEventListener("click", async () => {
      const booking = upcomingBookings_.find((item) => {
        return item.id === button.dataset.bookingId;
      });
      const scheduleId = button.dataset.scheduleId || booking?.scheduleId || "";
      const scheduleItem = scheduleItems_.find((item) => item.id === scheduleId);

      if (!booking || !scheduleId) {
        showPopup_("Class details are not available right now.", "error");
        return;
      }

      await handleClassDetails_(
        scheduleItem || { ...booking, isBooked: true, remainingSpots: 0 },
        scheduleId
      );
    });
  });

  document.querySelectorAll(".client-book-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      const scheduleId = button.dataset.scheduleId;
      if (!scheduleId) {
        return;
      }

      const item = scheduleItems_.find((entry) => entry.id === scheduleId);
      const confirmed = await confirmBooking_(item || { className: "this class" });

      if (!confirmed) {
        return;
      }

      try {
        button.disabled = true;
        button.textContent = "Booking…";

        await createClientBooking_(scheduleId);

        const me = await fetchClientMe_();
        applyClientPortalData_(me);
        scheduleItems_ = await fetchClientSchedule_(currentWeekId_);

        renderClientPortal_();
      } catch (error) {
        showPopup_(error.message, "error");
        button.disabled = false;
        button.textContent = "Book";
      }
    });
  });

  document.querySelectorAll(".portal-event-card.is-bookable").forEach((card) => {
    card.addEventListener("click", () => {
      card.querySelector(".client-book-btn")?.click();
    });
  });

  document.querySelectorAll(".portal-event-card").forEach((card) => {
    card.addEventListener("click", async () => {
      const scheduleId = card.dataset.scheduleId;
      const item = scheduleItems_.find((entry) => entry.id === scheduleId);

      if (!scheduleId || !item) {
        return;
      }

      await handleClassDetails_(item, scheduleId);
    });
  });
}

/**
 * Move client portal schedule week.
 *
 * @param {number} dayDelta
 * @returns {Promise<void>}
 */
async function goToWeek_(dayDelta) {
  currentWeekStart_ = addDays_(currentWeekStart_, dayDelta);
  currentWeekId_ = getWeekId_(currentWeekStart_);
  const items = await fetchClientSchedule_(currentWeekId_);
  scheduleItems_ = isAdminPreview_ ? buildPreviewSchedule_(items) : items;
  renderClientPortal_();
}

/**
 * Render the stable dummy client data without waiting for the schedule request.
 */
function seedAdminPreview_() {
  const previewBusinessName =
    sessionStorage.getItem("bookmyclass.clientPreviewBusinessName") || "Surf at Night";
  try {
    business_ = JSON.parse(
      sessionStorage.getItem("bookmyclass.clientPreviewBusiness") || "null"
    );
  } catch {
    business_ = null;
  }
  business_ ||= {
    name: previewBusinessName,
    description: "Surf lessons for every level, taught by local coaches in a friendly and safe environment.",
    logoDataUrl: ""
  };
  availablePacks_ = [
    {
      id: "preview-pack-10",
      name: "Pack 10",
      type: "credits",
      classCount: 10,
      price: 180,
      details: "Ten group classes, valid for three months from purchase."
    },
    {
      id: "preview-pack-5",
      name: "Discovery Pack",
      type: "credits",
      classCount: 5,
      price: 100,
      details: "Five classes for new surfers who want a flexible start."
    }
  ];
  clientProfile_ = {
    firstName: "Alex",
    lastName: "Martin",
    fullName: "Alex Martin",
    email: "alex.client@example.com"
  };
  activePacks_ = [{
    id: "preview-pack",
    packTemplateName: "Pack 10",
    type: "credits",
    totalClasses: 10,
    usedClasses: 4,
    remainingClasses: 6,
    status: "active"
  }];
  upcomingBookings_ = [];
  attendedClasses_ = 4;

  adminViewSwitchBtn?.classList.remove("hidden");
  renderClientPortal_();
  hideAppLoader_();
}

/**
 * Initialize client portal.
 *
 * @returns {Promise<void>}
 */
async function initClientPortal_() {
  if (isAdminPreview_) {
    seedAdminPreview_();
  } else {
    showAppLoader_();
  }

  observeAuthState(async (user) => {
    if (!user) {
      window.location.href = "./";
      return;
    }

    try {
      if (!isAdminPreview_) {
        const me = await fetchClientMe_();
        applyClientPortalData_(me);
      }

      const items = await fetchClientSchedule_(currentWeekId_);
      scheduleItems_ = isAdminPreview_ ? buildPreviewSchedule_(items) : items;

      renderClientPortal_();
    } catch (error) {
      console.error(error);
      showPopup_(error.message, "error");
    }

    hideAppLoader_();
  });
}

adminViewSwitchBtn?.addEventListener("click", () => {
  const hasAdminReturn =
    sessionStorage.getItem("bookmyclass.clientPreviewHasAdminReturn") === "1";
  sessionStorage.removeItem("bookmyclass.clientPreviewHasAdminReturn");

  if (hasAdminReturn && window.history.length > 1) {
    window.history.back();
    return;
  }

  window.location.href = "./app.html";
});

logoutBtn?.addEventListener("click", async () => {
  try {
    logoutBtn.disabled = true;
    await logoutUser();
    window.location.href = "./";
  } catch (error) {
    logoutBtn.disabled = false;
    showPopup_(error.message || "Could not log out. Please try again.", "error");
  }
});

prevWeekBtn?.addEventListener("click", async () => {
  try {
    prevWeekBtn.disabled = true;
    await goToWeek_(-7);
  } catch (error) {
    showPopup_(error.message, "error");
  } finally {
    prevWeekBtn.disabled = false;
  }
});

nextWeekBtn?.addEventListener("click", async () => {
  try {
    nextWeekBtn.disabled = true;
    await goToWeek_(7);
  } catch (error) {
    showPopup_(error.message, "error");
  } finally {
    nextWeekBtn.disabled = false;
  }
});

clientConfirmCancelBtn?.addEventListener("click", () => {
  closeClassDetails_(null);
});

clientConfirmActionBtn?.addEventListener("click", () => {
  closeClassDetails_(clientConfirmActionBtn.dataset.action || "book");
});

clientCancelBookingBtn?.addEventListener("click", () => {
  closeClassDetails_("cancel");
});

clientConfirmModalEl?.addEventListener("click", (event) => {
  if (event.target === clientConfirmModalEl) {
    closeClassDetails_(null);
  }
});

initClientPortal_();

