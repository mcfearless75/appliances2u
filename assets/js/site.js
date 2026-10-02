// Progressive enhancements: nav toggle, open/closed badge, scroll reveal, gallery lightbox.
// The site works fully without JS.
(() => {
  document.documentElement.classList.add("js");

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
  }

  // Live "Open now" badge, evaluated in UK time regardless of visitor's timezone.
  const status = document.querySelector(".status[data-hours]");
  if (status) {
    try {
      const hours = JSON.parse(status.dataset.hours);
      const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
          .formatToParts(new Date())
          .map((p) => [p.type, p.value]),
      );
      const now = `${parts.hour}:${parts.minute}`;
      const fmt = (t) => {
        const [h, m] = t.split(":").map(Number);
        return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
      };
      const today = hours.find((h) => h.days.includes(parts.weekday));
      const text = status.querySelector(".status-text");
      if (today && now >= today.opens && now < today.closes) {
        status.classList.add("is-open");
        text.textContent = `Open now · until ${fmt(today.closes)} today`;
      } else if (today && now < today.opens) {
        status.classList.add("is-closed");
        text.textContent = `Closed · opens ${fmt(today.opens)} today`;
      } else {
        const order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        status.classList.add("is-closed");
        text.textContent = "Closed now";
        for (let i = 1; i <= 7; i++) {
          const day = order[(order.indexOf(parts.weekday) + i) % 7];
          const next = hours.find((h) => h.days.includes(day));
          if (next) {
            text.textContent = `Closed · opens ${fmt(next.opens)} ${i === 1 ? "tomorrow" : day}`;
            break;
          }
        }
      }
    } catch {
      /* keep the static opening-hours text */
    }
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
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
