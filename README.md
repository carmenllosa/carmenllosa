# Carmen Llosa · Escritura creativa

Portfolio minimalista en azul y marfil con cuatro páginas: Sobre mí (inicio), Formación, Artículos y Contacto.

Web: https://carmenllosa.github.io/carmenllosa/

## Editar y publicar

El contenido está en `portfolio/app/page.tsx` y en los archivos `page.tsx` de `formacion/`, `mi-escritura/`, `contacto/`. El diseño está en `portfolio/app/globals.css`. Las imágenes y fuentes están en `portfolio/public/`.

Con Node.js 22.13 o posterior, desde `portfolio/`, instala las dependencias con `npm ci` y abre la vista previa con `npm run dev`.

Para generar GitHub Pages, ejecuta `node scripts/export-html.mjs`. Actualiza el `index.html` principal, los de cada apartado y `portfolio.css`. Sube estos archivos junto al proyecto a `main` para publicar. Las rutas y los recursos se exportan con enlaces relativos compatibles con el subdirectorio de GitHub Pages.

`/sobre-mi/` y `/inspiracion/` redirigen al inicio. `Carmen-Llosa-portfolio.html` abre la portada local; necesita los archivos del proyecto junto a él.
