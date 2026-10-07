# ACA Resort Pet Center — site (versão imersiva)

Site estático (HTML + CSS + JS, sem build).

## Estrutura
- `index.html` — página única
- `assets/css/site.css` — estilos
- `assets/js/site.js` — interações e transições
- `assets/js/vendor/` — GSAP 3.12.5 + ScrollTrigger (hospedados localmente)
- `assets/fonts/` — Fraunces, Schibsted Grotesk e Martian Mono (licença OFL)
- `assets/brand/` — logo (versão original e versão clara para fundos escuros)
- `assets/images/`, `assets/videos/` — fotos e vídeos da ACA

A rolagem suave (Lenis) vem do jsDelivr; se não carregar, o site funciona com a rolagem normal.
Quem usa "reduzir movimento" no sistema recebe a versão sem animações.

## Publicar na Hostinger
Envie o conteúdo desta pasta para `public_html` (ou para uma subpasta). Todos os caminhos são relativos.

## Testar localmente
`python -m http.server` nesta pasta e abra http://localhost:8000
