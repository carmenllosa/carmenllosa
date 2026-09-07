import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.dirname(root);
const source=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');
const body=source.slice(source.indexOf('return <>')+9,source.lastIndexOf('</>;')).replaceAll('className=','class=').replaceAll('fetchPriority=','fetchpriority=');
const css=fs.readFileSync(path.join(root,'app/globals.css'),'utf8').split('\n').filter(line=>!line.startsWith('@import')&&!line.startsWith('@theme')).join('\n');
const title='Carmen Llosa · Escritura creativa';
const head=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="Carmen Llosa. Escritura creativa.">`;
const publishedCss=css.replaceAll('url("/fonts/','url("./portfolio/public/fonts/');
const version=crypto.createHash('sha256').update(publishedCss).digest('hex').slice(0,10);
const publishedBody=body.replaceAll('src="/images/','src="./portfolio/public/images/');
fs.writeFileSync(path.join(output,'portfolio.css'),publishedCss);
fs.writeFileSync(path.join(output,'index.html'),`<!doctype html>\n<html lang="es"><head>${head}<link rel="icon" href="./portfolio/public/favicon.svg"><link rel="stylesheet" href="./portfolio.css?v=${version}"></head><body>${publishedBody}</body></html>\n`);
const embeddedBody=body.replace(/src="(\/images\/[^\"]+)"/g,(_,file)=>'src="data:image/jpeg;base64,'+fs.readFileSync(path.join(root,'public',file)).toString('base64')+'"');
const embeddedCss=css.replace(/url\("(\/fonts\/[^\"]+)"\)/g,(_,file)=>'url("data:font/ttf;base64,'+fs.readFileSync(path.join(root,'public',file)).toString('base64')+'")');
fs.writeFileSync(path.join(output,'Carmen-Llosa-portfolio.html'),`<!doctype html>\n<html lang="es"><head>${head}<style>${embeddedCss}</style></head><body>${embeddedBody}</body></html>\n`);
const ids=[...body.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
for(const [,anchor] of body.matchAll(/href="#([^"]+)"/g))if(!ids.includes(anchor))throw Error('Missing anchor '+anchor);
for(const [,file] of body.matchAll(/src="(\/images\/[^\"]+)"/g))if(!fs.existsSync(path.join(root,'public',file)))throw Error('Missing image '+file);
if(/className=|notebook|education-photo/.test(body))throw Error('Unexpected markup');
if((body.match(/<img\b/g)||[]).length!==4)throw Error('Expected four selected images');
for(const [slug,anchor] of Object.entries({'sobre-mi':'sobre-mi','mi-escritura':'escritura','inspiracion':'inspiracion','contacto':'contacto'})){
 const dir=path.join(output,slug);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),`<!doctype html><html lang="es"><head>${head}<meta http-equiv="refresh" content="0;url=../#${anchor}"></head><body><a href="../#${anchor}">Ir al portfolio de Carmen Llosa</a></body></html>\n`);
}
console.log('Verified one continuous page, four selected images, internal anchors, standalone HTML and four legacy redirects.');
