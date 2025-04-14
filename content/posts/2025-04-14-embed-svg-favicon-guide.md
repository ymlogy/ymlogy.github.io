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
```

Save this as `icon.svg`.

---

## **Step 2: URL-Encode the SVG**

To embed the SVG in a `data:` URL, you need to URL-encode it. This converts special characters (like `<`, `>`, and spaces) into a format that can be safely included in HTML.

### **Option A: Use an Online Encoder**
1. Copy your SVG code.
2. Go to a tool like [URL Encode/Decode](https://www.url-encode-decode.com/).
3. Paste your SVG code into the input box and encode it.
4. The result will look something like this:
   ```
   %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%3E%0A%20%20%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2220%22%20fill%3D%22black%22%2F%3E%0A%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-size%3D%2260%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%20font-family%3D%22Arial%2C%20sans-serif%22%20dominant-baseline%3D%22central%22%3EN.%3C%2Ftext%3E%0A%3C%2Fsvg%3E
   ```

### **Option B: Use a Command-Line Tool**
If you prefer the command line, you can use `base64` encoding (though not strictly URL-encoded, it works for most browsers):

```bash
cat icon.svg | base64
```

---

## **Step 3: Embed the Encoded SVG in HTML**

Once you have the encoded SVG, embed it in your HTML file using a `<link>` tag with a `data:` URL:

```html
<link rel="icon" type="image/svg+xml"
    href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%3E%0A%20%20%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%2220%22%20fill%3D%22black%22%2F%3E%0A%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-size%3D%2260%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%20font-family%3D%22Arial%2C%20sans-serif%22%20dominant-baseline%3D%22central%22%3EN.%3C%2Ftext%3E%0A%3C%2Fsvg%3E">
```

---

## **Step 4: Test Your Favicon**

1. Open the HTML file in your browser.
2. Check the browser tab to see if the favicon appears.

---

## **Tips and Best Practices**

- **Keep It Simple**: SVG favicons should be lightweight and simple to avoid bloating your HTML.
- **Use Tools**: Tools like [SVGOMG](https://jakearchibald.github.io/svgomg/) can optimize your SVG before encoding.
- **Fallbacks**: For older browsers that don't support SVG favicons, consider providing a PNG fallback.

---

By embedding an SVG favicon directly in your HTML, you can streamline your website's assets and improve performance. This technique is especially useful for modern, lightweight web applications.

Happy coding