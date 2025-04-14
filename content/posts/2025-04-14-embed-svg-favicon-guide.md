---
title: "How to Embed an SVG Favicon Directly in HTML"
date: 2025-04-14
draft: false
description: "A step-by-step guide to embedding an SVG favicon directly in your HTML using data URLs."
tags: ["html", "svg", "favicon", "web development"]
categories: ["development"]
---

Favicons are a small but essential part of any website, helping to establish brand identity and improve user experience. While most websites use external image files for favicons, embedding an SVG favicon directly in your HTML using a `data:` URL is a modern and efficient alternative. This guide will walk you through the process step by step.

---

## **Why Use an Embedded SVG Favicon?**

Embedding an SVG favicon directly in your HTML has several advantages:

- **No External File Dependency**: The favicon is included in the HTML, reducing HTTP requests.
- **Scalability**: SVGs are vector-based, ensuring they look sharp at any resolution.
- **Customizability**: You can easily modify the SVG without managing separate files.
- **Performance**: Embedding small assets directly in the HTML can improve page load times.

---

## **Step 1: Create Your SVG**

Start by designing your SVG. You can use a text editor or an SVG editor like [Inkscape](https://inkscape.org/) or [Figma](https://www.figma.com/). Here's an example of a simple SVG:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="black"/>
  <text x="50%" y="50%" font-size="60" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif" dominant-baseline="central">N.</text>
</svg>