// Minimal static server for local preview (mirrors GitHub Pages: /dir/ -> /dir/index.html, 404.html).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const PORT = Number(process.env.PORT) || 8080;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

async function resolveFile(urlPath) {
  const rel = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^[/\\]+/, '');
  const full = resolve(ROOT, rel);
  if (full !== ROOT && !full.startsWith(ROOT + sep)) return null; // block path traversal
  if (full.split(sep).includes('.git')) return null;
  try {
    const s = await stat(full);
    if (s.isDirectory()) {
      if (!urlPath.endsWith('/')) return { redirect: urlPath + '/' };
      return { file: join(full, 'index.html') };
    }
    return { file: full };
  } catch { return null; }
}

createServer(async (req, res) => {
  try {
    const hit = await resolveFile(new URL(req.url, 'http://localhost').pathname);
    if (hit?.redirect) { res.writeHead(301, { Location: hit.redirect }); return res.end(); }
    const file = hit?.file;
    const body = file ? await readFile(file).catch(() => null) : null;
    if (!body) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      return res.end(await readFile(join(ROOT, '404.html')).catch(() => 'Not found'));
    }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(body);
  } catch (err) {
    res.writeHead(500); res.end('Server error');
    console.error(err);
  }
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Local preview:  http://localhost:${PORT}/   (EN)`);
  console.log(`                http://localhost:${PORT}/tr/ (TR)`);
});
