import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { config as appConfig } from './config/config.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = appConfig.port;

// Middleware
app.use(cors());
app.use(express.json());

// Log HTTP requests
app.use((req, res, next) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);
  next();
});

// Mount modular API routes
app.use('/api', apiRouter);

// Serve static uploaded doctor photos at root path
const uploadsDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/', express.static(uploadsDir));

// Serve static files from the React app dist folder in production
const distDir = path.resolve(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  console.log(`Serving static files from: ${distDir}`);
  app.use(express.static(distDir));
  app.get(/.*/, (req, res, next) => {
    // Pass API requests through to the router
    if (req.url.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

// Global error handling middleware
app.use(errorHandler);

// Spin up server listener
app.listen(PORT, () => {
  console.log(`Node Express Server active on http://localhost:${PORT}`);
});
