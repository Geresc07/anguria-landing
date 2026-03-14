# DECISIONES TÉCNICAS (DECISION.md)

## Decisiones Arquitectónicas y de Diseño

### 1. Stack Tecnológico
**Decisión:** Utilizar Next.js 15 App Router con React 19, Tailwind CSS v4 y Framer Motion.
**Razón:** Para lograr el "Vibe" de Linear/Vercel (alta performance, animaciones a 60fps), Next.js ofrece el entorno más robusto y optimizado por defecto. Framer Motion maneja animaciones declarativas complejas sin la carga mental de pura manipulación DOM o CSS animations complejas. Tailwind v4 acelera el setup usando configuración directamente en CSS (sin el pesado archivo tailwind.config).

### 2. Estructura de Componentes
**Decisión:** Unificar componentes reutilizables core (botones, inputs, containers) en una carpeta dedicada, y modularizar cada sección de la landing page (Hero, Services Bendo Grid, About/Social Proof, Footer) como Server Components separados importados dinámicamente o agrupados en la page.tsx (según se requiera interactividad).
**Razón:** Facilita el mantenimiento, mantiene el DOM limpio y optimiza la hidratación de React solo para partes animadas por Framer Motion (`"use client"`).

### 3. Patrones Visuales (El "Vibe")
**Decisión:** 
- Fondo base puramente negro (`#000000` o `#050505`).
- Paleta anclada en el **Naranja Corporativo**: Sustitución de los azules genéricos por gradientes naranjas ardientes (ej. `#f97316` a `#ea580c`) para acentos "Glow" generados con Tailwind gradients y blur utilities.
- Diseño No-Genérico: Evitar el aspecto típico generado por IA incorporando asimetría deliberada y **elementos 3D** (via `@splinetool/react-spline` o integraciones similares de assets 3D como un iPhone renderizado).
- Glassmorphism logrado con utilities: `bg-white/5 backdrop-blur-md border border-white/10`.
**Razón:** Para romper el estigma visual de las IA "chapuceras", necesitamos assets interactivos reales (modelos 3D) y un color poco común en tech pura (el naranja de alto contraste sobre negro), que denota agresividad, energía e innovación.

### 4. Fuentes
**Decisión:** Usar `Geist Sans` via `next/font/local` o `next/font/google` (Inter).
**Razón:** Vercel usa Geist, Linear usa Inter. Ambas son hiper limpias. Geist viene preconfigurada de forma fantástica en los starters de Next.js más recientes, lo usaremos como typography base por su look ultra-tecnológico.

### 5. Accesibilidad (a11y) y SEO
**Decisión:** Aunque el diseño es oscuro y "flipado", mantendremos estrictas ratios de contraste (WCAG AA) para textos primarios, y aplicaremos `aria-labels` en animaciones u elementos decorativos vacíos. Se configurarán etiquetas Meta correctamente en el RootLayout y metadatos de OpenGraph.
**Razón:** (Skill `seo-audit`). Un sitio de alto rendimiento no es premium si penaliza el SEO o excluye a usuarios.

### 6. Arquitectura Multi-idioma (i18n) a base de Diccionarios
**Decisión:** Implementar un sistema de diccionarios fuertemente tipados en TS (`src/i18n/dictionaries.ts`) para soportar de base Español (`es`), Catalán (`ca`) e Inglés (`en`), e inyectar las strings dinámicamente en los Server/Client Components.
**Razón:** Desvincular el engorroso código visual de las animaciones (Framer Motion / Tailwind) del Copywriting crítico (CRO). Esto permite escalabilidad instantánea para traducciones, iteraciones de A/B testing para los textos sin miedo a romper el layout, y deja el terreno 100% preparado para el Dynamic Routing the Next.js (`/[lang]/page.tsx`).
