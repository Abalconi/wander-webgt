const fs = require('fs');
const path = require('path');

const clientDir = 'dist/client';
const serverDir = 'dist/server';
const serverFile = path.join(serverDir, 'server.js');

if (!fs.existsSync(serverFile)) {
  console.log('No server.js found');
  process.exit(0);
}

// Copy server.js -> _worker.js
fs.copyFileSync(serverFile, path.join(clientDir, '_worker.js'));

// Copy server assets -> client assets
const serverAssets = path.join(serverDir, 'assets');
const clientAssets = path.join(clientDir, 'assets');

if (fs.existsSync(serverAssets)) {
  if (!fs.existsSync(clientAssets)) {
    fs.mkdirSync(clientAssets, { recursive: true });
  }
  fs.readdirSync(serverAssets).forEach(f => {
    fs.copyFileSync(path.join(serverAssets, f), path.join(clientAssets, f));
  });
  console.log('Assets copied!');
}

// Fix wrangler.json
const wranglerPath = path.join(clientDir, 'wrangler.json');
if (fs.existsSync(wranglerPath)) {
  const c = JSON.parse(fs.readFileSync(wranglerPath, 'utf8'));
  c.main = '_worker.js';
  delete c.triggers;
  fs.writeFileSync(wranglerPath, JSON.stringify(c, null, 2));
  console.log('Fixed!');
} else {
  console.log('No wrangler.json found in dist/client');
}
