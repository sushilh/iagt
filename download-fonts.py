#!/usr/bin/env python3
"""
IAGT Website Font Downloader
Run this script ONCE with internet access to download fonts locally.
After running, the website will work completely offline.
"""
import urllib.request
import os
import sys

FONTS = [
    # Playfair Display
    ("playfair-regular.woff2",
     "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.woff2"),
    ("playfair-600.woff2",
     "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXBzDwcbmjWBN2PKd3vUDQ.woff2"),
    ("playfair-800.woff2",
     "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXHTDwcbmjWBN2PKd3vUDQ.woff2"),
    ("playfair-900.woff2",
     "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXHjDwcbmjWBN2PKd3vUDQ.woff2"),
    ("playfair-italic.woff2",
     "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFRD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xRbPQ.woff2"),
    ("playfair-600-italic.woff2",
     "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFSD-vYSZviVYUb_rj3ij__anPXBSdqbyS4AJdQjzJpVA.woff2"),
    # Outfit
    ("outfit-300.woff2",
     "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"),
    ("outfit-400.woff2",
     "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"),
    ("outfit-500.woff2",
     "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"),
    ("outfit-600.woff2",
     "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"),
    ("outfit-700.woff2",
     "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"),
]

fonts_dir = os.path.join(os.path.dirname(__file__), "fonts")
os.makedirs(fonts_dir, exist_ok=True)
ua_headers = {"User-Agent": "Mozilla/5.0 (compatible; font-downloader/1.0)"}

success = 0
for name, url in FONTS:
    dest = os.path.join(fonts_dir, name)
    if os.path.exists(dest):
        print(f"  ✓ {name} (already exists)")
        success += 1
        continue
    try:
        req = urllib.request.Request(url, headers=ua_headers)
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
        with open(dest, "wb") as f:
            f.write(data)
        print(f"  ✓ {name} ({len(data)//1024}KB)")
        success += 1
    except Exception as e:
        print(f"  ✗ {name}: {e}")

print(f"\n{success}/{len(FONTS)} fonts downloaded to ./fonts/")
if success == len(FONTS):
    print("All fonts ready! The website will now work offline.")
