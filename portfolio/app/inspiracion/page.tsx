export default function Page() {
  return <>
<a className="skip-link" href="#contenido">Saltar al contenido</a><header className="header"><a href="/" className="wordmark">CARMEN LLOSA</a><nav aria-label="Navegación principal"><a href="/">SOBRE MÍ</a><a href="/formacion/">FORMACIÓN</a><a href="/mi-escritura/">MIS TEXTOS</a><a href="/inspiracion/" aria-current="page">INSPIRACIÓN</a><a href="/contacto/">CONTACTO</a></nav></header><main id="contenido">      <section id="inspiracion" className="section shell inspiration"><div className="section-heading"><p className="eyebrow">MI INSPIRACIÓN</p><h1>Todo esto también soy yo.</h1><p>Cine, libros, sobremesas y otras obsesiones.</p></div><img className="inspiration-collage" src="/images/pdf-inspiration.jpg" alt="Collage de referencias de Carmen: cine, moda, arte, gastronomía y literatura" width="2584" height="1278" loading="lazy"/></section>
</main><footer className="site-footer shell"><span>Carmen Llosa · Escritura creativa</span><a href="/">Volver a sobre mí ↗</a></footer>
  </>;
}
