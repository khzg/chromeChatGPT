#!/bin/sh
# Build release zips for Ai Chat everywhere v1.7.2.
# Usage: ./build.sh
# Output:
#   dist/ai-chat-everywhere-1.7.2-chrome.zip   (Manifest V3, Chrome/Chromium/Edge/Brave)
#   dist/ai-chat-everywhere-1.7.2-firefox.zip  (Manifest V2, Firefox — MV2 is still
#                                             supported by Mozilla with no end date
#                                             announced; the MV3 service-worker form
#                                             is not used for Firefox here because
#                                             this extension's background script
#                                             relies on callback-style history/
#                                             storage APIs that run as an event page)
# Requires: python3, zip. Run from the repository root.
set -e
cd "$(dirname "$0")"

VERSION=$(python3 -c "import json; print(json.load(open('manifest.json'))['version'])")
DIST="dist"
CHROME_DIR="$DIST/chrome"
FIREFOX_DIR="$DIST/firefox"

# Extension files shipped in both zips (no .git, no build script, no old zip).
FILES="manifest.json popup.html popup.js background.js content.js style.css
  category.html moreAi.html prompts.html privacy.md
  icon.png icon-32.png icon-64.png screenshot.png
  pages prompts"

rm -rf "$DIST"
mkdir -p "$CHROME_DIR" "$FIREFOX_DIR"

# --- Chrome (MV3, as in manifest.json) ---
cp -r $FILES "$CHROME_DIR"/

# --- Firefox (MV2) ---
cp -r $FILES "$FIREFOX_DIR"/
python3 - "$FIREFOX_DIR/manifest.json" <<'PYEOF'
import json, sys
path = sys.argv[1]
src = json.load(open('manifest.json'))
fx = {
    "manifest_version": 2,
    "name": src["name"],
    "version": src["version"],
    "description": src["description"],
    "icons": src["icons"],
    "browser_action": {
        "default_icon": "icon.png",
        "default_popup": "popup.html"
    },
    "sidebar_action": {
        "default_title": "Ai Chat everywhere",
        "default_panel": "popup.html",
        "default_icon": "icon.png",
        "browser_style": False
    },
    "permissions": ["storage", "history", "<all_urls>"],
    "background": {
        "scripts": ["background.js"],
        "persistent": False
    },
    "content_scripts": src["content_scripts"],
    "web_accessible_resources": ["icon.png"],
    "browser_specific_settings": {
        "gecko": {
            "id": "ai-chat-everywhere@zetzzzz.github.io",
            "strict_min_version": "109.0",
            "data_collection_permissions": {
                "required": ["none"]
            }
        }
    }
}
json.dump(fx, open(path, "w"), indent=2, ensure_ascii=False)
open(path, "a").write("\n")
PYEOF

# --- Zip them ---
( cd "$CHROME_DIR" && zip -q -r "../ai-chat-everywhere-$VERSION-chrome.zip" . )
( cd "$FIREFOX_DIR" && zip -q -r "../ai-chat-everywhere-$VERSION-firefox.zip" . )

echo "Built:"
ls -l "$DIST"/*.zip
echo "Chrome zip contents:"
unzip -l "$DIST/ai-chat-everywhere-$VERSION-chrome.zip"
echo "Firefox zip contents:"
unzip -l "$DIST/ai-chat-everywhere-$VERSION-firefox.zip"
