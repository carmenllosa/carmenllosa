# Carmen Llosa · Escritura creativa

Portfolio con forma de libreta, cinco páginas y navegación por pestañas.

- Portada: `index.html`
- Sobre mí y formación: `sobre-mi/index.html`
- Mi escritura: `mi-escritura/index.html`
- Inspiración: `inspiracion/index.html`
- Contacto: `contacto/index.html`

Publicado en https://carmenllosa.github.io/carmenllosa/ con GitHub Pages.

## Edición

Los textos y la distribución de cada página están en `portfolio/content/notebook.json`. El marco de la libreta y la navegación están en `portfolio/lib/notebook.ts`; el diseño está en `portfolio/app/globals.css`.

Con Node.js 22.13 o posterior, desde `portfolio/`:

```sh
npm ci
npm run dev
```

Para actualizar los archivos que publica GitHub Pages:

```sh
node scripts/export-html.mjs
```

El exportador genera las cinco páginas HTML y `notebook.css` en la raíz del repositorio, y comprueba los enlaces internos y los archivos de imágenes. Publicar esos archivos junto con los cambios del proyecto en `main` actualiza la web. Las imágenes y fuentes se sirven desde `portfolio/public/`.

La aplicación React también dispone de las cinco rutas; se puede comprobar con `npm run build`.
