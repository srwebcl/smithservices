# Smith Services — Landing page

Landing de una sola página para Smith Services (limpieza de fosas sépticas, destape de alcantarillado, baños químicos y obras civiles en Chillán), construida con Next.js (App Router), React y TypeScript.

## Requisitos

- Node.js 20.9 o posterior

## Ejecutar localmente

```bash
npm ci
npm run dev
```

Abrir http://localhost:3000

## Scripts

| Comando         | Descripción                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Servidor de desarrollo              |
| `npm run build` | Compilación de producción           |
| `npm run start` | Servir la compilación de producción |
| `npm run lint`  | Revisión con ESLint                 |

## Estructura

- `app/page.tsx`: landing completa.
- `app/globals.css`: estilos responsive.
- `app/layout.tsx`: layout, fuentes (`next/font`) y metadatos SEO.
- `public/images/`: logotipo y fotografías.
- `next.config.ts`: cabeceras de seguridad HTTP.

## Seguridad

- **Cabeceras HTTP** definidas en `next.config.ts`: Content-Security-Policy, HSTS (solo producción), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` y `Cross-Origin-Opener-Policy`. Se desactiva la cabecera `X-Powered-By`.
- **Sin recursos de terceros**: las fuentes se autoalojan con `next/font`; no se cargan scripts externos. Si se agrega analítica, mapas u otros servicios externos, hay que ampliar la CSP.
- **Variables de entorno**: los archivos `.env*` están excluidos del repositorio. Nunca subir credenciales; configurarlas en el panel del proveedor de hosting.
- **Dependencias**: revisar periódicamente con `npm audit --omit=dev`.

## Pendiente antes de producción

- El formulario de contacto valida los campos en el navegador, pero **no envía datos**. Para conectarlo, usar una Server Action o un route handler que valide y sanee los datos en el servidor, con protección anti-spam (honeypot, rate limiting o captcha). Los límites de longitud del navegador no reemplazan la validación en el servidor.
- Reemplazar la imagen de la diapositiva «Proyectos y Obras Civiles» por una fotografía real de obras y agregar fotos de cada modelo de baño químico.
