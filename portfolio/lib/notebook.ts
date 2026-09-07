export type NotebookPage = { slug: string; label: string; title: string; body: string };
const escape = (text: string) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function renderNotebook(pages: NotebookPage[], slug: string, assetBase = '/') {
  const index = pages.findIndex(page => page.slug === slug);
  if (index < 0) throw new Error('Unknown notebook page');
  const page = pages[index];
  const root = slug ? '../' : './';
  const href = (item: NotebookPage) => root + (item.slug ? item.slug + '/' : '');
  const body = page.body.replaceAll('{{root}}', root).replaceAll('src="/images/', `src="${assetBase}images/`);
  const tabs = pages.map((item, i) => `<a href="${href(item)}"${i === index ? ' aria-current="page"' : ''}><span class="tab-number" aria-hidden="true">0${i + 1}</span>${escape(item.label)}</a>`).join('');
  const previous = index > 0 ? `<a href="${href(pages[index - 1])}" rel="prev">← ${escape(pages[index - 1].label)}</a>` : '<span></span>';
  const next = index < pages.length - 1 ? `<a href="${href(pages[index + 1])}" rel="next">${escape(pages[index + 1].label)} →</a>` : `<a href="${root}">Volver a la portada ↑</a>`;
  return `<a class="skip-link" href="#contenido">Saltar al contenido</a><div class="notebook"><nav class="notebook-tabs" aria-label="Páginas de la libreta">${tabs}</nav><div class="paper"><div class="binding" aria-hidden="true">${'<span class="ring"></span>'.repeat(8)}</div><header class="notebook-header"><a class="wordmark" href="${root}">CARMEN LLOSA</a><span class="notebook-caption">ESCRITURA CREATIVA</span></header><main id="contenido" class="notebook-content" tabindex="-1">${body}</main><footer class="page-turns" aria-label="Navegación entre páginas">${previous}<span class="page-number">0${index + 1} / 0${pages.length}</span>${next}</footer></div></div>`;
}
