# Roots Protein Bar

Sitio de Roots Protein Bar (Santa Anita). Next.js: la carta vive en código, el pedido sale por WhatsApp y Raíces Roots (sellos) usa APIs propias.

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

Copia `.env.example` → `.env.local` (este archivo **no** se sube a Git).

- `NEXT_PUBLIC_SITE_URL`: dominio final, sin barra al final. En local puede quedar `http://localhost:3000`.
- `NEXT_PUBLIC_GA_ID`: ID de GA4. Si está vacío, no se carga analítica.
- `LOYALTY_SECRET` / `LOYALTY_QR_SECRET`: claves largas (≥16) para sesión y QR. **Obligatorias en producción.**
- `LOCAL_QR_PASSWORD`: clave fuerte de `/local/qr`. **Obligatoria en producción.**
- `DATABASE_URL`: connection string de Neon. Si falta, en local se usa `.data/loyalty.json`.

## Seguridad

- Headers CSP / HSTS, middleware anti-rutas sospechosas, rate limit en APIs.
- Texto de usuarios sanitizado; reseñas del sitio quedan sin publicar hasta moderar (salvo `SITE_REVIEWS_AUTO_PUBLISH=true`).
- En Vercel define secretos reales (no copies los valores de ejemplo).

## Raíces Roots (sellos)

1. Cliente: `/cuenta` — registro con WhatsApp + PIN y ver sellos.
2. Local: `/local/qr` — mostrar QR de sello o de canje (se renueva cada 15 min).
3. Escaneos: `/sello` y `/canje`.
4. Base de datos: el proyecto está linkeado con Neon (`neon.ts` + `.neon`). Corre `neon deploy` para refrescar env vars y `node --env-file=.env.local scripts/migrate-loyalty.mjs` para crear las tablas.

## Vercel

Importa el repositorio en Vercel. Define `NEXT_PUBLIC_SITE_URL`, secretos de fidelización y, si aplica, Supabase y `NEXT_PUBLIC_GA_ID`. El framework es Next.js; el comando de build es `npm run build`.
