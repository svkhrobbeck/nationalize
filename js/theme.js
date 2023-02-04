const elThemeButton = document.querySelector("[data-theme-button]")

elThemeButton.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode")
    localStorage.setItem("theme", "light")
  } else if (!document.body.classList.contains("dark-mode")) {
    document.body.classList.add("dark-mode")
    localStorage.setItem("theme", "dark")
  }
})

// LocalStorage
if (localStorage.getItem("theme") === "light" && document.body.classList.contains("dark-mode")) {
  document.body.classList.remove("dark-mode")
} else if (localStorage.getItem("theme") === "dark" && !document.body.classList.contains("dark-mode")) {
  document.body.classList.add("dark-mode")
}