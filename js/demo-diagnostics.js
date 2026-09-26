document.documentElement.dataset.demoDiagnostics = "loaded";
window.addEventListener("error", (event) => {
  document.documentElement.dataset.demoError = event.error?.stack || event.message || "Script error";
});
window.addEventListener("unhandledrejection", (event) => {
  document.documentElement.dataset.demoError = event.reason?.stack || event.reason?.message || String(event.reason);
});
