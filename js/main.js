// TAS Arecanut Traders — site scripts

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        links.classList.remove("open");
      })
    );
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Animated counters
  const counters = document.querySelectorAll("[data-count]");
  const animate = (el) => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-IN") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterObs.observe(el));

  // Back to top
  const toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener("scroll", () => {
      toTop.classList.toggle("show", window.scrollY > 600);
    });
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // Contact form (demo)
  const form = document.querySelector("form[data-demo-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = document.querySelector(".form-note");
      if (note) {
        note.textContent = "Thank you — your message has been sent. We'll get back to you within 1 business day.";
        note.style.color = "var(--green-600)";
      }
      form.reset();
    });
  }
});
