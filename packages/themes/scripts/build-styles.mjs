import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(packageRoot, 'src');
const outputPath = path.join(packageRoot, 'dist', 'styles.css');

const files = [
  'styles.css',
  'themes/bloom.css',
  'tailwind-contract.css',
  'themes/slate.css',
  'helpers.css'
];

function stripLocalImports(css) {
  return css.replace(/^@import\s+".*";\s*$/gm, '').trim();
}

const sections = [];
for (const file of files) {
  const css = await readFile(path.join(sourceRoot, file), 'utf8');
  sections.push(`/* ${file} */\n${stripLocalImports(css)}`);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${sections.join('\n\n')}\n`);
