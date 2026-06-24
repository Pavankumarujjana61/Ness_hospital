# Hostinger Node.js Deployment & Configuration Instructions

This guide provides step-by-step instructions to deploy this full-stack React (Vite) + Node.js (Express) + MySQL application on **Hostinger hPanel Node.js Hosting**.

---

## 1. Directory Structure on Hostinger

Place the entire project root (`NESHOSP`) directly in your Hostinger application directory (typically under `/home/uXXXXXX/domains/yourdomain.com/public_html` or a custom subfolder).

```text
/home/uXXXXXX/domains/yourdomain.com/
├── public_html/ (Project Root)
│   ├── dist/                 # Generated after running `npm run build`
│   ├── public/               # React static assets (logos, icons)
│   ├── src/                  # React frontend code
│   ├── server/               # Express backend code
│   │   ├── server.js         # Startup File
│   │   ├── db.js             # DB Connection & Seeding
│   │   ├── config/           # App Configuration
│   │   ├── controllers/      # API Controllers
│   │   ├── middleware/       # JWT Auth & Error Middleware
│   │   ├── routes/           # Endpoint Routing
│   │   ├── uploads/          # Image Uploads target folder
│   │   └── neshosp.sql       # MySQL Schema & Seeds
│   ├── package.json          # Shared dependencies & scripts
│   ├── vite.config.js        # Vite config
│   ├── .env                  # Environment Variables
│   └── index.html            # Vite entry point
```

---

## 2. Hostinger hPanel Node.js Configuration

1. Log in to your **Hostinger hPanel**.
2. Navigate to **Advanced** -> **Node.js**.
3. Configure the Node.js application:
   - **Node.js Version**: Select **20.x** or **22.x** (latest LTS).
   - **Application Folder**: `public_html` (or select the folder containing your code).
   - **Application Domain**: Select your website domain (e.g. `yourdomain.com`).
   - **Application Startup File**: `server/server.js` (Point this directly to the server file).
4. Click **Create** or **Save**.

---

## 3. Environment Variables (.env) Setup

Create a `.env` file in the root directory of your app (next to `package.json`). Configure the values matching your production setup:

```ini
PORT=5000
NODE_ENV=production
JWT_SECRET=your-random-production-secret-key-2026

# MySQL database details (Create a MySQL Database & User in Hostinger hPanel first)
DB_HOST=localhost
DB_PORT=3306
DB_USER=uXXXXXX_your_db_user
DB_PASSWORD=your_db_password
DB_NAME=uXXXXXX_your_db_name
```

---

## 4. Database Import Setup

1. In hPanel, go to **Databases** -> **MySQL Databases** and create a new database.
2. Go to **phpMyAdmin** -> Click **Enter phpMyAdmin**.
3. Select your database, click **Import** tab.
4. Upload and import the SQL file located at: `server/neshosp.sql`.
5. *Note: Alternatively, on first boot, `server/db.js` will automatically seed the primary doctors, admin account (`username: admin`, `password: admin123`), and banners if the tables are empty.*

---

## 5. Execution & Build Commands

Using the hPanel terminal console or SSH, run the following commands sequentially inside the project directory:

```bash
# 1. Install all dependencies (Vite, React, Express, MySQL2, etc.)
npm install

# 2. Build the React frontend into the dist/ directory
npm run build

# 3. Start/Restart the application
# Hostinger hPanel manages the app execution automatically via the Startup File (server/server.js).
# You can click "Restart" in the hPanel Node.js dashboard.
```

---

## 6. How it Works (Under the hood)

- **Frontend Build**: `npm run build` generates the production bundle inside `dist/`.
- **Backend static serving**: `server/server.js` is configured to serve static assets from `dist/` and serve uploaded files from `server/uploads/` directly.
- **Routing**: Fallback wildcard matching in Express sends all client-side page loads to `dist/index.html`, eliminating **404 page refresh errors** on React Router paths.
