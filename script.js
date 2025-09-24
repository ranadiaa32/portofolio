document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const year = document.getElementById("year");
  const form = document.querySelector(".contact");
  const revealEls = document.querySelectorAll(".reveal");

  if (year) year.textContent = new Date().getFullYear();

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // Close nav when clicking a link (mobile)
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches("a.nav__link")) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Simple form validation (front-end only)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');
      const statusEl = form.querySelector(".form-status");

      let valid = true;

      // reset errors
      form.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

      if (!nameInput.value.trim()) {
        nameInput.nextElementSibling.textContent = "Please enter your name";
        valid = false;
      }
      const email = emailInput.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.nextElementSibling.textContent = "Invalid email address";
        valid = false;
      }
      if (!messageInput.value.trim()) {
        messageInput.nextElementSibling.textContent = "Message is required";
        valid = false;
      }

      if (!valid) return;

      // simulate send
      statusEl.textContent = "Message sent successfully!";
      form.reset();
      setTimeout(() => (statusEl.textContent = ""), 4000);
    });
  }

  // Scroll reveal
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all
    revealEls.forEach((el) => el.classList.add("in-view"));
  }
});
