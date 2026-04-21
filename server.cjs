const fs = require("fs");
const path = require("path");

const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".jfif": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function safeResolve(base, targetPath) {
  const cleaned = targetPath.replace(/\\/g, "/");
  const abs = path.resolve(base, "." + cleaned);
  return abs.startsWith(base) ? abs : null;
}

function sendFile(res, filePath) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return false;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
  fs.createReadStream(filePath).pipe(res);
  return true;
}

module.exports = (req, res) => {
  const rawUrl = (req.url || "/").split("?")[0];
  let pathname = "/";
  try {
    pathname = decodeURIComponent(rawUrl);
  } catch {
    pathname = rawUrl;
  }

  const requested = pathname === "/" ? "/index.html" : pathname;
  const filePath = safeResolve(ROOT, requested);

  if (!filePath) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  if (sendFile(res, filePath)) {
    return;
  }

  res.statusCode = 404;
  const errorPage = path.join(ROOT, "error.html");
  if (!sendFile(res, errorPage)) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Not Found");
  }
};
