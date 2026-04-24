import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  console.log('[Server] Initializing...');
  const app = express();

  // Basic health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', vite: !!vite });
  });

  let vite: any;
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Server] Starting Vite in middleware mode...');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    app.use(compression());
    app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    console.log(`[Server] Request URL: ${url}`);

    try {
      let template: string;
      let render: any;

      if (process.env.NODE_ENV !== 'production' && vite) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        const templatePath = path.resolve(__dirname, 'dist/client/index.html');
        if (!fs.existsSync(templatePath)) {
          throw new Error(`Template not found at ${templatePath}. Did you run 'npm run build'?`);
        }
        template = fs.readFileSync(templatePath, 'utf-8');
        
        const renderPath = path.resolve(__dirname, 'dist/server/entry-server.js');
        if (!fs.existsSync(renderPath)) {
          throw new Error(`Renderer not found at ${renderPath}. Did you run 'npm run build'?`);
        }
        render = (await import(renderPath)).render;
      }

      if (typeof render !== 'function') {
        throw new Error('SSR render function is not exported. Check src/entry-server.tsx');
      }

      const rendered = await render(url);
      const appHtml = rendered.html;

      if (!appHtml) {
        console.warn(`[Server Warning] Rendered HTML is empty for URL: ${url}`);
      }

      const html = template.replace(`<!--app-html-->`, appHtml ?? '');

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      console.error(`[Server Error] Failed to render ${url}:`, e);
      if (process.env.NODE_ENV !== 'production' && vite) {
        vite.ssrFixStacktrace(e);
      }
      res.status(500).set({ 'Content-Type': 'text/html' }).end(`
        <!DOCTYPE html>
        <html>
          <head><title>Server Error</title></head>
          <body style="background: #030406; color: #f1f5f9; font-family: sans-serif; padding: 2rem;">
            <h1>500 - Server Internal Error</h1>
            <pre style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; overflow: auto;">${e.stack || e.message || e}</pre>
          </body>
        </html>
      `);
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`[Server] Listening on http://0.0.0.0:${port}`);
  });
}

createServer().catch(err => {
  console.error('[Server] Failed to start:', err);
});
