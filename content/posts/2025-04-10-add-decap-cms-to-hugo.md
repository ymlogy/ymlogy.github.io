---
title: "How to Add Decap CMS to Your Hugo Blog Hosted on GitHub Pages"
date: 2025-04-10
draft: false
description: "A step-by-step guide to integrating Decap CMS with Hugo for GitHub Pages."
tags: ["Hugo", "Decap CMS", "GitHub Pages", "Static Sites"]
categories: ["development"]
---

### **How to Add Decap CMS to Your Hugo Blog Hosted on GitHub Pages**

Decap CMS, formerly Netlify CMS, is an open-source, Git-based content management system (CMS) designed for static site generators like Hugo. It provides a user-friendly web interface for editing content directly in your GitHub repository, making it ideal for Hugo blogs hosted on GitHub Pages. This blog post will guide you through integrating Decap CMS into your existing Hugo setup.

---

#### **Why Choose Decap CMS?**

1. **Git-Based Workflow**: Decap CMS commits changes directly to your GitHub repository, ensuring version control and seamless collaboration.
2. **Ease of Use**: Offers a WordPress-style editing experience without the need for databases.
3. **Compatibility**: Works perfectly with Hugo’s static site generation, maintaining speed and security.
4. **Free and Open Source**: No cost and highly customizable.

---

### **Step-by-Step Guide to Integrate Decap CMS**

#### **1. Add Decap CMS Files**

In Hugo, static files are stored in the `static/` directory. You’ll create the necessary files for Decap CMS here:

1. Navigate to the `static/` folder in your Hugo project.
2. Create a new folder named `admin`.
3. Inside the `admin` folder, create two files: `index.html` and `config.yml`.

##### **index.html**

Add the following code to `index.html`:

```html

&lt;html&gt;
&lt;head&gt;
  &lt;script src="https://unpkg.com/decap-cms@latest/dist/decap-cms.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;script&gt;
    DecapCMS.init();
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
```

---

#### **2. Configure Decap CMS**

In the `config.yml` file, define how Decap CMS interacts with your Hugo setup:

```yaml
backend:
  name: github
  repo: &lt;your-github-username&gt;/&lt;your-repo-name&gt; # Replace with your GitHub repository name
  branch: main # Or your default branch

media_folder: "static/uploads" # Folder for uploaded media files
public_folder: "/uploads"

collections:
  - name: "posts"
    label: "Posts"
    folder: "content/posts" # Path where Markdown files are stored
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Description", name: "description", widget: "text" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Categories", name: "categories", widget: "list" }
      - { label: "Tags", name: "tags", widget: "list" }
      - { label: "Draft", name: "draft", widget: "boolean" }
      - { label: "Body", name: "body", widget: "markdown" }
```

This configuration ensures posts are saved as Markdown files with front matter fields such as title, description, categories, tags, date, draft status, and body content.

---

#### **3. Push Changes to GitHub**

Commit and push the new `admin` folder and its contents to your GitHub repository:

```bash
git add static/admin
git commit -m "Add Decap CMS integration"
git push origin main
```

---

#### **4. Access Decap CMS**

Once deployed, visit `/admin` on your site (e.g., `https://&lt;your-site-url&gt;/admin`) to access the Decap CMS interface. Log in using your GitHub credentials.

---

#### **5. Automate Deployment**

To ensure changes made via Decap CMS are reflected on your site:

- Set up a GitHub Actions workflow to rebuild and deploy your Hugo site whenever changes are pushed.
- Example `.github/workflows/deploy.yml`:

```yaml
name: Deploy Hugo Site

on:
  push:
    branches:
      - main

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
      - run: hugo --minify
      - uses: actions/upload-pages-artifact@v1
        with:
          path: ./public
      - uses: actions/deploy-pages@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

---

### **Conclusion**

Decap CMS is a powerful tool for managing content in a Hugo blog hosted on GitHub Pages. By following this guide, you can enable non-technical users to edit posts effortlessly while maintaining the speed and simplicity of static site generation.

With Decap CMS integrated into your setup, you can focus on creating great content without worrying about technical complexities!

<div>⁂</div>

[^1]: https://decapcms.org/docs/hugo/

[^2]: https://www.justinjbird.me/blog/2021/learning-to-hugo-front-matter/

[^3]: https://pangolinsoftwaresolutions.com/blog/2023-10-23-integration-blowfish-theme-with-decap-cms/

[^4]: https://gohugo.io/content-management/front-matter/

[^5]: https://docs.hugoblox.com/getting-started/cms/decap/

[^6]: https://www.giraffeacademy.com/static-site-generators/hugo/front-matter/

[^7]: https://decapcms.org/docs/basic-steps/

[^8]: https://docs.hugoblox.com/reference/front-matter/

