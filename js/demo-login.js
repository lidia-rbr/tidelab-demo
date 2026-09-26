document.querySelector("#admin-demo")?.addEventListener("click", () => {
  sessionStorage.setItem("tidelab.demo.persona", "admin");
  window.location.href = "./app.html";
});

document.querySelector("#client-demo")?.addEventListener("click", () => {
  sessionStorage.setItem("tidelab.demo.persona", "client");
  window.location.href = "./client.html?preview=1";
});
