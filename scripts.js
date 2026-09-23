document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll("[data-target]");
  const sections = document.querySelectorAll("section[id]");

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }

      // Close mobile menu if open
      const mobileMenu = document.getElementById("mobileMenu");
      const hamburger = document.getElementById("hamburger");
      if (mobileMenu && hamburger) {
        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });

  // Sticky navbar
  const handleStickyNavbar = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  };

  window.addEventListener("scroll", handleStickyNavbar);
  handleStickyNavbar();

  // Active nav highlighting with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute("id");

        // Update desktop nav
        document.querySelectorAll(".nav-list a").forEach(link => {
          link.classList.remove("active");
          if (link.dataset.target === activeId) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Hamburger menu
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    // Close on link click
    mobileMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }

  // Dynamic year
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
