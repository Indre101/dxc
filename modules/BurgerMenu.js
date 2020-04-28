function hamburgerMenu() {
  document.querySelector("#hamburger").addEventListener("click", toggleMenu);
}

function toggleMenu(event) {
  document.querySelector("#hamburger").dataset.active =
    document.querySelector("#hamburger").dataset.active === "false"
      ? "true"
      : "false";
}

export { hamburgerMenu };
