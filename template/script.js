// Toggle dark mode
document.getElementById("mode-toggle").addEventListener("change", function () {
    const isDarkMode = this.checked;
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  });
  
  // Enable or disable cursor highlighting
  const cursorHighlight = document.querySelector(".cursor-highlight-circle");
  const cursorToggleBtn = document.getElementById("cursor-toggle");
  
  cursorToggleBtn.addEventListener("click", function () {
    const isEnabled = document.body.classList.toggle("cursor-highlight-enabled");
    cursorToggleBtn.textContent = isEnabled ? "Disable Highlight" : "Highlight Cursor";
  });
  
  // Update cursor position dynamically
  document.addEventListener("mousemove", (event) => {
    if (document.body.classList.contains("cursor-highlight-enabled")) {
      cursorHighlight.style.left = `${event.pageX - cursorHighlight.offsetWidth / 2}px`;
      cursorHighlight.style.top = `${event.pageY - cursorHighlight.offsetHeight / 2}px`;
    }
  });
  
  