import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.dirname(root);
const pages = JSON.parse(fs.readFileSync(path.join(root, 'content/notebook.json'), 'utf8'));
const moduleSource = ts.transpileModule(fs.readFileSync(path.join(root, 'lib/notebook.ts'), 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
}).outputText;
const { renderNotebook } = await import('data:text/javascript;base64,' + Buffer.from(moduleSource).toString('base64'));
const css = fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8')
  .split('\n').filter(line => !line.startsWith('@import') && !line.startsWith('@theme')).join('\n')
  .replaceAll('url("/fonts/', 'url("./portfolio/public/fonts/');
fs.writeFileSync(path.join(output, 'notebook.css'), css);
for (const page of pages) {
  const relativeRoot = page.slug ? '../' : './';
  const body = renderNotebook(pages, page.slug, relativeRoot + 'portfolio/public/');
  const legacyLinks = page.slug ? '' : `<script>const previousPages={'#sobre-mi':'sobre-mi/','#formacion':'sobre-mi/#formacion','#escritura':'mi-escritura/','#articulos':'mi-escritura/#articulos','#contacto':'contacto/'};if(previousPages[location.hash])location.replace('./'+previousPages[location.hash]);</script>`;
  const html = `<!doctype html>\n<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.title}</title><meta name="description" content="Carmen Llosa. Escritura creativa."><link rel="icon" href="${relativeRoot}portfolio/public/favicon.svg"><link rel="stylesheet" href="${relativeRoot}notebook.css">${legacyLinks}</head><body>${body}</body></html>\n`;
  if (/className=|{{root}}/.test(html)) throw new Error('Unconverted markup');
  if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error('Expected one page title: ' + page.slug);
  const dir = path.join(output, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
for (const page of pages) {
  const dir = path.join(output, page.slug);
  const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [file, anchor] = href.split('#');
    const target = path.resolve(dir, file || 'index.html');
    if (!fs.existsSync(target)) throw new Error('Missing local link: ' + href);
    if (anchor) {
      const document = fs.readFileSync(fs.statSync(target).isDirectory() ? path.join(target, 'index.html') : target, 'utf8');
      if (!document.includes(`id="${anchor}"`)) throw new Error('Missing anchor: ' + href);
    }
  }
}
console.log('Exported and verified five notebook pages, navigation, anchors, images and stylesheet.');
