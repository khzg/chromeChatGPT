// Cross-browser extension API shim: Firefox exposes `browser.*` (Promise-based),
// Chrome/Chromium exposes `chrome.*` (callback-based). Firefox also supports
// `chrome.*` for compatibility, so prefer `browser` when it exists.
const isFirefox = typeof browser !== "undefined" && browser.history && browser.storage;
const extApi = isFirefox ? browser : chrome;

// List of URLs to delete from history (kept in sync with the chatbot links in
// popup.html, moreAi.html and pages/search-engine.html). Old URLs are kept
// too, so history created by earlier versions is still cleaned up.
const linksToRemove = [
  "https://chatgpt.com",
  "https://gemini.google.com/app",
  "https://claude.ai/",
  "https://chat.deepseek.com/",
  "https://muse.ai/",
  "https://grok.com/",
  "https://notebooklm.google.com/",
  "https://copilot.microsoft.com/",
  "https://www.bing.com/images/create/",
  "https://duck.ai",
  "https://duckduckgo.com/?q=DuckDuckGo&ia=chat",
  "https://www.perplexity.ai/",
  "https://poe.com",
  "https://you.com/search?q=hi&fromSearchBar=true&tbm=youchat",
  "https://chat.mistral.ai/chat",
  "https://www.phind.com",
  "https://bagoodex.io",
  "https://app.sigmabrowser.com/",
  "https://www.blackbox.ai",
  "https://suno.com/create",
  "https://app.suno.ai/create/",
  "https://www.udio.com/create",
  "https://github.com/features/copilot",
  "https://cursor.com/",
  "https://n8n.io/",
  "https://devin.ai/",
  "https://zonerai.com/en",
  "https://www.midjourney.com/",
  "https://bfl.ai/",
  "https://elevenlabs.io/"
];

// Function to delete specific history URLs
function deleteHistory() {
  console.log("Starting history cleanup...");

  linksToRemove.forEach((url) => {
    if (isFirefox) {
      extApi.history.search({ text: url, maxResults: 1 })
        .then((results) => {
          if (results.length > 0) {
            return extApi.history.deleteUrl({ url: url });
          }
          console.log(`URL not found in history: ${url}`);
          return null;
        })
        .then((deleted) => {
          if (deleted !== null) console.log(`Deleted history for ${url}`);
        })
        .catch((e) => console.log(`History cleanup failed for ${url}:`, e));
    } else {
      extApi.history.search({ text: url, maxResults: 1 }, (results) => {
        if (results.length > 0) {
          extApi.history.deleteUrl({ url: url }, () => {
            console.log(`Deleted history for ${url}`);
          });
        } else {
          console.log(`URL not found in history: ${url}`);
        }
      });
    }
  });
}

// Function to check if we should run the cleanup today
function runOnceDaily() {
  const handleResult = (result) => {
    const lastRun = (result && result.lastRun) || 0;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    // If more than a day has passed, run the cleanup
    if (now - lastRun > oneDay) {
      console.log("Running cleanup...");
      deleteHistory();
      if (isFirefox) {
        extApi.storage.local.set({ lastRun: now })
          .then(() => console.log("Updated lastRun timestamp."));
      } else {
        extApi.storage.local.set({ lastRun: now }, () => {
          console.log("Updated lastRun timestamp.");
        });
      }
    } else {
      console.log("Cleanup already ran today. Skipping...");
    }
  };

  if (isFirefox) {
    extApi.storage.local.get("lastRun").then(handleResult);
  } else {
    extApi.storage.local.get("lastRun", handleResult);
  }
}

// Call the function when the extension is loaded
runOnceDaily();
