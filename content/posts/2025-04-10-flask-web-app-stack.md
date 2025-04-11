---
title: "Guide to Building Web Apps with Flask, psycopg2, SQLAlchemy, Supabase, Alpine.js, HTMX, and Tailwind"
date: 2025-04-10
draft: false
description: "good bones for an extensible modular app setup"
tags: ["dev", "supabase", "flask"]
categories: ["flask, development"]
---

### **Step 1: Setting Up the Development Environment**

1. **Install Python and Virtual Environment**:
    - Create a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

    - Install dependencies:

```bash
pip install flask sqlalchemy psycopg2 supabase-py
pip freeze &gt; requirements.txt
```

2. **Install Frontend Tools**:
    - Install Tailwind CSS:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

    - Include Alpine.js and HTMX via CDN in your HTML templates.

### **Step 2: Implementing the Database Schema**

1. **Configure SQLAlchemy with Supabase**:
    - Set up Supabase and retrieve the database URL.
    - Configure Flask to use SQLAlchemy:

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://&lt;supabase-url&gt;'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
```

2. **Define Models**:
    - Create models for your database schema:

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
```

3. **Initialize Database**:
    - Create tables using SQLAlchemy:

```bash
python -c "from app import db; db.create_all()"
```


### **Step 3: Building the Backend**

1. **Create Flask Routes**:
    - Define routes for CRUD operations:

```python
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.name for user in users])
```

2. **Integrate HTMX**:
    - Use HTMX for dynamic interactions without full-page reloads:

```html
&lt;button hx-get="/users" hx-swap="innerHTML"&gt;Load Users&lt;/button&gt;
```


### **Step 4: Building the Frontend**

1. **Set Up Tailwind CSS**:
    - Configure Tailwind CSS in your project (e.g., `tailwind.config.js`).
    - Use utility classes for styling.
2. **Use Alpine.js for Interactivity**:
    - Bind data and events directly in HTML templates:

```html
<div>
  &lt;button @click="open = !open"&gt;Toggle&lt;/button&gt;
  <div>Hello!</div>
</div>
```


### **Step 5: Deployment**

1. Deploy using Supabase hosting or cloud platforms like DigitalOcean.
2. Ensure environment variables (e.g., database URL) are securely configured.

This guide provides a practical roadmap to developing a web app with these technologies while maintaining modularity and scalability[^1][^2][^4].

<div>⁂</div>

[^1]: https://genezio.com/deployment-platform/blog/getting-started-flask-web-app/

[^2]: https://www.digitalocean.com/community/tutorials/how-to-use-flask-sqlalchemy-to-interact-with-databases-in-a-flask-application

[^3]: https://planetscale.com/learn/courses/mysql-for-python-developers/building-a-flask-app-with-mysql/creating-the-schema

[^4]: https://www.youtube.com/watch?v=fsNeGqxC4PM

[^5]: https://www.nucamp.co/blog/coding-bootcamp-back-end-with-python-and-sql-flask-uncovered-a-comprehensive-guide-to-mastering-web-development-with-the-flask-framework

[^6]: https://stackoverflow.com/questions/11873959/flask-sqlalchemy-postgresql-define-specific-schema-for-table

[^7]: https://www.nucamp.co/blog/coding-bootcamp-back-end-with-python-and-sql-database-integration-in-flask-a-howto-guide

[^8]: https://github.com/tecladocode/flask-htmx-tailwind-alpine-workshop

[^9]: https://www.digitalocean.com/community/tutorials/how-to-make-a-web-application-using-flask-in-python-3

[^10]: https://neon.tech/guides/flask-database-migrations

[^11]: https://dev.to/neon-postgres/developing-a-scalable-flask-application-with-neon-postgres-4oac

[^12]: https://flask.palletsprojects.com/en/stable/quickstart/

