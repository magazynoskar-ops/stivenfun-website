import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');

const toCopy = [
  'index.html',
  'error.html',
  'style.css',
  'script.js',
  'icons',
  'other-images',
  'portfolio-images',
  'trusted-images'
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const item of toCopy) {
  const src = resolve(root, item);
  const dst = resolve(dist, item);

  try {
    await cp(src, dst, { recursive: true });
  } catch (error) {
    console.error(`Build error: cannot copy ${item}`);
    throw error;
  }
}

console.log('Build complete: dist/');
