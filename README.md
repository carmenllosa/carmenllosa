# Carmen Llosa · Escritura creativa

Portfolio minimalista en azul y crema, en una página continua: portada, sobre mí, formación, escritura, inspiración y contacto.

Web: https://carmenllosa.github.io/carmenllosa/

## Editar y publicar

El contenido está en `portfolio/app/page.tsx` y el diseño en `portfolio/app/globals.css`. Las imágenes y fuentes están en `portfolio/public/`.

Con Node.js 22.13 o posterior, desde `portfolio/`:

```sh
npm ci
npm run dev
```

Para generar la web que publica GitHub Pages:

```sh
node scripts/export-html.mjs
```

Esto actualiza `index.html` y `portfolio.css` en la raíz del repositorio. Subirlos junto al proyecto a `main` publica los cambios. El exportador también genera `Carmen-Llosa-portfolio.html`, una copia local autónoma con fuentes e imágenes incorporadas.

Las antiguas direcciones de la libreta redirigen al apartado correspondiente de la página continua.
