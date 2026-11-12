// Cross-browser extension API shim: Firefox exposes `browser.*` (Promise-based),
// Chrome/Chromium exposes `chrome.*` (callback-based). Firefox also supports
// `chrome.*` for compatibility, so prefer `browser` when it exists.
const extApi = (typeof browser !== "undefined" && browser.tabs && browser.windows)
  ? browser
  : chrome;

// Open a chatbot in a popup window (Chrome, and Firefox fallback).
function openPopupWindow(website) {
  // 'panel' windows were removed from Chrome and never existed in
  // Firefox; 'popup' works in both Chrome/Chromium and Firefox.
  extApi.windows.create({
    url: website,
    type: "popup",
    width: 700,
    height: 700,
    left: 0,
    top: 10
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Open chat in new tab
  const checkbox = document.getElementById("openInNewTab");
  if (checkbox) {
    try {
      checkbox.checked = JSON.parse(localStorage.getItem("openInNewTab")) || false;
    } catch (e) {
      checkbox.checked = false;
    }

    checkbox.addEventListener("change", function () {
      try {
        localStorage.setItem("openInNewTab", checkbox.checked);
      } catch (e) {
        // Storage unavailable (e.g. private mode); the checkbox still works
        // for this popup session.
      }
    });
  }

  const listItems = document.querySelectorAll("li[data-website]");
  listItems.forEach((li) => {
    li.addEventListener("click", function (event) {
      const website = this.getAttribute("data-website");
      if (!website) return;

      if (checkbox && checkbox.checked) {
        extApi.tabs.create({ url: website });
      } else if (typeof browser !== "undefined" && browser.sidebarAction && browser.sidebarAction.open) {
        // Firefox sidebar: open the chatbot next to the current page,
        // like upstream khzg/ChatGPT ver 19. Fall back to a popup
        // window if the sidebar API is unavailable or fails.
        event.preventDefault();
        browser.sidebarAction.open()
          .then(function () { return browser.sidebarAction.setPanel({ panel: website }); })
          .catch(function () { openPopupWindow(website); });
      } else {
        event.preventDefault();
        openPopupWindow(website);
      }
    });
  });
});
