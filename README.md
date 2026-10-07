# ACA Resort Pet Center — Landing page

Site estático (HTML + CSS + JS puro, sem build).

## Estrutura
- `index.html` — página única
- `assets/css/` — v3.css, v4.css, v5.css (carregados nessa ordem)
- `assets/js/` — v3.js, v5.js
- `assets/fonts/` — Bricolage Grotesque e DM Sans (woff2)
- `assets/brand/` — logo
- `assets/images/` — fotos, ilustrações e galeria (webp)
- `assets/videos/` — vídeos (mp4)

## Rodar localmente
```
npx serve .
```
ou `python -m http.server` na pasta e abrir http://localhost:8000

## Publicar
Basta subir o conteúdo desta pasta em qualquer hospedagem estática (Hostinger, GitHub Pages, etc.).
Todos os caminhos são relativos, então funciona na raiz do domínio ou em subpasta.

Observação: o vídeo `assets/videos/aca-tour-completo.mp4` tem ~11 MB (abaixo do limite de 100 MB do GitHub).
