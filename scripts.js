document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll("[data-target]");
  const menuLinks = document.querySelectorAll(".mobile-menu a");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const sections = document.querySelectorAll("main section[id], main article[id]");
  const stickyOffset = navbar ? navbar.offsetTop : 0;

  const scrollToSection = (targetId) => {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const offset = navbar ? navbar.offsetHeight + 36 : 0;
    const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const closeMobileMenu = () => {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(link.dataset.target);
      closeMobileMenu();
    });
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection(link.getAttribute("href").replace("#", ""));
      closeMobileMenu();
    });
  });

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight + 70 : 100);
    let currentId = "home";

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentId = section.id;
      }
    });

    document.querySelectorAll(".nav-list a[data-target]").forEach((link) => {
      link.classList.toggle("active", link.dataset.target === currentId);
    });
  };

  const handleStickyNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle("sticky", window.scrollY > stickyOffset);
    updateActiveNav();
  };

  window.addEventListener("scroll", handleStickyNavbar, { passive: true });
  handleStickyNavbar();

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }

  const currentYear = document.getElementById("current-year");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
