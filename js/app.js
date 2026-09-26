import { observeAuthState, getIdToken, logoutUser } from "./auth.js";
import { apiFetch } from "./api.js";
import { showToast as showReactToast } from "../assets/react/legacy-ui.js";

const businessNameEl = document.getElementById("business-name");
const businessSloganEl = document.getElementById("business-slogan");
const brandLogoEl = document.querySelector(".brand-logo");
const memberInfoEl = document.getElementById("member-info");
const pageTitleEl = document.getElementById("page-title");
const pageSubtitleEl = document.getElementById("page-subtitle");
const pageContentEl = document.getElementById("page-content");
const logoutBtn = document.getElementById("logout-btn");
const navItems = document.querySelectorAll(".nav-item");
const prevWeekBtn = document.getElementById("prev-week-btn");
const nextWeekBtn = document.getElementById("next-week-btn");
const weekLabelEl = document.getElementById("week-label");
const sidebarScheduleCalendarEl = document.getElementById("sidebar-schedule-calendar");
const appLoaderEl = document.getElementById("app-loader");
const clientViewSwitchBtn = document.getElementById("client-view-switch-btn");

const scheduleModalEl = document.getElementById("schedule-modal");
const scheduleFormEl = document.getElementById("schedule-form");
const closeScheduleModalBtn = document.getElementById("close-schedule-modal-btn");
const deleteScheduleItemBtn = document.getElementById("delete-schedule-item-btn");
const bookScheduleItemBtn = document.getElementById("book-schedule-item-btn");
const scheduleModalTitleEl = document.getElementById("schedule-modal-title");
const scheduleClassNameEl = document.getElementById("schedule-class-name");
const scheduleCoachNameEl = document.getElementById("schedule-coach-name");
const scheduleDateEl = document.getElementById("schedule-date");
const scheduleStartTimeEl = document.getElementById("schedule-start-time");
const scheduleDurationEl = document.getElementById("schedule-duration");
const scheduleCapacityEl = document.getElementById("schedule-capacity");
const scheduleRecurringEl = document.getElementById("schedule-recurring");
const confirmModalEl = document.getElementById("confirm-modal");
const confirmTitleEl = document.getElementById("confirm-title");
const confirmMessageEl = document.getElementById("confirm-message");
const cancelConfirmBtn = document.getElementById("cancel-confirm-btn");
const confirmActionBtn = document.getElementById("confirm-action-btn");

const clientModalEl = document.getElementById("client-modal");
const clientFormEl = document.getElementById("client-form");
const closeClientModalBtn = document.getElementById("close-client-modal-btn");
const clientFirstNameEl = document.getElementById("client-first-name");
const clientLastNameEl = document.getElementById("client-last-name");
const clientEmailEl = document.getElementById("client-email");
const clientEmailNoteEl = document.getElementById("client-email-note");
const clientPhoneEl = document.getElementById("client-phone");
const clientCountryEl = document.getElementById("client-country");
const clientCountryOtherEl = document.getElementById("client-country-other");
const clientCountryOtherLabelEl = document.getElementById("client-country-other-label");
const clientCanBookEl = document.getElementById("client-can-book");
const deleteClientBtn = document.getElementById("delete-client-btn");
const editClientBtn = document.getElementById("edit-client-btn");
const saveClientBtn = document.getElementById("save-client-btn");
const clientBookingHistoryEl = document.getElementById("client-booking-history");
const clientPackEditorEl = document.getElementById("client-pack-editor");
const clientCurrentPackNameEl = document.getElementById("client-current-pack-name");
const clientCurrentPackStatusEl = document.getElementById("client-current-pack-status");
const clientCurrentPackDetailsEl = document.getElementById("client-current-pack-details");
const clientCurrentPackRemainingEl = document.getElementById("client-current-pack-remaining");
const clientCurrentPackTotalEl = document.getElementById("client-current-pack-total");
const clientCurrentPackUsedEl = document.getElementById("client-current-pack-used");
const clientAssignPackFieldsEl = document.getElementById("client-assign-pack-fields");
const clientAssignPackTemplateEl = document.getElementById("client-assign-pack-template");
const assignClientPackBtn = document.getElementById("assign-client-pack-btn");
const clientPackEditorNoteEl = document.getElementById("client-pack-editor-note");
const clientPackActionsEl = document.getElementById("client-pack-actions");
const editClientMembershipBtn = document.getElementById("edit-client-membership-btn");
const saveClientMembershipBtn = document.getElementById("save-client-membership-btn");
const clientImportModalEl = document.getElementById("client-import-modal");
const closeClientImportModalBtn = document.getElementById("close-client-import-modal-btn");
const clientImportFileEl = document.getElementById("client-import-file");
const importClientsFileBtn = document.getElementById("import-clients-file-btn");
const clientImportResultEl = document.getElementById("client-import-result");

const packModalEl = document.getElementById("pack-modal");
const packFormEl = document.getElementById("pack-form");
const closePackModalBtn = document.getElementById("close-pack-modal-btn");
const packNameEl = document.getElementById("pack-name");
const packTypeEl = document.getElementById("pack-type");
const packClassCountEl = document.getElementById("pack-class-count");
const packPriceEl = document.getElementById("pack-price");
const packDetailsEl = document.getElementById("pack-details");
const deletePackBtn = document.getElementById("delete-pack-btn");
const savePackBtn = document.getElementById("save-pack-btn");

const clientPackModalEl = document.getElementById("client-pack-modal");
const clientPackFormEl = document.getElementById("client-pack-form");
const closeClientPackModalBtn = document.getElementById("close-client-pack-modal-btn");
const editClientPackBtn = document.getElementById("edit-client-pack-btn");
const clientPackModalTitleEl = document.getElementById("client-pack-modal-title");
const clientPackDetailCardEl = document.getElementById("client-pack-detail-card");
const clientPackDetailTypeEl = document.getElementById("client-pack-detail-type");
const clientPackDetailClientEl = document.getElementById("client-pack-detail-client");
const clientPackDetailTemplateEl = document.getElementById("client-pack-detail-template");
const clientPackDetailTotalEl = document.getElementById("client-pack-detail-total");
const clientPackDetailUsedEl = document.getElementById("client-pack-detail-used");
const clientPackDetailStatusEl = document.getElementById("client-pack-detail-status");
const clientPackClientLabelEl = document.getElementById("client-pack-client-label");
const clientPackClientIdEl = document.getElementById("client-pack-client-id");
const clientPackTemplateLabelEl = document.getElementById("client-pack-template-label");
const clientPackTemplateIdEl = document.getElementById("client-pack-template-id");
const clientPackRemainingLabelEl = document.getElementById("client-pack-remaining-label");
const clientPackRemainingClassesEl = document.getElementById("client-pack-remaining-classes");
const saveClientPackBtn = document.getElementById("save-client-pack-btn");

const bookingModalEl = document.getElementById("booking-modal");
const bookingFormEl = document.getElementById("booking-form");
const closeBookingModalBtn = document.getElementById("close-booking-modal-btn");
const bookingClientListEl = document.getElementById("booking-client-list");
const bookingClientSearchEl = document.getElementById("booking-client-search");
const bookingModalTitleEl = document.getElementById("booking-modal-title");
const bookingDetailsEl = document.getElementById("booking-details");
const bookingPackModalEl = document.getElementById("booking-pack-modal");
const bookingPackFormEl = document.getElementById("booking-pack-form");
const bookingPackClientListEl = document.getElementById("booking-pack-client-list");
const closeBookingPackModalBtn = document.getElementById("close-booking-pack-modal-btn");

const classTemplateModalEl = document.getElementById("class-template-modal");
const classTemplateFormEl = document.getElementById("class-template-form");
const closeClassTemplateModalBtn = document.getElementById("close-class-template-modal-btn");
const classTemplateNameEl = document.getElementById("class-template-name");
const classTemplateCoachEl = document.getElementById("class-template-coach");
const classTemplateLanguageEl = document.getElementById("class-template-language");
const classTemplateDurationEl = document.getElementById("class-template-duration");
const classTemplateCapacityEl = document.getElementById("class-template-capacity");
const classTemplateColorEl = document.getElementById("class-template-color");
const deleteClassTemplateBtn = document.getElementById("delete-class-template-btn");
const saveClassTemplateBtn = document.getElementById("save-class-template-btn");

const savedAdminReturnPage_ = sessionStorage.getItem("bookmyclass.adminReturnPage");
const savedAdminReturnWeek_ = sessionStorage.getItem("bookmyclass.adminReturnWeek");
sessionStorage.removeItem("bookmyclass.adminReturnPage");
sessionStorage.removeItem("bookmyclass.adminReturnWeek");
const savedAdminReturnWeekDate_ = savedAdminReturnWeek_
  ? new Date(savedAdminReturnWeek_)
  : null;
let currentPage = ["dashboard", "schedule", "clients", "packs", "settings"].includes(savedAdminReturnPage_)
  ? savedAdminReturnPage_
  : "dashboard";
let currentWeekStart = savedAdminReturnWeekDate_ && !Number.isNaN(savedAdminReturnWeekDate_.getTime())
  ? getStartOfWeek_(savedAdminReturnWeekDate_)
  : getStartOfWeek_(new Date());
let currentWeekId_ = getWeekId_(currentWeekStart);
let currentWeekStatus_ = "draft";
let sidebarCalendarMonthDate_ = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), 1);
let dashboardMonthDate_ = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

let schedules_ = [];
let draftScheduleItems_ = [];
const scheduleWeekCache_ = new Map();
const scheduleWeekRequestCache_ = new Map();
const scheduleDraftCache_ = new Map();
const dirtyScheduleWeekIds_ = new Set();
const SCHEDULE_WEEK_PREFETCH_RADIUS = 2;
let clients_ = [];
let packs_ = [];
let clientPacks_ = [];
let bookings_ = [];
let classTemplates_ = [];
let businessMembers_ = [];
let currentBusiness_ = null;
let currentMember_ = null;
let clientsSearchQuery_ = "";
let clientsSearchExpanded_ = false;
let clientsFilter_ = "all";
let clientsSort_ = "az";
let isClientSelectionMode_ = false;
let isDeletingSelectedClients_ = false;
const selectedClientIds_ = new Set();

let editingScheduleItemId_ = null;
let editingClientId_ = null;
let editingPackId_ = null;
let editingClientPackId_ = null;
let isEditingClientPackRemaining_ = false;
let isEditingClientMembership_ = false;
let editingClassTemplateId_ = null;
let isClientDetailsEditing_ = false;
let isEditingSchedule_ = false;
let selectedScheduleForBookingId_ = null;
let pendingPackBooking_ = null;
let pendingConfirmResolve_ = null;
let isDashboardWeekTransitioning_ = false;
let dashboardScheduleLoadKey_ = "";
let actionFeedbackTimer_ = null;

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
 * Keep the owner/admin client-preview switch in sync with schedule editing.
 *
 * @returns {void}
 */
function syncClientViewSwitch_() {
  if (!clientViewSwitchBtn) {
    return;
  }

  const canPreview = currentPage === "schedule" && ["owner", "admin"].includes(String(currentMember_?.role || ""));
  clientViewSwitchBtn.classList.toggle("hidden", !canPreview);
  clientViewSwitchBtn.disabled = isEditingSchedule_;
  clientViewSwitchBtn.title = isEditingSchedule_
    ? "Finish or cancel schedule editing before switching views."
    : "Preview the published schedule as a client.";
}

/**
 * Return a valid hex color or the default schedule color.
 *
 * @param {unknown} value
 * @returns {string}
 */
function normalizeColor_(value) {
  const color = String(value || "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : EVENT_COLORS[0];
}

/**
 * Return true when a schedule item belongs to a recurring series.
 *
 * @param {Object|null} item
 * @returns {boolean}
 */
function isRecurringScheduleItem_(item) {
  return item?.isRecurring === true || Boolean(item?.recurringId);
}

/**
 * Read a small logo image file as a data URL.
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
function readLogoFile_(file) {
  return new Promise((resolve, reject) => {
    if (file.size > 120 * 1024) {
      reject(new Error("Logo must be under 120 KB."));
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(new Error("Failed to read logo file.")));
    reader.readAsDataURL(file);
  });
}

/**
 * Apply business branding in the sidebar.
 *
 * @param {Object|null} business
 * @returns {void}
 */
function applyBusinessBranding_(business) {
  if (businessNameEl) {
    businessNameEl.textContent = business?.name || "#Company Name";
  }

  if (businessSloganEl) {
    businessSloganEl.textContent = business?.description || "# Company Slogan";
  }

  if (!brandLogoEl) {
    return;
  }

  brandLogoEl.textContent = "";
  brandLogoEl.style.backgroundImage = "url(\"./assets/figma/surf-school-logo.png\")";
  brandLogoEl.setAttribute("aria-label", `${business?.name || "Business"} logo`);

  const businessLogo = business?.logoDataUrl || business?.logoUrl || "";
  if (businessLogo) {
    brandLogoEl.style.backgroundImage = `url("${businessLogo}")`;
    brandLogoEl.style.backgroundSize = "cover";
    brandLogoEl.style.backgroundPosition = "center";
  }
}

/**
 * Show a toast notification.
 *
 * @param {string} message
 * @param {"default"|"success"|"error"} type
 * @param {number=} duration
 * @returns {void}
 */
function showToast_(message, type = "default", duration = 3500) {
  showReactToast(message, type, duration);
}

/** Animate a small confirmation mark for quick actions that need no message. */
function showActionFeedback_(type = "success") {
  let feedback = document.getElementById("action-feedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.id = "action-feedback";
    feedback.className = "action-feedback";
    feedback.setAttribute("aria-hidden", "true");
    document.body.appendChild(feedback);
  }

  clearTimeout(actionFeedbackTimer_);
  feedback.className = `action-feedback is-${type}`;
  feedback.textContent = type === "success" ? "\u2713" : "!";
  void feedback.offsetWidth;
  feedback.classList.add("is-visible");
  actionFeedbackTimer_ = setTimeout(() => {
    feedback.classList.remove("is-visible");
  }, 1100);
}

/**
 * Show a modal confirmation dialog.
 *
 * @param {{title: string, message: string, confirmLabel?: string}} options
 * @returns {Promise<boolean>}
 */
function openConfirmDialog_(options) {
  if (!confirmModalEl) {
    return Promise.resolve(window.confirm(options.message));
  }

  if (confirmTitleEl) {
    confirmTitleEl.textContent = options.title;
  }

  if (confirmMessageEl) {
    confirmMessageEl.textContent = options.message;
  }

  if (confirmActionBtn) {
    confirmActionBtn.textContent = options.confirmLabel || "Confirm";
  }

  confirmModalEl.classList.remove("hidden");

  return new Promise((resolve) => {
    pendingConfirmResolve_ = resolve;
  });
}

/**
 * Close the confirmation dialog.
 *
 * @param {boolean} confirmed
 * @returns {void}
 */
function closeConfirmDialog_(confirmed) {
  if (confirmModalEl) {
    confirmModalEl.classList.add("hidden");
  }

  if (pendingConfirmResolve_) {
    pendingConfirmResolve_(confirmed);
    pendingConfirmResolve_ = null;
  }
}

/**
 * Put a button into loading state.
 *
 * @param {HTMLButtonElement|null} btn
 * @param {string=} loadingLabel
 * @returns {() => void}
 */
function setButtonLoading_(btn, loadingLabel = "Loading…") {
  if (!btn) {
    return () => { };
  }

  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<span class="btn-spinner"></span>${escapeHtml_(loadingLabel)}`;

  return () => {
    btn.disabled = false;
    btn.innerHTML = original;
  };
}

const CLIENT_COUNTRIES_ = {
  PT: { name: "Portugal", code: "PT", flagSrc: "/assets/flags/pt.png" },
  ES: { name: "Spain", code: "ES", flagSrc: "/assets/flags/es.png" },
  FR: { name: "France", code: "FR", flagSrc: "/assets/flags/fr.png" },
  GB: { name: "England", code: "EN", flagSrc: "/assets/flags/gb-eng.png" },
  DE: { name: "Germany", code: "DE", flagSrc: "/assets/flags/de.png" },
  NL: { name: "Netherlands", code: "NL", flagSrc: "/assets/flags/nl.png" },
  BE: { name: "Belgium", code: "BE", flagSrc: "/assets/flags/be.png" },
  LU: { name: "Luxembourg", code: "LU", flagSrc: "/assets/flags/lu.png" },
  CH: { name: "Switzerland", code: "CH", flagSrc: "/assets/flags/ch.png" },
  IE: { name: "Ireland", code: "IE", flagSrc: "/assets/flags/ie.png" },
  US: { name: "United States", code: "US", flagSrc: "/assets/flags/us.png" }
};

function updateClientCountryField_() {
  const isOther = clientCountryEl?.value === "OTHER";
  clientCountryOtherLabelEl?.classList.toggle("hidden", !isOther);

  if (clientCountryOtherEl) {
    clientCountryOtherEl.disabled = !isOther || Boolean(clientCountryEl?.disabled);
  }
}

function setClientCountryValue_(country) {
  const value = String(country || "").trim();

  if (CLIENT_COUNTRIES_[value]) {
    clientCountryEl.value = value;
    clientCountryOtherEl.value = "";
  } else if (value) {
    clientCountryEl.value = "OTHER";
    clientCountryOtherEl.value = value;
  } else {
    clientCountryEl.value = "";
    clientCountryOtherEl.value = "";
  }

  updateClientCountryField_();
}

function getClientCountryDisplay_(country) {
  const value = String(country || "").trim();
  const knownCountry = CLIENT_COUNTRIES_[value];

  if (knownCountry) {
    return { ...knownCountry, value, isKnown: true };
  }

  if (value) {
    return { name: value, flagSrc: "", value, isKnown: false };
  }

  return { name: "No country", flagSrc: "", value: "\u2014", isKnown: false };
}

/**
 * Show a loading overlay inside a modal card.
 *
 * @param {HTMLElement|null} modalEl
 * @returns {() => void}
 */
function showModalLoader_(modalEl) {
  if (!modalEl) {
    return () => { };
  }

  const card = modalEl.querySelector(".modal-card");
  if (!card) {
    return () => { };
  }

  let overlay = card.querySelector(".action-loading-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "action-loading-overlay";
    card.appendChild(overlay);
  }

  overlay.classList.remove("is-success");
  overlay.innerHTML = `<div class="app-loader-spinner"></div>`;
  overlay.classList.add("visible");

  return () => {
    overlay.classList.remove("visible");
  };
}

/** Replace a modal loader with its success confirmation. */
function showModalSuccess_(modalEl, message) {
  const overlay = modalEl?.querySelector(".action-loading-overlay");
  if (!overlay) {
    return Promise.resolve();
  }

  overlay.classList.add("visible", "is-success");
  overlay.innerHTML = `
    <div class="modal-success-feedback" role="status">
      <span aria-hidden="true">&#10003;</span>
      <strong>${escapeHtml_(message)}</strong>
    </div>
  `;

  return new Promise((resolve) => setTimeout(resolve, 700));
}

/**
 * Show global app loader.
 *
 * @returns {void}
 */
function showAppLoader_() {
  if (appLoaderEl) {
    appLoaderEl.classList.remove("hidden");
  }
}

/**
 * Hide global app loader.
 *
 * @returns {void}
 */
function hideAppLoader_() {
  if (appLoaderEl) {
    appLoaderEl.classList.add("hidden");
  }
}

/**
 * Register click outside to close a modal.
 *
 * @param {HTMLElement|null} modalEl
 * @param {Function} closeFn
 * @returns {void}
 */
function registerClickOutside_(modalEl, closeFn) {
  if (!modalEl) {
    return;
  }

  modalEl.addEventListener("click", (event) => {
    if (event.target === modalEl) {
      closeFn();
    }
  });
}

/**
 * Put client detail fields into read-only or edit mode.
 *
 * @param {boolean} isEditing
 * @returns {void}
 */
function setClientDetailEditing_(isEditing) {
  isClientDetailsEditing_ = isEditing;

  [clientFirstNameEl, clientLastNameEl, clientEmailEl, clientPhoneEl, clientCountryEl, clientCountryOtherEl, clientCanBookEl].forEach((field) => {
    if (field) {
      field.disabled = !isEditing;
    }
  });
  updateClientCountryField_();

  if (editClientBtn) {
    editClientBtn.classList.toggle("hidden", !editingClientId_ || isEditing);
  }

  if (deleteClientBtn) {
    deleteClientBtn.classList.toggle("hidden", !editingClientId_);
  }

  if (saveClientBtn) {
    saveClientBtn.classList.toggle("hidden", Boolean(editingClientId_ && !isEditing));
    saveClientBtn.textContent = editingClientId_ ? "Save details" : "Create client";
  }

}

/**
 * Toggle editing for only the Membership column.
 *
 * @param {boolean} isEditing
 * @returns {void}
 */
function setClientMembershipEditing_(isEditing) {
  isEditingClientMembership_ = isEditing;
  const hasCurrentPack = Boolean(clientCurrentPackRemainingEl?.dataset.clientPackId);

  if (clientCurrentPackRemainingEl) {
    clientCurrentPackRemainingEl.disabled = !isEditing;
    if (isEditing) {
      clientCurrentPackRemainingEl.focus();
      clientCurrentPackRemainingEl.select();
    }
  }

  editClientMembershipBtn?.classList.toggle("hidden", !hasCurrentPack || isEditing);
  saveClientMembershipBtn?.classList.toggle("hidden", !hasCurrentPack || !isEditing);
}

/**
 * Return the newest active pack that still has credits.
 *
 * @param {string|null} clientId
 * @returns {Object|null}
 */
function getCurrentClientPack_(clientId) {
  return clientPacks_
    .filter((pack) =>
      pack.clientId === clientId &&
      String(pack.status || "active") === "active" &&
      Number(pack.remainingClasses || 0) > 0
    )
    .sort((a, b) => new Date(b.purchasedAt || 0) - new Date(a.purchasedAt || 0))[0] || null;
}

/**
 * Render pack controls inside the client detail modal.
 *
 * @param {string|null} clientId
 * @returns {void}
 */
function renderClientPackEditor_(clientId) {
  if (!clientPackEditorEl) {
    return;
  }

  clientPackEditorEl.classList.toggle("hidden", !clientId);

  if (!clientId) {
    isEditingClientMembership_ = false;
    clientPackActionsEl?.classList.add("hidden");
    if (clientCurrentPackRemainingEl) {
      clientCurrentPackRemainingEl.value = "";
      clientCurrentPackRemainingEl.dataset.clientPackId = "";
      clientCurrentPackRemainingEl.disabled = true;
    }
    return;
  }

  const currentPack = getCurrentClientPack_(clientId);
  const latestPreviousPack = clientPacks_
    .filter((pack) => pack.clientId === clientId)
    .sort((a, b) => new Date(b.purchasedAt || 0) - new Date(a.purchasedAt || 0))[0] || null;

  clientCurrentPackDetailsEl?.classList.toggle("hidden", !currentPack);
  clientAssignPackFieldsEl?.classList.toggle("hidden", Boolean(currentPack));
  clientPackActionsEl?.classList.toggle("hidden", !currentPack);

  if (clientCurrentPackNameEl) {
    clientCurrentPackNameEl.textContent = currentPack?.packTemplateName || "No active pack";
  }

  if (clientCurrentPackStatusEl) {
    clientCurrentPackStatusEl.textContent = currentPack ? "Active Pack" : "No Credits";
    clientCurrentPackStatusEl.className = `client-status-pill ${currentPack ? "is-active" : "is-empty"}`;
  }

  if (clientCurrentPackRemainingEl) {
    clientCurrentPackRemainingEl.value = currentPack ? String(Number(currentPack.remainingClasses || 0)) : "";
    clientCurrentPackRemainingEl.max = currentPack ? String(Number(currentPack.totalClasses || 0)) : "";
    clientCurrentPackRemainingEl.dataset.clientPackId = currentPack?.id || "";
    clientCurrentPackRemainingEl.disabled = true;
  }

  if (clientCurrentPackTotalEl) {
    clientCurrentPackTotalEl.textContent = `${Number(currentPack?.totalClasses || 0)} total`;
  }

  if (clientCurrentPackUsedEl) {
    clientCurrentPackUsedEl.textContent = `${Number(currentPack?.usedClasses || 0)} used`;
  }

  if (clientAssignPackTemplateEl) {
    clientAssignPackTemplateEl.innerHTML = packs_.length
      ? packs_.map((pack) => `
          <option value="${escapeHtml_(pack.id)}">
            ${escapeHtml_(pack.name || "Unnamed pack")} - ${Number(pack.classCount || 0)} classes
          </option>
        `).join("")
      : `<option value="">Create a pack template first</option>`;
    clientAssignPackTemplateEl.disabled = packs_.length === 0;
  }

  if (assignClientPackBtn) {
    assignClientPackBtn.disabled = packs_.length === 0;
  }

  if (clientPackEditorNoteEl) {
    clientPackEditorNoteEl.textContent = currentPack
      ? "Changing classes left also updates the used count and pack status."
      : latestPreviousPack
        ? `Previous pack: ${latestPreviousPack.packTemplateName || "Pack"} (${Number(latestPreviousPack.remainingClasses || 0)} left).`
        : "Assign a pack so this client can book with credits.";
  }

  setClientMembershipEditing_(false);
}

/**
 * Show or hide the no-email self-booking note.
 *
 * @returns {void}
 */
function updateClientEmailNote_() {
  if (!clientEmailNoteEl) {
    return;
  }

  const hasEmail = Boolean(clientEmailEl?.value.trim());
  clientEmailEl?.setCustomValidity("");
  clientEmailNoteEl.classList.remove("form-note-error");
  clientEmailNoteEl.textContent = "Without an email address, this client can be managed by admins but will not be able to book classes themselves.";
  clientEmailNoteEl.classList.toggle("hidden", hasEmail);
}

/**
 * Render read-only booking and pack activity for one client.
 *
 * @param {string|null} clientId
 * @returns {void}
 */
function renderClientBookingHistory_(clientId) {
  if (!clientBookingHistoryEl) {
    return;
  }

  if (!clientId) {
    clientBookingHistoryEl.innerHTML = `<div class="empty-state small">Activity appears after this client is created.</div>`;
    return;
  }

  const bookingActivity = bookings_
    .filter((booking) => booking.clientId === clientId)
    .map((booking) => ({
      type: "booking",
      date: booking.startAt ? new Date(booking.startAt) : null,
      startAt: booking.startAt || null,
      className: booking.className || "Class",
      title: booking.className || "Class",
      detail: booking.startAt
        ? `${formatFullDate_(new Date(booking.startAt))} · ${formatEventTime_(booking)}`
        : "No date",
      status: booking.status || "booked"
    }));
  const packActivity = clientPacks_
    .filter((pack) => pack.clientId === clientId)
    .map((pack) => ({
      type: "pack",
      date: pack.purchasedAt ? new Date(pack.purchasedAt) : null,
      startAt: pack.purchasedAt || null,
      totalClasses: Number(pack.totalClasses || 0),
      className: `${pack.packTemplateName || "Pack"} assigned`,
      title: `${pack.packTemplateName || "Pack"} assigned`,
      detail: pack.purchasedAt
        ? `${formatFullDate_(new Date(pack.purchasedAt))} · ${Number(pack.totalClasses || 0)} classes`
        : `${Number(pack.totalClasses || 0)} classes`,
      status: "Pack"
    }));
  const activity = [...bookingActivity, ...packActivity]
    .sort((a, b) => (b.date?.getTime?.() || 0) - (a.date?.getTime?.() || 0));

  clientBookingHistoryEl.innerHTML = activity.length
    ? activity.map((item) => {
      const booking = item;
      const startDate = item.date;

      return `
        <div class="client-history-row${item.type === "pack" ? " is-pack-event" : ""}">
          <span class="client-history-marker" aria-hidden="true"></span>
          <div>
            <strong>${escapeHtml_(booking.className || "Class")}</strong>
            <p>${escapeHtml_(startDate ? `${formatFullDate_(startDate)} · ${formatEventTime_(booking)}` : "No date")}</p>
          </div>
          <span class="badge ${booking.status === "booked" ? "badge-success" : "badge-muted"}">${escapeHtml_(booking.status || "booked")}</span>
        </div>
      `;
    }).join("")
    : `<div class="empty-state small">No activity yet.</div>`;
}

/**
 * Open client modal in create or edit mode.
 *
 * @param {Object|null} client
 * @returns {void}
 */
function openClientModal_(client = null) {
  editingClientId_ = client?.id || null;

  const modalTitleEl = clientModalEl?.querySelector(".modal-header h3");
  const submitBtnEl = clientFormEl?.querySelector('button[type="submit"]');

  if (modalTitleEl) {
    modalTitleEl.textContent = client ? (client.fullName || "Client details") : "Add client";
  }

  if (submitBtnEl) {
    submitBtnEl.textContent = client ? "Save details" : "Create client";
  }

  if (clientFirstNameEl) {
    clientFirstNameEl.value = client?.firstName || "";
  }

  if (clientLastNameEl) {
    clientLastNameEl.value = client?.lastName || "";
  }

  if (clientEmailEl) {
    clientEmailEl.value = client?.email || "";
  }

  if (clientPhoneEl) {
    clientPhoneEl.value = client?.phone || "";
  }

  if (clientCountryEl) {
    setClientCountryValue_(client?.country);
  }

  if (clientCanBookEl) {
    clientCanBookEl.checked = typeof client?.canBook === "boolean" ? client.canBook : true;
  }

  renderClientBookingHistory_(editingClientId_);
  setClientDetailEditing_(!client);
  renderClientPackEditor_(editingClientId_);
  updateClientEmailNote_();

  if (clientModalEl) {
    clientModalEl.classList.remove("hidden");
  }
}

/**
 * Close client modal.
 *
 * @returns {void}
 */
function closeClientModal_() {
  editingClientId_ = null;
  isClientDetailsEditing_ = false;
  isEditingClientMembership_ = false;

  if (clientModalEl) {
    clientModalEl.classList.add("hidden");
  }

  if (clientFormEl) {
    clientFormEl.reset();
  }

  if (clientCanBookEl) {
    clientCanBookEl.checked = true;
  }

  if (clientCountryEl) {
    setClientCountryValue_("");
  }

  const modalTitleEl = clientModalEl?.querySelector(".modal-header h3");
  const submitBtnEl = clientFormEl?.querySelector('button[type="submit"]');

  if (modalTitleEl) {
    modalTitleEl.textContent = "Add client";
  }

  if (submitBtnEl) {
    submitBtnEl.textContent = "Create client";
  }

  renderClientBookingHistory_(null);
  renderClientPackEditor_(null);
  setClientDetailEditing_(true);
  updateClientEmailNote_();
}

/**
 * Render import result details.
 *
 * @param {Object|null} result
 * @returns {void}
 */
function renderClientImportResult_(result) {
  if (!clientImportResultEl) {
    return;
  }

  if (!result) {
    clientImportResultEl.classList.add("hidden");
    clientImportResultEl.innerHTML = "";
    return;
  }

  const skipped = Array.isArray(result.skipped) ? result.skipped : [];
  const errors = Array.isArray(result.errors) ? result.errors : [];
  const details = [...skipped, ...errors].slice(0, 8);
  const detailsHtml = details.length
    ? `
      <ul class="client-import-result-list">
        ${details.map((item) => `
          <li>Row ${escapeHtml_(item.rowNumber)}: ${escapeHtml_(item.reason || "Not imported")}</li>
        `).join("")}
      </ul>
    `
    : "";

  clientImportResultEl.innerHTML = `
    <div class="client-import-result-summary">
      <strong>${Number(result.importedCount || 0)} imported</strong>
      <span>${Number(result.skippedCount || 0)} skipped</span>
      <span>${Number(result.errorCount || 0)} errors</span>
    </div>
    ${detailsHtml}
  `;
  clientImportResultEl.classList.remove("hidden");
}

/**
 * Open client import modal.
 *
 * @returns {void}
 */
function openClientImportModal_() {
  renderClientImportResult_(null);
  clientImportModalEl?.classList.remove("hidden");
}

/**
 * Close client import modal.
 *
 * @returns {void}
 */
function closeClientImportModal_() {
  clientImportModalEl?.classList.add("hidden");
}

/**
 * Open pack modal.
 *
 * @returns {void}
 */
function openPackModal_(type = "credits", pack = null) {
  editingPackId_ = pack?.id || null;
  const modalTitleEl = packModalEl?.querySelector(".modal-header h3");

  if (modalTitleEl) {
    modalTitleEl.textContent = pack ? "Edit pack" : "Add pack";
  }

  if (packNameEl) {
    packNameEl.value = pack?.name || "";
  }

  if (packTypeEl) {
    packTypeEl.value = pack?.type || type;
  }

  if (packClassCountEl) {
    packClassCountEl.value = String(pack?.classCount || 10);
  }

  if (packPriceEl) {
    packPriceEl.value = String(pack?.price || 0);
  }

  if (packDetailsEl) {
    packDetailsEl.value = pack?.details || "";
  }

  if (deletePackBtn) {
    deletePackBtn.classList.toggle("hidden", !editingPackId_);
  }

  if (savePackBtn) {
    savePackBtn.textContent = pack ? "Save changes" : "Create pack";
  }

  if (packModalEl) {
    packModalEl.classList.remove("hidden");
  }
}

/**
 * Close pack modal.
 *
 * @returns {void}
 */
function closePackModal_() {
  editingPackId_ = null;

  if (packModalEl) {
    packModalEl.classList.add("hidden");
  }

  if (packFormEl) {
    packFormEl.reset();
  }

  if (packTypeEl) {
    packTypeEl.value = "credits";
  }

  if (packClassCountEl) {
    packClassCountEl.value = "10";
  }

  if (packPriceEl) {
    packPriceEl.value = "0";
  }

  if (deletePackBtn) {
    deletePackBtn.classList.add("hidden");
  }

  if (savePackBtn) {
    savePackBtn.textContent = "Create pack";
  }

  const modalTitleEl = packModalEl?.querySelector(".modal-header h3");
  if (modalTitleEl) {
    modalTitleEl.textContent = "Add pack";
  }
}

/**
 * Fill client pack selects.
 *
 * @returns {void}
 */
function populateClientPackSelects_() {
  if (clientPackClientIdEl) {
    clientPackClientIdEl.innerHTML = clients_
      .map((client) => `<option value="${escapeHtml_(client.id)}">${escapeHtml_(client.fullName)}</option>`)
      .join("");
  }

  if (clientPackTemplateIdEl) {
    clientPackTemplateIdEl.innerHTML = packs_
      .map((pack) => `<option value="${escapeHtml_(pack.id)}">${escapeHtml_(pack.name)}</option>`)
      .join("");
  }
}

/**
 * Toggle assigned pack remaining classes edit mode.
 *
 * @param {boolean} isEditing
 * @returns {void}
 */
function setClientPackRemainingEditing_(isEditing) {
  isEditingClientPackRemaining_ = isEditing;

  if (clientPackRemainingClassesEl) {
    clientPackRemainingClassesEl.disabled = !isEditing;
    if (isEditing) {
      clientPackRemainingClassesEl.focus();
      clientPackRemainingClassesEl.select();
    }
  }

  if (editClientPackBtn) {
    editClientPackBtn.classList.toggle("hidden", !editingClientPackId_ || isEditing);
  }

  if (saveClientPackBtn) {
    saveClientPackBtn.classList.toggle("hidden", Boolean(editingClientPackId_ && !isEditing));
    saveClientPackBtn.textContent = editingClientPackId_ ? "Save classes left" : "Assign pack";
  }
}

/**
 * Open client pack modal.
 *
 * @param {Object|null=} clientPack
 * @returns {void}
 */
function openClientPackModal_(clientPack = null) {
  editingClientPackId_ = clientPack?.id || null;
  populateClientPackSelects_();
  const isDetailMode = Boolean(clientPack);

  if (clientPackModalTitleEl) {
    clientPackModalTitleEl.textContent = isDetailMode ? "Client pack" : "Assign pack to client";
  }

  if (clientPackDetailCardEl) {
    clientPackDetailCardEl.classList.toggle("hidden", !isDetailMode);
  }

  if (clientPackClientLabelEl) {
    clientPackClientLabelEl.classList.toggle("hidden", isDetailMode);
  }

  if (clientPackTemplateLabelEl) {
    clientPackTemplateLabelEl.classList.toggle("hidden", isDetailMode);
  }

  if (clientPackDetailTypeEl && clientPack) {
    clientPackDetailTypeEl.textContent = clientPack.type === "monthly" ? "Monthly" : "Normal";
  }

  if (clientPackDetailClientEl && clientPack) {
    clientPackDetailClientEl.textContent = clientPack.clientName || "Client";
  }

  if (clientPackDetailTemplateEl && clientPack) {
    clientPackDetailTemplateEl.textContent = clientPack.packTemplateName || "Pack";
  }

  if (clientPackDetailTotalEl && clientPack) {
    clientPackDetailTotalEl.textContent = `of ${Number(clientPack.totalClasses || 0)} classes`;
  }

  if (clientPackDetailUsedEl && clientPack) {
    clientPackDetailUsedEl.textContent = `${Number(clientPack.usedClasses || 0)} used`;
  }

  if (clientPackDetailStatusEl && clientPack) {
    clientPackDetailStatusEl.textContent = clientPack.status || "active";
  }

  if (clientPackClientIdEl) {
    clientPackClientIdEl.value = clientPack?.clientId || clientPackClientIdEl.value;
    clientPackClientIdEl.disabled = isDetailMode;
  }

  if (clientPackTemplateIdEl) {
    clientPackTemplateIdEl.value = clientPack?.packTemplateId || clientPackTemplateIdEl.value;
    clientPackTemplateIdEl.disabled = isDetailMode;
  }

  if (clientPackRemainingLabelEl) {
    clientPackRemainingLabelEl.classList.toggle("hidden", !isDetailMode);
  }

  if (clientPackRemainingClassesEl) {
    clientPackRemainingClassesEl.value = clientPack ? String(Number(clientPack.remainingClasses || 0)) : "";
    clientPackRemainingClassesEl.max = clientPack ? String(Number(clientPack.totalClasses || 0)) : "";
  }

  setClientPackRemainingEditing_(false);

  if (clientPackModalEl) {
    clientPackModalEl.classList.remove("hidden");
  }
}

/**
 * Close client pack modal.
 *
 * @returns {void}
 */
function closeClientPackModal_() {
  editingClientPackId_ = null;
  isEditingClientPackRemaining_ = false;

  if (clientPackModalEl) {
    clientPackModalEl.classList.add("hidden");
  }

  if (clientPackFormEl) {
    clientPackFormEl.reset();
  }

  if (clientPackClientIdEl) {
    clientPackClientIdEl.disabled = false;
  }

  if (clientPackTemplateIdEl) {
    clientPackTemplateIdEl.disabled = false;
  }

  if (clientPackRemainingLabelEl) {
    clientPackRemainingLabelEl.classList.add("hidden");
  }

  if (clientPackDetailCardEl) {
    clientPackDetailCardEl.classList.add("hidden");
  }

  if (clientPackClientLabelEl) {
    clientPackClientLabelEl.classList.remove("hidden");
  }

  if (clientPackTemplateLabelEl) {
    clientPackTemplateLabelEl.classList.remove("hidden");
  }

  if (editClientPackBtn) {
    editClientPackBtn.classList.add("hidden");
  }

  if (saveClientPackBtn) {
    saveClientPackBtn.classList.remove("hidden");
    saveClientPackBtn.textContent = "Assign pack";
  }
}

/**
 * Open booking modal for one schedule event.
 *
 * @param {string} scheduleId
 * @returns {void}
 */
function openBookingModal_(scheduleId) {
  selectedScheduleForBookingId_ = scheduleId;

  if (bookingClientSearchEl) {
    bookingClientSearchEl.value = "";
  }

  if (bookingModalTitleEl) {
    bookingModalTitleEl.textContent = "Book client";
  }

  if (bookingDetailsEl) {
    bookingDetailsEl.classList.add("hidden");
    bookingDetailsEl.innerHTML = "";
  }

  if (bookingFormEl) {
    bookingFormEl.classList.remove("hidden");
  }

  if (bookingClientListEl) {
    const availableClients = clients_.filter((client) => client.canBook);

    bookingClientListEl.innerHTML = availableClients.length
      ? availableClients.map((client) => `
        <label
          class="checkbox-select-option"
          data-client-search="${escapeHtml_(
            `${client.fullName || ""} ${client.email || ""} ${client.phone || ""}`.toLocaleLowerCase()
          )}"
        >
          <input class="booking-client-checkbox" type="checkbox" value="${escapeHtml_(client.id)}" />
          <span>
            <strong>${escapeHtml_(client.fullName || "Unnamed client")}</strong>
            <em>${escapeHtml_(client.email || client.phone || "No contact")}</em>
          </span>
        </label>
      `).join("")
      : `<div class="empty-state small">No clients can book this class.</div>`;
  }

  if (bookingModalEl) {
    bookingModalEl.classList.remove("hidden");
  }

  bookingClientSearchEl?.focus();
}

/**
 * Format when a booking was created.
 *
 * @param {Object} booking
 * @returns {string}
 */
function formatBookingCreatedAt_(booking) {
  const timestamp = booking.createdAt || booking.bookedAt || booking.updatedAt || "";

  if (!timestamp) {
    return "Booking time unavailable";
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Booking time unavailable";
  }

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/**
 * Open booking details for one schedule event.
 *
 * @param {string} scheduleId
 * @returns {void}
 */
function openBookingDetailsModal_(scheduleId) {
  const schedule = schedules_.find((item) => item.id === scheduleId)
    || draftScheduleItems_.find((item) => item.id === scheduleId);
  const eventBookings = bookings_
    .filter((booking) => booking.scheduleId === scheduleId)
    .sort((a, b) => {
      const left = new Date(a.createdAt || a.bookedAt || a.startAt || 0).getTime();
      const right = new Date(b.createdAt || b.bookedAt || b.startAt || 0).getTime();
      return left - right;
    });

  selectedScheduleForBookingId_ = null;

  if (bookingModalTitleEl) {
    bookingModalTitleEl.textContent = schedule?.className || "Booking details";
  }

  if (bookingFormEl) {
    bookingFormEl.classList.add("hidden");
  }

  if (bookingDetailsEl) {
    const eventTimeHtml = schedule
      ? `<p class="booking-details-subtitle">${escapeHtml_(formatEventTime_(schedule))}</p>`
      : "";
    const bookingsHtml = eventBookings.length
      ? eventBookings.map((booking) => `
        <article class="booking-details-row">
          <div>
            <strong>${escapeHtml_(booking.clientName || "Unnamed client")}</strong>
            <span>${escapeHtml_(booking.status || "booked")}</span>
          </div>
          <time>${escapeHtml_(formatBookingCreatedAt_(booking))}</time>
        </article>
      `).join("")
      : `<div class="empty-state small">No one is booked for this event yet.</div>`;

    bookingDetailsEl.innerHTML = `
      ${eventTimeHtml}
      <div class="booking-details-list">
        ${bookingsHtml}
      </div>
    `;
    bookingDetailsEl.classList.remove("hidden");
  }

  if (bookingModalEl) {
    bookingModalEl.classList.remove("hidden");
  }
}

/**
 * Close booking modal.
 *
 * @returns {void}
 */
function closeBookingModal_() {
  selectedScheduleForBookingId_ = null;

  if (bookingModalEl) {
    bookingModalEl.classList.add("hidden");
  }

  if (bookingFormEl) {
    bookingFormEl.reset();
    bookingFormEl.classList.remove("hidden");
  }

  if (bookingDetailsEl) {
    bookingDetailsEl.classList.add("hidden");
    bookingDetailsEl.innerHTML = "";
  }

  if (bookingModalTitleEl) {
    bookingModalTitleEl.textContent = "Book client";
  }
}

/**
 * Return true when a client has an active pack with remaining credits.
 *
 * @param {string} clientId
 * @returns {boolean}
 */
function clientHasUsablePack_(clientId) {
  return clientPacks_.some((clientPack) => {
    return (
      clientPack.clientId === clientId &&
      String(clientPack.status || "") === "active" &&
      Number(clientPack.remainingClasses || 0) > 0
    );
  });
}

/**
 * Close the pack assignment step opened from booking.
 *
 * @returns {void}
 */
function closeBookingPackModal_() {
  pendingPackBooking_ = null;

  if (bookingPackModalEl) {
    bookingPackModalEl.classList.add("hidden");
  }

  if (bookingPackFormEl) {
    bookingPackFormEl.reset();
  }

  if (bookingPackClientListEl) {
    bookingPackClientListEl.innerHTML = "";
  }
}

/**
 * Open one pack assignment card for each client without credits.
 *
 * @param {string[]} missingClientIds
 * @param {string[]} bookingClientIds
 * @param {string} scheduleId
 * @returns {void}
 */
function openBookingPackModal_(missingClientIds, bookingClientIds, scheduleId) {
  pendingPackBooking_ = {
    bookingClientIds: [...bookingClientIds],
    scheduleId
  };

  const availablePacks = packs_.filter((pack) => Number(pack.classCount || 0) > 0);
  const packOptionsHtml = availablePacks.map((pack) => `
    <option value="${escapeHtml_(pack.id)}">
      ${escapeHtml_(pack.name || "Unnamed pack")} - ${Number(pack.classCount || 0)} classes
    </option>
  `).join("");

  if (bookingPackClientListEl) {
    bookingPackClientListEl.innerHTML = missingClientIds.map((clientId) => {
      const client = clients_.find((item) => item.id === clientId);

      return `
        <article class="booking-pack-client-card">
          <div>
            <strong>${escapeHtml_(client?.fullName || "Unnamed client")}</strong>
            <span>${escapeHtml_(client?.email || client?.phone || "No contact")}</span>
          </div>
          <label>
            <span>Pack</span>
            <select class="booking-pack-template-select" data-client-id="${escapeHtml_(clientId)}" required>
              ${packOptionsHtml || `<option value="">No pack templates available</option>`}
            </select>
          </label>
        </article>
      `;
    }).join("");
  }

  closeBookingModal_();

  if (bookingPackModalEl) {
    bookingPackModalEl.classList.remove("hidden");
  }
}

/**
 * Create bookings and refresh schedule data.
 *
 * @param {string[]} clientIds
 * @param {string} scheduleId
 * @param {HTMLElement|null} feedbackModal
 * @returns {Promise<void>}
 */
async function completeClientBookings_(clientIds, scheduleId, feedbackModal = null) {
  const results = await Promise.allSettled(
    clientIds.map((clientId) => createBooking_({ clientId, scheduleId }))
  );
  const failedResults = results.filter((result) => result.status === "rejected");
  const missingCreditClientIds = results.flatMap((result, index) => {
    if (
      result.status === "rejected" &&
      String(result.reason?.message || "").includes("no active pack with remaining classes")
    ) {
      return [clientIds[index]];
    }

    return [];
  });

  if (failedResults.length === results.length && !missingCreditClientIds.length) {
    throw failedResults[0].reason;
  }

  const successfulCount = results.length - failedResults.length;
  const successMessage = successfulCount > 1
    ? `${successfulCount} bookings confirmed`
    : "Booking confirmed";

  if (successfulCount && failedResults.length && !missingCreditClientIds.length) {
    showToast_(`${successfulCount} booked, ${failedResults.length} failed.`, "error", 5200);
  }

  if (successfulCount) {
    scheduleWeekCache_.delete(currentWeekId_);
    scheduleWeekRequestCache_.delete(currentWeekId_);
    await loadCurrentScheduleWeek_({ force: true });
    clientPacks_ = await fetchClientPacks_();
    bookings_ = await fetchBookings_();
  }

  if (successfulCount && !failedResults.length) {
    await showModalSuccess_(feedbackModal, successMessage);
  }

  if (missingCreditClientIds.length) {
    openBookingPackModal_(
      missingCreditClientIds,
      missingCreditClientIds,
      scheduleId
    );
  }

  if (currentPage === "schedule") {
    renderSchedulePageV2_();
  } else if (currentPage === "dashboard") {
    renderDashboardPage_();
  }
}

/**
 * Open class template modal.
 *
 * @returns {void}
 */
function openClassTemplateModal_(template = null) {
  editingClassTemplateId_ = template?.id || null;
  const modalTitleEl = classTemplateModalEl?.querySelector(".modal-header h3");

  if (modalTitleEl) {
    modalTitleEl.textContent = template ? "Edit event template" : "Add event template";
  }

  if (classTemplateNameEl) {
    classTemplateNameEl.value = template?.className || "";
  }

  if (classTemplateCoachEl) {
    classTemplateCoachEl.value = template?.coachName || "";
  }

  if (classTemplateLanguageEl) {
    classTemplateLanguageEl.value = String(template?.language || "EN").toUpperCase();
  }

  if (classTemplateDurationEl) {
    classTemplateDurationEl.value = String(template?.durationMinutes || 60);
  }

  if (classTemplateCapacityEl) {
    classTemplateCapacityEl.value = String(template?.capacity || 10);
  }

  if (classTemplateColorEl) {
    const templateColor = normalizeColor_(template?.color || EVENT_COLORS[0]);
    classTemplateColorEl.value = EVENT_COLORS.includes(templateColor) ? templateColor : EVENT_COLORS[0];
    document.querySelectorAll(".color-picker-option").forEach((btn) => {
      const isActive = btn.dataset.color === classTemplateColorEl.value;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  if (deleteClassTemplateBtn) {
    deleteClassTemplateBtn.classList.toggle("hidden", !editingClassTemplateId_);
  }

  if (saveClassTemplateBtn) {
    saveClassTemplateBtn.textContent = template ? "Save changes" : "Create template";
  }

  if (classTemplateModalEl) {
    classTemplateModalEl.classList.remove("hidden");
  }
}

/**
 * Close class template modal.
 *
 * @returns {void}
 */
function closeClassTemplateModal_() {
  editingClassTemplateId_ = null;

  if (classTemplateModalEl) {
    classTemplateModalEl.classList.add("hidden");
  }

  if (classTemplateFormEl) {
    classTemplateFormEl.reset();
  }

  if (classTemplateDurationEl) {
    classTemplateDurationEl.value = "60";
  }

  if (classTemplateLanguageEl) {
    classTemplateLanguageEl.value = "EN";
  }

  if (classTemplateCapacityEl) {
    classTemplateCapacityEl.value = "10";
  }

  if (classTemplateColorEl) {
    classTemplateColorEl.value = EVENT_COLORS[0];
    document.querySelectorAll(".color-picker-option").forEach((btn) => {
      const isActive = btn.dataset.color === EVENT_COLORS[0];
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  if (deleteClassTemplateBtn) {
    deleteClassTemplateBtn.classList.add("hidden");
  }

  if (saveClassTemplateBtn) {
    saveClassTemplateBtn.textContent = "Create template";
  }

  const modalTitleEl = classTemplateModalEl?.querySelector(".modal-header h3");
  if (modalTitleEl) {
    modalTitleEl.textContent = "Add event template";
  }
}

/**
 * Open schedule modal in create or edit mode.
 *
 * @param {Object|null} item
 * @param {Date|null} clickedDate
 * @param {{recurring?: boolean, startTime?: string}=} options
 * @returns {void}
 */
function openScheduleModal_(item = null, clickedDate = null, options = {}) {
  if (item && !isEditingSchedule_) {
    openBookingModal_(item.id);
    return;
  }

  editingScheduleItemId_ = item?.id || null;
  const submitBtnEl = scheduleFormEl?.querySelector('button[type="submit"]');
  const isRecurring = isRecurringScheduleItem_(item) || options.recurring === true;

  if (scheduleModalTitleEl) {
    scheduleModalTitleEl.textContent = item
      ? (isRecurring ? "Edit recurring event" : "Edit event")
      : isRecurring ? "New recurring event" : "New event";
  }

  if (scheduleClassNameEl) {
    scheduleClassNameEl.value = item?.className || "";
  }

  if (scheduleCoachNameEl) {
    scheduleCoachNameEl.value = item?.coachName || "";
  }

  const baseDate = item?.startAt ? new Date(item.startAt) : (clickedDate || new Date());

  if (scheduleDateEl) {
    scheduleDateEl.value = formatDateInput_(baseDate);
  }

  if (scheduleStartTimeEl) {
    scheduleStartTimeEl.value = item?.startAt ? formatTimeInput_(new Date(item.startAt)) : options.startTime || "09:00";
  }

  if (scheduleDurationEl) {
    scheduleDurationEl.value = String(getScheduleDurationMinutes_(item));
  }

  if (scheduleCapacityEl) {
    scheduleCapacityEl.value = String(item?.capacity || 10);
  }

  if (scheduleRecurringEl) {
    scheduleRecurringEl.checked = isRecurring;
  }

  if (deleteScheduleItemBtn) {
    deleteScheduleItemBtn.classList.toggle("hidden", !item);
  }

  if (bookScheduleItemBtn) {
    bookScheduleItemBtn.classList.add("hidden");
  }

  if (submitBtnEl) {
    submitBtnEl.classList.remove("hidden");
  }

  [scheduleClassNameEl, scheduleCoachNameEl, scheduleDateEl, scheduleStartTimeEl, scheduleDurationEl, scheduleCapacityEl, scheduleRecurringEl].forEach((field) => {
    if (field) {
      field.disabled = false;
    }
  });

  if (scheduleRecurringEl && item && isRecurring) {
    scheduleRecurringEl.disabled = true;
  }

  if (scheduleModalEl) {
    scheduleModalEl.classList.remove("hidden");
  }
}

/**
 * Close schedule modal.
 *
 * @returns {void}
 */
function closeScheduleModal_() {
  editingScheduleItemId_ = null;

  if (scheduleModalEl) {
    scheduleModalEl.classList.add("hidden");
  }

  if (scheduleFormEl) {
    scheduleFormEl.reset();
  }

  const submitBtnEl = scheduleFormEl?.querySelector('button[type="submit"]');
  if (submitBtnEl) {
    submitBtnEl.classList.remove("hidden");
  }

  if (bookScheduleItemBtn) {
    bookScheduleItemBtn.classList.add("hidden");
  }

  [scheduleClassNameEl, scheduleCoachNameEl, scheduleDateEl, scheduleStartTimeEl, scheduleDurationEl, scheduleCapacityEl, scheduleRecurringEl].forEach((field) => {
    if (field) {
      field.disabled = false;
    }
  });
}

/**
 * Fetch current authenticated context from backend.
 *
 * @returns {Promise<Object>}
 */
async function fetchMe_() {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/me", {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });


  return response.json();
}

/**
 * Return the schedule weeks required by the selected dashboard period.
 *
 * @returns {string[]}
 */
function getDashboardWeekIds_() {
  const previousMonth = new Date(
    dashboardMonthDate_.getFullYear(),
    dashboardMonthDate_.getMonth() - 1,
    1
  );

  return [
    ...new Set([
      ...getMonthWeekIds_(previousMonth),
      ...getMonthWeekIds_(dashboardMonthDate_),
      currentWeekId_,
      getWeekId_(addDays_(currentWeekStart, -7))
    ])
  ];
}

/**
 * Return the smallest booking range used by dashboard metrics.
 *
 * @returns {{from:string,to:string}}
 */
function getDashboardBookingRange_() {
  const selectedWeekEnd = addDays_(currentWeekStart, 7);
  const activityStart = new Date(currentWeekStart);
  activityStart.setMonth(activityStart.getMonth() - 3);
  const monthStart = new Date(
    dashboardMonthDate_.getFullYear(),
    dashboardMonthDate_.getMonth() - 5,
    1
  );
  const monthEnd = new Date(
    dashboardMonthDate_.getFullYear(),
    dashboardMonthDate_.getMonth() + 1,
    1
  );

  return {
    from: new Date(Math.min(activityStart.getTime(), monthStart.getTime())).toISOString(),
    to: new Date(Math.max(selectedWeekEnd.getTime(), monthEnd.getTime())).toISOString()
  };
}

/**
 * Fetch the complete dashboard payload in one authenticated round trip.
 *
 * @returns {Promise<Object>}
 */
async function fetchDashboard_() {
  const idToken = await getIdToken();
  const weekIds = getDashboardWeekIds_();
  const bookingRange = getDashboardBookingRange_();
  const searchParams = new URLSearchParams({
    weekIds: weekIds.join(","),
    from: bookingRange.from,
    to: bookingRange.to
  });
  const response = await apiFetch(`/api/dashboard?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });


  return response.json();
}

/**
 * Fetch one schedule week from backend.
 *
 * @param {string} weekId
 * @param {{force?: boolean}=} options
 * @returns {Promise<{week:Object, items:Object[]}>}
 */
async function fetchScheduleWeek_(weekId, options = {}) {
  if (!options.force && scheduleWeekCache_.has(weekId)) {
    return structuredClone(scheduleWeekCache_.get(weekId));
  }

  if (!options.force && scheduleWeekRequestCache_.has(weekId)) {
    return structuredClone(await scheduleWeekRequestCache_.get(weekId));
  }

  if (options.force) {
    scheduleWeekRequestCache_.delete(weekId);
  }

  const request = (async () => {
    const idToken = await getIdToken();

    const response = await apiFetch(`/api/schedule-week?weekId=${encodeURIComponent(weekId)}`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });


    return response.json();
  })();

  scheduleWeekRequestCache_.set(weekId, request);

  try {
    const scheduleWeek = await request;
    if (scheduleWeekRequestCache_.get(weekId) === request) {
      scheduleWeekCache_.set(weekId, structuredClone(scheduleWeek));
    }
    return structuredClone(scheduleWeek);
  } finally {
    if (scheduleWeekRequestCache_.get(weekId) === request) {
      scheduleWeekRequestCache_.delete(weekId);
    }
  }
}

/**
 * Apply a loaded schedule week to local state.
 *
 * @param {{week:Object, items:Object[]}} scheduleWeek
 * @param {{preserveEditing?:boolean}=} options
 * @returns {void}
 */
function applyScheduleWeek_(scheduleWeek, options = {}) {
  schedules_ = Array.isArray(scheduleWeek.items) ? scheduleWeek.items : [];
  currentWeekStatus_ = scheduleWeek.week?.status || "draft";
  const cachedDraft = options.preserveEditing
    ? scheduleDraftCache_.get(currentWeekId_)
    : null;

  draftScheduleItems_ = structuredClone(cachedDraft || schedules_);
  isEditingSchedule_ = options.preserveEditing === true;
}

/** Cache the displayed draft and remember whether it differs from the server copy. */
function cacheCurrentScheduleDraft_() {
  if (!isEditingSchedule_) {
    return;
  }

  const draft = structuredClone(draftScheduleItems_);
  const persistedItems = scheduleWeekCache_.get(currentWeekId_)?.items || schedules_;
  scheduleDraftCache_.set(currentWeekId_, draft);

  if (JSON.stringify(draft) === JSON.stringify(persistedItems)) {
    dirtyScheduleWeekIds_.delete(currentWeekId_);
  } else {
    dirtyScheduleWeekIds_.add(currentWeekId_);
  }
}

/** Drop every unsaved week in the current editing session. */
function clearScheduleDrafts_() {
  scheduleDraftCache_.clear();
  dirtyScheduleWeekIds_.clear();
}

/**
 * Reload and apply the currently selected week.
 *
 * @param {{force?: boolean}=} options
 * @returns {Promise<void>}
 */
async function loadCurrentScheduleWeek_(options = {}) {
  const scheduleWeek = await fetchScheduleWeek_(currentWeekId_, options);
  applyScheduleWeek_(scheduleWeek, options);

  if (!options.skipPrefetch) {
    prefetchScheduleWeeksAround_(currentWeekStart);
  }
}

/**
 * Warm the cache around the displayed schedule week.
 *
 * @param {Date} weekStart
 * @returns {void}
 */
function prefetchScheduleWeeksAround_(weekStart = currentWeekStart) {
  const weekIds = [];

  for (let offset = -SCHEDULE_WEEK_PREFETCH_RADIUS; offset <= SCHEDULE_WEEK_PREFETCH_RADIUS; offset += 1) {
    if (offset === 0) {
      continue;
    }

    weekIds.push(getWeekId_(addDays_(weekStart, offset * 7)));
  }

  const requests = weekIds
    .filter((weekId) => !scheduleWeekCache_.has(weekId) && !scheduleWeekRequestCache_.has(weekId))
    .map((weekId) => fetchScheduleWeek_(weekId).catch((error) => {
      console.debug(`[schedule] Could not prefetch ${weekId}:`, error);
      return null;
    }));

  if (requests.length) {
    Promise.allSettled(requests);
  }
}

/**
 * Save current draft week.
 *
 * @param {boolean} publish
 * @param {string} weekId
 * @param {Object[]} items
 * @returns {Promise<void>}
 */
async function saveScheduleWeek_(publish = false, weekId = currentWeekId_, items = draftScheduleItems_) {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/schedule-week/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({
      weekId,
      items,
      publish
    })
  });

}

/** Save every changed week from the current editing session. */
async function saveScheduleDrafts_(publish = false) {
  cacheCurrentScheduleDraft_();
  const weekIds = [...dirtyScheduleWeekIds_].sort();

  for (const weekId of weekIds) {
    await saveScheduleWeek_(publish, weekId, scheduleDraftCache_.get(weekId) || []);
  }

  return weekIds.length;
}

/**
 * Publish one week.
 *
 * @param {string} weekId
 * @returns {Promise<void>}
 */
async function publishScheduleWeek_(weekId) {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/schedule-week/publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({ weekId })
  });

}

/**
 * Fetch clients.
 *
 * @returns {Promise<Object[]>}
 */
async function fetchClients_() {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/clients", {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });


  const body = await response.json();
  return Array.isArray(body.items) ? body.items : [];
}

/**
 * Fetch pack templates.
 *
 * @returns {Promise<Object[]>}
 */
async function fetchPacks_() {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/packs", {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });


  const body = await response.json();
  return Array.isArray(body.items) ? body.items : [];
}

/**
 * Fetch client packs.
 *
 * @returns {Promise<Object[]>}
 */
async function fetchClientPacks_() {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/client-packs", {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });


  const body = await response.json();
  return Array.isArray(body.items) ? body.items : [];
}

/**
 * Fetch bookings.
 *
 * @returns {Promise<Object[]>}
 */
async function fetchBookings_() {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/bookings", {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });


  const body = await response.json();
  return Array.isArray(body.items) ? body.items : [];
}

/**
 * Fetch reusable class templates.
 *
 * @returns {Promise<Object[]>}
 */
async function fetchClassTemplates_() {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/class-templates", {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });


  const body = await response.json();
  return Array.isArray(body.items) ? body.items : [];
}

/**
 * Fetch owner/admin members.
 *
 * @returns {Promise<Object[]>}
 */
async function fetchBusinessMembers_() {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/business/members", {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });


  const body = await response.json();
  return Array.isArray(body.items) ? body.items : [];
}

/**
 * Update the current business.
 *
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function updateBusinessSettings_(payload) {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/business", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return (await response.json()).item;
}

/**
 * Add a business admin member.
 *
 * @param {Object} payload
 * @returns {Promise<{item:Object, inviteEmailSent?: boolean}>}
 */
async function addAdminMember_(payload) {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/business/members/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return response.json();
}

/**
 * Create one reusable class template.
 *
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function createClassTemplate_(payload) {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/class-templates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return (await response.json()).item;
}

/**
 * Update one reusable class template.
 *
 * @param {string} templateId
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function updateClassTemplate_(templateId, payload) {
  const idToken = await getIdToken();

  const response = await apiFetch(`/api/class-templates/${encodeURIComponent(templateId)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return (await response.json()).item;
}

/**
 * Delete one reusable class template.
 *
 * @param {string} templateId
 * @returns {Promise<void>}
 */
async function deleteClassTemplate_(templateId) {
  const idToken = await getIdToken();

  const response = await apiFetch(`/api/class-templates/${encodeURIComponent(templateId)}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });

}

/**
 * Invite one client.
 *
 * @param {Object} payload
 * @returns {Promise<{item:Object, inviteUrl?: string}>}
 */
async function createClient_(payload) {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/clients/invite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return response.json();
}

/**
 * Import clients from a CSV or Excel file.
 *
 * @param {File} file
 * @returns {Promise<Object>}
 */
async function importClientsFile_(file) {
  const idToken = await getIdToken();
  const body = new FormData();
  body.append("file", file);

  const response = await apiFetch("/api/clients/import-file", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`
    },
    body
  });

  return response.json();
}

/**
 * Update one client.
 *
 * @param {string} clientId
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function updateClient_(clientId, payload) {
  const idToken = await getIdToken();

  const response = await apiFetch(`/api/clients/${encodeURIComponent(clientId)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return (await response.json()).item;
}

/**
 * Delete one client.
 *
 * @param {string} clientId
 * @returns {Promise<void>}
 */
async function deleteClient_(clientId) {
  const idToken = await getIdToken();

  const response = await apiFetch(`/api/clients/${encodeURIComponent(clientId)}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });

}

/**
 * Delete multiple clients in one API request.
 *
 * @param {string[]} clientIds
 * @returns {Promise<{deleted: Object[], failed: Object[]}>}
 */
async function deleteClientsBulk_(clientIds) {
  const idToken = await getIdToken();
  const response = await apiFetch("/api/clients/bulk-delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({ clientIds })
  });


  return response.json();
}

/**
 * Create one pack template.
 *
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function createPack_(payload) {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/packs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return (await response.json()).item;
}

/**
 * Update one pack template.
 *
 * @param {string} packId
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function updatePack_(packId, payload) {
  const idToken = await getIdToken();

  const response = await apiFetch(`/api/packs/${encodeURIComponent(packId)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return (await response.json()).item;
}

/**
 * Delete one pack template.
 *
 * @param {string} packId
 * @returns {Promise<void>}
 */
async function deletePack_(packId) {
  const idToken = await getIdToken();

  const response = await apiFetch(`/api/packs/${encodeURIComponent(packId)}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });

}

/**
 * Create one client pack.
 *
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function createClientPack_(payload) {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/client-packs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return (await response.json()).item;
}

/**
 * Update one assigned client pack.
 *
 * @param {string} clientPackId
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function updateClientPack_(clientPackId, payload) {
  const idToken = await getIdToken();

  const response = await apiFetch(`/api/client-packs/${encodeURIComponent(clientPackId)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return (await response.json()).item;
}

/**
 * Create one booking.
 *
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function createBooking_(payload) {
  const idToken = await getIdToken();

  const response = await apiFetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });


  return (await response.json()).item;
}

/**
 * Return ISO week id.
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
 * Return Monday of current week.
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
 * Format date for UI.
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
 * Format date for input[type=date].
 *
 * @param {Date} date
 * @returns {string}
 */
function formatDateInput_(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Format time for input[type=time].
 *
 * @param {Date} date
 * @returns {string}
 */
function formatTimeInput_(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Build ISO string from local date and time.
 *
 * @param {string} dateValue
 * @param {string} timeValue
 * @returns {string}
 */
function buildIsoFromLocal_(dateValue, timeValue) {
  return new Date(`${dateValue}T${timeValue}:00`).toISOString();
}

/**
 * Format event time range.
 *
 * @param {Object} item
 * @returns {string}
 */
function formatEventTime_(item) {
  if (item.type === "pack") {
    return `${Number(item.totalClasses || 0)} classes`;
  }

  if (!item.startAt || !item.endAt) {
    return "";
  }

  const start = new Date(item.startAt);
  const end = new Date(item.endAt);

  return `${start.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} – ${end.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
}

/**
 * Return the event duration in minutes, falling back to one hour.
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
 * Build an ISO end date from a local date, start time, and duration.
 *
 * @param {string} dateValue
 * @param {string} startTime
 * @param {number} durationMinutes
 * @returns {string}
 */
function buildEndIsoFromDuration_(dateValue, startTime, durationMinutes) {
  const startAt = buildIsoFromLocal_(dateValue, startTime);
  return new Date(new Date(startAt).getTime() + durationMinutes * 60000).toISOString();
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
 * Return true if date is inside displayed week.
 *
 * @param {Date} date
 * @param {Date} weekStart
 * @returns {boolean}
 */
function isInDisplayedWeek_(date, weekStart) {
  const weekEnd = addDays_(weekStart, 7);
  return date >= weekStart && date < weekEnd;
}

/**
 * Return true if two dates are in the same month.
 *
 * @param {Date} date
 * @param {Date} monthDate
 * @returns {boolean}
 */
function isInSameMonth_(date, monthDate) {
  return date.getFullYear() === monthDate.getFullYear() && date.getMonth() === monthDate.getMonth();
}

/**
 * Return every ISO week touching a calendar month.
 *
 * @param {Date} monthDate
 * @returns {string[]}
 */
function getMonthWeekIds_(monthDate) {
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const firstWeekStart = getStartOfWeek_(monthStart);
  const lastWeekStart = getStartOfWeek_(monthEnd);
  const weekIds = [];

  for (let weekStart = firstWeekStart; weekStart <= lastWeekStart; weekStart = addDays_(weekStart, 7)) {
    weekIds.push(getWeekId_(weekStart));
  }

  return weekIds;
}

/**
 * Return display label for a month.
 *
 * @param {Date} date
 * @returns {string}
 */
function formatMonthLabel_(date) {
  return date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric"
  });
}

/**
 * Format one full date for compact list metadata.
 *
 * @param {Date|null} date
 * @returns {string}
 */
function formatFullDate_(date) {
  if (!date) {
    return "Never booked";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

/**
 * Return unique booked client count for a booking list.
 *
 * @param {Object[]} bookings
 * @returns {number}
 */
function countUniqueBookedClients_(bookings) {
  return new Set(bookings.map((booking) => booking.clientId).filter(Boolean)).size;
}

/**
 * Estimate one booking value from the related pack template.
 *
 * @param {Object} booking
 * @param {Map<string, Object>} clientPacksById
 * @param {Map<string, Object>} packsById
 * @returns {number}
 */
function estimateBookingValue_(booking, clientPacksById, packsById) {
  const clientPack = clientPacksById.get(booking.clientPackId);
  const pack = packsById.get(clientPack?.packTemplateId || "");
  const packPrice = Number(clientPack?.price ?? pack?.price ?? 0);
  const classCount = Number(clientPack?.totalClasses || pack?.classCount || 0);

  if (!packPrice || !classCount) {
    return 0;
  }

  return packPrice / classCount;
}

/**
 * Format money for dashboard estimates.
 *
 * @param {number} value
 * @returns {string}
 */
function formatMoney_(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value || 0);
}

/**
 * Return month-over-month change metadata.
 *
 * @param {number} current
 * @param {number} previous
 * @returns {{value: number, percent: number|null, direction: "up"|"down"|"flat"}}
 */
function getMetricDelta_(current, previous) {
  const value = current - previous;

  if (!previous && !current) {
    return { value: 0, percent: 0, direction: "flat" };
  }

  if (!previous) {
    return { value, percent: current ? null : 0, direction: value > 0 ? "up" : "flat" };
  }

  const percent = (value / previous) * 100;

  return {
    value,
    percent,
    direction: value > 0 ? "up" : value < 0 ? "down" : "flat"
  };
}

/**
 * Render a compact dashboard delta.
 *
 * @param {{value: number, percent: number|null, direction: "up"|"down"|"flat"}} delta
 * @param {"money"|"number"} format
 * @returns {string}
 */
function renderMetricDelta_(delta, format = "number") {
  const sign = delta.value > 0 ? "+" : delta.value < 0 ? "-" : "";
  const valueLabel = format === "money" ? formatMoney_(Math.abs(delta.value)) : String(Math.abs(Math.round(delta.value)));
  const percentLabel = delta.percent === null
    ? "New"
    : `${sign}${Math.abs(delta.percent).toFixed(0)}%`;

  return `
    <span class="metric-delta metric-delta-${delta.direction}">
      ${escapeHtml_(percentLabel)} · ${escapeHtml_(sign)}${escapeHtml_(valueLabel)}
    </span>
  `;
}

/**
 * Render a compact dashboard delta for the current dashboard visual language.
 *
 * @param {{value: number, percent: number|null, direction: "up"|"down"|"flat"}} delta
 * @param {"money"|"number"} format
 * @param {string=} comparisonLabel
 * @returns {string}
 */
function renderReferenceMetricDelta_(delta, format = "number", comparisonLabel = "Compared with previous week") {
  const sign = delta.value > 0 ? "+" : delta.value < 0 ? "-" : "";
  const valueLabel = format === "money" ? formatMoney_(Math.abs(delta.value)) : String(Math.abs(Math.round(delta.value)));
  const percentLabel = delta.percent === null
    ? "New"
    : `${sign}${Math.abs(delta.percent).toFixed(0)}%`;
  const directionGlyph = delta.direction === "down" ? "&#8595; " : delta.direction === "up" ? "&#8593; " : "";

  return `
    <span class="metric-delta metric-delta-${delta.direction}" title="${escapeHtml_(comparisonLabel)}">
      ${directionGlyph}${escapeHtml_(percentLabel)}
      <span class="metric-delta-value">${escapeHtml_(sign)}${escapeHtml_(valueLabel)}</span>
    </span>
  `;
}

/**
 * Render a consistent dashboard explanation tooltip.
 *
 * @param {string} ariaLabel
 * @param {string} title
 * @param {string} definition
 * @param {string} example
 * @returns {string}
 */
function renderDashboardInfo_(ariaLabel, title, definition, example) {
  return `
    <span class="reference-info" tabindex="0" aria-label="${escapeHtml_(`${ariaLabel}. ${definition} Example: ${example}`)}">
      i
      <span class="dashboard-info-tooltip" role="tooltip">
        <strong>${escapeHtml_(title)}</strong>
        <span class="dashboard-info-definition">${escapeHtml_(definition)}</span>
        <em class="dashboard-info-example"><b>Example</b>${escapeHtml_(example)}</em>
      </span>
    </span>
  `;
}

/**
 * Update active nav.
 *
 * @returns {void}
 */
function updateActiveNav_() {
  navItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.page === currentPage);
  });
}

/**
 * Update page header.
 *
 * @returns {void}
 */
function updatePageHeader_() {
  const headerMap = {
    dashboard: {
      title: `Welcome back ${currentMember_?.name || "Admin"}`,
      subtitle: ""
    },
    schedule: {
      title: "Schedule",
      subtitle: ""
    },
    clients: {
      title: "Clients",
      subtitle: "Manage members, packs, and booking permissions"
    },
    packs: {
      title: "Packs",
      subtitle: "Sell and manage credit or monthly packs"
    },
    settings: {
      title: "Settings",
      subtitle: "Business profile and admin access"
    }
  };

  const header = headerMap[currentPage] || headerMap.dashboard;
  document.querySelector(".topbar")?.classList.toggle("is-dashboard-hidden", currentPage === "dashboard");
  document.querySelector(".topbar")?.classList.toggle("hidden", currentPage === "dashboard");

  if (pageTitleEl) {
    if (currentPage === "dashboard") {
      const displayName = currentMember_?.name || "Admin";
      const handle = String(displayName).startsWith("@") ? displayName : `@${displayName}`;
      pageTitleEl.innerHTML = `Welcome back <span class="page-title-regular">${escapeHtml_(handle)}</span>`;
      pageTitleEl.innerHTML = "";
    } else {
      pageTitleEl.textContent = header.title;
    }
  }

  if (pageSubtitleEl) {
    pageSubtitleEl.textContent = header.subtitle;
  }
}

/**
 * Render week label.
 *
 * @returns {void}
 */
function renderWeekLabel_() {
  if (!weekLabelEl) {
    return;
  }

  const weekEnd = addDays_(currentWeekStart, 6);
  weekLabelEl.textContent = `${formatDate_(currentWeekStart)} → ${formatDate_(weekEnd)}`;
}

/**
 * Render the compact month calendar shown in the schedule sidebar.
 *
 * @returns {void}
 */
function renderSidebarScheduleCalendar_() {
  if (!sidebarScheduleCalendarEl) {
    return;
  }

  if (currentPage !== "schedule") {
    sidebarScheduleCalendarEl.classList.add("hidden");
    return;
  }

  sidebarScheduleCalendarEl.classList.remove("hidden");

  const monthStart = new Date(sidebarCalendarMonthDate_.getFullYear(), sidebarCalendarMonthDate_.getMonth(), 1);
  const calendarStart = addDays_(monthStart, -getMondayFirstDayIndex_(monthStart));
  const todayKey = formatDateInput_(new Date());
  const dayNames = ["M", "T", "W", "T", "F", "S", "S"];
  const dayCells = [];

  for (let index = 0; index < 42; index += 1) {
    const day = addDays_(calendarStart, index);
    const dayKey = formatDateInput_(day);
    const selectedWeekClass = isInDisplayedWeek_(day, currentWeekStart) ? " is-selected-week" : "";
    const mutedClass = isInSameMonth_(day, monthStart) ? "" : " is-muted";
    const todayClass = dayKey === todayKey ? " is-today" : "";

    dayCells.push(`
      <button class="sidebar-calendar-day${selectedWeekClass}${mutedClass}${todayClass}" data-date="${escapeHtml_(dayKey)}" type="button" aria-label="Open week of ${escapeHtml_(formatDate_(day))}">
        ${day.getDate()}
      </button>
    `);
  }

  const weekRows = [];

  for (let index = 0; index < dayCells.length; index += 7) {
    weekRows.push(`
      <div class="sidebar-calendar-week">
        ${dayCells.slice(index, index + 7).join("")}
      </div>
    `);
  }

  sidebarScheduleCalendarEl.innerHTML = `
    <div class="sidebar-calendar-header">
      <p>${escapeHtml_(formatMonthLabel_(monthStart))}</p>
      <div class="sidebar-calendar-arrows" aria-label="Change calendar month">
        <button data-calendar-direction="-1" type="button" aria-label="Previous month">&lt;</button>
        <button data-calendar-direction="1" type="button" aria-label="Next month">&gt;</button>
      </div>
    </div>
    <div class="sidebar-calendar-grid" aria-label="Schedule month calendar">
      <div class="sidebar-calendar-weekdays">
        ${dayNames.map((dayName) => `<span>${dayName}</span>`).join("")}
      </div>
      ${weekRows.join("")}
    </div>
  `;

  sidebarScheduleCalendarEl.querySelectorAll("[data-calendar-direction]").forEach((button) => {
    button.addEventListener("click", async () => {
      const direction = Number(button.dataset.calendarDirection || 0);
      const nextMonthDate = new Date(monthStart.getFullYear(), monthStart.getMonth() + direction, 1);

      await navigateToScheduleWeek_(getStartOfWeek_(nextMonthDate), button, { sidebarMonthDate: nextMonthDate });
    });
  });

  sidebarScheduleCalendarEl.querySelectorAll(".sidebar-calendar-day").forEach((button) => {
    button.addEventListener("click", async () => {
      const selectedDate = new Date(`${button.dataset.date}T00:00:00`);
      await navigateToScheduleWeek_(selectedDate, button, {
        sidebarMonthDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      });
    });
  });
}

/**
 * Render one schedule event card.
 *
 * @param {Object} item
 * @returns {string}
 */
function renderEventCard_(item) {
  const recurringHtml = isRecurringScheduleItem_(item)
    ? `<span class="recurring-flag">Recurring</span>`
    : "";
  const bookingButtonHtml = !isEditingSchedule_
    ? `<button class="ghost-btn book-event-btn" data-schedule-id="${escapeHtml_(item.id)}" type="button">Book client</button>`
    : "";

  return `
    <div class="event-card${isRecurringScheduleItem_(item) ? " is-recurring" : ""}" data-schedule-id="${escapeHtml_(item.id)}">
      <div class="event-time">${escapeHtml_(formatEventTime_(item))}</div>
      <div class="event-title">${escapeHtml_(item.className || "Untitled class")}</div>
      <div class="event-meta">${escapeHtml_(item.coachName || "Unknown coach")} · ${Number(item.bookedCount || 0)}/${Number(item.capacity || 0)}</div>
      ${recurringHtml}
      ${bookingButtonHtml}
    </div>
  `;
}


/**
 * Render one compact schedule event card for the hourly grid.
 *
 * @param {Object} item Schedule item.
 * @returns {string} Event card HTML.
 */
function renderScheduleGridEventCard_(item) {
  const durationMinutes = getScheduleDurationMinutes_(item);
  const hourHeightRem = 4;
  const eventHeightRem = (durationMinutes / 60) * hourHeightRem;
  const draggableAttr = isEditingSchedule_ ? ` draggable="true"` : "";

  const color = isRecurringScheduleItem_(item) ? "#6b7280" : normalizeColor_(item.color);
  const recurringHtml = isRecurringScheduleItem_(item)
    ? `<span class="recurring-flag">Recurring</span>`
    : "";

  return `
    <div class="event-card schedule-grid-event${isRecurringScheduleItem_(item) ? " is-recurring" : ""}"
      data-schedule-id="${escapeHtml_(item.id)}"
      ${draggableAttr}
      style="height: ${eventHeightRem}rem; min-height: ${eventHeightRem}rem; --event-color: ${escapeHtml_(color)}; cursor: pointer;">
      <div class="event-time">${escapeHtml_(formatEventTime_(item))}</div>
      <div class="event-card-topline">
        <div class="event-title">${escapeHtml_(item.className || "Untitled class")}</div>
        ${recurringHtml}
      </div>
      <div class="event-capacity">${Number(item.bookedCount || 0)}/${Number(item.capacity || 0)}</div>
      <div class="event-meta">${escapeHtml_(item.coachName || "Unknown coach")} · ${Number(item.bookedCount || 0)}/${Number(item.capacity || 0)}</div>
    </div>
  `;
}


/**
 * Render the dashboard monthly booking density calendar.
 *
 * @param {Date} monthDate
 * @param {Map<string, number>} bookingCountsByDay
 * @param {Map<string, {classesCount: number, attendeesCount: number, classes: Object[]}>} classStatsByDay
 * @param {number} maxDayBookings
 * @returns {string}
 */
function renderDashboardMonthCalendar_(monthDate, bookingCountsByDay, classStatsByDay, maxDayBookings) {
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const calendarStart = addDays_(monthStart, -getMondayFirstDayIndex_(monthStart));
  const todayKey = formatDateInput_(new Date());
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayCells = [];

  for (let index = 0; index < 42; index += 1) {
    const day = addDays_(calendarStart, index);
    const dayKey = formatDateInput_(day);
    const bookingCount = bookingCountsByDay.get(dayKey) || 0;
    const intensity = bookingCount === 0 || maxDayBookings === 0
      ? 0
      : Math.max(1, Math.ceil((bookingCount / maxDayBookings) * 4));
    const classStats = classStatsByDay.get(dayKey) || { classesCount: 0, attendeesCount: bookingCount, classes: [] };
    const metaLabel = classStats.classesCount > 0
      ? `${classStats.classesCount} class${classStats.classesCount !== 1 ? "es" : ""} · ${classStats.attendeesCount} attendee${classStats.attendeesCount !== 1 ? "s" : ""}`
      : bookingCount > 0
        ? `${bookingCount} attendee${bookingCount !== 1 ? "s" : ""}`
        : "";
    const tooltipRowsHtml = classStats.classes.length
      ? classStats.classes.map((item) => `
        <div class="day-tooltip-row">
          <span>${escapeHtml_(formatEventTime_(item))}</span>
          <strong>${escapeHtml_(item.className || "Class")}</strong>
          <em>${Number(item.bookedCount || 0)} attendee${Number(item.bookedCount || 0) !== 1 ? "s" : ""}</em>
        </div>
      `).join("")
      : `<div class="day-tooltip-empty">No classes</div>`;

    dayCells.push(`
      <div class="month-day${isInSameMonth_(day, monthDate) ? "" : " is-muted"}${dayKey === todayKey ? " is-today" : ""}">
        <span class="month-day-number">${day.getDate()}</span>
        <span class="booking-dot heat-${intensity}"></span>
        <div class="day-tooltip" role="tooltip">
          <div class="day-tooltip-title">${escapeHtml_(formatDate_(day))}</div>
          ${tooltipRowsHtml}
        </div>
      </div>
    `);
  }

  const weekRows = [];

  for (let index = 0; index < dayCells.length; index += 7) {
    weekRows.push(`
      <div class="month-week-row">
        ${dayCells.slice(index, index + 7).join("")}
      </div>
    `);
  }

  return `
    <section class="dashboard-panel dashboard-calendar-panel">
      <div class="panel-header">
        <div>
          <p class="section-kicker">Booking heatmap</p>
          <h3>${escapeHtml_(formatMonthLabel_(monthDate))}</h3>
        </div>
        <div class="calendar-legend compact-legend" aria-label="Booking density">
          <span class="booking-dot heat-1"></span>
          <span class="booking-dot heat-2"></span>
          <span class="booking-dot heat-3"></span>
          <span class="booking-dot heat-4"></span>
        </div>
      </div>

      <div class="month-calendar">
        <div class="month-weekdays">
          ${dayNames.map((dayName) => `<div class="month-weekday">${dayName}</div>`).join("")}
        </div>
        ${weekRows.join("")}
      </div>
    </section>
  `;
}

/**
 * Render the dashboard heatmap in the compact admin reference style.
 *
 * @param {Date} monthDate
 * @param {Map<string, number>} bookingCountsByDay
 * @param {Map<string, {classesCount: number, attendeesCount: number, classes: Object[]}>} classStatsByDay
 * @param {number} maxDayBookings
 * @returns {string}
 */
function renderDashboardReferenceHeatmap_(monthDate, bookingCountsByDay, classStatsByDay, maxDayBookings) {
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const calendarStart = addDays_(monthStart, -getMondayFirstDayIndex_(monthStart));
  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const dayCells = [];

  for (let index = 0; index < 42; index += 1) {
    const day = addDays_(calendarStart, index);
    const dayKey = formatDateInput_(day);
    const bookingCount = bookingCountsByDay.get(dayKey) || 0;
    const classStats = classStatsByDay.get(dayKey) || { classesCount: 0, attendeesCount: 0, classes: [] };
    const intensity = bookingCount === 0 || maxDayBookings === 0
      ? 0
      : Math.max(1, Math.ceil((bookingCount / maxDayBookings) * 4));
    const tooltipRowsHtml = classStats.classes.length
      ? classStats.classes.map((item) => `
        <div class="day-tooltip-row">
          <span>${escapeHtml_(formatEventTime_(item))}</span>
          <strong>${escapeHtml_(item.className || "Class")}</strong>
          <em>${Number(item.bookedCount || 0)} attendee${Number(item.bookedCount || 0) !== 1 ? "s" : ""}</em>
        </div>
      `).join("")
      : bookingCount > 0
        ? `
          <div class="day-tooltip-row">
            <span>${bookingCount} booking${bookingCount !== 1 ? "s" : ""}</span>
            <strong>Bookings</strong>
            <em>No class details</em>
          </div>
        `
        : `<div class="day-tooltip-empty">No bookings</div>`;
    const ariaLabel = `${formatDate_(day)}: ${bookingCount} booking${bookingCount !== 1 ? "s" : ""}`;
    dayCells.push({
      isSelectedWeek: isInDisplayedWeek_(day, currentWeekStart),
      html: `
      <div class="reference-heatmap-day${isInSameMonth_(day, monthDate) ? "" : " is-muted"}" data-heat="${intensity}" tabindex="0" aria-label="${escapeHtml_(ariaLabel)}">
        <span>${day.getDate()}</span>
        <div class="day-tooltip" role="tooltip">
          <div class="day-tooltip-title">${escapeHtml_(formatDate_(day))}</div>
          ${tooltipRowsHtml}
        </div>
      </div>
    `
    });
  }

  const weekRows = [];

  for (let index = 0; index < dayCells.length; index += 7) {
    const weekCells = dayCells.slice(index, index + 7);
    const selectedClass = weekCells.some((cell) => cell.isSelectedWeek) ? " is-selected" : "";

    weekRows.push(`
      <div class="reference-heatmap-week${selectedClass}">
        ${weekCells.map((cell) => cell.html).join("")}
      </div>
    `);
  }

  return `
    <section class="reference-section reference-heatmap">
      <div class="reference-panel-title">
        <div class="dashboard-title-with-info">
          <h3>Monthly Booking Heatmap</h3>
          ${renderDashboardInfo_(
            "Monthly booking heatmap explanation",
            "Booking density",
            "Each circle counts confirmed bookings on that date. Darker circles represent busier days relative to the busiest day in this month.",
            "If the busiest day has 8 bookings, a day with 4 bookings appears around half intensity."
          )}
        </div>
         <div class="reference-legend" aria-label="Booking density">
            <span data-heat="0"></span>
            <span data-heat="1"></span>
            <span data-heat="2"></span>
            <span data-heat="3"></span>
            <span data-heat="4"></span>
          </div>
      </div>
      <div class="reference-heatmap-grid">
        ${dayNames.map((dayName) => `<div class="reference-heatmap-weekday">${dayName}</div>`).join("")}
        ${weekRows.join("")}
      </div>
    </section>
  `;
}

/**
 * Group booking value into the six months ending with the selected month.
 *
 * @param {Object[]} bookings
 * @param {Date} selectedMonth
 * @param {(booking:Object) => number} valueForBooking
 * @returns {{label:string,fullLabel:string,value:number,isSelected:boolean}[]}
 */
function getMonthlyRevenueTotals_(bookings, selectedMonth, valueForBooking) {
  return Array.from({ length: 6 }, (_, index) => {
    const bucketStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 5 + index, 1);
    const bucketEnd = new Date(bucketStart.getFullYear(), bucketStart.getMonth() + 1, 1);
    const value = bookings.reduce((sum, booking) => {
      const bookingDate = booking.startAt ? new Date(booking.startAt) : null;
      return bookingDate && bookingDate >= bucketStart && bookingDate < bucketEnd
        ? sum + valueForBooking(booking)
        : sum;
    }, 0);

    return {
      label: bucketStart.toLocaleDateString("en-GB", { month: "short" }),
      fullLabel: bucketStart.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
      value,
      isSelected: index === 5
    };
  });
}

/** Return evenly spaced money ticks ending at a rounded value above the data. */
function getMoneyAxisTicks_(maximum, intervalCount = 4) {
  if (maximum <= 0) {
    return [0, 25, 50, 75, 100];
  }

  const roughStep = maximum / intervalCount;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalizedStep = roughStep / magnitude;
  const niceStep = [1, 2, 5, 10].find((value) => value >= normalizedStep) * magnitude;
  const axisMaximum = Math.ceil(maximum / niceStep) * niceStep;

  return Array.from(
    { length: Math.round(axisMaximum / niceStep) + 1 },
    (_, index) => index * niceStep
  );
}

/** Count monthly pack assignments and sort best sellers first. */
function getMonthlyPackSales_(clientPacks, packsById) {
  const counts = new Map(
    [...packsById].map(([packId, pack]) => [packId, { name: pack.name || "Unnamed pack", count: 0 }])
  );

  clientPacks.forEach((clientPack) => {
    const packId = clientPack.packTemplateId || clientPack.packTemplateName || "unknown";
    const current = counts.get(packId) || {
      name: packsById.get(packId)?.name || clientPack.packTemplateName || "Archived pack",
      count: 0
    };
    current.count += 1;
    counts.set(packId, current);
  });

  return [...counts.values()].sort((left, right) => {
    return right.count - left.count || left.name.localeCompare(right.name);
  });
}

/**
 * Render the compact monthly revenue trend without a chart dependency.
 *
 * @param {{label:string,fullLabel:string,value:number,isSelected:boolean}[]} totals
 * @returns {string}
 */
function renderDashboardRevenueTrend_(totals) {
  const width = 240;
  const height = 160;
  const left = 62;
  const right = 10;
  const top = 12;
  const bottom = 32;
  const ticks = getMoneyAxisTicks_(Math.max(0, ...totals.map((item) => item.value)));
  const maximum = ticks.at(-1) || 1;
  const points = totals.map((item, index) => {
    const x = totals.length === 1
      ? width / 2
      : left + (index / (totals.length - 1)) * (width - left - right);
    const y = height - bottom - (item.value / maximum) * (height - top - bottom);
    return { ...item, x, y };
  });
  const curvePath = points.reduce((path, point, index) => {
    if (!index) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = points[index - 1];
    const middleX = (previous.x + point.x) / 2;
    return `${path} C ${middleX} ${previous.y}, ${middleX} ${point.y}, ${point.x} ${point.y}`;
  }, "");
  const selectedPoint = points.find((point) => point.isSelected) || points.at(-1);

  return `
    <div class="dashboard-revenue-chart">
      <div class="dashboard-revenue-chart-period">
        <span>Selected month</span>
        <strong>${escapeHtml_(selectedPoint?.fullLabel || "")}</strong>
      </div>
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Revenue for the six months ending ${escapeHtml_(selectedPoint?.fullLabel || "the selected month")}">
        <line class="dashboard-chart-axis" x1="${left}" y1="${top}" x2="${left}" y2="${height - bottom}"></line>
        <line class="dashboard-chart-axis" x1="${left}" y1="${height - bottom}" x2="${width - right}" y2="${height - bottom}"></line>
        ${ticks.map((tick) => {
          const y = height - bottom - (tick / maximum) * (height - top - bottom);
          return `
            <line class="dashboard-chart-gridline" x1="${left}" y1="${y}" x2="${width - right}" y2="${y}"></line>
            <text class="dashboard-chart-axis-label" x="${left - 10}" y="${y + 4}" text-anchor="end">${escapeHtml_(formatMoney_(tick))}</text>
          `;
        }).join("")}
        <path class="dashboard-revenue-line" d="${curvePath}"></path>
        ${points.map((point) => `
          <circle class="${point.isSelected ? "is-selected" : ""}" cx="${point.x}" cy="${point.y}" r="${point.isSelected ? 7 : 3}">
            <title>${escapeHtml_(point.fullLabel)}: ${escapeHtml_(formatMoney_(point.value))}</title>
          </circle>
          <text class="dashboard-chart-axis-label" x="${point.x}" y="${height - 8}" text-anchor="middle">${escapeHtml_(point.label)}</text>
        `).join("")}
      </svg>
    </div>
  `;
}

/** Render monthly pack sales as descending horizontal bars. */
function renderDashboardPackSales_(packSales) {
  const topPackSales = packSales.filter((pack) => pack.count > 0).slice(0, 3);
  const maximum = Math.max(0, ...topPackSales.map((pack) => pack.count));
  const axisMaximum = Math.max(1, maximum);
  const axisTicks = maximum <= 1 ? [0, 1] : [0, Math.ceil(maximum / 2), maximum];

  return `
    <section class="dashboard-pack-sales-chart" aria-label="Monthly pack sales">
      <h4>Pack sales <small>This month</small></h4>
      ${topPackSales.length ? `
        <div class="dashboard-pack-sales-list">
          ${topPackSales.map((pack) => `
            <div class="dashboard-pack-sales-row">
              <span title="${escapeHtml_(pack.name)}">${escapeHtml_(pack.name)}</span>
              <div class="dashboard-pack-sales-track">
                <i style="width: ${(pack.count / axisMaximum) * 100}%"></i>
              </div>
              <strong>${pack.count}</strong>
            </div>
          `).join("")}
        </div>
        <div class="dashboard-pack-sales-axis" aria-hidden="true">
          <span></span>
          <div>${axisTicks.map((tick) => `<b>${tick}</b>`).join("")}</div>
          <span></span>
          <small>Sales</small>
        </div>
      ` : `<p class="dashboard-pack-sales-empty">No pack sales this month.</p>`}
    </section>
  `;
}

/**
 * Render pack performance as a donut with side labels.
 *
 * @param {{name: string, soldCount: number}[]} packSales
 * @param {number} totalPackSoldCount
 * @returns {string}
 */
function renderPackPerformanceDonut_(packSales, totalPackSoldCount) {
  const colors = ["#b9d637", "#d6e89c", "#edf5ce", "#dfeaa8", "#cddd75", "#a8ca35"];
  const visiblePacks = packSales.filter((pack) => pack.soldCount > 0).slice(0, 6);

  if (!visiblePacks.length) {
    return `
      <div class="reference-donut-empty">
        <span>No pack sales yet.</span>
      </div>
    `;
  }

  let cursor = 0;
  const segments = visiblePacks.map((pack, index) => {
    const percent = totalPackSoldCount ? (pack.soldCount / totalPackSoldCount) * 100 : 0;
    const start = cursor;
    const end = cursor + percent;
    cursor = end;
    return `${colors[index % colors.length]} ${start}% ${end}%`;
  }).join(", ");
  const labels = visiblePacks.map((pack, index) => {
    const percent = totalPackSoldCount ? ((pack.soldCount / totalPackSoldCount) * 100).toFixed(1) : "0.0";
    return `
      <div class="reference-donut-label label-${index + 1}">
        <span>${escapeHtml_(pack.name || "Pack")}</span>
        <em>${percent}%</em>
      </div>
    `;
  }).join("");

  return `
    <div class="reference-donut-wrap">
      <div class="reference-donut" style="background: conic-gradient(${segments});"></div>
      ${labels}
    </div>
  `;
}

/**
 * Render dashboard page.
 *
 * @returns {void}
 */
function renderDashboardPage_() {
  if (!pageContentEl) {
    return;
  }

  const selectedMonth = dashboardMonthDate_;
  const selectedMonthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
  const selectedMonthEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1);
  const previousMonthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
  const previousMonthEnd = selectedMonthStart;
  const selectedWeekStart = new Date(currentWeekStart);
  const selectedWeekEnd = addDays_(selectedWeekStart, 7);
  const previousWeekStart = addDays_(selectedWeekStart, -7);
  const previousWeekEnd = selectedWeekStart;
  const dashboardWeekIds = getDashboardWeekIds_();
  const scheduleLoadKey = dashboardWeekIds.join(",");
  const missingScheduleWeekIds = dashboardWeekIds.filter((weekId) => {
    return !scheduleWeekCache_.has(weekId);
  });

  if (
    missingScheduleWeekIds.length &&
    dashboardScheduleLoadKey_ !== scheduleLoadKey
  ) {
    dashboardScheduleLoadKey_ = scheduleLoadKey;
    Promise.all(
      missingScheduleWeekIds.map((weekId) => fetchScheduleWeek_(weekId))
    )
      .then(() => {
        if (currentPage === "dashboard" && dashboardScheduleLoadKey_ === scheduleLoadKey) {
          renderDashboardPage_();
        }
      })
      .catch((error) => {
        if (dashboardScheduleLoadKey_ === scheduleLoadKey) {
          dashboardScheduleLoadKey_ = "";
        }
        console.debug("[dashboard] Could not load all schedule metrics:", error);
        showToast_("Some dashboard figures could not be refreshed.", "default");
      });
  }

  const dashboardSchedules = [
    ...new Map(
      dashboardWeekIds
        .flatMap((weekId) => scheduleWeekCache_.get(weekId)?.items || [])
        .concat(schedules_)
        .map((schedule) => [schedule.id, schedule])
    ).values()
  ];
  const selectedMonthSchedules = dashboardSchedules.filter((schedule) => {
    return schedule.startAt && isInSameMonth_(new Date(schedule.startAt), selectedMonth);
  });
  const previousMonthSchedules = dashboardSchedules.filter((schedule) => {
    const scheduleDate = schedule.startAt ? new Date(schedule.startAt) : null;
    return scheduleDate && scheduleDate >= previousMonthStart && scheduleDate < previousMonthEnd;
  });
  const selectedWeekSchedules = dashboardSchedules.filter((schedule) => {
    const scheduleDate = schedule.startAt ? new Date(schedule.startAt) : null;
    return scheduleDate && scheduleDate >= selectedWeekStart && scheduleDate < selectedWeekEnd;
  });
  const previousWeekSchedules = dashboardSchedules.filter((schedule) => {
    const scheduleDate = schedule.startAt ? new Date(schedule.startAt) : null;
    return scheduleDate && scheduleDate >= previousWeekStart && scheduleDate < previousWeekEnd;
  });

  const clientPacksById = new Map(
    clientPacks_.map((clientPack) => [clientPack.id, clientPack])
  );

  const packsById = new Map(
    packs_.map((pack) => [pack.id, pack])
  );
  const confirmedBookings = bookings_.filter((booking) => {
    return String(booking.status || "booked").toLowerCase() === "booked";
  });

  const clientsAddedBetween_ = (periodStart, periodEnd) => clients_.filter((client) => {
    const acquisitionDateValue = client.importedAt || client.createdAt;
    const acquisitionDate = acquisitionDateValue ? new Date(acquisitionDateValue) : null;
    return (
      acquisitionDate &&
      !Number.isNaN(acquisitionDate.getTime()) &&
      acquisitionDate >= periodStart &&
      acquisitionDate < periodEnd
    );
  });
  const selectedMonthBookings = confirmedBookings.filter((booking) => {
    return (
      booking.startAt &&
      isInSameMonth_(new Date(booking.startAt), selectedMonth)
    );
  });
  const previousMonthBookings = confirmedBookings.filter((booking) => {
    const bookingDate = booking.startAt ? new Date(booking.startAt) : null;
    return bookingDate && bookingDate >= previousMonthStart && bookingDate < previousMonthEnd;
  });

  const selectedWeekBookings = confirmedBookings.filter((booking) => {
    const bookingDate = booking.startAt ? new Date(booking.startAt) : null;
    return bookingDate && bookingDate >= selectedWeekStart && bookingDate < selectedWeekEnd;
  });
  const previousWeekBookings = confirmedBookings.filter((booking) => {
    const bookingDate = booking.startAt ? new Date(booking.startAt) : null;
    return bookingDate && bookingDate >= previousWeekStart && bookingDate < previousWeekEnd;
  });
  const selectedWeekRevenue = selectedWeekBookings.reduce((sum, booking) => {
    return sum + estimateBookingValue_(
      booking,
      clientPacksById,
      packsById
    );
  }, 0);

  const previousWeekRevenue = previousWeekBookings.reduce((sum, booking) => {
    return sum + estimateBookingValue_(
      booking,
      clientPacksById,
      packsById
    );
  }, 0);

  const estimatedRevenueDelta = getMetricDelta_(
    selectedWeekRevenue,
    previousWeekRevenue
  );

  const bookingCountsByDay = selectedMonthBookings.reduce((map, booking) => {
    const dayKey = formatDateInput_(new Date(booking.startAt));

    map.set(dayKey, (map.get(dayKey) || 0) + 1);

    return map;
  }, new Map());

  const classStatsByDay = selectedMonthBookings.reduce((map, booking) => {
    if (!booking.startAt) {
      return map;
    }

    const dayKey = formatDateInput_(new Date(booking.startAt));

    const currentStats = map.get(dayKey) || {
      classesCount: 0,
      attendeesCount: 0,
      classes: []
    };

    const existingClass = currentStats.classes.find((item) => {
      return item.id === booking.scheduleId;
    });

    if (existingClass) {
      existingClass.bookedCount += 1;
    } else {
      currentStats.classes.push({
        id: booking.scheduleId,
        className: booking.className || "Class",
        startAt: booking.startAt,
        endAt: booking.endAt,
        bookedCount: 1
      });

      currentStats.classesCount += 1;
    }

    currentStats.attendeesCount += 1;
    map.set(dayKey, currentStats);

    return map;
  }, new Map());

  selectedMonthSchedules.forEach((schedule) => {
    const dayKey = formatDateInput_(new Date(schedule.startAt));

    const currentStats = classStatsByDay.get(dayKey) || {
      classesCount: 0,
      attendeesCount: 0,
      classes: []
    };

    const existingClass = currentStats.classes.find((item) => {
      return item.id === schedule.id;
    });

    if (!existingClass) {
      currentStats.classes.push(schedule);
      currentStats.classesCount += 1;
      currentStats.attendeesCount += Number(schedule.bookedCount || 0);

      classStatsByDay.set(dayKey, currentStats);
    }
  });

  const maxDayBookings = Math.max(
    0,
    ...bookingCountsByDay.values()
  );

  const classesThisWeek = selectedWeekSchedules.length;
  const previousWeekClasses = previousWeekSchedules.length;

  const uniqueAttendeesThisWeek = countUniqueBookedClients_(
    selectedWeekBookings
  );
  const previousWeekUniqueAttendees = countUniqueBookedClients_(
    previousWeekBookings
  );

  const totalAttendancesThisWeek = selectedWeekBookings.length;

  const getOccupancy_ = (bookings, schedules) => {
    const capacity = schedules.reduce((sum, schedule) => {
      return sum + Math.max(0, Number(schedule.capacity || 0));
    }, 0);

    return capacity ? Math.round((bookings.length / capacity) * 100) : 0;
  };
  const bookingValue_ = (booking) => estimateBookingValue_(booking, clientPacksById, packsById);
  const selectedMonthRevenue = selectedMonthBookings.reduce((sum, booking) => sum + bookingValue_(booking), 0);
  const previousMonthRevenue = previousMonthBookings.reduce((sum, booking) => sum + bookingValue_(booking), 0);
  const selectedMonthClientPacks = clientPacks_.filter((clientPack) => {
    const purchasedAt = clientPack.purchasedAt ? new Date(clientPack.purchasedAt) : null;
    return purchasedAt && purchasedAt >= selectedMonthStart && purchasedAt < selectedMonthEnd;
  });
  const previousMonthClientPacks = clientPacks_.filter((clientPack) => {
    const purchasedAt = clientPack.purchasedAt ? new Date(clientPack.purchasedAt) : null;
    return purchasedAt && purchasedAt >= previousMonthStart && purchasedAt < previousMonthEnd;
  });
  const monthlyPackSales = getMonthlyPackSales_(selectedMonthClientPacks, packsById);
  const selectedMonthNewClients = clientsAddedBetween_(selectedMonthStart, selectedMonthEnd).length;
  const previousMonthNewClients = clientsAddedBetween_(previousMonthStart, previousMonthEnd).length;
  const selectedWeekOccupancy = getOccupancy_(selectedWeekBookings, selectedWeekSchedules);
  const previousWeekOccupancy = getOccupancy_(previousWeekBookings, previousWeekSchedules);
  const selectedMonthOccupancy = getOccupancy_(selectedMonthBookings, selectedMonthSchedules);
  const previousMonthOccupancy = getOccupancy_(previousMonthBookings, previousMonthSchedules);
  const monthlyRevenueTrend = getMonthlyRevenueTotals_(confirmedBookings, selectedMonth, bookingValue_);

  const weekEnd = addDays_(currentWeekStart, 6);

  const weekNumberLabel = currentWeekId_.includes("-W")
    ? `W${currentWeekId_.split("-W")[1]}`
    : currentWeekId_;

  const weekYearLabel =
    currentWeekId_.split("-W")[0] ||
    String(currentWeekStart.getFullYear());

  const formatDashboardMoney = (value) => {
    return `${Math.round(value || 0)} \u20ac`;
  };

  const formatDashboardEventTime = (schedule) => {
    if (!schedule.startAt || !schedule.endAt) {
      return "";
    }

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit"
    };

    return `${new Date(schedule.startAt).toLocaleTimeString("en-GB", timeOptions)}-${new Date(schedule.endAt).toLocaleTimeString("en-GB", timeOptions)}`;
  };

  const currentWeekSchedules = schedules_
    .filter((schedule) => {
      return (
        schedule.startAt &&
        isInDisplayedWeek_(
          new Date(schedule.startAt),
          currentWeekStart
        )
      );
    })
    .sort((a, b) => {
      return new Date(a.startAt) - new Date(b.startAt);
    });

  const weekBookingCountsByScheduleId = confirmedBookings.reduce(
    (map, booking) => {
      if (
        !booking.scheduleId ||
        !booking.startAt ||
        !isInDisplayedWeek_(
          new Date(booking.startAt),
          currentWeekStart
        )
      ) {
        return map;
      }

      map.set(
        booking.scheduleId,
        (map.get(booking.scheduleId) || 0) + 1
      );

      return map;
    },
    new Map()
  );

  const upcomingEventsDaysHtml = Array.from(
    { length: 7 },
    (_, dayIndex) => {
      const dayDate = addDays_(currentWeekStart, dayIndex);

      const daySchedules = currentWeekSchedules.filter((schedule) => {
        return (
          getMondayFirstDayIndex_(new Date(schedule.startAt)) ===
          dayIndex
        );
      });

      const eventCardsHtml = daySchedules.length
        ? daySchedules
            .map((schedule) => {
              const bookingCount = Math.max(
                Number(schedule.bookedCount || 0),
                Number(
                  weekBookingCountsByScheduleId.get(schedule.id) || 0
                )
              );

              const capacity = Number(schedule.capacity || 0);
              const eventColor = isRecurringScheduleItem_(schedule)
                ? "#6b7280"
                : normalizeColor_(schedule.color);

              return `
                <article
                  class="dashboard-upcoming-event-card"
                  data-schedule-id="${escapeHtml_(schedule.id)}"
                  tabindex="0"
                  role="button"
                  style="--event-color: ${escapeHtml_(eventColor)};"
                >
                  <div class="dashboard-upcoming-event-meta">
                    <span>${escapeHtml_(formatDashboardEventTime(schedule).split("-")[0] || "")}</span>
                    <em>${bookingCount}${capacity ? ` / ${capacity}` : ""}</em>
                  </div>
                  <strong>${escapeHtml_(
                    schedule.className || "Untitled class"
                  )}</strong>
                </article>
              `;
            })
            .join("")
        : `<p class="dashboard-upcoming-empty">No classes</p>`;

      const isToday = formatDateInput_(dayDate) === formatDateInput_(new Date());

      return `
        <section class="dashboard-upcoming-day${isToday ? " is-today" : ""}">
          <header>
            <strong>
              ${escapeHtml_(
                dayDate.toLocaleDateString("en-GB", {
                  weekday: "short"
                })
              )}
            </strong>

            <span>${escapeHtml_(
              dayDate.toLocaleDateString("en-GB", {
                day: "numeric"
              })
            )}</span>
          </header>

          <div class="dashboard-upcoming-day-list">
            ${eventCardsHtml}
          </div>
        </section>
      `;
    }
  ).join("");

  if (pageSubtitleEl) {
    pageSubtitleEl.textContent = "";
  }

  pageContentEl.innerHTML = `
    <section class="dashboard-admin-reference dashboard-snapshot dashboard-dashboard${
      isDashboardWeekTransitioning_ ? " is-week-transitioning" : ""
    }">
      <header class="dashboard-week-strip dashboard-overview-header">
        <div class="dashboard-welcome">
          <strong>Welcome back</strong>
          <span>${escapeHtml_(currentMember_?.name || "Admin")}</span>
        </div>

        <div class="dashboard-week-nav" aria-label="Change dashboard week">
          <button id="prev-dashboard-week-btn" type="button">&lt; Prev</button>
          <strong>${escapeHtml_(formatDate_(currentWeekStart))} &#8594; ${escapeHtml_(formatDate_(weekEnd))}</strong>
          <button id="next-dashboard-week-btn" type="button">Next &gt;</button>
        </div>

        <span class="dashboard-week-info">${escapeHtml_(`Week ${weekYearLabel} - ${weekNumberLabel}`)}</span>
      </header>

      <div class="dashboard-periods">
        <section class="dashboard-period dashboard-weekly-period" aria-labelledby="dashboard-weekly-title">
          <h2 id="dashboard-weekly-title"><span>This week</span><strong>${escapeHtml_(weekNumberLabel)}</strong></h2>
          <div class="dashboard-weekly-grid">
            <section class="dashboard-upcoming-card dashboard-link-card" data-dashboard-target="schedule" tabindex="0" role="button">
              <div class="dashboard-upcoming-grid">${upcomingEventsDaysHtml}</div>
            </section>

            <section class="dashboard-snapshot-card dashboard-kpi-card dashboard-weekly-kpis">
              <div class="dashboard-snapshot-title"><h3>Weekly KPI</h3></div>
              <div class="dashboard-snapshot-metrics">
                <div><span>Revenue</span><strong>${formatDashboardMoney(selectedWeekRevenue)}</strong>${renderReferenceMetricDelta_(estimatedRevenueDelta, "money")}</div>
                <div><span>Bookings</span><strong>${totalAttendancesThisWeek}</strong>${renderReferenceMetricDelta_(getMetricDelta_(totalAttendancesThisWeek, previousWeekBookings.length), "number")}</div>
                <div><span>Classes</span><strong>${classesThisWeek}</strong>${renderReferenceMetricDelta_(getMetricDelta_(classesThisWeek, previousWeekClasses), "number")}</div>
                <div><span>Participants</span><strong>${uniqueAttendeesThisWeek}</strong>${renderReferenceMetricDelta_(getMetricDelta_(uniqueAttendeesThisWeek, previousWeekUniqueAttendees), "number")}</div>
                <div><span>Occupancy</span><strong>${selectedWeekOccupancy}%</strong>${renderReferenceMetricDelta_(getMetricDelta_(selectedWeekOccupancy, previousWeekOccupancy), "number")}</div>
              </div>
            </section>
          </div>
        </section>

        <section class="dashboard-period dashboard-monthly-period" aria-labelledby="dashboard-monthly-title">
          <h2 id="dashboard-monthly-title"><span>This month</span><strong>${escapeHtml_(selectedMonth.toLocaleDateString("en-GB", { month: "long" }))}</strong></h2>
          <div class="dashboard-monthly-grid">
            <section class="dashboard-snapshot-card dashboard-monthly-revenue">
              <div class="dashboard-snapshot-title">
                <h3>Revenue trend</h3>
                ${renderDashboardInfo_(
                  "Revenue trend explanation",
                  "Estimated booking value by month",
                  "Each point totals the estimated value of confirmed bookings in one of the six months ending with the selected month.",
                  "A €200 pack with 10 classes values each booking at €20."
                )}
              </div>
              <div class="dashboard-business-charts">
                ${renderDashboardRevenueTrend_(monthlyRevenueTrend)}
                ${renderDashboardPackSales_(monthlyPackSales)}
              </div>
            </section>

            <div class="dashboard-heatmap-card dashboard-link-card" data-dashboard-target="schedule" tabindex="0" role="button">
              ${renderDashboardReferenceHeatmap_(selectedMonth, bookingCountsByDay, classStatsByDay, maxDayBookings)}
            </div>

            <section class="dashboard-snapshot-card dashboard-kpi-card dashboard-monthly-kpis">
              <div class="dashboard-snapshot-title"><h3>Monthly KPI</h3></div>
              <div class="dashboard-snapshot-metrics">
                <div><span>Revenue</span><strong>${formatDashboardMoney(selectedMonthRevenue)}</strong>${renderReferenceMetricDelta_(getMetricDelta_(selectedMonthRevenue, previousMonthRevenue), "money", "Compared with previous month")}</div>
                <div><span>Packs sold</span><strong>${selectedMonthClientPacks.length}</strong>${renderReferenceMetricDelta_(getMetricDelta_(selectedMonthClientPacks.length, previousMonthClientPacks.length), "number", "Compared with previous month")}</div>
                <div><span>New clients</span><strong>${selectedMonthNewClients}</strong>${renderReferenceMetricDelta_(getMetricDelta_(selectedMonthNewClients, previousMonthNewClients), "number", "Compared with previous month")}</div>
                <div><span>Occupancy</span><strong>${selectedMonthOccupancy}%</strong>${renderReferenceMetricDelta_(getMetricDelta_(selectedMonthOccupancy, previousMonthOccupancy), "number", "Compared with previous month")}</div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </section>
  `;

  const moveDashboardWeek = async (direction, button) => {
    if (isDashboardWeekTransitioning_) {
      return;
    }

    isDashboardWeekTransitioning_ = true;

    try {
      await goToScheduleWeek_(direction * 7, button);
    } finally {
      isDashboardWeekTransitioning_ = false;
    }
  };

  document
    .getElementById("prev-dashboard-week-btn")
    ?.addEventListener("click", (event) => {
      moveDashboardWeek(-1, event.currentTarget);
    });

  document
    .getElementById("next-dashboard-week-btn")
    ?.addEventListener("click", (event) => {
      moveDashboardWeek(1, event.currentTarget);
    });

  document
    .querySelectorAll(".dashboard-upcoming-event-card")
    .forEach((card) => {
      const openEventBookings = (event) => {
        event.stopPropagation();

        const scheduleId = card.dataset.scheduleId || "";

        if (scheduleId) {
          openBookingModal_(scheduleId);
        }
      };

      card.addEventListener("click", openEventBookings);

      card.addEventListener("keydown", (event) => {
        if (event.target !== card) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openEventBookings(event);
        }
      });
    });

  document
    .querySelectorAll(".dashboard-link-card")
    .forEach((card) => {
      const navigateToTarget = () => {
        const targetPage = card.dataset.dashboardTarget;

        if (!targetPage) {
          return;
        }

        currentPage = targetPage;
        renderPage_();
      };

      card.addEventListener("dblclick", navigateToTarget);

      card.addEventListener("keydown", (event) => {
        if (event.target !== card) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigateToTarget();
        }
      });
    });
}
/**
 * Render clients page.
 *
 * @returns {void}
 */
function renderClientsPage_() {
  if (!pageContentEl) {
    return;
  }

  const cardsHtml = clients_.length
    ? clients_.map((client) => `
      <article class="info-card client-card" data-client-id="${escapeHtml_(client.id)}">
        <div class="avatar">${escapeHtml_((client.fullName || "C").charAt(0).toUpperCase())}</div>
        <div class="info-card-body">
          <h3>${escapeHtml_(client.fullName || "Unnamed client")}</h3>
          <p>${escapeHtml_(client.email || "No email")}</p>
          <p>${escapeHtml_(client.phone || "No phone")}</p>
        </div>
        <div class="badge ${client.canBook ? "badge-success" : "badge-muted"}">
          ${client.canBook ? "Can book" : "Blocked"}
        </div>
      </article>
    `).join("")
    : `<div class="empty-state small">No clients yet — add one to get started.</div>`;

  pageContentEl.innerHTML = `
    <section class="hero-card">
      <div>
        <h3>Clients</h3>
        <p class="muted">${clients_.length} registered member${clients_.length !== 1 ? "s" : ""}</p>
      </div>
      <div class="client-hero-actions">
        <button id="open-client-import-modal-btn" class="secondary-btn" type="button">Import</button>
        <button id="open-client-modal-btn" class="primary-btn" type="button">Add client</button>
      </div>
    </section>

    <section class="stack-list">
      ${cardsHtml}
    </section>
  `;

  document.getElementById("open-client-modal-btn")?.addEventListener("click", () => {
    openClientModal_(null);
  });

  document.getElementById("open-client-import-modal-btn")?.addEventListener("click", openClientImportModal_);

  document.querySelectorAll(".client-card").forEach((card) => {
    card.addEventListener("click", () => {
      const client = clients_.find((item) => item.id === card.dataset.clientId);
      if (client) {
        openClientModal_(client);
      }
    });
  });
}

/**
 * Render clients page grouped by booking activity.
 *
 * @returns {void}
 */
function renderClientsPageV2_() {
  if (!pageContentEl) {
    return;
  }

  const existingClientIds = new Set(clients_.map((client) => client.id));
  [...selectedClientIds_].forEach((clientId) => {
    if (!existingClientIds.has(clientId)) {
      selectedClientIds_.delete(clientId);
    }
  });

  const recentSince = new Date();
  recentSince.setDate(recentSince.getDate() - 30);

  const lastBookingByClientId = bookings_.reduce((map, booking) => {
    if (!booking.clientId || !booking.startAt) {
      return map;
    }

    const bookingDate = new Date(booking.startAt);
    const currentDate = map.get(booking.clientId);

    if (!currentDate || bookingDate > currentDate) {
      map.set(booking.clientId, bookingDate);
    }

    return map;
  }, new Map());

  const packsByClientId = clientPacks_.reduce((map, pack) => {
    if (!pack.clientId) {
      return map;
    }

    const list = map.get(pack.clientId) || [];
    list.push(pack);
    map.set(pack.clientId, list);
    return map;
  }, new Map());

  const normalizedSearch = clientsSearchQuery_.trim().toLowerCase();
  const decoratedClients = clients_
    .map((client) => {
      const lastBookingAt = lastBookingByClientId.get(client.id) || null;
      const clientPacks = packsByClientId.get(client.id) || [];
      const latestPack = [...clientPacks].sort((a, b) => new Date(b.purchasedAt || 0) - new Date(a.purchasedAt || 0))[0] || null;
      const activeCreditPack = getCurrentClientPack_(client.id);
      const remainingCredits = Number(activeCreditPack?.remainingClasses || 0);
      const hasExpiredPack = clientPacks.some((pack) => String(pack.status || "") === "expired");
      const hasAnyPack = clientPacks.length > 0;
      const packForDisplay = activeCreditPack || latestPack;
      const searchable = [
        client.fullName,
        client.email,
        client.phone,
        client.country,
        CLIENT_COUNTRIES_[client.country]?.name,
        packForDisplay?.packTemplateName
      ].join(" ").toLowerCase();

      return {
        ...client,
        country: client.country || "",
        lastBookingAt,
        clientPacks,
        remainingCredits,
        packForDisplay,
        isRecent: Boolean(lastBookingAt && lastBookingAt >= recentSince),
        hasActivePack: Boolean(activeCreditPack),
        hasNoCredits: !activeCreditPack,
        hasExpiredPack,
        hasAnyPack,
        searchable
      };
    })
    .filter((client) => {
      if (normalizedSearch && !client.searchable.includes(normalizedSearch)) {
        return false;
      }

      if (clientsFilter_ === "active") {
        return client.hasActivePack;
      }

      if (clientsFilter_ === "no-credits") {
        return client.hasNoCredits;
      }

      if (clientsFilter_ === "recent") {
        return client.isRecent;
      }

      if (clientsFilter_ === "expired") {
        return client.hasExpiredPack || (!client.hasActivePack && client.hasAnyPack);
      }

      return true;
    })
    .sort((a, b) => {
      if (clientsSort_ === "credits") {
        return b.remainingCredits - a.remainingCredits || (a.fullName || "").localeCompare(b.fullName || "");
      }

      return (a.fullName || "").localeCompare(b.fullName || "");
    });

  const filters = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "no-credits", label: "No Credits" },
    { id: "recent", label: "Recent" },
    { id: "expired", label: "Expired" }
  ];

  const filterTabsHtml = filters.map((filter) => `
    <button class="client-filter-pill${clientsFilter_ === filter.id ? " active" : ""}" data-client-filter="${filter.id}" type="button">
      ${escapeHtml_(filter.label)}
    </button>
  `).join("");

  const renderPackMeta = (client) => {
    if (!client.hasActivePack) {
      return `
        <strong>No active pack</strong>
        <button class="client-assign-pack-link" data-client-pack-action="${escapeHtml_(client.id)}" type="button">Assign pack</button>
      `;
    }

    const purchasedAt = client.packForDisplay.purchasedAt ? new Date(client.packForDisplay.purchasedAt) : null;

    return `
      <strong>${escapeHtml_(client.packForDisplay.packTemplateName || "Pack")}</strong>
      <span>${client.remainingCredits} credit${client.remainingCredits !== 1 ? "s" : ""} left${purchasedAt ? ` · since ${escapeHtml_(formatFullDate_(purchasedAt))}` : ""}</span>
    `;
  };

  const renderStatusBadge = (client) => {
    if (client.hasActivePack) {
      return `<span class="client-status-pill is-active">Active Pack</span>`;
    }

    if (client.hasExpiredPack || client.hasAnyPack) {
      return `<span class="client-status-pill is-expired">Expired</span>`;
    }

    return `<span class="client-status-pill is-empty">No Credits</span>`;
  };
  const visibleClientIds = decoratedClients.map((client) => client.id);
  const selectedVisibleCount = visibleClientIds.filter((clientId) => selectedClientIds_.has(clientId)).length;
  const areAllVisibleSelected = visibleClientIds.length > 0 && selectedVisibleCount === visibleClientIds.length;
  const areSomeVisibleSelected = selectedVisibleCount > 0 && !areAllVisibleSelected;

  const rowsHtml = decoratedClients.length
    ? decoratedClients.map((client) => {
      const country = getClientCountryDisplay_(client.country);
      const isSelected = selectedClientIds_.has(client.id);

      return `
      <article class="client-directory-row client-card${isSelected ? " is-selected" : ""}${isClientSelectionMode_ ? " is-selection-mode" : ""}" data-client-id="${escapeHtml_(client.id)}">
        ${isClientSelectionMode_ ? `
          <label class="client-selection-cell" aria-label="Select ${escapeHtml_(client.fullName || "client")}">
            <input class="client-row-select" data-client-select-id="${escapeHtml_(client.id)}" type="checkbox"${isSelected ? " checked" : ""} />
          </label>
        ` : ""}
        <div class="client-directory-name">
          <div class="client-directory-avatar">${escapeHtml_((client.fullName || "C").charAt(0).toUpperCase())}</div>
          <strong>${escapeHtml_(client.fullName || "Unnamed client")}</strong>
        </div>
        <div class="client-directory-country" title="${escapeHtml_(country.name)}" aria-label="${escapeHtml_(country.name)}">
          ${country.flagSrc ? `<img class="client-country-flag" src="${escapeHtml_(country.flagSrc)}" alt="" aria-hidden="true" />` : ""}
          <span class="client-country-code">${escapeHtml_(country.isKnown ? country.code : country.value)}</span>
        </div>
        <div class="client-directory-contact">
          <strong>${escapeHtml_(client.email || "No email")}</strong>
          <span>${escapeHtml_(client.phone || "No phone")}</span>
        </div>
        <div class="client-directory-pack">${renderPackMeta(client)}</div>
        <div class="client-directory-status">${renderStatusBadge(client)}</div>
        <button class="client-more-btn" data-client-id="${escapeHtml_(client.id)}" type="button" aria-label="Open client details">
          <span aria-hidden="true">⋮</span>
        </button>
      </article>
    `;
    }).join("")
    : `<div class="empty-state small">No clients match this view.</div>`;

  pageContentEl.innerHTML = `
    <section class="client-directory">
      ${isDeletingSelectedClients_ ? `
        <div class="client-bulk-loader" role="status" aria-live="polite">
          <div class="app-loader-spinner"></div>
          <strong>Deleting selected clients...</strong>
          <span>Removing related bookings, packs, invites, and logins.</span>
        </div>
      ` : ""}
      <div class="client-directory-topbar">
        <div class="client-filter-tabs" aria-label="Client filters">
          ${filterTabsHtml}
        </div>

        <div class="client-directory-actions">
          <button id="open-client-import-modal-btn" class="secondary-btn client-import-action-btn" type="button">Import</button>
          <button id="open-client-modal-btn" class="primary-btn client-add-action-btn" type="button">
            <span class="client-add-action-icon" aria-hidden="true">+</span>
            Add
          </button>
        </div>
      </div>

      <div class="client-list-controls">
      <div style="display: flex;gap: 15px;">
                <label class="client-selection-toggle">
            <input id="client-selection-mode-toggle" type="checkbox"${isClientSelectionMode_ ? " checked" : ""} />
            <span>${isClientSelectionMode_ ? `${selectedClientIds_.size} selected` : "Select"}</span>
          </label>
          ${isClientSelectionMode_ ? `
            <button id="delete-client-selection-btn" class="danger-btn client-delete-selection-btn" type="button"${selectedClientIds_.size ? "" : " disabled"}>
              Delete selection
            </button>
          ` : ""}
          </div>
        <div class="client-sort-note">
          Showing ${decoratedClients.length} of ${clients_.length} &middot; Sorted by ${clientsSort_ === "az" ? "A-Z" : "credits left"}
        </div>
        <div class="client-list-tools">
          <label id="client-search-compact" class="client-search-compact${clientsSearchExpanded_ || clientsSearchQuery_ ? " is-open" : ""}">
            <button id="client-search-toggle-btn" class="client-icon-btn" type="button" aria-label="Search clients">
              <span aria-hidden="true">⌕</span>
            </button>
            <input id="clients-search-input" type="search" value="${escapeHtml_(clientsSearchQuery_)}" placeholder="Search clients" />
          </label>
          <button id="clients-sort-btn" class="secondary-btn client-sort-control" type="button" aria-label="Toggle client sort" title="${clientsSort_ === "az" ? "Sort by credits left" : "Sort A-Z"}" data-sort-label="${clientsSort_ === "az" ? "Sort: A-Z" : "Sort: Credits left"}">
          </button>
        </div>
      </div>

      <div class="client-directory-header${isClientSelectionMode_ ? " is-selection-mode" : ""}">
        ${isClientSelectionMode_ ? `
          <label class="client-selection-cell client-select-all" aria-label="Select all visible clients">
            <input id="clients-select-all" type="checkbox"${areAllVisibleSelected ? " checked" : ""} />
          </label>
        ` : ""}
        <span>Name</span>
        <span>Country</span>
        <span>Contact</span>
        <span>Pack</span>
        <span>Status</span>
        <span>More</span>
      </div>

      <div class="client-directory-list">
        ${rowsHtml}
      </div>
    </section>
  `;

  document.querySelectorAll(".client-filter-pill").forEach((button) => {
    button.addEventListener("click", () => {
      clientsFilter_ = button.dataset.clientFilter || "all";
      renderClientsPageV2_();
    });
  });

  document.getElementById("open-client-modal-btn")?.addEventListener("click", () => {
    openClientModal_(null);
  });

  document.getElementById("open-client-import-modal-btn")?.addEventListener("click", openClientImportModal_);

  document.getElementById("client-selection-mode-toggle")?.addEventListener("change", (event) => {
    isClientSelectionMode_ = event.target.checked;
    if (!isClientSelectionMode_) {
      selectedClientIds_.clear();
    }
    renderClientsPageV2_();
  });

  document.getElementById("delete-client-selection-btn")?.addEventListener("click", (event) => {
    handleDeleteSelectedClients_(event.currentTarget);
  });

  const selectAllEl = document.getElementById("clients-select-all");
  if (selectAllEl) {
    selectAllEl.indeterminate = areSomeVisibleSelected;
    selectAllEl.addEventListener("change", (event) => {
      visibleClientIds.forEach((clientId) => {
        if (event.target.checked) {
          selectedClientIds_.add(clientId);
        } else {
          selectedClientIds_.delete(clientId);
        }
      });
      renderClientsPageV2_();
    });
  }

  document.querySelectorAll(".client-row-select").forEach((checkbox) => {
    checkbox.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    checkbox.addEventListener("change", () => {
      const clientId = checkbox.dataset.clientSelectId;
      if (checkbox.checked) {
        selectedClientIds_.add(clientId);
      } else {
        selectedClientIds_.delete(clientId);
      }
      renderClientsPageV2_();
    });
  });

  document.querySelectorAll(".client-selection-cell").forEach((cell) => {
    cell.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  document.getElementById("client-search-toggle-btn")?.addEventListener("click", (event) => {
    event.preventDefault();
    clientsSearchExpanded_ = true;
    renderClientsPageV2_();
    document.getElementById("clients-search-input")?.focus();
  });

  document.getElementById("clients-search-input")?.addEventListener("input", (event) => {
    clientsSearchQuery_ = event.target.value;
    clientsSearchExpanded_ = true;
    renderClientsPageV2_();
    const searchInput = document.getElementById("clients-search-input");

    if (searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    }
  });

  document.getElementById("client-search-compact")?.addEventListener("focusout", () => {
    window.setTimeout(() => {
      const searchContainer = document.getElementById("client-search-compact");
      if (
        searchContainer
        && !searchContainer.contains(document.activeElement)
        && !clientsSearchQuery_.trim()
      ) {
        clientsSearchExpanded_ = false;
        renderClientsPageV2_();
      }
    }, 0);
  });

  document.getElementById("clients-sort-btn")?.addEventListener("click", () => {
    clientsSort_ = clientsSort_ === "az" ? "credits" : "az";
    renderClientsPageV2_();
  });

  document.querySelectorAll(".client-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (isClientSelectionMode_) {
        const clientId = card.dataset.clientId;
        if (selectedClientIds_.has(clientId)) {
          selectedClientIds_.delete(clientId);
        } else {
          selectedClientIds_.add(clientId);
        }
        renderClientsPageV2_();
        return;
      }

      const client = clients_.find((item) => item.id === card.dataset.clientId);
      if (client) {
        openClientModal_(client);
      }
    });
  });

  document.querySelectorAll("[data-client-pack-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const client = clients_.find((item) => item.id === button.dataset.clientPackAction);
      if (client) {
        openClientModal_(client);
        clientAssignPackTemplateEl?.focus();
      }
    });
  });
}

/**
 * Render pack templates page.
 *
 * @returns {void}
 */
function renderPacksPage_() {
  if (!pageContentEl) {
    return;
  }

  const cardsHtml = packs_.length
    ? packs_.map((pack) => `
      <article class="pack-card">
        <p class="pack-type">${pack.type === "monthly" ? "Monthly" : "Normal"}</p>
        <h3>${escapeHtml_(pack.name || "Unnamed pack")}</h3>
        <p class="pack-price">€${Number(pack.price || 0)}</p>
        <p class="muted">${escapeHtml_(pack.details || "")}</p>
        <p class="muted">${Number(pack.classCount || 0)} classes</p>
      </article>
    `).join("")
    : `<div class="empty-state small">No packs yet — create your first one.</div>`;

  pageContentEl.innerHTML = `
    <section class="hero-card">
      <div>
        <h3>Packs</h3>
        <p class="muted">Normal and monthly packs available for sale.</p>
      </div>
      <button id="open-pack-modal-btn" class="primary-btn" type="button">Create pack</button>
    </section>

    <section class="packs-grid">
      ${cardsHtml}
    </section>
  `;

  document.getElementById("open-pack-modal-btn")?.addEventListener("click", () => openPackModal_());
}

/**
 * Render pack templates page split by pack type.
 *
 * @returns {void}
 */
function renderPacksPageV2_() {
  if (!pageContentEl) {
    return;
  }

  const monthlyPacks = packs_.filter((pack) => pack.type === "monthly");
  const normalPacks = packs_.filter((pack) => pack.type !== "monthly");

  const renderPackList = (items) => items.length
    ? items.map((pack) => `
      <article class="pack-list-row" data-pack-id="${escapeHtml_(pack.id)}">
        <div class="pack-list-main">
          <h3>${escapeHtml_(pack.name || "Unnamed pack")}</h3>
          <span>${pack.type === "monthly" ? "/month" : `/${Number(pack.classCount || 0)} classes`}</span>
        </div>
        <div class="row-action-group">
          <div class="pack-row-meta">
          <strong>€${Number(pack.price || 0)}</strong>
          </div>
          <button class="pack-icon-action edit-pack-btn" data-pack-id="${escapeHtml_(pack.id)}" type="button" aria-label="Edit ${escapeHtml_(pack.name || "pack")}" title="Edit">&#9998;</button>
          <button class="pack-icon-action delete-pack-btn" data-pack-id="${escapeHtml_(pack.id)}" type="button" aria-label="Delete ${escapeHtml_(pack.name || "pack")}" title="Delete">&times;</button>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state small">No packs in this category yet.</div>`;

  pageContentEl.innerHTML = `
    <div class="packs-view-toolbar">
      <div class="packs-view-tabs" aria-label="Pack views">
        <button class="packs-view-tab active" type="button" aria-current="page">Packs</button>
        <button class="packs-view-tab" type="button" disabled>Client packages</button>
      </div>
    </div>

    <section class="packs-workspace">
      <div class="packs-column">
        <div class="packs-column-header">
          <div>
            <h3>Monthly Membership</h3>
            <p class="muted">Time-based</p>
          </div>
          <button id="open-monthly-pack-modal-btn" class="pack-add-btn" type="button" aria-label="Create monthly membership" title="Create monthly membership">+</button>
        </div>

        <div class="packs-list">
          ${renderPackList(monthlyPacks)}
        </div>
      </div>

      <div class="packs-column">
        <div class="packs-column-header">
          <div>
            <h3>Class Pack</h3>
            <p class="muted">Credit-based</p>
          </div>
          <button id="open-normal-pack-modal-btn" class="pack-add-btn" type="button" aria-label="Create class pack" title="Create class pack">+</button>
        </div>

        <div class="packs-list">
          ${renderPackList(normalPacks)}
        </div>
      </div>
    </section>
  `;

  document.getElementById("open-normal-pack-modal-btn")?.addEventListener("click", () => {
    openPackModal_("credits");
  });

  document.getElementById("open-monthly-pack-modal-btn")?.addEventListener("click", () => {
    openPackModal_("monthly");
  });

  document.querySelectorAll(".pack-list-row").forEach((row) => {
    row.addEventListener("click", () => {
      const pack = packs_.find((item) => item.id === row.dataset.packId);
      if (pack) {
        openPackModal_(pack.type || "credits", pack);
      }
    });
  });

  document.querySelectorAll(".edit-pack-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const pack = packs_.find((item) => item.id === button.dataset.packId);
      if (pack) {
        openPackModal_(pack.type || "credits", pack);
      }
    });
  });

  document.querySelectorAll(".delete-pack-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await handleDeletePack_(button.dataset.packId || "", button);
    });
  });
}

/**
 * Render client packs page.
 *
 * @returns {void}
 */
function renderClientPacksPage_() {
  if (!pageContentEl) {
    return;
  }

  const cardsHtml = clientPacks_.length
    ? clientPacks_.map((item) => `
      <article class="pack-card client-pack-card" data-client-pack-id="${escapeHtml_(item.id)}" tabindex="0">
        <p class="pack-type">${item.type === "monthly" ? "Monthly" : "Normal"}</p>
        <h3>${escapeHtml_(item.clientName)}</h3>
        <p class="muted">${escapeHtml_(item.packTemplateName)}</p>
        <p class="pack-price">${Number(item.remainingClasses || 0)}/${Number(item.totalClasses || 0)} classes left</p>
        <p class="muted">Status: ${escapeHtml_(item.status)}</p>
      </article>
    `).join("")
    : `<div class="empty-state small">No client packs assigned yet.</div>`;

  pageContentEl.innerHTML = `
    <section class="hero-card">
      <div>
        <h3>Client Packs</h3>
        <p class="muted">Purchased packs currently owned by clients.</p>
      </div>
      <button id="open-client-pack-modal-btn" class="primary-btn" type="button">Assign pack</button>
    </section>

    <section class="packs-grid">
      ${cardsHtml}
    </section>
  `;

  document.getElementById("open-client-pack-modal-btn")?.addEventListener("click", openClientPackModal_);

  document.querySelectorAll(".client-pack-card").forEach((card) => {
    const openCard = () => {
      const clientPack = clientPacks_.find((item) => item.id === card.dataset.clientPackId);

      if (clientPack) {
        openClientPackModal_(clientPack);
      }
    };

    card.addEventListener("click", openCard);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCard();
      }
    });
  });
}

/**
 * Render business settings page.
 *
 * @returns {void}
 */
function renderSettingsPage_() {
  if (!pageContentEl) {
    return;
  }

  const business = currentBusiness_ || {};
  const currentLogo = business.logoDataUrl || business.logoUrl || "";
  const canManageAdmins = currentMember_?.role === "owner";
  const membersHtml = businessMembers_.length
    ? businessMembers_.map((member) => `
      <article class="settings-member-row">
        <div>
          <strong>${escapeHtml_(member.name || member.email || "Admin")}</strong>
          <p class="muted">${escapeHtml_(member.email || "No email")}</p>
        </div>
        <span class="badge ${member.role === "owner" ? "badge-success" : "badge-muted"}">${escapeHtml_(member.role || "admin")}</span>
      </article>
    `).join("")
    : `<div class="empty-state small">No admin members found.</div>`;

  pageContentEl.innerHTML = `
    <section class="settings-workspace">
      <form id="business-settings-form" class="settings-panel">
        <div class="settings-panel-header">
          <div>
            <h3>Business profile</h3>
            <p class="muted">This information is used across the admin and client experience.</p>
          </div>
          <button id="save-business-settings-btn" class="primary-btn settings-header-action" type="submit">Save changes</button>
        </div>

        <div class="settings-profile-grid">
          <div class="settings-logo-block">
            <div id="settings-logo-preview" class="settings-logo-preview${currentLogo ? " has-image" : ""}" style="${currentLogo ? `background-image:url('${escapeHtml_(currentLogo)}')` : ""}">
              ${currentLogo ? "" : escapeHtml_((business.name || "B").charAt(0).toUpperCase())}
            </div>
            <label class="settings-file-control">
              <span>Logo</span>
              <input id="settings-logo-input" type="file" accept="image/png,image/jpeg,image/webp,image/gif" />
            </label>
            <button id="remove-settings-logo-btn" class="ghost-btn" type="button">Remove logo</button>
          </div>

          <div class="form-stack settings-form-stack">
            <label>
              <span>Business name</span>
              <input id="settings-business-name" type="text" value="${escapeHtml_(business.name || "")}" required />
            </label>
            <label>
              <span>Description</span>
              <textarea id="settings-business-description" rows="6" maxlength="800">${escapeHtml_(business.description || "")}</textarea>
            </label>
          </div>
        </div>
      </form>

      <section class="settings-panel">
        <div class="settings-panel-header">
          <div>
            <h3>Admin members</h3>
            <p class="muted">Admins can manage classes, clients, packs, bookings, and settings.</p>
          </div>
          ${canManageAdmins ? `<button id="add-admin-member-submit-btn" class="secondary-btn settings-header-action" type="submit" form="add-admin-member-form">Add admin</button>` : ""}
        </div>

        ${canManageAdmins ? `
          <form id="add-admin-member-form" class="settings-admin-form">
            <label>
              <span>Name</span>
              <input id="admin-member-name" type="text" maxlength="120" placeholder="New admin" />
            </label>
            <label>
              <span>Email</span>
              <input id="admin-member-email" type="email" maxlength="254" required placeholder="admin@example.com" />
            </label>
          </form>
          <div id="new-admin-invite" class="settings-password-note hidden"></div>
        ` : `<p class="muted">Only the business owner can add administrators.</p>`}
        <div class="settings-member-list">${membersHtml}</div>
      </section>
    </section>
  `;

  let settingsLogoDataUrl = currentLogo;
  const logoInputEl = document.getElementById("settings-logo-input");
  const logoPreviewEl = document.getElementById("settings-logo-preview");
  const removeLogoBtn = document.getElementById("remove-settings-logo-btn");
  const saveSettingsBtn = document.getElementById("save-business-settings-btn");
  const businessNameEl = document.getElementById("settings-business-name");
  const businessDescriptionEl = document.getElementById("settings-business-description");

  logoInputEl?.addEventListener("change", async () => {
    const file = logoInputEl.files?.[0];

    if (!file) {
      return;
    }

    try {
      settingsLogoDataUrl = await readLogoFile_(file);
      if (logoPreviewEl) {
        logoPreviewEl.textContent = "";
        logoPreviewEl.classList.add("has-image");
        logoPreviewEl.style.backgroundImage = `url("${settingsLogoDataUrl}")`;
      }
    } catch (error) {
      logoInputEl.value = "";
      showToast_(error.message, "error");
    }
  });

  removeLogoBtn?.addEventListener("click", () => {
    settingsLogoDataUrl = "";
    if (logoInputEl) {
      logoInputEl.value = "";
    }
    if (logoPreviewEl) {
      logoPreviewEl.classList.remove("has-image");
      logoPreviewEl.style.backgroundImage = "";
      logoPreviewEl.textContent = (document.getElementById("settings-business-name")?.value || "B").charAt(0).toUpperCase();
    }
  });

  document.getElementById("business-settings-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const submitBtn = saveSettingsBtn;
    const name = document.getElementById("settings-business-name")?.value.trim() || "";
    const description = document.getElementById("settings-business-description")?.value.trim() || "";

    if (!name) {
      showToast_("Business name is required.", "error");
      return;
    }

    const restore = setButtonLoading_(submitBtn, "Saving...");

    try {
      currentBusiness_ = await updateBusinessSettings_({
        name,
        description,
        logoDataUrl: settingsLogoDataUrl
      });
      applyBusinessBranding_(currentBusiness_);
      showToast_("Business settings saved", "success");
      renderSettingsPage_();
    } catch (error) {
      showToast_(error.message, "error");
    } finally {
      restore();
    }
  });

  document.getElementById("add-admin-member-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const submitBtn = document.getElementById("add-admin-member-submit-btn");
    const name = document.getElementById("admin-member-name")?.value.trim() || "";
    const email = document.getElementById("admin-member-email")?.value.trim() || "";

    if (!email) {
      showToast_("Admin email is required.", "error");
      return;
    }

    const restore = setButtonLoading_(submitBtn, "Adding...");

    try {
      const result = await addAdminMember_({ name, email });
      businessMembers_ = [...businessMembers_, result.item].sort((a, b) =>
        (a.name || a.email || "").localeCompare(b.name || b.email || "")
      );
      form.reset();
      renderSettingsPage_();

      if (result.inviteEmailSent) {
        const inviteNoteEl = document.getElementById("new-admin-invite");
        if (inviteNoteEl) {
          inviteNoteEl.classList.remove("hidden");
          inviteNoteEl.innerHTML = `
            <strong>Admin invitation sent</strong>
            <span>${escapeHtml_(email)} can open the email to create a password and connect.</span>
          `;
        }
        showToast_("Admin added. Invitation email sent.", "success");
      } else {
        showToast_("Admin member linked", "success");
      }
    } catch (error) {
      showToast_(error.message, "error");
    } finally {
      restore();
    }
  });
}

/**
 * Build one draft schedule item from a reusable class template and time slot.
 *
 * @param {Object} template
 * @param {Date} dayDate
 * @param {number} hour
 * @returns {Object}
 */
function buildScheduleItemFromTemplate_(template, dayDate, hour) {
  const dateValue = formatDateInput_(dayDate);
  const startTime = `${String(hour).padStart(2, "0")}:00`;
  const startAt = buildIsoFromLocal_(dateValue, startTime);
  const endAt = new Date(new Date(startAt).getTime() + Number(template.durationMinutes || 60) * 60000).toISOString();

  return {
    id: `draft-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    weekId: currentWeekId_,
    className: template.className,
    coachName: template.coachName,
    startAt,
    endAt,
    capacity: Number(template.capacity || 10),
    bookedCount: 0,
    status: "scheduled",
    color: normalizeColor_(template.color),
    visibility: "draft"
  };
}

/**
 * Move one draft schedule item to a new day and hour while keeping its duration.
 *
 * @param {string} scheduleId
 * @param {Date} dayDate
 * @param {number} hour
 * @returns {boolean}
 */
function moveDraftScheduleItemToSlot_(scheduleId, dayDate, hour) {
  const item = draftScheduleItems_.find((entry) => entry.id === scheduleId);

  if (!item) {
    return false;
  }

  const durationMinutes = getScheduleDurationMinutes_(item);
  const dateValue = formatDateInput_(dayDate);
  const startTime = `${String(hour).padStart(2, "0")}:00`;
  const startAt = buildIsoFromLocal_(dateValue, startTime);
  const endAt = new Date(new Date(startAt).getTime() + durationMinutes * 60000).toISOString();

  item.startAt = startAt;
  item.endAt = endAt;
  item.weekId = currentWeekId_;
  item.startTime = startTime;
  item.dayIndex = getMondayFirstDayIndex_(dayDate);

  return true;
}

/**
 * Start creating a manual event from one schedule grid slot.
 *
 * @param {HTMLElement} slot
 * @returns {void}
 */
function openManualEventFromSlot_(slot) {
  const dayIndex = Number(slot.dataset.dayIndex || 0);
  const hour = Number(slot.dataset.hour || 9);
  const slotDate = addDays_(currentWeekStart, dayIndex);
  const startTime = `${String(hour).padStart(2, "0")}:00`;

  if (!isEditingSchedule_) {
    showToast_("Click Edit before adding or changing events.", "default");
    return;
  }

  openScheduleModal_(null, slotDate, { startTime });
  slot.classList.add("is-click-created");
  setTimeout(() => slot.classList.remove("is-click-created"), 450);
}

/**
 * Render schedule page.
 *
 * @returns {void}
 */
function renderSchedulePage_() {
  if (!pageContentEl) {
    return;
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const sourceItems = isEditingSchedule_ ? draftScheduleItems_ : schedules_;

  const weekSchedules = sourceItems.filter((item) => {
    return item.startAt && isInDisplayedWeek_(new Date(item.startAt), currentWeekStart);
  });

  const columnsHtml = days.map((dayName, dayIndex) => {
    const dayDate = addDays_(currentWeekStart, dayIndex);

    const dayItems = weekSchedules
      .filter((item) => getMondayFirstDayIndex_(new Date(item.startAt)) === dayIndex)
      .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));

    const eventsHtml = dayItems.length
      ? dayItems.map(renderEventCard_).join("")
      : `<div class="empty-state small">No classes</div>`;

    return `
      <div class="calendar-column">
        <div class="calendar-column-header">
          <span class="calendar-day-name">${dayName}</span>
          <span class="calendar-day-date">${formatDate_(dayDate)}</span>
        </div>
        <div class="calendar-column-body">
          ${eventsHtml}
        </div>
      </div>
    `;
  }).join("");

  const statusClass = currentWeekStatus_ === "published" ? "badge-success" : "badge-muted";
  const statusLabel = currentWeekStatus_ === "published" ? "Published" : "Draft";

  const actionButtonsHtml = isEditingSchedule_
    ? `
      <button id="add-schedule-item-btn" class="ghost-btn" type="button">+ Add event</button>
      <button id="cancel-schedule-edit-btn" class="ghost-btn" type="button">Cancel</button>
      <button id="save-schedule-week-btn" class="primary-btn" type="button">Save changes</button>
    `
    : `
      <button id="edit-schedule-btn" class="ghost-btn" type="button">Edit schedule</button>
    `;

  pageContentEl.innerHTML = `
    <section class="hero-card">
      <div>
        <h3>Schedule</h3>
        <p class="muted">Week ${currentWeekId_}</p>
      </div>

      <div class="hero-card-actions">
        <span class="badge ${statusClass}">${statusLabel}</span>
        ${actionButtonsHtml}
      </div>
    </section>

    <section class="calendar-grid">
      ${columnsHtml}
    </section>
  `;

  document.getElementById("publish-schedule-btn")?.addEventListener("click", async (event) => {
    const restore = setButtonLoading_(event.currentTarget, "Publishing…");

    try {
      await publishScheduleWeek_(currentWeekId_);
      scheduleWeekCache_.delete(currentWeekId_);
      scheduleWeekRequestCache_.delete(currentWeekId_);
      await loadCurrentScheduleWeek_({ force: true });
      showToast_("Schedule published successfully", "success");
      renderSchedulePageV2_();
    } catch (error) {
      showToast_(error.message, "error");
      restore();
    }
  });

  document.getElementById("edit-schedule-btn")?.addEventListener("click", () => {
    isEditingSchedule_ = true;
    draftScheduleItems_ = structuredClone(schedules_);
    renderSchedulePageV2_();
  });

  document.getElementById("add-schedule-item-btn")?.addEventListener("click", () => {
    openScheduleModal_(null, currentWeekStart);
  });

  document.getElementById("cancel-schedule-edit-btn")?.addEventListener("click", () => {
    isEditingSchedule_ = false;
    draftScheduleItems_ = structuredClone(schedules_);
    renderSchedulePageV2_();
  });

  document.getElementById("save-schedule-week-btn")?.addEventListener("click", async (event) => {
    const restore = setButtonLoading_(event.currentTarget, "Saving…");

    try {
      await saveScheduleWeek_();

      scheduleWeekCache_.clear();
      scheduleWeekRequestCache_.clear();
      await loadCurrentScheduleWeek_({ force: true });

      showToast_("Schedule saved", "success");
      renderSchedulePageV2_();
    } catch (error) {
      showToast_(error.message, "error");
      restore();
    }
  });

  if (isEditingSchedule_) {
    document.querySelectorAll(".event-card").forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        const scheduleId = card.dataset.scheduleId;
        const item = draftScheduleItems_.find((entry) => entry.id === scheduleId);

        if (item) {
          openScheduleModal_(item);
        }
      });
    });
  }

  document.querySelectorAll(".book-event-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const scheduleId = button.dataset.scheduleId;
      if (scheduleId) {
        openBookingModal_(scheduleId);
      }
    });
  });
}

/**
 * Render schedule page with reusable template chips and hourly drop slots.
 *
 * @returns {void}
 */
function renderSchedulePageV2_() {
  if (!pageContentEl) {
    return;
  }

  syncClientViewSwitch_();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 13 }, (_, index) => index + 8);
  const sourceItems = isEditingSchedule_ ? draftScheduleItems_ : schedules_;
  const weekSchedules = sourceItems.filter((item) => item.startAt && isInDisplayedWeek_(new Date(item.startAt), currentWeekStart));
  const formatScheduleHourLabel = (hour) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const normalizedHour = hour % 12 || 12;
    return `${normalizedHour} ${suffix}`;
  };
  const formatScheduleRangeDate = (date) => date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  }).replace(",", "");

  const templateChipsHtml = classTemplates_.length
    ? classTemplates_.map((template) => `
      <article class="template-chip" draggable="${isEditingSchedule_}" data-template-id="${escapeHtml_(template.id)}" style="--template-color: ${escapeHtml_(normalizeColor_(template.color))};">
        <div class="template-chip-header">
          <strong>${escapeHtml_(template.className)}</strong>
          <div class="template-chip-actions">
            <button class="ghost-btn row-action-btn edit-class-template-btn" data-template-id="${escapeHtml_(template.id)}" type="button" aria-label="Edit ${escapeHtml_(template.className)}">Edit</button>
            <button class="ghost-btn row-action-btn delete-class-template-btn" data-template-id="${escapeHtml_(template.id)}" type="button" aria-label="Delete ${escapeHtml_(template.className)}">Delete</button>
          </div>
        </div>
        <div class="template-chip-summary">
          <span>${Number(template.capacity || 10)} places</span>
        </div>
        <div class="template-chip-meta">
          <span>${escapeHtml_(template.coachName)}</span>
          <span>${Number(template.durationMinutes || 60)} min</span>
          <b>${escapeHtml_(String(template.language || "EN").toUpperCase())}</b>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state small">No templates yet. Create one to drag classes into the week.</div>`;

  const gridHeaderHtml = days.map((dayName, dayIndex) => {
    const dayDate = addDays_(currentWeekStart, dayIndex);

    return `
      <div class="schedule-grid-day-header">
        <strong>${dayName}</strong>
        <span>${formatDate_(dayDate)}</span>
      </div>
    `;
  }).join("");

  const gridRowsHtml = hours.map((hour) => {
    const cellsHtml = days.map((dayName, dayIndex) => {
      const dayDate = addDays_(currentWeekStart, dayIndex);
      const slotItems = weekSchedules
        .filter((item) => {
          const start = new Date(item.startAt);
          return getMondayFirstDayIndex_(start) === dayIndex && start.getHours() === hour;
        })
        .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
      const dayHasItems = weekSchedules.some((item) => {
        const start = new Date(item.startAt);
        return getMondayFirstDayIndex_(start) === dayIndex;
      });
      const slotEventsHtml = slotItems.length
        ? slotItems.map(renderScheduleGridEventCard_).join("")
        : hour === 8 && !dayHasItems
          ? `<span class="schedule-empty-day-label">No classes</span>`
          : "";

      return `
        <div class="schedule-slot" data-day-index="${dayIndex}" data-hour="${hour}" data-date="${formatDateInput_(dayDate)}">
          ${slotEventsHtml}
        </div>
      `;
    }).join("");

    return `
      <div class="schedule-time-row">
        <div class="schedule-time-label">${escapeHtml_(formatScheduleHourLabel(hour))}</div>
        ${cellsHtml}
      </div>
    `;
  }).join("");

  const statusLabel = isEditingSchedule_
    ? "Draft"
    : currentWeekStatus_ === "published"
      ? "Online"
      : "Draft";
  const statusClass = isEditingSchedule_ || currentWeekStatus_ !== "published"
    ? "is-draft"
    : "is-online";
  const actionButtonsHtml = isEditingSchedule_
    ? `
      <button id="cancel-schedule-edit-btn" class="secondary-btn schedule-cancel-btn" type="button">Cancel</button>
      <button id="publish-schedule-btn" class="primary-btn schedule-publish-btn" type="button">Save changes</button>
    `
    : `
      <button id="edit-schedule-btn" class="secondary-btn schedule-edit-btn" type="button">Edit</button>
    `;
  const weekEnd = addDays_(currentWeekStart, 6);
  const compactWeekLabel = `${formatScheduleRangeDate(currentWeekStart)} -> ${formatScheduleRangeDate(weekEnd)}`;
  const formattedWeekId = currentWeekId_.replace("-W", " - W");
  const templateRowHtml = isEditingSchedule_
    ? `
      <div class="schedule-template-row">
        <div class="template-tray" aria-label="Event templates">
          ${templateChipsHtml}
        </div>
        <div id="schedule-add-menu" class="schedule-add-menu">
          <button class="schedule-add-menu-trigger" type="button" aria-haspopup="menu" aria-label="Add to schedule" title="Add to schedule">+</button>
          <div class="schedule-add-menu-options" role="menu">
            <button id="open-class-template-modal-btn" role="menuitem" type="button">Add template</button>
            <button id="add-schedule-item-btn" role="menuitem" type="button">Manual event</button>
            <button id="add-recurring-schedule-item-btn" role="menuitem" type="button">Recurring event</button>
          </div>
        </div>
      </div>
    `
    : "";

  pageContentEl.innerHTML = `
    <section class="schedule-workspace">
      <div class="schedule-view-actions">
        <div class="schedule-action-group">
          <span class="schedule-status-chip ${statusClass}">${escapeHtml_(statusLabel)}</span>
          ${actionButtonsHtml}
        </div>
      </div>

      <div class="schedule-switch-row">
        <div class="schedule-inline-week">
          <button id="schedule-prev-week-btn" class="schedule-week-nav" type="button" aria-label="Previous week">&lt; Prev</button>
          <div class="week-label schedule-week-label">${escapeHtml_(compactWeekLabel)}</div>
          <button id="schedule-next-week-btn" class="schedule-week-nav" type="button" aria-label="Next week">Next &gt;</button>
        </div>
        <div class="schedule-week-id-label">Week ${escapeHtml_(formattedWeekId)}</div>
      </div>

      ${templateRowHtml}

      <div class="schedule-grid-scroll">
        <div class="schedule-grid">
          <div class="schedule-grid-corner"><strong>GMT</strong><span>+01</span></div>
          ${gridHeaderHtml}
          ${gridRowsHtml}
        </div>
      </div>
    </section>
  `;

  document.getElementById("open-class-template-modal-btn")?.addEventListener("click", () => openClassTemplateModal_());
  document.getElementById("add-schedule-item-btn")?.addEventListener("click", () => {
    if (!isEditingSchedule_) {
      isEditingSchedule_ = true;
      draftScheduleItems_ = structuredClone(schedules_);
    }

    openScheduleModal_(null, currentWeekStart);
  });
  document.getElementById("add-recurring-schedule-item-btn")?.addEventListener("click", () => {
    if (!isEditingSchedule_) {
      isEditingSchedule_ = true;
      draftScheduleItems_ = structuredClone(schedules_);
    }

    openScheduleModal_(null, currentWeekStart, { recurring: true });
  });
  document.getElementById("schedule-prev-week-btn")?.addEventListener("click", (event) => {
    goToScheduleWeek_(-7, event.currentTarget);
  });
  document.getElementById("schedule-next-week-btn")?.addEventListener("click", (event) => {
    goToScheduleWeek_(7, event.currentTarget);
  });

  document.getElementById("publish-schedule-btn")?.addEventListener("click", async (event) => {
    const restore = setButtonLoading_(event.currentTarget, isEditingSchedule_ ? "Saving..." : "Publishing...");

    try {
      if (isEditingSchedule_) {
        const savedWeekCount = await saveScheduleDrafts_(true);
        scheduleWeekCache_.clear();
        scheduleWeekRequestCache_.clear();
        clearScheduleDrafts_();
        await loadCurrentScheduleWeek_({ force: true });
        showToast_(
          savedWeekCount
            ? `${savedWeekCount} week${savedWeekCount === 1 ? "" : "s"} saved successfully`
            : "No schedule changes to save",
          "success"
        );
      } else {
        await publishScheduleWeek_(currentWeekId_);
        scheduleWeekCache_.delete(currentWeekId_);
        scheduleWeekRequestCache_.delete(currentWeekId_);
        await loadCurrentScheduleWeek_({ force: true });
        showToast_("Schedule published successfully", "success");
      }

      renderSchedulePageV2_();
    } catch (error) {
      showToast_(error.message, "error");
      restore();
    }
  });

  document.getElementById("edit-schedule-btn")?.addEventListener("click", () => {
    clearScheduleDrafts_();
    isEditingSchedule_ = true;
    draftScheduleItems_ = structuredClone(schedules_);
    renderSchedulePageV2_();
  });

  document.getElementById("cancel-schedule-edit-btn")?.addEventListener("click", () => {
    clearScheduleDrafts_();
    isEditingSchedule_ = false;
    draftScheduleItems_ = structuredClone(schedules_);
    renderSchedulePageV2_();
  });

  document.querySelectorAll(".template-chip").forEach((chip) => {
    chip.addEventListener("dragstart", (event) => {
      if (!isEditingSchedule_) {
        event.preventDefault();
        showToast_("Click Edit schedule before dragging templates.", "default");
        return;
      }

      event.dataTransfer?.setData("application/x-bookmyclass-template-id", chip.dataset.templateId || "");
      event.dataTransfer?.setData("text/plain", chip.dataset.templateId || "");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "copy";
      }
    });
  });

  document.querySelectorAll(".edit-class-template-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const template = classTemplates_.find((item) => item.id === button.dataset.templateId);
      if (template) {
        openClassTemplateModal_(template);
      }
    });
  });

  document.querySelectorAll(".delete-class-template-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      await handleDeleteClassTemplate_(button.dataset.templateId || "", button);
    });
  });

  document.querySelectorAll(".schedule-slot").forEach((slot) => {
    slot.addEventListener("click", (event) => {
      if (event.target.closest(".schedule-grid-event")) {
        return;
      }

      openManualEventFromSlot_(slot);
    });

    slot.addEventListener("dragover", (event) => {
      if (isEditingSchedule_) {
        event.preventDefault();
        if (event.dataTransfer) {
          const dragTypes = Array.from(event.dataTransfer.types || []);
          event.dataTransfer.dropEffect = dragTypes.includes("application/x-bookmyclass-schedule-id")
            ? "move"
            : "copy";
        }
        slot.classList.add("is-drop-target");
      }
    });

    slot.addEventListener("dragleave", () => {
      slot.classList.remove("is-drop-target");
    });

    slot.addEventListener("drop", (event) => {
      event.preventDefault();
      slot.classList.remove("is-drop-target");

      if (!isEditingSchedule_) {
        return;
      }

      const dayIndex = Number(slot.dataset.dayIndex || 0);
      const hour = Number(slot.dataset.hour || 9);
      const dayDate = addDays_(currentWeekStart, dayIndex);
      const scheduleId = event.dataTransfer?.getData("application/x-bookmyclass-schedule-id") || "";
      const templateId = event.dataTransfer?.getData("application/x-bookmyclass-template-id")
        || event.dataTransfer?.getData("text/plain")
        || "";

      if (scheduleId) {
        if (moveDraftScheduleItemToSlot_(scheduleId, dayDate, hour)) {
          renderSchedulePageV2_();
          showActionFeedback_();
        }
        return;
      }

      const template = classTemplates_.find((item) => item.id === templateId);

      if (template) {
        draftScheduleItems_.push(buildScheduleItemFromTemplate_(template, dayDate, hour));
        renderSchedulePageV2_();
      }
    });
  });

  document.querySelectorAll(".schedule-grid-event").forEach((card) => {
    card.style.cursor = isEditingSchedule_ ? "grab" : "pointer";
    card.addEventListener("dragstart", (event) => {
      if (!isEditingSchedule_) {
        event.preventDefault();
        return;
      }

      event.stopPropagation();
      card.classList.add("is-dragging");
      event.dataTransfer?.setData("application/x-bookmyclass-schedule-id", card.dataset.scheduleId || "");
      event.dataTransfer?.setData("text/plain", card.dataset.scheduleId || "");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
      }
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("is-dragging");
      card.dataset.wasDragged = "true";
      document.querySelectorAll(".schedule-slot.is-drop-target").forEach((slot) => {
        slot.classList.remove("is-drop-target");
      });
      setTimeout(() => {
        delete card.dataset.wasDragged;
      }, 0);
    });
    card.addEventListener("click", () => {
      if (card.dataset.wasDragged === "true") {
        return;
      }

      const source = isEditingSchedule_ ? draftScheduleItems_ : schedules_;
      const item = source.find((entry) => entry.id === card.dataset.scheduleId);

      if (item) {
        openScheduleModal_(item);
      }
    });
  });
}

/**
 * Move to a week, using the week cache when available.
 *
 * @param {Date} weekStart
 * @param {HTMLButtonElement|null} button
 * @param {{sidebarMonthDate?: Date}=} options
 * @returns {Promise<void>}
 */
async function navigateToScheduleWeek_(weekStart, button = null, options = {}) {
  const previousWeekStart = currentWeekStart;
  const previousWeekId = currentWeekId_;
  const previousSidebarMonthDate = sidebarCalendarMonthDate_;
  const previousDashboardMonthDate = dashboardMonthDate_;
  const preserveEditing = isEditingSchedule_;
  const nextWeekStart = getStartOfWeek_(weekStart);
  const nextWeekId = getWeekId_(nextWeekStart);
  const restore = scheduleWeekCache_.has(nextWeekId) ? () => { } : setButtonLoading_(button, "");

  try {
    cacheCurrentScheduleDraft_();
    currentWeekStart = nextWeekStart;
    currentWeekId_ = nextWeekId;
    sidebarCalendarMonthDate_ = options.sidebarMonthDate || new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), 1);
    dashboardMonthDate_ = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), 1);
    const dashboardMonthChanged =
      dashboardMonthDate_.getFullYear() !== previousDashboardMonthDate.getFullYear() ||
      dashboardMonthDate_.getMonth() !== previousDashboardMonthDate.getMonth();

    await loadCurrentScheduleWeek_({ preserveEditing });
    if (currentPage === "dashboard" && dashboardMonthChanged) {
      bookings_ = await fetchBookings_();
    }
    renderPage_();
  } catch (error) {
    currentWeekStart = previousWeekStart;
    currentWeekId_ = previousWeekId;
    sidebarCalendarMonthDate_ = previousSidebarMonthDate;
    dashboardMonthDate_ = previousDashboardMonthDate;
    showToast_(error.message, "error");
  } finally {
    restore();
  }
}

/**
 * Move the displayed schedule week and reload its events.
 *
 * @param {number} dayDelta
 * @param {HTMLButtonElement|null} button
 * @returns {Promise<void>}
 */
async function goToScheduleWeek_(dayDelta, button = null) {
  await navigateToScheduleWeek_(addDays_(currentWeekStart, dayDelta), button);
}

/**
 * Render current page.
 *
 * @returns {void}
 */
function renderPage_() {
  if (!pageContentEl) {
    return;
  }

  pageContentEl.dataset.page = currentPage;
  updateActiveNav_();
  updatePageHeader_();
  renderWeekLabel_();
  renderSidebarScheduleCalendar_();
  syncClientViewSwitch_();

  const showWeekControls = false;

  if (prevWeekBtn) {
    prevWeekBtn.style.display = showWeekControls ? "inline-flex" : "none";
  }

  if (nextWeekBtn) {
    nextWeekBtn.style.display = showWeekControls ? "inline-flex" : "none";
  }

  if (weekLabelEl) {
    weekLabelEl.style.display = showWeekControls ? "inline-flex" : "none";
  }

  const renderers = {
    dashboard: renderDashboardPage_,
    schedule: renderSchedulePageV2_,
    clients: renderClientsPageV2_,
    packs: renderPacksPageV2_,
    settings: renderSettingsPage_
  };

  (renderers[currentPage] || renderDashboardPage_)();
}

/**
 * Delete a client after confirmation and refresh affected state.
 *
 * @param {string} clientId
 * @param {HTMLButtonElement|null=} actionButton
 * @returns {Promise<void>}
 */
async function handleDeleteClient_(clientId, actionButton = deleteClientBtn) {
  const client = clients_.find((item) => item.id === clientId);

  if (!client) {
    return;
  }

  const confirmed = await openConfirmDialog_({
    title: "Delete client?",
    message: `Delete ${client.fullName || "this client"} and their bookings, packs, invite links, and linked login?`,
    confirmLabel: "Delete client"
  });

  if (!confirmed) {
    return;
  }

  const restore = setButtonLoading_(actionButton, "Deleting...");
  const hideLoader = showModalLoader_(clientModalEl);

  try {
    await deleteClient_(clientId);
    clients_ = clients_.filter((item) => item.id !== clientId);
    bookings_ = bookings_.filter((booking) => booking.clientId !== clientId);
    clientPacks_ = clientPacks_.filter((item) => item.clientId !== clientId);
    closeClientModal_();
    showToast_("Client deleted", "success");
    renderPage_();
  } catch (error) {
    showToast_(error.message, "error");
  } finally {
    restore();
    hideLoader();
  }
}

/**
 * Delete all clients currently selected in bulk-selection mode.
 *
 * @param {HTMLButtonElement|null} actionButton
 * @returns {Promise<void>}
 */
async function handleDeleteSelectedClients_(actionButton) {
  const selectedClients = clients_.filter((client) => selectedClientIds_.has(client.id));

  if (!selectedClients.length) {
    return;
  }

  const confirmed = await openConfirmDialog_({
    title: `Delete ${selectedClients.length} selected client${selectedClients.length === 1 ? "" : "s"}?`,
    message: "This also deletes their bookings, assigned packs, invite links, and linked logins. This cannot be undone.",
    confirmLabel: "Delete selection"
  });

  if (!confirmed) {
    return;
  }

  isDeletingSelectedClients_ = true;
  renderClientsPageV2_();

  try {
    const result = await deleteClientsBulk_(selectedClients.map((client) => client.id));
    const deletedIds = (result.deleted || []).map((item) => item.id);
    const failures = result.failed || [];
    const deletedIdSet = new Set(deletedIds);
    clients_ = clients_.filter((client) => !deletedIdSet.has(client.id));
    bookings_ = bookings_.filter((booking) => !deletedIdSet.has(booking.clientId));
    clientPacks_ = clientPacks_.filter((pack) => !deletedIdSet.has(pack.clientId));
    deletedIds.forEach((clientId) => selectedClientIds_.delete(clientId));

    if (!failures.length) {
      isClientSelectionMode_ = false;
      selectedClientIds_.clear();
      showToast_(`${deletedIds.length} client${deletedIds.length === 1 ? "" : "s"} deleted`, "success");
    } else {
      showToast_(`${deletedIds.length} deleted, ${failures.length} failed`, "error");
    }

    renderClientsPageV2_();
  } catch (error) {
    showToast_(error.message, "error");
  } finally {
    isDeletingSelectedClients_ = false;
    renderClientsPageV2_();
  }
}

/**
 * Delete a pack after confirmation.
 *
 * @param {string} packId
 * @param {HTMLButtonElement|null=} actionButton
 * @returns {Promise<void>}
 */
async function handleDeletePack_(packId, actionButton = deletePackBtn) {
  const pack = packs_.find((item) => item.id === packId);

  if (!pack) {
    return;
  }

  const confirmed = await openConfirmDialog_({
    title: "Delete pack?",
    message: `Delete ${pack.name || "this pack"}? Packs already assigned to clients must be removed first.`,
    confirmLabel: "Delete pack"
  });

  if (!confirmed) {
    return;
  }

  const restore = setButtonLoading_(actionButton, "Deleting...");
  const hideLoader = showModalLoader_(packModalEl);

  try {
    await deletePack_(packId);
    packs_ = packs_.filter((item) => item.id !== packId);
    closePackModal_();
    showToast_("Pack deleted", "success");
    renderPage_();
  } catch (error) {
    showToast_(error.message, "error");
  } finally {
    restore();
    hideLoader();
  }
}

/**
 * Delete a class template after confirmation.
 *
 * @param {string} templateId
 * @param {HTMLButtonElement|null=} actionButton
 * @returns {Promise<void>}
 */
async function handleDeleteClassTemplate_(templateId, actionButton = deleteClassTemplateBtn) {
  const template = classTemplates_.find((item) => item.id === templateId);

  if (!template) {
    return;
  }

  const confirmed = await openConfirmDialog_({
    title: "Delete template?",
    message: `Delete ${template.className || "this class template"}? Existing scheduled classes will stay as they are.`,
    confirmLabel: "Delete template"
  });

  if (!confirmed) {
    return;
  }

  const restore = setButtonLoading_(actionButton, "Deleting...");
  const hideLoader = showModalLoader_(classTemplateModalEl);

  try {
    await deleteClassTemplate_(templateId);
    classTemplates_ = classTemplates_.filter((item) => item.id !== templateId);
    closeClassTemplateModal_();
    showToast_("Template deleted", "success");
    renderPage_();
  } catch (error) {
    showToast_(error.message, "error");
  } finally {
    restore();
    hideLoader();
  }
}

navItems.forEach((button) => {
  button.addEventListener("click", () => {
    currentPage = button.dataset.page;
    renderPage_();
  });
});

if (prevWeekBtn) {
  prevWeekBtn.addEventListener("click", async () => {
    await goToScheduleWeek_(-7, prevWeekBtn);
  });
}

if (nextWeekBtn) {
  nextWeekBtn.addEventListener("click", async () => {
    await goToScheduleWeek_(7, nextWeekBtn);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    const restore = setButtonLoading_(logoutBtn, "Logging out…");

    try {
      await logoutUser();
      window.location.href = "./";
    } finally {
      restore();
    }
  });
}

clientViewSwitchBtn?.addEventListener("click", () => {
  if (clientViewSwitchBtn.disabled) {
    return;
  }

  sessionStorage.setItem("bookmyclass.adminReturnPage", currentPage);
  sessionStorage.setItem("bookmyclass.adminReturnWeek", currentWeekStart.toISOString());
  sessionStorage.setItem(
    "bookmyclass.clientPreviewBusinessName",
    currentBusiness_?.name || "BookMyClass"
  );
  sessionStorage.setItem(
    "bookmyclass.clientPreviewBusiness",
    JSON.stringify({
      name: currentBusiness_?.name || "BookMyClass",
      description: currentBusiness_?.description || "",
      logoDataUrl: currentBusiness_?.logoDataUrl || currentBusiness_?.logoUrl || ""
    })
  );
  sessionStorage.setItem("bookmyclass.clientPreviewHasAdminReturn", "1");
  window.location.href = "./client.html?preview=1";
});

if (closeScheduleModalBtn) {
  closeScheduleModalBtn.addEventListener("click", closeScheduleModal_);
}
registerClickOutside_(scheduleModalEl, closeScheduleModal_);

if (cancelConfirmBtn) {
  cancelConfirmBtn.addEventListener("click", () => closeConfirmDialog_(false));
}

if (confirmActionBtn) {
  confirmActionBtn.addEventListener("click", () => closeConfirmDialog_(true));
}

registerClickOutside_(confirmModalEl, () => closeConfirmDialog_(false));

if (deleteScheduleItemBtn) {
  deleteScheduleItemBtn.addEventListener("click", () => {
    if (!editingScheduleItemId_) {
      return;
    }

    draftScheduleItems_ = draftScheduleItems_.filter((item) => item.id !== editingScheduleItemId_);
    closeScheduleModal_();
    showToast_("Event removed", "default");
    renderSchedulePageV2_();
  });
}

if (bookScheduleItemBtn) {
  bookScheduleItemBtn.addEventListener("click", () => {
    if (!editingScheduleItemId_) {
      return;
    }

    const scheduleId = editingScheduleItemId_;
    closeScheduleModal_();
    openBookingModal_(scheduleId);
  });
}

if (scheduleFormEl) {
  scheduleFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const className = scheduleClassNameEl?.value.trim() || "";
    const coachName = scheduleCoachNameEl?.value.trim() || "";
    const dateValue = scheduleDateEl?.value || "";
    const startTime = scheduleStartTimeEl?.value || "";
    const durationMinutes = Number(scheduleDurationEl?.value || 0);
    const capacity = Number(scheduleCapacityEl?.value || 0);
    const isRecurring = scheduleRecurringEl?.checked === true;

    if (!className || !coachName || !dateValue || !startTime || !durationMinutes) {
      showToast_("Please fill all fields.", "error");
      return;
    }

    if (durationMinutes < 15 || durationMinutes > 480) {
      showToast_("Event length must be between 15 and 480 minutes.", "error");
      return;
    }

    const startAt = buildIsoFromLocal_(dateValue, startTime);
    const endAt = buildEndIsoFromDuration_(dateValue, startTime, durationMinutes);

    const existingItem = editingScheduleItemId_
      ? draftScheduleItems_.find((item) => item.id === editingScheduleItemId_)
      : null;
    const dayIndex = getMondayFirstDayIndex_(new Date(startAt));

    const newItem = {
      id: editingScheduleItemId_ || `draft-${Date.now()}`,
      recurringId: existingItem?.recurringId || "",
      isRecurring,
      weekId: currentWeekId_,
      className,
      coachName,
      startAt,
      endAt,
      dayIndex,
      startTime,
      capacity,
      bookedCount: existingItem?.bookedCount || 0,
      status: existingItem?.status || "scheduled",
      // color: isRecurring ? "#6b7280" : existingItem?.color || "#2f9e44",
      color: isRecurring ? "#6b7280" : existingItem?.color || EVENT_COLORS[0],
      visibility: "draft"
    };

    if (editingScheduleItemId_) {
      draftScheduleItems_ = draftScheduleItems_.map((item) =>
        item.id === editingScheduleItemId_ ? newItem : item
      );
      showActionFeedback_();
    } else {
      draftScheduleItems_.push(newItem);
      showActionFeedback_();
    }

    closeScheduleModal_();
    renderSchedulePageV2_();
  });
}

if (closeClientModalBtn) {
  closeClientModalBtn.addEventListener("click", closeClientModal_);
}
registerClickOutside_(clientModalEl, closeClientModal_);

if (closeClientImportModalBtn) {
  closeClientImportModalBtn.addEventListener("click", closeClientImportModal_);
}
registerClickOutside_(clientImportModalEl, closeClientImportModal_);

if (importClientsFileBtn) {
  importClientsFileBtn.addEventListener("click", async () => {
    const file = clientImportFileEl?.files?.[0];

    if (!file) {
      showToast_("Choose a CSV or Excel file first.", "error");
      return;
    }

    const restore = setButtonLoading_(importClientsFileBtn, "Importing...");
    const hideLoader = showModalLoader_(clientImportModalEl);

    try {
      const result = await importClientsFile_(file);
      renderClientImportResult_(result);
      clients_ = (await fetchClients_()).sort((a, b) => (a.fullName || "").localeCompare(b.fullName || ""));

      if (currentPage === "clients") {
        renderClientsPageV2_();
      } else if (currentPage === "dashboard") {
        renderDashboardPage_();
      }

      if (Number(result.importedCount || 0) > 0) {
        showToast_(`${result.importedCount} client${Number(result.importedCount) === 1 ? "" : "s"} imported.`, "success");
      } else {
        showToast_("No new clients imported.", "default");
      }
    } catch (error) {
      showToast_(error.message, "error", 5200);
    } finally {
      restore();
      hideLoader();
    }
  });
}

if (editClientBtn) {
  editClientBtn.addEventListener("click", () => {
    setClientDetailEditing_(true);
  });
}

if (deleteClientBtn) {
  deleteClientBtn.addEventListener("click", async () => {
    if (editingClientId_) {
      await handleDeleteClient_(editingClientId_, deleteClientBtn);
    }
  });
}

if (assignClientPackBtn) {
  assignClientPackBtn.addEventListener("click", async () => {
    const clientId = editingClientId_;
    const packTemplateId = clientAssignPackTemplateEl?.value || "";

    if (!clientId || !packTemplateId) {
      showToast_("Choose a pack to assign.", "error");
      return;
    }

    const restore = setButtonLoading_(assignClientPackBtn, "Assigning...");
    const hideLoader = showModalLoader_(clientModalEl);

    try {
      const newClientPack = await createClientPack_({ clientId, packTemplateId });
      clientPacks_ = [...clientPacks_, newClientPack].sort((a, b) =>
        (a.clientName || "").localeCompare(b.clientName || "")
      );
      renderClientPackEditor_(clientId);
      renderClientBookingHistory_(clientId);
      await showModalSuccess_(clientModalEl, "Pack assigned");

      if (currentPage === "clients") {
        renderClientsPageV2_();
      } else if (currentPage === "dashboard") {
        renderDashboardPage_();
      }
    } catch (error) {
      showToast_(error.message, "error");
    } finally {
      restore();
      hideLoader();
    }
  });
}

if (editClientMembershipBtn) {
  editClientMembershipBtn.addEventListener("click", () => {
    setClientMembershipEditing_(true);
  });
}

if (saveClientMembershipBtn) {
  saveClientMembershipBtn.addEventListener("click", async () => {
    const clientPackId = clientCurrentPackRemainingEl?.dataset.clientPackId || "";
    const currentClientPack = clientPacks_.find((pack) => pack.id === clientPackId) || null;
    const remainingClasses = Number(clientCurrentPackRemainingEl?.value || 0);

    if (!currentClientPack) {
      showToast_("No active pack found.", "error");
      return;
    }

    if (
      !Number.isInteger(remainingClasses) ||
      remainingClasses < 0 ||
      remainingClasses > Number(currentClientPack.totalClasses || 0)
    ) {
      showToast_(`Classes left must be between 0 and ${Number(currentClientPack.totalClasses || 0)}.`, "error");
      return;
    }

    const restore = setButtonLoading_(saveClientMembershipBtn, "Saving...");
    const hideLoader = showModalLoader_(clientModalEl);

    try {
      const updatedClientPack = await updateClientPack_(clientPackId, { remainingClasses });
      clientPacks_ = clientPacks_.map((pack) =>
        pack.id === updatedClientPack.id ? updatedClientPack : pack
      );
      renderClientPackEditor_(editingClientId_);
      await showModalSuccess_(clientModalEl, "Pack updated");

      if (currentPage === "clients") {
        renderClientsPageV2_();
      } else if (currentPage === "dashboard") {
        renderDashboardPage_();
      }
    } catch (error) {
      showToast_(error.message, "error");
    } finally {
      restore();
      hideLoader();
    }
  });
}

if (clientFormEl) {
  clientFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = clientFirstNameEl?.value.trim() || "";
    const lastName = clientLastNameEl?.value.trim() || "";
    const email = clientEmailEl?.value.trim() || "";
    const phone = clientPhoneEl?.value.trim() || "";
    const country = clientCountryEl?.value === "OTHER"
      ? clientCountryOtherEl?.value.trim() || ""
      : clientCountryEl?.value || "";
    const canBook = Boolean(clientCanBookEl?.checked);

    if (!firstName || !lastName) {
      showToast_("First and last name are required.", "error");
      return;
    }

    const submitBtn = clientFormEl.querySelector('button[type="submit"]');
    const restore = setButtonLoading_(submitBtn, editingClientId_ ? "Saving…" : "Creating…");
    const hideLoader = showModalLoader_(clientModalEl);

    try {
      const payload = { firstName, lastName, email, phone, country, canBook };
      let savedClient;
      let successMessage = "Client updated";

      if (editingClientId_) {
        savedClient = await updateClient_(editingClientId_, payload);
        clients_ = clients_.map((client) => client.id === editingClientId_ ? savedClient : client);
      } else {
        const result = await createClient_(payload);

        if (result.selfBookingEnabled && !result.emailSent) {
          throw new Error(result.emailError || "Client was not added because the invitation could not be completed.");
        }

        savedClient = result.item;
        clients_ = [...clients_, savedClient];
        successMessage = result.selfBookingEnabled
          ? "Client invited. Email sent."
          : "Client created. Add an email later so they can book themselves.";
      }

      clients_ = clients_.sort((a, b) => (a.fullName || "").localeCompare(b.fullName || ""));
      await showModalSuccess_(clientModalEl, successMessage);
      closeClientModal_();

      if (currentPage === "clients") {
        renderClientsPageV2_();
      } else if (currentPage === "dashboard") {
        renderDashboardPage_();
      }
    } catch (error) {
      if (error.code === "client_email_exists") {
        if (clientEmailNoteEl) {
          clientEmailNoteEl.textContent = "This email address is already used by another client.";
          clientEmailNoteEl.classList.remove("hidden");
          clientEmailNoteEl.classList.add("form-note-error");
        }
        clientEmailEl?.setCustomValidity("This email address is already used by another client.");
        clientEmailEl?.focus();
        clientEmailEl?.select();
      }
      showToast_(error.message, "error");
    } finally {
      restore();
      hideLoader();
    }
  });
}

clientEmailEl?.addEventListener("input", updateClientEmailNote_);
clientCountryEl?.addEventListener("change", updateClientCountryField_);

if (closePackModalBtn) {
  closePackModalBtn.addEventListener("click", closePackModal_);
}
registerClickOutside_(packModalEl, closePackModal_);

if (packFormEl) {
  packFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = packNameEl?.value.trim() || "";
    const type = packTypeEl?.value || "credits";
    const classCount = Number(packClassCountEl?.value || 0);
    const price = Number(packPriceEl?.value || 0);
    const details = packDetailsEl?.value.trim() || "";

    if (!name) {
      showToast_("Pack name is required.", "error");
      return;
    }

    if (!classCount || classCount <= 0) {
      showToast_("Number of classes must be > 0.", "error");
      return;
    }

    const submitBtn = packFormEl.querySelector('button[type="submit"]');
    const restore = setButtonLoading_(submitBtn, editingPackId_ ? "Saving…" : "Creating…");
    const hideLoader = showModalLoader_(packModalEl);

    try {
      const payload = {
        name,
        type,
        classCount,
        price,
        details
      };
      const savedPack = editingPackId_
        ? await updatePack_(editingPackId_, payload)
        : await createPack_(payload);

      const wasEditing = Boolean(editingPackId_);

      packs_ = editingPackId_
        ? packs_.map((pack) => pack.id === editingPackId_ ? savedPack : pack)
        : [...packs_, savedPack];
      packs_ = packs_.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      await showModalSuccess_(packModalEl, wasEditing ? "Pack updated" : "Pack created");
      closePackModal_();

      if (currentPage === "packs") {
        renderPacksPageV2_();
      } else if (currentPage === "dashboard") {
        renderDashboardPage_();
      }
    } catch (error) {
      showToast_(error.message, "error");
    } finally {
      restore();
      hideLoader();
    }
  });
}

if (deletePackBtn) {
  deletePackBtn.addEventListener("click", async () => {
    if (editingPackId_) {
      await handleDeletePack_(editingPackId_, deletePackBtn);
    }
  });
}

if (closeClientPackModalBtn) {
  closeClientPackModalBtn.addEventListener("click", closeClientPackModal_);
}
registerClickOutside_(clientPackModalEl, closeClientPackModal_);

if (editClientPackBtn) {
  editClientPackBtn.addEventListener("click", () => {
    setClientPackRemainingEditing_(true);
  });
}

if (clientPackFormEl) {
  clientPackFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (editingClientPackId_) {
      if (!isEditingClientPackRemaining_) {
        showToast_("Click the edit icon before changing classes left.", "default");
        return;
      }

      const remainingClasses = Number(clientPackRemainingClassesEl?.value || 0);

      if (!Number.isInteger(remainingClasses) || remainingClasses < 0) {
        showToast_("Classes left must be a whole number.", "error");
        return;
      }

      const submitBtn = saveClientPackBtn || clientPackFormEl.querySelector('button[type="submit"]');
      const restore = setButtonLoading_(submitBtn, "Saving...");
      const hideLoader = showModalLoader_(clientPackModalEl);

      try {
        const updatedClientPack = await updateClientPack_(editingClientPackId_, {
          remainingClasses
        });

        clientPacks_ = clientPacks_
          .map((item) => item.id === updatedClientPack.id ? updatedClientPack : item)
          .sort((a, b) => (a.clientName || "").localeCompare(b.clientName || ""));

        await showModalSuccess_(clientPackModalEl, "Classes left updated");
        closeClientPackModal_();

        if (currentPage === "client-packs") {
          renderClientPacksPage_();
        } else if (currentPage === "dashboard") {
          renderDashboardPage_();
        }
      } catch (error) {
        showToast_(error.message, "error");
      } finally {
        restore();
        hideLoader();
      }

      return;
    }

    const clientId = clientPackClientIdEl?.value || "";
    const packTemplateId = clientPackTemplateIdEl?.value || "";

    if (!clientId || !packTemplateId) {
      showToast_("Client and pack template are required.", "error");
      return;
    }

    const submitBtn = clientPackFormEl.querySelector('button[type="submit"]');
    const restore = setButtonLoading_(submitBtn, "Assigning…");
    const hideLoader = showModalLoader_(clientPackModalEl);

    try {
      const newClientPack = await createClientPack_({
        clientId,
        packTemplateId
      });

      clientPacks_ = [...clientPacks_, newClientPack].sort((a, b) =>
        (a.clientName || "").localeCompare(b.clientName || "")
      );

      await showModalSuccess_(clientPackModalEl, "Pack assigned");
      closeClientPackModal_();

      if (currentPage === "client-packs") {
        renderClientPacksPage_();
      } else if (currentPage === "dashboard") {
        renderDashboardPage_();
      }
    } catch (error) {
      showToast_(error.message, "error");
    } finally {
      restore();
      hideLoader();
    }
  });
}

if (closeBookingModalBtn) {
  closeBookingModalBtn.addEventListener("click", closeBookingModal_);
}

if (bookingClientSearchEl) {
  bookingClientSearchEl.addEventListener("input", () => {
    const query = bookingClientSearchEl.value.trim().toLocaleLowerCase();
    const options = bookingClientListEl?.querySelectorAll(".checkbox-select-option") || [];

    options.forEach((option) => {
      const checkbox = option.querySelector(".booking-client-checkbox");
      const matches = !query || String(option.dataset.clientSearch || "").includes(query);

      option.classList.toggle("hidden-by-search", !matches && !checkbox?.checked);
    });
  });
}

registerClickOutside_(bookingModalEl, closeBookingModal_);

if (closeBookingPackModalBtn) {
  closeBookingPackModalBtn.addEventListener("click", closeBookingPackModal_);
}
registerClickOutside_(bookingPackModalEl, closeBookingPackModal_);

if (bookingPackFormEl) {
  bookingPackFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const pendingBooking = pendingPackBooking_;
    const assignments = Array.from(
      bookingPackFormEl.querySelectorAll(".booking-pack-template-select")
    ).map((select) => ({
      clientId: select.dataset.clientId || "",
      packTemplateId: select.value
    }));

    if (
      !pendingBooking ||
      !assignments.length ||
      assignments.some((assignment) => !assignment.clientId || !assignment.packTemplateId)
    ) {
      showToast_("Choose a pack for every client.", "error");
      return;
    }

    const submitBtn = bookingPackFormEl.querySelector('button[type="submit"]');
    const restore = setButtonLoading_(submitBtn, "Assigning packs...");
    const hideLoader = showModalLoader_(bookingPackModalEl);

    try {
      const assignedPacks = await Promise.all(
        assignments.map((assignment) => createClientPack_(assignment))
      );

      clientPacks_ = [...clientPacks_, ...assignedPacks].sort((a, b) =>
        (a.clientName || "").localeCompare(b.clientName || "")
      );

      const { bookingClientIds, scheduleId } = pendingBooking;
      await completeClientBookings_(bookingClientIds, scheduleId, bookingPackModalEl);
      closeBookingPackModal_();
    } catch (error) {
      showToast_(error.message, "error");
    } finally {
      restore();
      hideLoader();
    }
  });
}

if (closeClassTemplateModalBtn) {
  closeClassTemplateModalBtn.addEventListener("click", closeClassTemplateModal_);
}
registerClickOutside_(classTemplateModalEl, closeClassTemplateModal_);

if (classTemplateFormEl) {
  classTemplateFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const className = classTemplateNameEl?.value.trim() || "";
    const coachName = classTemplateCoachEl?.value.trim() || "";
    const language = classTemplateLanguageEl?.value.trim().toUpperCase() || "EN";
    const durationMinutes = Number(classTemplateDurationEl?.value || 60);
    const capacity = Number(classTemplateCapacityEl?.value || 10);
    const color = normalizeColor_(classTemplateColorEl?.value || EVENT_COLORS[0]);

    if (!className || !coachName) {
      showToast_("Class and coach names are required.", "error");
      return;
    }

    const submitBtn = classTemplateFormEl.querySelector('button[type="submit"]');
    const restore = setButtonLoading_(submitBtn, editingClassTemplateId_ ? "Saving..." : "Creating...");
    const hideLoader = showModalLoader_(classTemplateModalEl);

    try {
      const payload = {
        className,
        coachName,
        language,
        durationMinutes,
        capacity,
        color
      };
      const template = editingClassTemplateId_
        ? await updateClassTemplate_(editingClassTemplateId_, payload)
        : await createClassTemplate_(payload);

      const wasEditing = Boolean(editingClassTemplateId_);

      classTemplates_ = editingClassTemplateId_
        ? classTemplates_.map((item) => item.id === editingClassTemplateId_ ? template : item)
        : [...classTemplates_, template];
      classTemplates_ = classTemplates_.sort((a, b) => (a.className || "").localeCompare(b.className || ""));

      await showModalSuccess_(classTemplateModalEl, wasEditing ? "Template updated" : "Template created");
      closeClassTemplateModal_();

      if (currentPage === "schedule") {
        renderSchedulePageV2_();
      }
    } catch (error) {
      showToast_(error.message, "error");
    } finally {
      restore();
      hideLoader();
    }
  });
}

if (deleteClassTemplateBtn) {
  deleteClassTemplateBtn.addEventListener("click", async () => {
    if (editingClassTemplateId_) {
      await handleDeleteClassTemplate_(editingClassTemplateId_, deleteClassTemplateBtn);
    }
  });
}

if (bookingFormEl) {
  bookingFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const clientIds = Array.from(bookingFormEl.querySelectorAll(".booking-client-checkbox:checked"))
      .map((input) => input.value)
      .filter(Boolean);
    const scheduleId = selectedScheduleForBookingId_;

    if (!clientIds.length || !scheduleId) {
      showToast_("Select at least one client.", "error");
      return;
    }

    const missingClientIds = clientIds.filter((clientId) => !clientHasUsablePack_(clientId));

    if (missingClientIds.length) {
      openBookingPackModal_(missingClientIds, clientIds, scheduleId);
      return;
    }

    const submitBtn = bookingFormEl.querySelector('button[type="submit"]');
    const restore = setButtonLoading_(submitBtn, "Booking…");
    const hideLoader = showModalLoader_(bookingModalEl);

    try {
      await completeClientBookings_(clientIds, scheduleId, bookingModalEl);
      closeBookingModal_();
    } catch (error) {
      showToast_(error.message, "error");
    } finally {
      restore();
      hideLoader();
    }
  });
}

/**
 * Initialize protected app.
 *
 * @returns {Promise<void>}
 */
async function initApp_() {
  hideAppLoader_();

  observeAuthState(async (user) => {
    if (!user) {
      window.location.href = "./";
      return;
    }

    try {
      const initStartedAt = performance.now();
      const timedLoad = async (label, loader) => {
        const startedAt = performance.now();
        const result = await loader();
        console.debug(`[app:init] ${label} loaded in ${Math.round(performance.now() - startedAt)}ms`);
        return result;
      };

      let me;

      if (currentPage === "dashboard") {
        const dashboard = await timedLoad("dashboard", fetchDashboard_);
        me = dashboard;
        clients_ = dashboard.clients || [];
        packs_ = dashboard.packs || [];
        clientPacks_ = dashboard.clientPacks || [];
        bookings_ = dashboard.bookings || [];

        (dashboard.scheduleWeeks || []).forEach((scheduleWeek) => {
          const weekId = scheduleWeek.week?.weekId;
          if (weekId) {
            scheduleWeekCache_.set(weekId, structuredClone(scheduleWeek));
          }
        });

        const currentScheduleWeek = scheduleWeekCache_.get(currentWeekId_);
        if (currentScheduleWeek) {
          applyScheduleWeek_(currentScheduleWeek);
        }
      } else {
        me = await timedLoad("user context", fetchMe_);
        const [
          ,
          clients,
          packs,
          clientPacks,
          bookings,
          classTemplates,
          businessMembers
        ] = await Promise.all([
          timedLoad("schedule week", () => loadCurrentScheduleWeek_()),
          timedLoad("clients", fetchClients_),
          timedLoad("packs", fetchPacks_),
          timedLoad("client packs", fetchClientPacks_),
          timedLoad("bookings", fetchBookings_),
          timedLoad("class templates", fetchClassTemplates_),
          timedLoad("business members", fetchBusinessMembers_)
        ]);

        clients_ = clients;
        packs_ = packs;
        clientPacks_ = clientPacks;
        bookings_ = bookings;
        classTemplates_ = classTemplates;
        businessMembers_ = businessMembers;
      }

      currentBusiness_ = me.business || null;
      currentMember_ = me.member || null;
      applyBusinessBranding_(currentBusiness_);

      if (memberInfoEl) {
        memberInfoEl.textContent = `${me.member?.name || "User"} · ${me.member?.role || ""}`;
      }

      console.debug(`[app:init] ready in ${Math.round(performance.now() - initStartedAt)}ms`);
      renderPage_();

      if (currentPage === "dashboard") {
        Promise.all([fetchClassTemplates_(), fetchBusinessMembers_()])
          .then(([classTemplates, businessMembers]) => {
            classTemplates_ = classTemplates;
            businessMembers_ = businessMembers;
            if (currentPage === "schedule" || currentPage === "settings") {
              renderPage_();
            }
          })
          .catch((error) => {
            console.debug("[app:init] Deferred page data could not be loaded:", error);
            showToast_("Some page data could not be loaded. You can retry by reopening the page.", "default");
          });
      }
    } catch (error) {
      console.error("initApp_ failed:", error);

      if (pageContentEl) {
        pageContentEl.innerHTML = `
          <section class="hero-card"> 
            <div>
              <h3>Could not load the app</h3>
              <p class="muted">${escapeHtml_(error.message)}</p>
            </div>
          </section>
        `;
      }
    }

    hideAppLoader_();
  });
}

const EVENT_COLORS = [
  "#1f8f46",
  "#260e8d",
  "#ff5e32",
  "#2f80ed",
  "#d946ef"
];

function initColorPicker_() {
  if (!classTemplateColorEl) return;

  classTemplateColorEl.style.display = "none";

  if (classTemplateColorEl.parentNode?.querySelector(".color-picker-group")) {
    return;
  }

  const container = document.createElement("div");
  container.className = "color-picker-group";
  const currentColor = EVENT_COLORS.includes(normalizeColor_(classTemplateColorEl.value))
    ? normalizeColor_(classTemplateColorEl.value)
    : EVENT_COLORS[0];

  classTemplateColorEl.value = currentColor;

  EVENT_COLORS.forEach((colorVar) => {
    const btn = document.createElement("button");
    const isActive = colorVar === currentColor;
    btn.type = "button";
    btn.className = "color-picker-option";
    btn.classList.toggle("active", isActive);
    btn.style.backgroundColor = colorVar;
    btn.dataset.color = colorVar;
    btn.setAttribute("aria-label", `Use template color ${colorVar}`);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");

    btn.addEventListener("click", () => {
      container.querySelectorAll(".color-picker-option").forEach((button) => {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      classTemplateColorEl.value = colorVar;
    });

    container.appendChild(btn);
  });

  classTemplateColorEl.parentNode.insertBefore(container, classTemplateColorEl.nextSibling);
}

initColorPicker_();
initApp_();
