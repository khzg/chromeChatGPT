[![N|Solid](screenshot.png)](https://#)

## Ai Chat everywhere — a fork of khzg/ChatGPT

This extension is a fork of [khzg/ChatGPT](https://github.com/khzg/ChatGPT) by Khashayar Zavosh ("Ai Chat everywhere"). It keeps everything from the original and adds: Muse, DeepSeek and Copilot in the main menu, NotebookLM, an AI Agents category, a Firefox sidebar mode, and Chrome (Manifest V3) support alongside Firefox (Manifest V2).

## What's new in v1.7 (2026-11-12)

- **Synced with upstream ver 19 (khzg/ChatGPT, 5 July 2026):** NotebookLM in the main menu; new **AI Agents** category (Codex, GitHub Copilot, Claude Code, Cursor, n8n, Devin); Zoner AI, Midjourney and bfl in Image Generators; ElevenLabs in Music; prompts.chat and system prompts in Prompts. Every new link was checked live before being added.
- **Firefox sidebar:** in Firefox, clicking a chatbot now opens it in the sidebar, next to the page you are on — the way upstream works. Chrome still opens a popup window (700x700), and "open chat in new tab" still opens a new tab in both browsers.
- **Code polish:** popup height raised to fit the longer menu, folder links get their own colour, `popup.html` declares UTF-8, and the new links were added to the daily history cleanup.
- **Not carried over from upstream:** Phind and Bagoodex (both dead), the old Suno address, and upstream's `last1Run` typo that made history cleanup run on every load instead of once a day.

## What's new in v1.7.2 (2026-11-12)

- **Donation links now point to this fork:** every "Donate" link in the popup and on all category pages used to open the original author's Chrome Web Store / AMO listings. They now open this repository (https://github.com/zetzzzz/chromeChatGPT2), whose README carries the maintainer's USDT (BEP20) donation address. "AI ad" and "Add more ai" now open this repository's Issues page, and the original author's Instagram link was removed.

## What's new in v1.7.1 (2026-11-12)

- **Scroll fix:** the popup had two nested scroll areas — the page body and the button list, both 380px tall with their own scroll — so the mouse wheel got stuck at the bottom of the buttons and the "open chat in new tab" checkbox below the list took several extra scrolls to reach. The list no longer scrolls on its own; the body is now the single scroll layer, with smooth scrolling.

## What's new in v1.6 (2026-11-11)

- **New chatbots in the main menu:** Claude (claude.ai), DeepSeek (chat.deepseek.com), Muse (muse.ai) and Grok from X (grok.com) — alongside ChatGPT, Gemini, Copilot and Bing Image.
- **All menus kept:** every chatbot and category from v1.5 is still there (Search Engine, Image Generators, Files & Spreadsheets, Face Swap, Music, Code, Prompts).
- **Links updated to today's URLs:** DuckDuckGo AI now opens duck.ai, Suno now opens suno.com/create, Mistral's Le Chat is now called Mistral Vibe (same address, chat.mistral.ai), and Bagoodex now opens its successor Sigma AI (app.sigmabrowser.com).
- **Removed:** Phind — the service shut down on 16 January 2026 and phind.com no longer works.
- **Code updated for today's browsers:** the popup now opens chats in a `popup` window (the old `panel` type no longer exists in Chrome), and popup/background code now works with both the Chrome (`chrome.*`) and Firefox (`browser.*`) extension APIs.
- **Releases:** v1.6 ships as two files — one for Chrome/Chromium (Manifest V3) and one for Firefox (Manifest V2, still supported by Mozilla). See Install below.

## Ai Chat everywhere (Chrome addons)

This extension provides easy access to a variety of AI chatbots and learning prompts, including support for:

OpenAI ChatGPT, Google Gemini, Claude, DeepSeek, Muse, Grok (X), NotebookLM, Microsoft Copilot, and other popular chatbots and Free prompts.


Boost your productivity with:

Faster access to AI chat and learning a variety of prompts


IF IT WORKS FOR YOU, GIVE IT 5 STARS.


## Install

Download the release file for your browser from the [Releases](https://github.com/zetzzzz/chromeChatGPT2/releases) page (v1.7.2):

### Chrome / Chromium / Edge / Brave
1. Unzip `ai-chat-everywhere-1.7.2-chrome.zip` to a folder.
2. Open `chrome://extensions` (or `edge://extensions` / `brave://extensions`).
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the unzipped folder.
5. Click the puzzle icon in the toolbar and pin **Ai Chat everywhere**.

### Firefox
1. Unzip `ai-chat-everywhere-1.7.2-firefox.zip` to a folder.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on** and select the `manifest.json` file inside the unzipped folder. (Temporary add-ons are removed when Firefox closes; for a permanent install, the add-on must be signed through addons.mozilla.org.)
4. Click the puzzle icon in the toolbar and pin **Ai Chat everywhere**.

In Firefox, clicking a chatbot opens it in the sidebar, next to the page you are on. (The signed .xpi for a permanent install is still the v1.6 one; v1.7.1 has been submitted to AMO and is awaiting review.)

*After installing, click on the pin to toolbar.

*If they restrict you، use VPN.

*Bing is not responsive and open in a new tab.

## Support

please share with followers.

Upstream project (original author):

https://github.com/khzg/ChatGPT

🌎 Website Developer:

https://www.upwork.com/agencies/1699762909068050432/

💝 donation(any amount). (USDT BEP20): 0xE66f642b76895eBbebe19393214dd61A659c0E82
