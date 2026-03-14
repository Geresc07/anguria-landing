# SPECIFICACIONES (SPEC.md)

## Descripción General
Landing Page premium de alta conversión para agencia de desarrollo de software enfocada en empresas medianas. Se caracteriza por ser "cost-efficient" y entregar resultados con calidad top tier.

## Requisitos de Negocio
- **Propuesta Única de Valor (PUV):** Desarrollo de software de alto rendimiento, hiper-estructurado, ágil y cost-efficient. Productos digitales que transforman negocios.
- **Público Objetivo:** Directivos "visionarios" con poder de decisión en empresas medianas, que buscan dominar su sector con tecnología propia.
- **Objetivo Principal (CTA):** Agendar llamada estratégica usando Calendly ("Pitch us your crazy idea").
- **Objetivo Principal (CTA)::** Agendar llamada estratégica usando Calendly ("Pitch us your crazy idea").

## Servicios Principales (La Trifuerza)
1. **WebApps de Gestión Personalizadas:** Digitalización y automatización interna integral.
2. **Aplicaciones Móviles Premium:** Apps iOS/Android nativas o cross-platform para el cliente final.
3. **Áreas de Cliente Interactivas:** Portales modernos con dashboards y analíticas.

## 2. Pautas de Diseño (The Vibe) y Reglas de Supervivencia para Agentes
**CRÍTICO PARA FUTUROS AGENTES:** Si pierdes el contexto de las conversaciones previas, **LEE ESTO DETENIDAMENTE**. No queremos diseños típicos generados por IA. Queremos ganar un Awwwards.

- **Look & Feel General:** "Silicon Valley Premium / Awwwards Winner". Extremo contraste, fondos virtualmente negros (`#050505` o `#0a0a0a`), texturas de ruido (`grainy gradients`) y halos de luz direccional (`blur`).
- **Color Paleta:**
  - `Background`: Negro puro oscuro.
  - `Dominante/Corporate`: **Narajna (#f97316)** y sus variaciones (dark: `#c2410c`, glow: `#fdba74`). 
- **Estructuras Restringidas:**
  - Evitar a toda costa los típicos layouts de "Toda la IA lo hace igual".
  - **Hero Section:** Mensajes asertivos. Texto centrado, tipografías colosales (`text-7xl` a `9xl` con tracking cerrado `tracking-tighter`). Ningún elemento 3D que distraiga, **el texto es el REY** y el CRO es el objetivo.
  - **Content Modules:** Usar de forma agresiva **Bento Grids asimétricos**. Tarjetas grandes, números editoriales translúcidos gigantes solapados, bordes ultra-finos de baja opacidad (`border-white/5` con hover en naranja `border-accent-orange/30`).
- **Tipografía:** Fuerte y sin remates. Titulares muy pegados y con mucho peso (`font-black`).
- **Comportamiento / Micro-interacciones:** Los estados *hover* deben dar sensación táctil (reducción/escala `active:scale-98`, flechas de iconos que rotan de `-45deg` a `0deg`, iluminaciones CSS progresivas). Ningún elemento decorativo debe entorpecer la fluidez.
- **Referencias:** Linear, Vercel, Raycast, Cuberto.

## Tono de Voz (Copy)
- Directo, moderno, altamente profesional, con extrema confianza.
- Lemas: "Calidad premium, eficiencia imbatible", "Si quieres ser uno más, busca otra agencia. Si quieres dominar tu sector, hablemos", "Ship fast, impact hard".
- Sin lenguaje corporativo clásico; enfocado en innovación y resultados tangibles.

## Requisitos Técnicos
- Framework: Next.js 15 (App Router).
- Estilos: Tailwind CSS v4.
- Animaciones: Framer Motion.
- Iconos: Lucide React.
- Utilidades: clsx, tailwind-merge para manejo de clases condicionales.
- Fuentes: Geist Sans / Geist Mono (optimizadas por `next/font`).

## Arquitectura de Contenido (i18n)
- **Estructura Dinámica:** Queda terminantemente prohibido _hardcodear_ textos (Copy) directamente en los componentes de UI (ej: `page.tsx`).
- **Diccionarios:** Todo el contenido debe consumirse a través del sistema de diccionarios estandarizado en `src/i18n/dictionaries.ts`.
- **Idiomas Soportados Base:** Castellano (`es`), Catalán (`ca`) e Inglés (`en`). Se debe mantener la paridad de claves (keys) entre los tres idiomas en todo momento para asegurar una fácil traducción e inyección de datos (Dynamic Routing futuro).
