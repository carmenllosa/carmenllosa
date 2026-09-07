# Portfolio de Carmen Llosa

Web personal de Carmen Llosa.

- `index.html`: web completa con imágenes y fuentes incorporadas. Se puede abrir directamente en el navegador.
- `portfolio/`: proyecto editable en React y Vinext, con imágenes y fuentes locales.

## Desarrollo

Con Node.js 22.13 o posterior, desde `portfolio/`:

```sh
npm ci
npm run dev
```

Para compilar: `npm run build`.

Para regenerar la versión autónoma: `node scripts/export-html.mjs`. El resultado se guarda como `Carmen-Llosa-portfolio.html` en la carpeta superior; cópialo a `index.html` para actualizar la entrada del repositorio.

Subir estos archivos a GitHub no activa por sí solo GitHub Pages.
