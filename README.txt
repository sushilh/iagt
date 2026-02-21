╔══════════════════════════════════════════════════════════╗
║   IAGT — India Association of Greater Tulsa              ║
║   Multi-Page Website — Clean Separated Files             ║
╚══════════════════════════════════════════════════════════╝

PROJECT STRUCTURE
-----------------
  iagt-website/
  ├── index.html          ← Home page
  ├── about.html          ← About & Board
  ├── events.html         ← Events calendar
  ├── membership.html     ← Membership pricing
  ├── sponsorship.html    ← Sponsorship tiers
  ├── booth.html          ← Booth registration
  ├── contact.html        ← Contact form
  │
  ├── css/
  │   ├── fonts.css       ← @font-face declarations
  │   └── style.css       ← All design system & component styles
  │
  ├── js/
  │   └── main.js         ← Theme switcher, nav, animations, tilt
  │
  ├── fonts/              ← Local font files (optional, run download-fonts.py)
  │   └── README.txt
  │
  ├── download-fonts.py   ← Downloads fonts for offline use
  └── README.txt          ← This file

QUICK START
-----------
• Open index.html in any browser — works immediately
• Navigate between pages using the nav bar
• Theme switcher is in the top-right corner (4 themes!)

FONTS (Optional)
----------------
With internet: fonts load automatically from Google Fonts CDN
Offline:       run  python3 download-fonts.py  once to cache locally

HOSTING ON RENDER.COM (Free)
-----------------------------
See RENDER-DEPLOY.txt for step-by-step instructions.

CUSTOMIZATION
-------------
• Colors/themes : edit css/style.css  (look for [data-theme="..."] blocks)
• Layout/content: edit the relevant .html file
• Behaviour/JS  : edit js/main.js
