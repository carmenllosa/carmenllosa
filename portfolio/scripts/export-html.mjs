import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.dirname(root);
const css=fs.readFileSync(path.join(root,'app/globals.css'),'utf8').split('\n').filter(line=>!line.startsWith('@import')&&!line.startsWith('@theme')).join('\n');
const publishedCss=css.replaceAll('url("/fonts/','url("./portfolio/public/fonts/');
const version=crypto.createHash('sha256').update(publishedCss).digest('hex').slice(0,10);
fs.writeFileSync(path.join(output,'portfolio.css'),publishedCss);
const pages=[['','Sobre mí'],['formacion','Trayectoria'],['mi-escritura','Artículos'],['contacto','Contacto']];
for(const [slug,label] of pages){
 const source=fs.readFileSync(path.join(root,'app',slug,'page.tsx'),'utf8');
 const body=source.slice(source.indexOf('return <>')+9,source.lastIndexOf('</>;')).replaceAll('className=','class=').replaceAll('fetchPriority=','fetchpriority=').replaceAll('tabIndex={-1}','tabindex="-1"');
 const prefix=slug?'../':'./';
 const htmlBody=body.replaceAll('src="/images/',`src="${prefix}portfolio/public/images/`).replaceAll('href="/',`href="${prefix}`);
 const ids=[...body.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
 for(const [,anchor] of body.matchAll(/href="#([^"]+)"/g))if(!ids.includes(anchor))throw Error('Missing anchor '+anchor);
 for(const [,file] of body.matchAll(/src="(\/images\/[^\"]+)"/g))if(!fs.existsSync(path.join(root,'public',file)))throw Error('Missing image '+file);
 for(const [,href] of body.matchAll(/href="\/([^"#]*)"/g))if(!pages.some(([s])=>(s?s+'/':'')===href))throw Error('Missing page '+href);
 if((body.match(/<h1[ >]/g)||[]).length!==1)throw Error('Expected one page heading');
 if((body.match(/aria-current="page"/g)||[]).length!==1)throw Error('Expected active navigation');
 const head=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${label} · Carmen Llosa</title><meta name="description" content="Carmen Llosa. Escritura. ${label}.">`;
 const dest=path.join(output,slug);fs.mkdirSync(dest,{recursive:true});
 fs.writeFileSync(path.join(dest,'index.html'),`<!doctype html>\n<html lang="es"><head>${head}<link rel="icon" href="${prefix}portfolio/public/favicon.svg"><link rel="stylesheet" href="${prefix}portfolio.css?v=${version}"></head><body>${htmlBody}</body></html>\n`);
}
fs.writeFileSync(path.join(output,'sobre-mi/index.html'),'<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sobre mí · Carmen Llosa</title><meta http-equiv="refresh" content="0;url=../"></head><body><a href="../">Sobre mí</a></body></html>\n');
// The previous single-file preview now opens the multipage portfolio.
fs.writeFileSync(path.join(output,'Carmen-Llosa-portfolio.html'),'<!doctype html><html lang="es"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=./index.html"><title>Carmen Llosa</title></head><body><a href="./index.html">Abrir el portfolio</a></body></html>\n');
console.log('Verified four independent pages, active navigation, headings, internal links and image paths.');

fs.writeFileSync(path.join(output,'inspiracion/index.html'),fs.readFileSync(path.join(output,'sobre-mi/index.html'),'utf8'));
