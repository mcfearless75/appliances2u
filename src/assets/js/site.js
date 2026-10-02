// Mobile nav toggle + gallery lightbox. Site works fully without JS.
(() => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
  }

  const links = document.querySelectorAll("a.zoom");
  if (!links.length || typeof HTMLDialogElement !== "function") return;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.innerHTML = '<button type="button" aria-label="Close">×</button><img alt="">';
  document.body.append(dialog);
  const big = dialog.querySelector("img");
  dialog.querySelector("button").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      big.src = a.href;
      big.alt = a.querySelector("img")?.alt || "";
      dialog.showModal();
    });
  });
})();
