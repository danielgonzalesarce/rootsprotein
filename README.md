# Roots Protein Bar

Sitio de Roots Protein Bar (Santa Anita). Next.js, sin backend: la carta vive en código y el pedido sale por WhatsApp.

## Comandos

```bash
npm run dev
npm run build
npm run lint
```

## Carta

Edita `data/menu.ts`. No cambies un precio o un nombre si no está confirmado en la carta del local. Si un producto no tiene descripción ahí, no inventes una. La proteína y las calorías de la categoría se heredan; Post Entreno y Pink Protein traen las suyas.

## Datos del local

Completa los campos vacíos de `data/site.ts`. Si un campo sigue vacío, la web lo oculta (pagos, reseñas, zonas de delivery, historia, referencia, coordenadas).

## Fotos

Coloca las del local en `public/images/local/` y las de productos en `public/images/productos/`. Enlázalas en `data/images.ts` (hero, galería y foto por producto). La del hero va sin decoración de temporada. Falta también `public/og-image.jpg`, referenciada en los metadatos.

## Variables de entorno

Copia `.env.example`.

- `NEXT_PUBLIC_SITE_URL`: dominio final, sin barra al final. En local puede quedar `http://localhost:3000`.
- `NEXT_PUBLIC_GA_ID`: ID de GA4. Si está vacío, no se carga analítica.

## Vercel

Importa el repositorio en Vercel. En el proyecto define `NEXT_PUBLIC_SITE_URL` con el dominio final y `NEXT_PUBLIC_GA_ID` si vas a medir. El framework es Next.js; el comando de build es `npm run build`.
