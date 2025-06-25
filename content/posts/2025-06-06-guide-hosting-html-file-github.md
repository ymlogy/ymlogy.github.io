---
title: "Guide to Hosting an HTML File on GitHub Pages"
date: 2026-06-06
draft: false
description: "Step-by-step guide to hosting your HTML file on GitHub Pages, even with no coding experience"
tags: ["github", "github-pages", "web-hosting", "html"]
categories: ["development"]
---

## Step-by-Step Guide: Hosting Your HTML File on GitHub Pages

This guide will help you, even if you have no coding experience, to create a GitHub account, upload your HTML file, and publish it as a live website using GitHub Pages. All you need is a computer and your HTML file.

---

### **1. Create a GitHub Account**

1. Go to [github.com](https://github.com).
2. Click **Sign up** in the top right corner.
3. Fill in your email, create a username and password, and follow the prompts to verify your account.

---

### **2. Create a New Repository**

1. Once logged in, click the **+** sign in the top right, then select **New repository**.
2. **Repository name:**
If you want your site to be at `https://yourusername.github.io`, enter `yourusername.github.io` as the repository name (replace `yourusername` with your actual GitHub username)[^1].
3. **Description:** (Optional) Add a short description.
4. **Public/Private:** Choose **Public** so your site can be viewed by anyone.
5. **Initialize this repository with a README:** Check this box.
6. Click **Create repository**.

---

### **3. Upload Your HTML File**

1. In your new repository, click **Add file** > **Upload files**.
2. Drag and drop your HTML file (for example, `index.html`) into the upload area, or click **choose your files** to select it from your computer.
3. Scroll down and click **Commit changes** to upload.

---

### **4. Set Up GitHub Pages**

1. In your repository, click the **Settings** tab (at the top of the page; on small screens, it may be under a dropdown menu)[^1].
2. In the left sidebar, scroll down and click **Pages** (under "Code and automation").
3. Under **Build and deployment**, find **Source** and select **Deploy from a branch**.
4. Under **Branch**, choose `main` (or `master` if that's the only option) and leave the folder as `/ (root)`.
5. Click **Save**.

---

### **5. Visit Your Live Website**

- After a few minutes, your site will be live at `https://yourusername.github.io` (replace `yourusername` with your GitHub username)[^1].
- If you uploaded a file named `index.html`, it will load automatically.

---

### **Tips and Troubleshooting**

- **It can take up to 10 minutes** for your site to appear after setup[^1].
- To update your site, upload new versions of your HTML file using the same steps, and your website will refresh after a few minutes.
- If your site isn’t showing, make sure your HTML file is named `index.html` and is in the main folder (not inside another folder).

---

### **Extra: Using Markdown Files**

- GitHub Pages also supports Markdown files (`.md`), which are simple text files with formatting. If you want to create more pages, you can upload `.md` files, and GitHub will turn them into web pages automatically[^4].

---

**Congratulations!**
You now have a live website hosted for free, with no coding required beyond your HTML file.

<div style="text-align: center">⁂</div>

[^1]: https://docs.github.com/en/pages/quickstart

[^2]: https://nicolas-van.github.io/easy-markdown-to-github-pages/

[^3]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github

[^4]: https://www.markdownguide.org/tools/github-pages/

[^5]: https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

[^6]: https://dev.to/m1ner/how-to-use-github-pages-to-host-a-blog-4ofd

[^7]: https://www.reddit.com/r/github/comments/ercxpd/how_to_set_up_a_website_with_github_pages/

[^8]: https://www.youtube.com/watch?v=VDOyjwWPKs4

