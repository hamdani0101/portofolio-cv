document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll("[data-target]");
  const stickyOffset = navbar.offsetTop;

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;
      const targetEl = document.getElementById(targetId);

      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  });

  // Sticky navbar
  const handleStickyNavbar = () => {
    if (window.scrollY > stickyOffset) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  };

  window.addEventListener("scroll", handleStickyNavbar);

  const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", (e) => {
  mobileMenu.classList.toggle("active");
  e.target.classList.toggle("active");
});

});
